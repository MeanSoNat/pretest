import React, {useContext} from 'react'
import TimeCount from '../components/lab/timecount'
import LabContextProvider from '../context/lab/labcontext'
import QuizForm from './quiz'
function LabBoard() {
  return (
    <div className='min-w-full min-h-screen rounded-sm bg-white text-black'>
      <LabContextProvider>
        {/* <TimeCount/> */}
        <QuizForm/>
      </LabContextProvider>
    </div>
  )
}

export default LabBoard