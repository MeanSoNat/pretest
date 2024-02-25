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

    return query
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