import './chat-frame.css';
import React, { useState } from 'react';
import {
  Button,
  Divider,
  IconButton,
  Paper,
  TextField,
  Tooltip,
} from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import AddBoxIcon from '@mui/icons-material/AddBox';
import { HelpOutlined, ListOutlined } from "@mui/icons-material";
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
    <Paper sx={{ minWidth: '80vw', minHeight: '80vh' }}>
      <div className="action-bar">
        <Tooltip title="New chat">
          <IconButton>
            <AddBoxIcon sx={{ width: '36px', height: '36px' }} />
          </IconButton>
        </Tooltip>
        <Tooltip title="All chats">
          <IconButton>
            <ListOutlined sx={{ width: '36px', height: '36px' }} />
          </IconButton>
        </Tooltip>
        <Tooltip title="All chats">
          <IconButton>
            <HelpOutlined sx={{ width: '36px', height: '36px' }} />
          </IconButton>
        </Tooltip>
      </div>
      <Divider orientation="horizontal" flexItem />
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
        <TextField
          hiddenLabel
          id="filled-hidden-label-normal"
          defaultValue=""
          variant="filled"
          value={input}
          sx={{ width: '100%', p: 2 }}
          onChange={(e) => setInput(e.target.value)}
        />
        <Button
          color="success"
          variant="contained"
          sx={{ mr: 2 }}
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
          <SendIcon />
        </Button>
      </div>
    </Paper>
  );
}

export default ChatFrame;
