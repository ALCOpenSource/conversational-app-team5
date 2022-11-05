import Navbar from "./components/Navbar/Navbar";
import './App.css';
import { useState } from "react";
import { GoHome } from 'react-icons/go';
import { HiOutlineAcademicCap } from 'react-icons/hi'
import { RiAccountPinCircleFill } from 'react-icons/ri'
import {AiOutlineSchedule, AiOutlineFileText, AiOutlineSetting} from "react-icons/ai"
import {GiArchiveResearch} from 'react-icons/gi'
import {MdAnalytics} from 'react-icons/md'

import { Routes, Route, useNavigate, Link  } from 'react-router-dom';
// import { Sidebar } from './components';
import logo from './assets/logo.png'
import { Accounts, Courses, Home } from './pages';

import PrivateRoute from "./PrivateRoute";


function App() {
  const [open, setOpen] = useState(true);
  const Menus = [
    { title: "Home", icon: <GoHome/>, href:'' },
    { title: "Courses", icon: <HiOutlineAcademicCap/>,  href:'courses'},
    { title: "Accounts", icon: <RiAccountPinCircleFill/>,  href:'accounts', gap: true },
    { title: "Schedule", icon: <AiOutlineSchedule/>, href:'schedule'},
    { title: "Search", icon: <GiArchiveResearch/>,  href:'search' },
    { title: "Analytics", icon: <MdAnalytics />, href:'analytics'},
    { title: "Files", icon: <AiOutlineFileText/>, href:'files', gap: true },
    { title: "Setting", icon: <AiOutlineSetting/>, href:'user' },
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
          <Link
          to={`/${Menu.href}`}
          key={index} >
          <li
            key={index} 
            className={`flex rounded-md p-2 cursor-pointer text-black hover:bg-[#D9D4D2] active:bg-[#77868C]  text- text-sm items-center gap-x-4 
            ${Menu.gap ? "mt-9" : "mt-2"}`}
          >
            <div>{Menu.icon}</div>
            <span className={`${!open && "hidden"} origin-left duration-200`}>
              {Menu.title}
            </span>
          </li>
          </Link>
        ))}
      </ul>
    </div>
   <div className="h-screen flex-1 p-7">
      <Routes>
      <PrivateRoute exact path="/" element={(<Home />)} />
        <Route path="/courses" element={(<Courses/>)} />
        <Route path="/accounts" element={(<Accounts/>)} />
      </Routes>
   </div>
  </div>
  )
}

export default App;