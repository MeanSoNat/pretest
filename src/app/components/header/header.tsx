import React from 'react'
import TimeCounter from './timecounter'
function Header() {
  return (
    <div className='min-w-full min-h-12 rounded-[0.25rem] bg-[#121212] flex gap-1 p-2 items-center'>
        <h1>GCP Exam | </h1>
        <TimeCounter/>
    </div>
  )
}

export default Header