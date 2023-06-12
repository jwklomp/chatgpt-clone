export interface StoredValue {
    answer: string,
    question: string,
}

export type GenerateResponseFn = (newQuestion: string, setNewQuestion: (input: string) => void) => void;
