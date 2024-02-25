import { NextRequest, NextResponse as res } from "next/server";
import { promises as fs } from 'fs';

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
export async function GET(request: Request) {

    const file = await fs.readFile(process.cwd() + '/src/app/api/quiz/quiz.json', 'utf8');
    const data = JSON.parse(file)
    const ShuffledQuiz = await shuffleArray(data)

    return res.json(ShuffledQuiz, { status: 200 })
}

