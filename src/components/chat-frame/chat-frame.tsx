import './chat-frame.css';
import { useState } from 'react';
import Message, { MessageProps } from '../message/message';

function ChatFrame() {
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<MessageProps[]>([
    {
      type: 'self',
      message: 'Witam',
      date: new Date().toISOString(),
    },
    {
      type: 'received',
      message: 'Witam tu bot',
      date: new Date().toISOString(),
    },
  ]);
  const addMessage = (message: MessageProps, returnMessage: MessageProps) => {
    setMessages([...messages, message, returnMessage]);
  };
  return (
    <div className="container">
      <div className="chat-title">Chatbot 1.0</div>
      <div className="messages">
        {messages.map((message) => (
          <Message
            type={message.type}
            message={message.message}
            date={message.date}
          />
        ))}
      </div>
      <div className="bottom">
        <input
          className="input"
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
        <button
          type="button"
          className="button"
          onClick={() => {
            addMessage(
              {
                date: new Date().toISOString(),
                message: input,
                type: 'self',
              },
              {
                type: 'received',
                message: 'Ja jeszcze ni pani maju',
                date: new Date().toISOString(),
              },
            );
            setInput('');
          }}
        >
          Send
        </button>
      </div>
    </div>
  );
}

export default ChatFrame;
