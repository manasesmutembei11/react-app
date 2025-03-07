import React from 'react';
import { Link } from 'react-router-dom';
import { FaComments } from 'react-icons/fa';
import 'bootstrap/dist/css/bootstrap.min.css';
import './ChatbotButton.css';

const ChatbotButton = () => {
    return (
        <Link to="/chatbot">
            <button className="btn btn-outline-success floating-chat-button">
                <FaComments size={24} /> Chat
            </button>
        </Link>
    );
};

export default ChatbotButton;