export const CourseList = ( { courses } ) => {
  const formatTags = (tags) => {
    return (
      <ul className="inline">
        {tags.map( ( tag, index ) => (
          <li className="inline pl-2 underline" key={index}>
            <a href={`#`}>{tag}</a>
          </li>
        ) )}
      </ul>
    )
  }

  return (<div className='p-10'>
    <div className='grid lg:grid-cols-3 md:grid-cols-2 pl-5 sm:grid-cols-2 gap-10 pt-10 justify-between items-center'>
      {
        courses.map( ( item, index ) => {
          return (
          <div key={index} className='w-full h-full bg-[#0F1926] rounded-lg border flex flex-col justify-between p-5 space-y-5 hover:shadow-md'>
            <img src="https://source.unsplash.com/random/?course,academy,book" alt="" className='rounded-md w-auto h-auto' />
            <div className='text-2xl text-start capitalize text-white font-normal'> { item['title'] } </div>
            <div className='text-sm text-start  text-white font-normal'> { item['author_name'] } </div>

            <div className='text-sm text-start  text-white font-normal'> Tags: { formatTags(item['tags']) } </div>

            {/* <p className="text-white" dangerouslySetInnerHTML={ { __html: item['content'] } } /> */}

            <p className="text-white" dangerouslySetInnerHTML={ { __html: item['description'] } } />
            <div  className='' >
              <button className='text-center text-[#0F1926] bg-white cursor-pointer rounded-md gap-2 p-3 w-full'>Get Course </button>
            </div>
          </div>
          )
        })
      }
    </div>
  </div>);


  /*
  return (<div className='p-10'>
    <div className='grid lg:grid-cols-3 md:grid-cols-2 pl-5 sm:grid-cols-2 gap-10 pt-10 justify-between items-center'>
      <div className='w-full h-full bg-[#0F1926] rounded-lg border flex flex-col justify-between p-5 space-y-5 hover:shadow-md'>
        <img src="https://source.unsplash.com/random/?course,academy,book" alt="" className='rounded-md w-auto h-auto' />
        <div className='text-2xl text-start capitalize text-white font-normal'>Course Title</div>
        <div className='text-sm text-start text-white font-normal'>Autor</div>
        <p className="text-white">Workplace ethics is</p>
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
        <p className="text-white">Workplace ethics is </p>
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
        <p className="text-white">Workplace ethics is about following</p>
        <div  className='' >
          <button className='text-center text-[#0F1926] bg-white cursor-pointer rounded-md gap-2 p-3 w-full'>
                    Get Course
          </button>
        </div>
      </div>        
    </div>
  </div>);
*/
}
