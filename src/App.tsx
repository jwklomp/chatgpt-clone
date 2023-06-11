import {Configuration, CreateCompletionRequest, OpenAIApi} from 'openai';

import FormSection from './components/FormSection';
import AnswerSection from './components/AnswerSection';

import {useState} from 'react';
import {GenerateResponse, StoredValue} from "./types/types.ts";

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
        apiKey: process.env.REACT_APP_OPENAI_API_KEY,
    });

    const openai = new OpenAIApi(configuration);

    const [storedValues, setStoredValues] = useState<Array<StoredValue>>([]);

    const generateResponse: GenerateResponse = async (newQuestion: string, setNewQuestion: any) => {

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
                <h1>ChatGPT CLONE 🤖</h1>
                {storedValues.length < 1 && (
                    <p>
                        I am an automated question and answer system, designed to assist you
                        in finding relevant information. You are welcome to ask me any
                        queries you may have, and I will do my utmost to offer you a
                        reliable response. Kindly keep in mind that I am a machine and
                        operate solely based on programmed algorithms.
                    </p>
                )}
            </div>

            <FormSection generateResponse={generateResponse}/>

            {storedValues.length > 0 && <AnswerSection storedValues={storedValues}/>}
        </div>
    );
};

export default App;
