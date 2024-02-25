/* eslint-disable react-hooks/rules-of-hooks */
"use client"
import React, { useEffect, useState, useContext } from 'react'
import Countdown from 'react-countdown';
import { labContext } from '@/app/context/lab/labcontext';
/***
 * @param initialtime initial timer
 * 
 */

export default function timecount() {
  const { TaskState,dispatchState, score } = useContext(labContext);
  const renderer = ({ hours, minutes, seconds, completed }: any) => {
    if (TaskState.start) {
      return <div className='sticky top-0 bg-slate-200 p-2 max-w-[150px] min-h-[100px] h-full flex flex-col justify-center content-center rounded-md shadow-md m-2 items-center'>
        <div>{score}</div>
        <button onClick={() => {dispatchState({type: "stop"})}} className='w-full bg-red-900 rounded-sm text-white font-bold'>endtask</button>
      </div>;
    } else if(!TaskState.start) {
      return <button className='sticky top-0 bg-orange-200 rounded p-2 font-bold uppercase' onClick={() => {dispatchState({type: 'start'})}}>Start Test</button>
    }
    if (completed) {
      const Completionist = () => <p className='text-black'>You are good to go!</p>;
      return <Completionist />;
    } else {
        return <button className='sticky top-0 bg-orange-200 rounded p-2 font-bold uppercase' onClick={() => {dispatchState({type: 'start'})}}>Start Test</button>
    }
  };
  return (
    <Countdown date={Date.now() + 10800000} renderer={renderer} />
  )
}
