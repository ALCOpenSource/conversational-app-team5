export const CourseList = ( { courses } ) => {
  // console.log(courses);

  return (<div className='p-10'>
    <div className='grid lg:grid-cols-3 md:grid-cols-2 pl-5 sm:grid-cols-2 gap-10 pt-10 justify-between items-center'>
      <div className='w-full h-full bg-[#0F1926] rounded-lg border flex flex-col justify-between p-5 space-y-5 hover:shadow-md'>
        <img src="https://source.unsplash.com/random/?course,academy,book" alt="" className='rounded-md w-auto h-auto' />
        <div className='text-2xl text-start capitalize text-white font-normal'>Course Title</div>
        <div className='text-sm text-start  text-white font-normal'>Autor</div>
        <p>Workplace ethics is about following certain moral principles in dealing with employees, customers, and stakeholders. An ethical workplace emphasizes fairness, equity, and honesty in its relationships with others. This course is designed to help you build and sustain an ethical work culture founded on corporate values and trust. Boost employee morale and fuel their growth through this online training course on building an ethical work culture. It may be mentioned that this is a mini-course extracted from a larger course: Ethics Training in the Workplace</p>
        <div  className='' >
          <button className='text-center text-[#0F1926] bg-white cursor-pointer rounded-md gap-2 p-3 w-full'>
                    Get Course
          </button>
        </div>
      </div>
      <div className='w-full h-full bg-[#0F1926] rounded-lg border flex flex-col justify-between p-5 space-y-5 hover:shadow-md'>
        <img src="https://source.unsplash.com/random/?academy,book" alt="" className='rounded-md w-auto h-auto' />
        <div className='text-2xl text-start capitalize text-white font-normal'>Course Title</div>
        <div className='text-sm text-start  text-white font-normal'>Autor</div>
        <p>Workplace ethics is about following certain moral principles in dealing with employees, customers, and stakeholders. An ethical workplace emphasizes fairness, equity, and honesty in its relationships with others. This course is designed to help you build and sustain an ethical work culture founded on corporate values and trust. Boost employee morale and fuel their growth through this online training course on building an ethical work culture. It may be mentioned that this is a mini-course extracted from a larger course: Ethics Training in the Workplace</p>
        <div  className='' >
          <button className='text-center text-[#0F1926] bg-white cursor-pointer rounded-md gap-2 p-3 w-full'>
                    Get Course
          </button>
        </div>
      </div>   
      <div className='w-full h-full bg-[#0F1926] rounded-lg border flex flex-col justify-between p-5 space-y-5 hover:shadow-md'>
        <img src="https://source.unsplash.com/random/?book" alt="" className='rounded-md w-auto h-auto' />
        <div className='text-2xl text-start capitalize text-white font-normal'>Course Title</div>
        <div className='text-sm text-start  text-white font-normal'>Autor</div>
        <p>Workplace ethics is about following certain moral principles in dealing with employees, customers, and stakeholders. An ethical workplace emphasizes fairness, equity, and honesty in its relationships with others. This course is designed to help you build and sustain an ethical work culture founded on corporate values and trust. Boost employee morale and fuel their growth through this online training course on building an ethical work culture. It may be mentioned that this is a mini-course extracted from a larger course: Ethics Training in the Workplace</p>
        <div  className='' >
          <button className='text-center text-[#0F1926] bg-white cursor-pointer rounded-md gap-2 p-3 w-full'>
                    Get Course
          </button>
        </div>
      </div>        
    </div>
  </div>);
}
