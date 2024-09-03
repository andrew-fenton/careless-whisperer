import React, { useState } from 'react';
import './App.css';
import ChatBox from './components/ChatBox';
import NavBar from './components/NavBar';
import UploadingFile from './components/UploadingFile';

export default function App() {
  const [isChatVisible, setIsChatVisible] = useState<boolean>(true);

  const handleToggleChange = (checked: boolean) => {
    setIsChatVisible(checked);
  };

  return (
    <div className="App">
      <div className="container">
        <NavBar onToggleChange={handleToggleChange} />
        {isChatVisible ?  <UploadingFile /> : <ChatBox />}
      </div>
    </div>
  );
}