import React from 'react';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function Copy({refs}){
  const notify = () => {
    
    navigator.clipboard.writeText(refs.current.innerText);
    toast.success("Copied to Clipboard")};

  return (
    <div>
      <button 
        className='bg-blue-500 hover:bg-blue-700 text-white py-2 px-3 transition-all border-none rounded' 
        onClick={notify}
      >
        Copy!
      </button>
      <ToastContainer />
    </div>
  );
}