import React, { useEffect, useState, useContext } from 'react';
import { GetCourses } from '../apis/api';
import { CourseList } from './courses/List';
import { Header, Modal, ChatBox } from '../components';
import { AuthContext } from '../contexts/ContextProvider';



// const Courses = ({ courses }) => {
const Courses = ({ }) => {
  const [showModal, setShowModal] = useState(false);
  const [courses, setCourses] = useState([]);

  const { state } = useContext(AuthContext);
  const { user } = state;

  useEffect(() => {
    setTimeout(()=>{
      setShowModal(true)
    }, 2000)
  }, []);

  /*
  useEffect(() => {
    GetCourses()
    .then((data) => {
      console.log(data);
      localStorage.setItem('courses', JSON.stringify(data));
      setCourses(data);
    })
  }, [courses]);
*/
 
  // console.log("Courses:", courses);

  return (
    <div className=' container mx-auto my-8'>
     {/* <button
        className="bg-blue-200 text-black active:bg-blue-500 
      font-bold px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1"
        type="button"
        onClick={() => setShowModal(true)}
      >
        Fill Details
      </button> */}
    {showModal ? <Modal showModal={showModal} setShowModal={setShowModal} /> : ''}

    <Header title="Courses" />

    <ChatBox user={user} />

    <CourseList courses={courses} />

    </div>
  )
}

export default Courses