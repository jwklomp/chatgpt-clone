
export interface StoredValue {
    answer: string,
    question: string,
}

export type GenerateResponse = (newQuestion: string, setNewQuestion: any) => void;
