"use client"
import React, {useEffect, useState} from 'react'

function TimeCounter() {
    const [time, setTime] = useState(getFormatted());

    useEffect(() => {
        const timer = setInterval(() => {
            setTime(getFormatted());
        }, 1000)
    }, [])
  return (
    <div>{time}</div>
  )
}

const getFormatted = () => {
    const now = new Date();
    const day = now.getDate().toString().padStart(2, 'O');
    const month = (now.getMonth() + 1).toString().padStart(2, '0');
    const year = now.getFullYear();

    return `Date ${day}/${month}/${year}`;
} 

export default TimeCounter