export interface Situation {
  id: number;
  name: string;
  indirect: string;
  direct: string;
  action: string;
}

export interface QuestionOption {
  text: string;
  isCorrect: boolean;
}

export interface QuizQuestion {
  id: number; // situation id
  situationName: string;
  indirectOptions: QuestionOption[];
  directOptions: QuestionOption[];
  actionOptions: QuestionOption[];
  nameOptions: QuestionOption[];
}

export interface AnswerState {
  name: string | null;
  indirect: string | null;
  direct: string | null;
  action: string | null;
}
