/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-hooks/rules-of-hooks */
"use client"
import React, { createContext, useEffect, useReducer, useState } from "react";
/**
 * 
 * @param UserContext context for role userselection
*/

export const labContext = createContext<any>(null)
type ACTIONTYPE =
    | { type: "start"; }
    | { type: "stop"; }
    | { type: "submit" }
const initialState = { start: false };

function reducer(state: typeof initialState, action: ACTIONTYPE) {
    switch (action.type) {
        case "start":
            return { start: !state.start }
        case "stop":
            return { start: !state.start }
        default:
            throw new Error()
    }
}

const fetchQuiz = async () => {
    const query = await fetch('/api/quiz', { method: "GET" }).then(response => response.json());
    const shuffleArray = async (array: any) => {
        for (let i = 0; i < array?.quizs?.length - 1; i++) {
            const j = Math.floor(Math.random() * (array?.quizs?.length - 1));
            [array.quizs[i], array.quizs[j]] = [array?.quizs[j], array?.quizs[i]];
        }
        const sliceArray = array.quizs.slice(0, 65)
        array.quizs = sliceArray
        const Array = await ShuffleAnswer(array)
        return Array;
    }
    
    const ShuffleAnswer = async (arr: any) => {
        for (let i = 0; i < arr.quizs.length - 1; i++) {
            for (let j = 0; j < arr.quizs[i].choices.length - 1; j++) {
                const T = Math.floor(Math.random() * (arr.quizs[i].choices.length - 1));
                [arr.quizs[i].choices[j], arr.quizs[i].choices[T]] = [arr.quizs[i].choices[T], arr.quizs[i].choices[j]]
            }
        }
        return arr
    }
    
    const data = await shuffleArray(query)
    return data
}
const submit = async (choices: any) => {
    const response = await fetch('/api/check',
        {
            method: "POST",
            body: JSON.stringify(choices)
        })
    const result = await response.json();
    let percentage = (result.score / 65) * 100
    alert(`${result.score} / 65 Score \n Percentage : ${percentage.toFixed(2)} %`)

}


const LabContextProvider = ({ children }: Readonly<{ children: React.ReactNode }>) => {

    const [state, dispatch] = useReducer(reducer, initialState);
    const [choices, setChoices] = useState()
    const [score, setScore] = useState<number>(0)

    useEffect(() => {
        const callData = async () => {
            const data = await fetchQuiz()
            setChoices(data)
        }
        callData()
    }, [setChoices])


    return (
        <labContext.Provider value={{ initialState, TaskState: state, dispatchState: dispatch, choices, setChoices, submit, score, setScore }}>
            {children}
        </labContext.Provider>
    );
}

export default LabContextProvider;