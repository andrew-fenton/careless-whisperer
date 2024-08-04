import React, { useState } from 'react';
import { Box, List, ListItem, ListItemText, Paper, TextareaAutosize } from '@mui/material';

const ChatBox: React.FC = () => {
  const [messages, setMessages] = useState<string[]>([]);
  const [inputValue, setInputValue] = useState<string>('');

  const handleSendMessage = () => {
    if (inputValue.trim() !== '') {
      setMessages([...messages, inputValue]);
      setInputValue('');
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <Box
      sx={{
        width: '320px',
        height: '400px',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        p: 1,
        border: '1px solid #ccc',
        boxShadow: 2,
        backgroundColor: '#f9f9f9',
        position: 'relative',
      }}
    >
      <Paper elevation={3} sx={{ flexGrow: 1, overflowY: 'auto', mb: 1, p: 1 }}>
        <List>
          {messages.map((message, index) => (
            <ListItem key={index}>
              <ListItemText primary={message} />
            </ListItem>
          ))}
        </List>
      </Paper>
      <Box
        component="form"
        onSubmit={(e) => {
          e.preventDefault();
          handleSendMessage();
        }}
        sx={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end' }}
      >
        <TextareaAutosize
          minRows={1}
          maxRows={3}
          value={inputValue}
          onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setInputValue(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Chat here, ↩ to send"
          style={{
            resize: 'none',
            padding: '8px',
            fontSize: '16px',
            boxSizing: 'border-box',
            overflow: 'auto',
            width: '100%',
            borderRadius: '4px',
            borderColor: '#ccc',
          }}
        />
      </Box>
    </Box>
  );
};

export default ChatBox;