class Quiz {
  private arr: any = [];
  private readonly isPOST: boolean;
  private score: number = 0 ;

  constructor(request: Request, arr: any) {
    this.isPOST = request.method === "POST";
    this.arr = arr;
  }

  public setQuiz(Quiz: any) {
    if (!this.isPOST || this.arr == null) return;
    this.arr = Quiz;
  }

  public results(): any {
    return this.checkQuiz();
  }

  protected checkQuiz() {
    const quiz = this.arr.quizs;
    
    quiz.map((submittedQuiz: any) => {
      if (submittedQuiz.isMultiple) {
        this.isMultiple(submittedQuiz);
      } else {
        this.notMultiple(submittedQuiz);
      }
    });
    return this.score
}

  private isMultiple = (submittedQuiz: any) => {
    let flag: number = 0;

    submittedQuiz.choices.map((selectChoice: any) => {
      if (selectChoice.selected == true && selectChoice.isCorrect == true) {
        flag = flag + 1;
      }
      if (flag == 2) {
        this.score =  this.score + 1;
        flag = 0
      }
    });
    
  };

  private notMultiple = (submittedQuiz: any) => {
    submittedQuiz.choices.map((selectChoice:any) => {
        if (selectChoice.selected == true && selectChoice.isCorrect == true) {
            this.score = this.score + 1
        }
      })
  };
}

export default Quiz;
