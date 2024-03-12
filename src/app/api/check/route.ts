import { NextResponse} from "next/server";
import Quiz from "@/quiz";

export const POST = async (req: Request, res: NextResponse) => {
    
        const body = await req.json();
        const quiz = await new Quiz(req, body);
        const score: any = await quiz.results();

        return NextResponse.json({score},{status: 200})

};
