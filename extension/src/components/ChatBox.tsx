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
import { Message } from '../types/types';

const ChatBox: React.FC = () => {
  const [messages, setMessages] = useState<string[]>([]);
  const [inputValue, setInputValue] = useState<string>('');
  const [isResponding, setIsResponding] = useState<boolean>(false);
  const [tooltipOpen, setTooltipOpen] = useState<number | null>(null);
  const [dots, setDots] = useState<string>('.');
  const [ongoingVoiceInput, setOngoingVoiceInput] = useState<string>('');
  const endOfMessagesRef = useRef<HTMLDivElement | null>(null);

  const handleSendMessage = async (message: string) => {
    if (message.trim() !== '') {
      if (!isResponding) {
        setIsResponding(true);
        const promptMessage = message;

        setInputValue('');
        setMessages((prevMessages) => [...prevMessages, promptMessage]);

        const history: Message[] = [{"role": "user", "content": promptMessage}]
        const response = await ChatService.sendMessages(history);

        setMessages((prevMessages) => [...prevMessages, response]);
        setIsResponding(false);
        setOngoingVoiceInput(''); // Clear ongoing voice input after sending message
      }
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage(inputValue || ongoingVoiceInput);
    }
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
  }, [messages, ongoingVoiceInput]);

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
                        title="Copied!"
                        open={tooltipOpen === index}
                        onClose={() => setTooltipOpen(null)}
                      >
                        <IconButton
                          onClick={() => copyToClipboard(message, index)}
                          size="small"
                          sx={{ ml: 1 }}
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
        </List>
        <div ref={endOfMessagesRef} />
      </Paper>

      <Box sx={{ display: 'flex', alignItems: 'center' }}>
        <TextareaAutosize
          value={inputValue || ongoingVoiceInput} // Show ongoing voice input if available
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Type or click mic to speak"
          style={{
            resize: 'none',
            flexGrow: 1,
            padding: '8px',
            border: 'none',
            outline: 'none',
            borderRadius: '8px',
            backgroundColor: '#fff',
          }}
        />
        <VoiceButton setInputValue={setInputValue} setOngoingVoiceInput={setOngoingVoiceInput} />
      </Box>

      {isResponding && (
        <Box
          sx={{
            position: 'absolute',
            bottom: '60px',
            left: '50%',
            transform: 'translateX(-50%)',
          }}
        >
          <CircularProgress size={20} />
        </Box>
      )}
    </Box>
  );
};

export default ChatBox;