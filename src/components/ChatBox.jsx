import React from 'react';
import IconButton from '@mui/material/IconButton';
import InputLabel from '@mui/material/InputLabel';
import FilledInput from '@mui/material/FilledInput';
import FormControl from '@mui/material/FormControl';
import InputAdornment from '@mui/material/InputAdornment';
import { GoSearch } from 'react-icons/go';

import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemButton from '@mui/material/ListItemButton';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';

import logo from '../assets/logo.png';
import { io } from "socket.io-client";
import Navbar from './Navbar';

const URL = "http://localhost:3000";
const socket = io(URL, {autoConnect: false});

const initialState = {
  messages: [{index: 0, senderMessage: 'What will you like to study', receiverMessage: ''}],
  type: 'starting'
};

const actionStates = (type) => {
  switch (type) {
    case 'starting':
      return 'courses-search';
    case 'courses-search':
      return 'course-selection';
    default:
      break;
  }
  return '';
}

const reducer = (state, action) => {
  // console.log( state )
  // console.log( action )
  const latestMessage = state.messages[state.messages.length - 1];
  const msgs = state.messages.filter( msg => msg.index !== latestMessage.index );

  /**
   * the idea here would then be that we would have various conditions to try to determine the route users would take and we push that into the messages list rather than me just sayin "we are getting the data..."!!!
  */
  switch (action.type) {
    case 'starting':
      latestMessage['receiverMessage'] = action.message;
      msgs.push(latestMessage);
      msgs.push( {index: msgs.length, items: [], senderMessage: 'We are getting your data...', receiverMessage: ''} );
      return {...state, type: 'courses-search', messages: msgs };
    case 'courses-search':
      msgs.push( {index: msgs.length, senderMessage: 'Select available study material', items: action.data, receiverMessage: ''} );
      return {...state, type: 'course-selection', messages: msgs };
    case 'course-selection':
      latestMessage['receiverMessage'] = action.message;
      msgs.push(latestMessage);
      msgs.push( {index: msgs.length, senderMessage: 'We are getting your course info', items: [], receiverMessage: ''} );
      return {...state, type: 'course-selection-search', messages: msgs };
    default:
      throw new Error();
  }
}

const ItemSelection = ({onSelect, disabled, items}) => {
  const [selectedIndex, setSelectedIndex] = React.useState(null);

  const handleListItemClick = (
    id,
  ) => {
    setSelectedIndex(id);
    onSelect(id);
  };

  return (
    <List sx={{ width: '100%', bgcolor: 'background.paper' }}>
      {
        items?.map(item => {
          return <ListItemButton
              key={item._id}
              disabled={disabled}
              selected={selectedIndex === item._id}
              onClick={() => handleListItemClick(item._id)}
            >
            <span>{item.title}</span>
          </ListItemButton>
        })
      }
    </List>
  );
}

const ChatBox = ({ user }) => {
  const [message, setMessage] = React.useState('');
  const [processing, setProcessing] = React.useState(false);
  const [processingSelection, setProcessingSelection] = React.useState(false);
  const [state, dispatcher] = React.useReducer(reducer, initialState);

  // fix!!! eslint-disable-next-line react-hooks/exhaustive-deps
  React.useEffect(() => {
    const sessionID = localStorage.getItem("sessionID");
    if (sessionID) {
      socket.auth = { sessionID };
    } else {
      socket.auth = { user_uid: user.uid };
    }

    socket.connect();

    socket.on('connect', () => {
      console.log('connected');
    });

    socket.on("session", ({ sessionID, userID }) => {
      // attach the session ID to the next reconnection attempts
      socket.auth = { sessionID };
      localStorage.setItem("sessionID", sessionID);
      socket.userID = userID;
    });

    socket.on("connect_error", (err) => {
      if (err.message === "invalid user") {
        localStorage.removeItem("sessionID");
      }
    });

    socket.on('disconnect', () => {
      console.log('disconnected');
    });

    socket.on("chat-message", ({ data, from }) => {
      if (data !== null && actionStates(state.type) === 'courses-search') {
        dispatcher({type: actionStates(state.type), data});
        setMessage('');
      }
    });

    socket.on("user disconnected", (id) => {
      console.log(id);
    });

    return () => {
      socket.off('pong');
      socket.off('connect');
      socket.off('chat-message');
      socket.off('user disconnected');
      socket.off('disconnect');
    };
  }, []);

  const handleChange = (event) => {
    setMessage(event.target.value);
  };

  const handleClickProcessMessage = React.useCallback( async () => {
    setProcessing(true);

    dispatcher({type: state.type, message});

    // to: user.uid,

    socket.emit('chat-message', {
      message,
      action: actionStates(state.type)
    }, (serverResponse) => {
      console.log(`response from server  ${serverResponse}`);
    });
  }, [message, state.type] );


  const handleOnSelect = React.useCallback( async (itemId) => {
    const latestMessage = state.messages[state.messages.length - 1];
    const item = latestMessage?.items?.find( (i) => {
      return i._id === itemId;
    } );

    setProcessingSelection(true);
    dispatcher({type: 'course-selection', message: item?.title});
    socket.emit('chat-message', {
      message: itemId,
      action: 'course-details'
    });
  }, [state.messages]);

  return <>
    <List sx={{ width: '100%', bgcolor: 'background.paper' }}>
      { state?.messages?.map((message) => {
        return <div key={`${message.index}`}>
          <ListItem alignItems="flex-start">
            <ListItemAvatar>
              <Avatar alt="Braniac" src={logo} />
            </ListItemAvatar>
            <ListItemText
              primary={
                <React.Fragment>
                  <Typography
                    sx={{ display: 'inline' }}
                    component="span"
                    variant="body2"
                    color="text.primary"
                  >
                    Brainiac
                  </Typography>
                  {` — ${message.senderMessage}`}
                </React.Fragment>
              }
            />              
            <div style={ { display: 'block' } } >{
              message.items ? <ItemSelection disabled={processingSelection} onSelect={handleOnSelect} items={message.items} /> : null 
            }</div>
          </ListItem>

          {
            message?.receiverMessage?.length > 0 ? <> <Divider variant="inset" component="li" />

              <ListItem alignItems="flex-start">
                <ListItemAvatar>
                  <Avatar alt={user.displayName} src={user.photoURL} />
                </ListItemAvatar>
                <ListItemText
                  secondary=""
                  primary={
                    <React.Fragment>
                      {` — ${message.receiverMessage}`}
                    </React.Fragment>
                  }
                />
              </ListItem> </> : null
          }
          </div>
        })
      }
    </List>
   <div className="">     
      <FormControl variant="filled">
        <InputLabel htmlFor="filled-adornment-message">Your message</InputLabel>
          <FilledInput
            id="filled-adornment-message"
            value={message}
            readOnly={processing}
            onChange={handleChange}
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  onClick={handleClickProcessMessage}
                  aria-label="submit"
                  disabled={processing}
                  edge="end"
                >
                  <GoSearch />
                 </IconButton>
              </InputAdornment>
            }
            label="Password"
          />
        </FormControl>
    </div> 
  </>
};

export default ChatBox;