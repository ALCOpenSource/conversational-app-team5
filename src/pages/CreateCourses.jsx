import React, { useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { useSnackbar } from 'notistack';
import TagsInput from 'react-tagsinput';
import 'react-tagsinput/react-tagsinput.css';


import { AuthContext } from '../contexts/ContextProvider';
import { Header, Modal } from '../components'
import { PostCourses } from '../apis/api';

const courseType = [
  { 
    id: 'text',
    type: "article"
  },
  {
    id: 'video',
    type: "multimedia"
  }
]

const CreateCourses = () => {
  const [showModal, setShowModal] = useState(false);
  const { state, dispatch } = useContext(AuthContext);
  const [tags, setTags] = useState([]);
  const { enqueueSnackbar } = useSnackbar();
  const [type, setType] = useState(courseType);

  const { user } = state;
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
    trigger
    } = useForm();

    const handleTagsChange = (newTags, changedTags, changedIndexes) => {
      console.log(tags)
      console.log(newTags)

      setTags(newTags);
    }

    const submitHandler = async (data) => {
      console.log(data)
      // course type should be a dropdown with and allowed values are ['video', 'link', 'text']


      PostCourses(Object.assign(data, { author_name: user.displayName, author_id: user.uid, timestamp: new Date(), tags: tags }))
        .then( (value) => {
          console.log(value)
          if (
            value.hasOwnProperty('code') && value.hasOwnProperty('name') && value.code === "ERR_BAD_REQUEST" && value.name === "AxiosError"
          ) {
            enqueueSnackbar(
              value.message,
              { variant: 'error', autoHideDuration: 60000 }
            );
          }


          if (
            value.hasOwnProperty('status') && (value.status === 200 || value.status === 201)
          ) {
            enqueueSnackbar(
              'Course created successfully',
              { variant: 'success', autoHideDuration: 60000 }
            );
          }

        } )
        .catch( (error) => {
          enqueueSnackbar(
            error,
            { variant: 'error', autoHideDuration: 60000 }
          );
          console.log(error)
        } )
    }

  useEffect(() => {
    setTimeout(()=>{
      setShowModal(true)
    }, 2000)
  }, []);


  return (
    <div>
    {showModal ? <Modal showModal={showModal} setShowModal={setShowModal} /> : ''}
    <Header title="Create A Course" />
    <p className='italic mb-4'>Become a creator and lets help you bring your idea to life</p>
    <div>
      <form  onSubmit={handleSubmit(submitHandler)} className="bg-white shadow-md rounded space-y-5 px-8 pt-6 pb-8 w-full">
      <div>
          <label
                  htmlFor="title"
                 className={`block pb-3 text-sm 2 ${
                  errors.title ? "text-red-400" : "text-gray-700 "} dark:text-gray-400 col-span-4 sm:col-span-2 font-medium text-sm`}>Course Title:</label>
            <input 
                name="title" 
                id="title" 
                type="text" 
                placeholder='Machine Learning A-Z: Hands-On Python and java'
                className={`block w-full ${
                  errors.title ? "text-red-400 border-red-400" : "text-gray-700 "} px-3  mb-2 py-1 text-sm focus:outline-none leading-5 rounded-md focus:border-gray-200 border-gray-200 focus:ring focus:ring-[#0F1926] border h-12 p-2 bg-gray-100 border-transparent focus:bg-white`}
                  {...register("title", { required: "Username is Required!!!" })}
                 onKeyUp={() => {
                  trigger("title");
                }}
                  required={true}
                  />
                   {errors.title && (
                  <p className="text-red-500 text-sm mt-2">
                  Title is Required!!!
                  </p>
                )}
      </div>
      <div>
          <label
                  htmlFor="courseDuration"
                 className={`block pb-3 text-sm 2 ${
                  errors.courseDuration ? "text-red-400" : "text-gray-700 "} dark:text-gray-400 col-span-4 sm:col-span-2 font-medium text-sm`}>Course Duration:</label>
            <input 
                name="courseDuration" 
                id="courseDuration" 
                type="text" 
                placeholder='Enter your course duration'
                className={`block w-full ${
                  errors.courseDuration ? "text-red-400 border-red-400" : "text-gray-700 "} px-3  mb-2 py-1 text-sm focus:outline-none leading-5 rounded-md focus:border-gray-200 border-gray-200 focus:ring focus:ring-[#0F1926] border h-12 p-2 bg-gray-100 border-transparent focus:bg-white`}
                  {...register("courseDuration", { required: "Course Duration is Required!!!" })}
                 onKeyUp={() => {
                  trigger("courseDuration");
                }}
                  required={true}
                  />
                   {errors.courseDuration && (
                  <p className="text-red-500 text-sm mt-2">
                  Course Duration is Required!!!
                  </p>
                )}
      </div>
      <div>
          <label
                  htmlFor="content"
                 className={`block pb-3 text-sm 2 ${
                  errors.content ? "text-red-400" : "text-gray-700 "} dark:text-gray-400 col-span-4 sm:col-span-2 font-medium text-sm`}>Course Content:</label>
            <textarea 
                name="content" 
                id="content" 
                type="text" 
                placeholder='Course Content'
                className={`block w-full h-32 ${
                  errors.content ? "text-red-400 border-red-400" : "text-gray-700 "} px-3  mb-2 py-1 text-sm focus:outline-none leading-5 rounded-md focus:border-gray-200 border-gray-200 focus:ring focus:ring-[#0F1926] border h-12 p-2 bg-gray-100 border-transparent focus:bg-white`}
                  {...register("content", { required: "Course Content is Required!!!" })}
                 onKeyUp={() => {
                  trigger("content");
                }}
                  required={true}
                  />
                   {errors.content && (
                  <p className="text-red-500 text-sm mt-2">
                  Course Content is Required!!!
                  </p>
                )}
      </div>
      <div>
          <label
                  htmlFor="contentType"
                 className={`block pb-3 text-sm 2 ${
                  errors.contentType ? "text-red-400" : "text-gray-700 "} dark:text-gray-400 col-span-4 sm:col-span-2 font-medium text-sm`}>Course Content Type:</label>
                   <select
                  // className="outline-none w-full text-base border border-gray-200 p-2 rounded-md cursor-pointer"
                  onChange={(e) => {
                    setType(e.target.value);
                  }}
                  id="contentType"
                  required={true}  
                  className={` ${
                    errors.contentType ? ' border-red-400' : ''} w-full text-base border border-gray-200 p-2 rounded-md cursor-pointer`}
                  {...register('contentType')}
                >
                  <option value="others" className="sm:text-bg bg-white">Select Content Type</option>
                  {type.map((item) => (
                  <option className="text-base border-0 outline-none capitalize bg-white text-black " value={item.id} key={item.id}>
                    {item.type}
                  </option>
                      ))}
                </select>
                {errors.contentType && (
                  <p className="text-red-500 text-sm mt-2">
                  Course Content Type is Required!!!
                  </p>
                  )}
      </div>
      <div className="mt-6">
                    <label
                      htmlFor="description"
                      className={`block pb-3 text-sm 2 ${
                        errors.description ? 'text-red-400' : 'text-gray-700 '
                      } dark:text-gray-400 col-span-4 sm:col-span-2 font-medium text-sm`}
                    >
                     Course Description
                    </label>
                    <textarea
                      name="description"
                      id="description"
                      autoComplete="off"
                      required={true}
                      {...register('description', {
                        required: 'Description is Required!!!',
                        minLength: {
                          value: 5,
                          message: "Description must be more than % characters"
                          },
                          maxLength: {
                          value: 200,
                          message: "Description must be less than 200 characters"
                          },
                      })}
                      placeholder="Write a short description about the course you want to create"
                      className="block w-full px-3 py-1 text-sm
                      h-32 focus:outline-none leading-5 rounded-md focus:border-gray-200 border-gray-200 focus:ring focus:ring-[#0F1926] border p-2 bg-gray-100 border-transparent focus:bg-white"
                      type="text"
                    />
                    {errors.description && <p className="mt-2 text-sm text-red-500">Please enter a description</p>}
      </div>
      <div className="mt-6">
                    <label
                      htmlFor="tags"
                      className={`block pb-3 text-sm 2 ${
                        errors.tags ? 'text-red-400' : 'text-gray-700 '
                      } dark:text-gray-400 col-span-4 sm:col-span-2 font-medium text-sm`}
                    >
                     Course Tags 
                    </label>
                    <TagsInput
                      name="tags"
                      id="tags"
                      autoComplete="off"
                      required={true}
                      // {...register('tags', {
                      //   required: 'Please Enter the tags!!!',
                      // validate: v => console.log(v)
                      // })}
                      placeholder="Enter Tags"
                      maxTags={10}
                      value={tags}
                      onChange={handleTagsChange}
                      className="block w-full px-3 py-1 text-sm
                      h-32 focus:outline-none leading-5 rounded-md tag-box react-tagsinput focus:border-gray-200 border-gray-200 focus:ring focus:ring-[#0F1926] border p-2 bg-gray-100 border-transparent focus:bg-white"
                      type="text"
                    />
                    {errors.tags && <p className="mt-2 text-sm text-red-500">Please Enter the tags!!!</p>}
      </div>
      <button
                    className="text-white  bg-[#0F1926] hover:bg-[#0F1926] focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center mt-3 cursor-pointer mr-3 md:mr-0 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                    type="submit"
                  >
                    Create a Course
                  </button>
      </form>
    </div>
    </div>
  )
}

export default CreateCourses