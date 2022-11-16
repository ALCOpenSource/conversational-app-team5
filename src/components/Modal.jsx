import React, { useState } from "react";
import { FaTimes } from 'react-icons/fa'

const Modal = ({ showModal, setShowModal }) => {
    const [ options, setOptions] = useState({
        user: '',
        author: ''
    })
  return (
    <>
      {showModal ? (
        <>
          <div className="flex justify-center items-center overflow-x-hidden overflow-y-auto fixed inset-0 z-50 backdrop-blur-sm outline-none focus:outline-none">
            <div className="relative w-auto my-6 mx-auto max-w-4xl">
              <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                <div className="flex justify-between gap-5 p-5 border-b border-solid border-gray-300 rounded-t ">
                <div className="items-start">
                         <h3 className="text-2xl pb-2 font=semibold">Welcome to Masterminds</h3>
                         <p className="">Choosing your purpose of study? </p>
                </div>
             
                  <button
                    className="bg-transparent border-0 text-red-500 text-end"
                    onClick={() => setShowModal(false)}
                  >
                    <FaTimes className="cursor-pointer" fontSize={20}/>
                  </button>
                </div>
                <div className="relative p-6 flex-auto">
                  <form className="bg-white shadow-md rounded px-8 pt-6 pb-8 w-full">
                    <div className="space-x-5">
                    <label className="text-[#0F1926] text-sm font-bold mb-4">
                      User :  
                    </label>
                    <input 
                    type='radio'
                    onChange={(e => setOptions(e.target.value))}
                    value={options.user}
                    className="text-2xl text-white" />
                    </div>
                    <div className="space-x-5">
                    <label className="text-[#0F1926] text-sm font-bold mb-4">
                      Author :  
                    </label>
                    <input 
                    type='radio'
                    onChange={(e => setOptions(e.target.value))}
                    value={options.author}
                    className="text-2xl text-white" />
                    </div>
                  </form>
                </div>
                <div className="flex items-center justify-end p-6 border-t border-solid border-blueGray-200 rounded-b">
                  <button
                    className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1"
                    type="button"
                    onClick={() => setShowModal(false)}
                  >
                    Close
                  </button>
                  <button
                    className="text-white bg-[#0F1926] active:bg-blue-700 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1"
                    type="button"
                    onClick={() => setShowModal(false)}
                  >
                    Submit
                  </button>
                </div>
              </div>
            </div>
          </div>
        </>
      ) : null}
    </>
  );
};

export default Modal;
