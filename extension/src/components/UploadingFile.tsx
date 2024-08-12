import React, { useState, useRef, useEffect } from 'react';
import { Box, Button, Typography, Paper } from '@mui/material';

const UploadingFile: React.FC = () => {
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const filesContainerRef = useRef<HTMLDivElement | null>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      setSelectedFiles(Array.from(event.target.files));
    }
  };

  const handleUploadClick = () => {
    if (selectedFiles.length > 0) {
      // Handle file upload logic here
      console.log('Uploading:', selectedFiles.map((file) => file.name));
    } else {
      console.log('No files selected');
    }
  };

  useEffect(() => {
    if (filesContainerRef.current) {
      filesContainerRef.current.scrollTop = filesContainerRef.current.scrollHeight;
    }
  }, [selectedFiles]);

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100%',
        p: 2,
      }}
    >
      <Typography variant="body1" align="center" sx={{ mb: 1 }}>
        <strong>Your writer needs your writing</strong>
      </Typography>
      <Typography variant="body2" align="center" sx={{ mb: 2 }}>
        Upload past professional documents here!
      </Typography>

      <Button
        variant="contained"
        component="label"
        sx={{ mb: 2, backgroundColor: '#8B4513', '&:hover': { backgroundColor: '#6A3A1E' } }}
      >
        Browse Files
        <input
          type="file"
          multiple
          onChange={handleFileChange}
          style={{ display: 'none' }}
        />
      </Button>

      {selectedFiles.length > 0 && (
        <Paper
          sx={{
            width: '100%',
            maxWidth: '96%',
            p: 2,
            mt: 2,
            maxHeight: '220px',
            overflowY: 'auto',
          }}
          ref={filesContainerRef}
        >
          {selectedFiles.map((file, index) => (
            <Typography key={index} variant="body2">
              {file.name}
            </Typography>
          ))}
          <Button
            variant="contained"
            color="primary"
            onClick={handleUploadClick}
            sx={{ mt: 2, backgroundColor: '#8B4513', '&:hover': { backgroundColor: '#6A3A1E' } }}
          >
            Upload Files
          </Button>
        </Paper>
      )}
    </Box>
  );
};

export default UploadingFile;