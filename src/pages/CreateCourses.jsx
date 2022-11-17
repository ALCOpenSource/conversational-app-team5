import React, { useContext, useEffect, useState } from 'react'
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { Header, Modal } from '../components'
import { AuthContext } from '../contexts/ContextProvider';
import TagsInput from 'react-tagsinput';
import 'react-tagsinput/react-tagsinput.css';

const CreateCourses = () => {
  const [showModal, setShowModal] = useState(false);
  const { state, dispatch } = useContext(AuthContext);
  const { user } = state;
  const [tags, setTags] = useState([]);
 
  const handleChange = value => {
    setTags(value);
  }
 
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
    trigger
    } = useForm();

    const submitHandler = async (data) => {

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
                  htmlFor="timestamp"
                 className={`block pb-3 text-sm 2 ${
                  errors.timestamp ? "text-red-400" : "text-gray-700 "} dark:text-gray-400 col-span-4 sm:col-span-2 font-medium text-sm`}>Course Duration:</label>
            <input 
                name="timestamp" 
                id="timestamp" 
                type="time" 
                placeholder='1:00:00'
                className={`block w-full ${
                  errors.timestamp ? "text-red-400 border-red-400" : "text-gray-700 "} px-3  mb-2 py-1 text-sm focus:outline-none leading-5 rounded-md focus:border-gray-200 border-gray-200 focus:ring focus:ring-[#0F1926] border h-12 p-2 bg-gray-100 border-transparent focus:bg-white`}
                  {...register("timestamp", { required: "Course Duration is Required!!!" })}
                 onKeyUp={() => {
                  trigger("timestamp");
                }}
                  required={true}
                  />
                   {errors.timestamp && (
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
            <input 
                name="contentType" 
                id="contentType" 
                type="text" 
                placeholder='Course Content Type'
                className={`block w-full  ${
                  errors.contentType ? "text-red-400 border-red-400" : "text-gray-700 "} px-3  mb-2 py-1 text-sm focus:outline-none leading-5 rounded-md focus:border-gray-200 border-gray-200 focus:ring focus:ring-[#0F1926] border h-12 p-2 bg-gray-100 border-transparent focus:bg-white`}
                  {...register("contentType", { required: "Course Content Type is Required!!!" })}
                 onKeyUp={() => {
                  trigger("contentType");
                }}
                  required={true}
                  />
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
                        required: 'Description is Required!!!'
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
                      {...register('tags', {
                        required: 'Please Enter the tags!!!'
                      })}
                      placeholder="Enter Tags"
                      maxTags={10}
                      value={tags}
                      onChange={handleChange}
                      className="block w-full px-3 py-1 text-sm
                      h-32 focus:outline-none leading-5 rounded-md tag-box react-tagsinput focus:border-gray-200 border-gray-200 focus:ring focus:ring-[#0F1926] border p-2 bg-gray-100 border-transparent focus:bg-white"
                      type="text"
                    />
                    {errors.tags && <p className="mt-2 text-sm text-red-500">Please Enter the tags!!!</p>}
      </div>
      <button
                    className="text-white  bg-[#0F1926] hover:bg-[#0F1926] focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center mt-3 cursor-pointer mr-3 md:mr-0 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                    type="submit"
                    // to="/"
                  >
                    Create a Course
                  </button>
      </form>
    </div>
    </div>
  )
}

export default CreateCourses