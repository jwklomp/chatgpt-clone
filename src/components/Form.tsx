import {FC, useState} from 'react';
import {GenerateResponseFn} from "../types/types.ts";

interface Props {
    generateResponse: GenerateResponseFn;
}
const Form: FC<Props>  = ({ generateResponse }) => {
    const [newQuestion, setNewQuestion] = useState('');

    return (
        <div className="form-section">
            <textarea
                rows={5}
                className="form-control"
                placeholder="Ask me anything..."
                value={newQuestion}
                onChange={(e) => setNewQuestion(e.target.value)}
            ></textarea>
            <button className="btn" onClick={() => generateResponse(newQuestion, setNewQuestion)}>
                Generate Response
            </button>
        </div>
    )
}
export default Form;
