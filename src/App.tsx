import {Configuration, CreateCompletionRequest, OpenAIApi} from 'openai';

import Form from './components/Form.tsx';
import Answer from './components/Answer.tsx';

import {useState} from 'react';
import {GenerateResponseFn, SetNewQuestionFn, StoredValue} from "./types/types.ts";

const options: CreateCompletionRequest = {
    model: 'text-davinci-003',
    temperature: 0,
    max_tokens: 100,
    top_p: 1,
    frequency_penalty: 0.0,
    presence_penalty: 0.0,
    stop: ['/'],
};
const App = () => {
    const configuration = new Configuration({
        apiKey: import.meta.env.VITE_REACT_APP_OPENAI_API_KEY,
    });

    const openai = new OpenAIApi(configuration);

    const [storedValues, setStoredValues] = useState<Array<StoredValue>>([]);

    const generateResponse: GenerateResponseFn = async (newQuestion: string, setNewQuestion: SetNewQuestionFn) => {

        const completeOptions: CreateCompletionRequest = {
            ...options,
            prompt: newQuestion,
        };

        const response = await openai.createCompletion(completeOptions);

        if (response.data.choices) {
            setStoredValues([
                {
                    question: newQuestion,
                    answer: response.data.choices[0].text ?? '',
                },
                ...storedValues,
            ]);
            setNewQuestion('');
        }
    };

    return (
        <div>
            <div className="header-section">
                <h1>Ask the Oracle</h1>
                {storedValues.length < 1 && (
                    <p>Ask the Oracle anything and it will answer you.</p>
                )}
            </div>

            <Form generateResponse={generateResponse}/>
            {storedValues.length > 0 && <Answer storedValues={storedValues}/>}
        </div>
    );
};

export default App;
