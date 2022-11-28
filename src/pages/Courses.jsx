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
    {showModal ? <Modal showModal={showModal} setShowModal={setShowModal} /> : ''}

    <Header title="Courses" />

    <div className='p-10'>
            <div className='grid lg:grid-cols-3 md:grid-cols-2 pl-5 sm:grid-cols-1 gap-10 space-x-10 pt-10 justify-between items-center'>
                <div className='w-[20vw]  h-full bg-[#0F1926] rounded-lg border flex flex-col justify-between p-5 space-y-5 hover:shadow-md'>
                  <img src="https://source.unsplash.com/random/?course,academy,book" alt="" className='rounded-md  w-48 h-48' />
                  <div className='text-2xl  small  text-start capitalize text-white font-normal'>Course Title</div>
                  <div className='text-sm  small  text-start  text-white font-normal'>Autor</div>
                  <p className='text-sm text-start  small  text-white'>Workplace ethics is about following certain moral principles in dealing with employees, customers, and stakeholders. An ethical workplace emphasizes fairness, equity, and honesty in its relationships with others.</p>
                  <div  className=' small ' >
                    <button className='text-center text-[#0F1926] bg-white cursor-pointer rounded-md gap-2 p-3 w-full'>
                              Get Course
                    </button>
                  </div>
                </div>
                <div className='w-[20vw]  h-full bg-[#0F1926] rounded-lg border flex flex-col justify-between p-5 space-y-5 hover:shadow-md'>
                  <img src="https://source.unsplash.com/random/?academy,book" alt="" className='rounded-md w-full h-32' />
                  <div className='text-2xl small text-start capitalize text-white font-normal'>Course Title</div>
                  <div className='text-sm text-start  text-white font-normal'>Autor</div>
                  <p className='text-sm text-start small  text-white'>Workplace ethics is about following certain moral principles in dealing with employees, customers, and stakeholders. An ethical workplace emphasizes fairness, equity, and honesty in its relationships with others.</p>
                  <div  className='small' >
                    <button className='text-center text-[#0F1926] bg-white cursor-pointer rounded-md gap-2 p-3 w-full'>
                              Get Course
                    </button>
                  </div>
                </div>   
                <div className='w-[20vw]  h-full bg-[#0F1926] rounded-lg border flex flex-col justify-between p-5 space-y-5 hover:shadow-md'>
                  <img src="https://source.unsplash.com/random/?book" alt="" className='rounded-md w-full h-32' />
                  <div className='text-2xl  small  text-start capitalize text-white font-normal'>Course Title</div>
                  <div className='text-sm text-start  small text-white font-normal'>Autor</div>
                  <p className='text-sm text-start  small  text-white'>Workplace ethics is about following certain moral principles in dealing with employees, customers, and stakeholders. An ethical workplace emphasizes fairness, equity, and honesty in its relationships with others.</p>
                  <div  className=' small ' >
                    <button className='text-center text-[#0F1926] bg-white cursor-pointer rounded-md gap-2 p-3 w-full'>
                              Get Course
                    </button>
                  </div>
                </div>        
            </div>
          </div>

    </div>
  )
}

export default Courses