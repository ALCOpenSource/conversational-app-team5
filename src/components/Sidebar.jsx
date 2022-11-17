import { useContext, useState } from "react";
import { GoHome } from 'react-icons/go';
import logo from '../assets/logo.png'
import { HiOutlineAcademicCap } from 'react-icons/hi'
import { RiAccountPinCircleFill, RiLogoutBoxLine } from 'react-icons/ri'
import { AiOutlineSchedule, AiOutlineFileText, AiOutlineSetting } from "react-icons/ai"
import { GiArchiveResearch } from 'react-icons/gi'
import { MdAnalytics } from 'react-icons/md'
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../contexts/ContextProvider";

const Sidebar = () => {
    const [open, setOpen] = useState(true);
    const Menus = [
      { title: "home", icon: <GoHome/>, href: "" },
      { title: "courses", icon: <HiOutlineAcademicCap/>, href: "courses"},
      { title: "accounts", icon: <RiAccountPinCircleFill/>, gap: true, href: "accounts"},
      { title: "schedule", icon: <AiOutlineSchedule/>, href: "schedule" },
      { title: "search", icon: <GiArchiveResearch/>, href: "search" },
      { title: "analytics", icon: <MdAnalytics />, href: "analytics"},
      { title: "files", icon: <AiOutlineFileText/>, gap: true, href: "files" },
      { title: "setting", icon: <AiOutlineSetting/>, href: "setting" },
    ];

    const { dispatch } = useContext(AuthContext);
    const navigate = useNavigate();

    const logout = () => {
      dispatch({ type: 'USER_LOGOUT' });
      // localStorage.clear('user');
      navigate('/register');
    }

    // const unregisterAuthObserver = auth.onAuthStateChanged(user => {
    //   setCurrentUser(null);
    //   localStorage.clear();
    // });
  return (
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
            <span className={`${!open && "hidden"} capitalize origin-left duration-200`}>
              {Menu.title}
            </span>
          </li>
          </Link>
        ))}
        <li 
        className={`flex rounded-md p-2 cursor-pointer text-black hover:bg-[#D9D4D2]
         active:bg-[#77868C]  text- text-sm items-center gap-x-4 mt-2`}>
          <RiLogoutBoxLine />
          <a href='/register' onClick={() => logout()}
          className={`${!open && "hidden"} origin-left duration-200`}>Sign-out</a>
          </li>
      </ul>
    </div>
  )
}

export default Sidebar