export interface StoredValue {
    answer: string,
    question: string,
}

export type SetNewQuestionFn = (input: string) => void;
export type GenerateResponseFn = (newQuestion: string, setNewQuestion: SetNewQuestionFn) => void;
