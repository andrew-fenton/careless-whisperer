import React, { useState, useEffect, useRef } from 'react';
import {
  Box,
  List,
  ListItem,
  Paper,
  TextareaAutosize,
  IconButton,
  Tooltip,
  CircularProgress,
} from '@mui/material';
import ChatService from '../services/ChatService';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import VoiceButton from './VoiceButton';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

const ChatBox: React.FC = () => {
  const [messages, setMessages] = useState<string[]>([]);
  const [inputValue, setInputValue] = useState<string>('');
  const [isResponding, setIsResponding] = useState<boolean>(false);
  const [tooltipOpen, setTooltipOpen] = useState<number | null>(null);
  const [dots, setDots] = useState<string>('.');
  const endOfMessagesRef = useRef<HTMLDivElement | null>(null);

  const handleSendMessage = async () => {
    if (inputValue.trim() !== '') {
      if (!isResponding) {
        setIsResponding(true);
        const promptMessage = inputValue;
        setInputValue('');
        setMessages((prevMessages) => [...prevMessages, promptMessage]);
        const response = await handleSendQuery(promptMessage);
        setMessages((prevMessages) => [...prevMessages, response]);
        setIsResponding(false);
      }
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const handleSendQuery = async (prompt: string) => {
    const response = await ChatService.sendPrompt(prompt);
    console.log(response);
    return response;
  };

  const copyToClipboard = (text: string, index: number) => {
    navigator.clipboard.writeText(text).then(
      () => {
        setTooltipOpen(index);
        setTimeout(() => setTooltipOpen(null), 1000);
      },
      (err) => {
        console.error('Could not copy text: ', err);
      }
    );
  };

  useEffect(() => {
    endOfMessagesRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isResponding) {
      interval = setInterval(() => {
        setDots((prevDots) => (prevDots.length < 3 ? prevDots + '.' : '.'));
      }, 500);
    }
    return () => {
      clearInterval(interval);
    };
  }, [isResponding]);

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
          {messages.map((message, index) => {
            const isPrompt = index % 2 === 0;
            return (
              <ListItem
                key={index}
                sx={{
                  justifyContent: isPrompt ? 'flex-end' : 'flex-start',
                  alignItems: 'flex-start',
                }}
              >
                <Box
                  sx={{
                    p: 1,
                    borderRadius: isPrompt ? '16px 16px 0 16px' : '16px 16px 16px 0',
                    maxWidth: '100%',
                    bgcolor: isPrompt ? '#3a9ffc' : '#f0f0f0',
                    color: isPrompt ? 'white' : 'black',
                    wordWrap: 'break-word',
                    display: 'flex',
                    flexDirection: 'column',
                  }}
                >
                  <ReactMarkdown 
                    remarkPlugins={[remarkGfm]}
                    components={{
                      strong: ({node, ...props}) => <span style={{fontWeight: 'bold'}} {...props} />,
                      em: ({node, ...props}) => <span style={{fontStyle: 'italic'}} {...props} />,
                      ul: ({node, ...props}) => <ul style={{paddingLeft: '20px', margin: '5px 0'}} {...props} />,
                      ol: ({node, ...props}) => <ol style={{paddingLeft: '20px', margin: '5px 0'}} {...props} />,
                      li: ({node, ...props}) => <li style={{marginBottom: '5px'}} {...props} />,
                    }}
                  >
                    {message}
                  </ReactMarkdown>
                  {!isPrompt && (
                    <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                      <Tooltip
                        title="Copied to clipboard!"
                        open={tooltipOpen === index}
                        onClose={() => setTooltipOpen(null)}
                        disableFocusListener
                        disableHoverListener
                        disableTouchListener
                      >
                        <IconButton
                          onClick={() => copyToClipboard(message, index)}
                          sx={{
                            color: '#757575',
                            '&:hover': {
                              color: 'black',
                            },
                            fontSize: '0.75rem',
                            padding: '0px',
                            marginTop: '0',
                          }}
                          size="small"
                        >
                          <ContentCopyIcon fontSize="small" />
                        </IconButton>
                      </Tooltip>
                    </Box>
                  )}
                </Box>
              </ListItem>
            );
          })}
          {isResponding && (
            <ListItem sx={{ justifyContent: 'center', alignItems: 'center', flexDirection: 'column' }}>
              <CircularProgress size={24} />
              <Box sx={{ mt: 1, fontSize: '14px', color: '#757575' }}>cooking{dots}</Box>
            </ListItem>
          )}
          <div ref={endOfMessagesRef} />
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
          placeholder="Type here, enter to send"
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
      <VoiceButton />
    </Box>
  );
};

export default ChatBox;