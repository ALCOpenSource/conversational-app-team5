import React from 'react';
import { GrFormSearch } from 'react-icons/gr';

const Navbar = ({currentUser}) => {
  return (
    <div>
      <nav>
        <div className='flex flex-row pb-10 items-center justify-between '>
        <div>
        <div className='w-auto items-center homeBg md:flex hidden '>
            <span className='flex w-72 justify-between items-center   '>
              {/* <GrFormSearch fontSize={38} color="white" className='fixed text-center text-white mt-3 ml-3 min-w-40'/> */}
              <input
                className='w-full rounded-xl border p-4 text-[#0F1926] bg-[#0F1926]  px-3 py-1 text-sm focus:outline-none leading-5  focus:border-gray-200 border-gray-200 focus:ring focus:ring-[#0F1926]  h-12 focus:bg-white cursor-pointer' 
                type="search"  
                placeholder='Search..'
              />
            </span>
          </div>
          <GrFormSearch fontSize={38} color="#0F1926" className=' md:hidden text-center text-[#0F1926] cursor-pointer'/>
          </div>
          <div className='flex flex-row justify-between gap-x-5 items-center '>
            <img src={currentUser.photoURL} className='rounded-full w-12 h-12  ' alt='userimage' />
          <div className=' text-end'>{currentUser.displayName}</div>
          </div>
        </div>
      </nav>
    </div>
  )
}

export default Navbar