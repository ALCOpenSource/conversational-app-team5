import { useState } from "react";
import { GoHome } from 'react-icons/go';
import logo from '../assets/logo.png'
import { HiOutlineAcademicCap } from 'react-icons/hi'
import { RiAccountPinCircleFill } from 'react-icons/ri'
import {AiOutlineSchedule, AiOutlineFileText, AiOutlineSetting} from "react-icons/ai"
import {GiArchiveResearch} from 'react-icons/gi'
import {MdAnalytics} from 'react-icons/md'


const Sidebar = () => {
    const [open, setOpen] = useState(true);
    const Menus = [
      { title: "Home", icon: <GoHome/> },
      { title: "Courses", icon: <HiOutlineAcademicCap/>},
      { title: "Accounts", icon: <RiAccountPinCircleFill/>, gap: true },
      { title: "Schedule", icon: <AiOutlineSchedule/> },
      { title: "Search", icon: <GiArchiveResearch/> },
      { title: "Analytics", icon: <MdAnalytics />},
      { title: "Files", icon: <AiOutlineFileText/>, gap: true },
      { title: "Setting", icon: <AiOutlineSetting/> },
    ];
  return (
    <div className="flex">
    <div
      className={` ${
        open ? "w-56" : "w-20 "
      } bg-[#D9D4D2]  h-screen p-5  pt-8 relative duration-300`}
    >
      <img
        src={logo}
        className={`absolute cursor-pointer -right-3 top-9 w-7 
         border-2 rounded-full  ${!open && "rotate-180"}`}
        onClick={() => setOpen(!open)}
        alt="logo"
      />
      <div className="block">
        <img
          src={logo}
          alt='logo'
          className={`cursor-pointer duration-500 border-2 rounded-full ${
            open && "rotate-[360deg]"
          } w-24  ` }
        />
      </div>
      <ul className="pt-6">
        {Menus.map((Menu, index) => (
          <li
            key={index}
            className={`flex rounded-md p-2 cursor-pointer hover:bg-light-white text- text-sm items-center gap-x-4 
            ${Menu.gap ? "mt-9" : "mt-2"} ${
              index === 0 && "bg-light-white"
            } `}
          >
            <div>{Menu.icon}</div>
            <span className={`${!open && "hidden"} origin-left duration-200`}>
              {Menu.title}
            </span>
          </li>
        ))}
      </ul>
    </div>
    <div className="h-screen flex-1 p-7">
      <h1 className="text-2xl font-semibold ">Home Page</h1>
    </div>
  </div>
  )
}

export default Sidebar