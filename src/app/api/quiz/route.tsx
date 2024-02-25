import { NextRequest, NextResponse as res } from "next/server";
import { promises as fs } from 'fs';


export async function GET(request: Request) {

    const file = await fs.readFile(process.cwd() + '/src/app/api/quiz/quiz.json', 'utf8');
    const data = JSON.parse(file)

    return res.json(data, { status: 200 })
}

