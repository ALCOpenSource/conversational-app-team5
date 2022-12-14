import React, { useEffect, useState, useContext } from 'react';
import { GetCourses } from '../apis/api';
import { CourseList } from './courses/List';
import { Header, Modal, ChatBox } from '../components';
import { AuthContext } from '../contexts/ContextProvider';


const Courses = () => {
  const [showModal, setShowModal] = useState(false);
  const [courses, setCourses] = useState([]);

  const { state } = useContext(AuthContext);
  const { user } = state;

  useEffect(() => {
    setTimeout(()=>{
      setShowModal(true)
    }, 2000)
  }, []);

  useEffect(() => {
    GetCourses()
    .then((data) => {
      if (data.status === 200 && data.hasOwnProperty('data') ) {
        localStorage.setItem('courses', JSON.stringify(data.data));
        setCourses(data.data);
      }
      // console.log(data);
    })
  }, []);
 
  return (
    <div className=' container mx-auto my-8'>
    {showModal ? <Modal showModal={showModal} setShowModal={setShowModal} /> : ''}

    <Header title="Courses" />

    <ChatBox user={user} />

    <CourseList courses={courses} />
    </div>
  )
}

export default Courses