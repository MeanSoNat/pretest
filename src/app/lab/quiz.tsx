"use client"
import React, { useContext, useState, useEffect } from 'react'
import Image from 'next/image'
import { labContext } from '../context/lab/labcontext'

function QuizForm() {
    const { choices, setChoices, submit } = useContext(labContext)
    const quiz = choices?.quizs
    const handlerChoicesSelection = (qid: any, cid: any): void => {

        const updateChoices = quiz.map((question: any) => {
            if (qid == question.id) {
                return {
                    ...question,
                    choices: question.choices.map((choice: any) => {
                        if (cid == choice.id) {
                            return {
                                ...choice,
                                selected: !choice.selected
                            }
                        };
                        return choice;
                    })
                }
            }
            return question
        })
        setChoices({ quizs: updateChoices })
    }

    return (
        <div className='flex flex-col gap-3 mt-2 mx-3'>
            {
                quiz?.map((q: any, _: number) => {
                    
                    return <div key={`${_}`}>
                        <h1 className='text-[18px] font-medium'>{_ + 1} . {q.title}</h1>
                        {
                            (q?.img) ? <Image src={q?.img} alt={q.title} width={800} height={500} priority/> : ""
                        }
                        <div className='ml-5 mt-2'>

                            {q?.choices?.map((v: any) => {
                                return (
                                    <div key={`${q.id}${v.id}`} className='flex'>
                                        <ul className='flex flex-row gap-10'>
                                            <li onClick={() => handlerChoicesSelection(q.id, v.id)} className={`rounded-md ${v.selected ? "bg-slate-200 border-solid border-2 border-blue-700" : ""} transition border-b-2 cursor-pointer px-1 ease duration-150 hover:bg-slate-200 mt-3`}>
                                                {v.Answer}
                                            </li>
                                        </ul>
                                    </div>
                                )
                            }
                            )
                            }

                        </div>
                    </div>
                }
                )
            }
            <div className='bg-red-900 text-white text-center m-5 py-3 text-[18px] text-bold rounded-md cursor-pointer hover:bg-red-900/20' onClick={() => { submit(choices) }}>Submit</div>
        </div>
    )
}

export default QuizForm