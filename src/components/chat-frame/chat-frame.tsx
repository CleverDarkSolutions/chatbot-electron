import './chat-frame.css';
import React, { useState } from 'react';
import {
  Box,
  Button,
  CircularProgress,
  Divider,
  IconButton,
  Paper,
  Tab,
  Tabs,
  TextField,
  Tooltip,
} from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import AddBoxIcon from '@mui/icons-material/AddBox';
import { Delete, HelpOutlined, ListOutlined } from '@mui/icons-material';
import axios from 'axios';
import Message, { MessageProps } from '../message/message';

export type TabType = {
  title: string;
  messages: MessageProps[];
};

function ChatFrame() {
  const [input, setInput] = useState('');
  const [tabs, setTabs] = useState<TabType[]>([
    {
      title: 'Tab 1',
      messages: [
        {
          type: 'self',
          message: 'Hello',
          date: new Date().toISOString(),
        },
        {
          type: 'received',
          message: 'Hello from bot',
          date: new Date().toISOString(),
        },
      ],
    },
  ]);
  const [activeTabIndex, setActiveTabIndex] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setActiveTabIndex(newValue);
  };

  const addMessage = (messageObject: MessageProps) => {
    if (messageObject.message !== '') {
      setIsLoading(true);

      setTimeout(() => {
        axios
          .get('https://catfact.ninja/fact')
          .then((response) => {
            const botMessage: MessageProps = {
              type: 'received',
              message: response.data.fact,
              date: new Date().toISOString(),
            };
            setTabs((prevTabs) => {
              const updatedTabs = [...prevTabs];
              updatedTabs[activeTabIndex].messages = [
                ...updatedTabs[activeTabIndex].messages,
                messageObject,
                botMessage,
              ];
              return updatedTabs;
            });
          })
          .catch((error) => {
            console.error('Error fetching cat fact:', error);
          })
          .finally(() => setIsLoading(false));
      }, 3000); // 3-second delay
    }
  };

  const handleDeleteTab = () => {
    if (tabs.length > 1) {
      setTabs((prevTabs) => {
        const updatedTabs = prevTabs.filter((_, index) => index !== activeTabIndex);
        setActiveTabIndex((prevIndex) => (prevIndex === 0 ? 0 : prevIndex - 1));
        return updatedTabs;
      });
    }
  };

  return (
    <Paper sx={{ minWidth: '90vw', minHeight: '80vh' }}>
      <div className="action-bar">
        <div>
          <Tooltip title="New chat">
            <IconButton
              onClick={() =>
                setTabs([
                  ...tabs,
                  { title: `Tab ${tabs.length + 1}`, messages: [] },
                ])
              }
            >
              <AddBoxIcon sx={{ width: '36px', height: '36px' }} />
            </IconButton>
          </Tooltip>
          <Tooltip title="Delete chat">
            <IconButton onClick={handleDeleteTab}>
              <Delete sx={{ width: '36px', height: '36px' }} />
            </IconButton>
          </Tooltip>
          <Tooltip title="Help">
            <IconButton>
              <HelpOutlined sx={{ width: '36px', height: '36px' }} />
            </IconButton>
          </Tooltip>
        </div>
        <div className="action-tabs">
          <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
            <Tabs
              value={activeTabIndex}
              onChange={handleTabChange}
              aria-label="chat tabs"
            >
              {tabs.map((tab, index) => (
                <Tab key={index} label={tab.title} />
              ))}
            </Tabs>
          </Box>
        </div>
      </div>
      <Divider orientation="horizontal" flexItem />
      <div className="messages">
        {tabs[activeTabIndex].messages.map((message, idx) => (
          <Message
            key={idx}
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
          variant="outlined"
          sx={{ mr: 2 }}
          onClick={() => {
            addMessage({
              date: new Date().toISOString(),
              message: input,
              type: 'self',
            });
            setInput('');
          }}
        >
          {isLoading ? (
            <CircularProgress sx={{ width: '24px', height: '24px' }} />
          ) : (
            <SendIcon />
          )}
        </Button>
      </div>
    </Paper>
  );
}

export default ChatFrame;
