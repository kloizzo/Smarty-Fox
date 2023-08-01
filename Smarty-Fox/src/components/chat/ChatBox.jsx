import React, { useState, useEffect, useRef } from 'react';
import lottie from 'lottie-web';
import sleep from '../../assets/sleep.json';
import wake from '../../assets/wake.json';
import axios from 'axios';

function ChatBox({ setSecret, setFox, fox }) {
  const [messages, setMessages] = useState([]);
  const [userInput, setUserInput] = useState('');
  const messagesEndRef = useRef(null);

  const sad = 'https://lottie.host/5591a607-b7ae-413f-b726-9462dd4ace86/aacfTwBOXj.json';

  const talk = 'https://lottie.host/3a98a7ff-52c6-4685-8bc2-41a7ab46d19f/XcMGrFdU45.json';

  useEffect(() => {
    const welcomeMsg = { text: 'Hello, friend! What can I help you with?', sender: 'bot' };
    setMessages([welcomeMsg]);
  }, []);

  useEffect(() => {
    scrollToBottom();

    if (fox === sleep) {
      setFox(wake);
    }

    const sleepTimer = setTimeout(() => {
      setFox(sleep);
    }, 25000);

    return () => clearTimeout(sleepTimer);
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }

  const handleInput = (e) => {
    setUserInput(e.target.value);
  };

  const handleSubmit = async () => {
    if (userInput.trim() !== '') {
      const newUserMessage = { text: userInput, sender: 'user' };
      let newBotMessage;

      if (userInput.trim() === `I'm hungry`) {
        newBotMessage = { text: 'run.', sender: 'bot' };
        setSecret('activate');
      } else {
        try {
          const response = await axios.post('http://localhost:3000/getReply', {
            input: userInput,
          });

          newBotMessage = { text: response.data, sender: 'bot' };
        } catch (error) {
          console.error('Error requesting AI response:', error);
          newBotMessage = { text: `Oops! Something went wrong.`, sender: 'bot' };
        }
      }

      setMessages((prevMessages) => [...prevMessages, newUserMessage, newBotMessage]);
      setUserInput('');
    }
  };

  const handleEnterSubmit = (e) => {
    if (e.key === "Enter") {
      handleSubmit();
    }
  };

  return (
    <div className="border-2 rounded-md p-8 border-slate-400 border-l-slate-200 border-r-slate-200 mr-14 w-3/5 flex flex-col max-h-screen overflow-y-auto bg-neutral-200/50">
      <div className="flex-grow overflow-hidden overflow-y-auto max-h-screen">
        {messages.map((message, index) => (
          <div
            key={index}
            className={`chat ${message.sender === 'user' ? 'chat-end' : 'chat-start'}`}
          >
            <div
              className={`chat-bubble ${message.sender === 'user' ? 'bg-red-300' : 'bg-red-300'
                } text-2xl`}
            >
              {message.text}
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>
      <div className="w-full mt-5 flex flex-row">
        <input
          className="input input bordered w-full"
          type="text"
          placeholder="Type here"
          value={userInput}
          onChange={handleInput}
          onKeyPress={handleEnterSubmit}
        />
        <button className="btn btn-active btn-ghost w-1/6 ml-5" onClick={handleSubmit}>Submit</button>
      </div>
    </div >
  )
}

export default ChatBox;