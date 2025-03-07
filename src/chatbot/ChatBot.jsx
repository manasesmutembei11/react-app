import React, { useState, useRef, useEffect } from 'react';
import { HfInference } from '@huggingface/inference';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Chatbot.css';

const client = new HfInference('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');

const Chatbot = () => {
    const [messages, setMessages] = useState([]);
    const [input, setInput] = useState('');
    const [loading, setLoading] = useState(false);
    const chatEndRef = useRef(null);

    useEffect(() => {
        chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages]);

    const handleSendMessage = async () => {
        if (!input.trim()) return;

        const userMessage = { role: 'user', content: input };
        setMessages([...messages, userMessage]);
        setInput('');
        setLoading(true);

        try {
            let botResponse = '';

            const stream = client.chatCompletionStream({
                model: 'HuggingFaceH4/zephyr-7b-alpha',
                messages: [...messages, userMessage],
                temperature: 0.5,
                max_tokens: 2048,
                top_p: 0.7,
            });

            let collectedChunks = [];
            for await (const chunk of stream) {
                if (chunk.choices && chunk.choices.length > 0) {
                    const newContent = chunk.choices[0].delta.content;
                    collectedChunks.push(newContent);
                }
            }

            botResponse = collectedChunks.join('');

            setMessages((prevMessages) => [
                ...prevMessages,
                { role: 'bot', content: botResponse },
            ]);
        } catch (error) {
            console.error('Error fetching response:', error);
            toast.error('Error fetching response from Hugging Face');
        } finally {
            setLoading(false);
        }
    };


    return (
        <div className="container chatbot-container">
            <div className="card chat-window">
                <div className="card-header text-white bg-info text-center">
                    Here to help you
                </div>
                <div className="card-body chat-messages">
                    {messages.map((message, index) => (
                        <div key={index} className={`chat-message ${message.role} p-2`}>
                            {message.content}
                        </div>
                    ))}
                    {loading && <div className="chat-message bot p-2"> Thinking...</div>}
                    <div ref={chatEndRef}></div>
                </div>
                <div className="card-footer d-flex">
                    <input
                        type="text"
                        className="form-control me-2"
                        placeholder="Hi! How can I help you today?"
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        disabled={loading}
                    />
                    <button className="btn btn-outline-success" onClick={handleSendMessage} disabled={loading}>
                        {loading ? '...' : 'Send'}
                    </button>
                </div>
            </div>
            <ToastContainer />
        </div>
    );
};

export default Chatbot;
