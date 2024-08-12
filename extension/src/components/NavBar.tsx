import React from 'react';
import { Box, IconButton, Switch } from '@mui/material';
import InfoIcon from '@mui/icons-material/Info';
import MessageIcon from '@mui/icons-material/Message';
import InsertDriveFileIcon from '@mui/icons-material/InsertDriveFile';

interface NavBarProps {
  onToggleChange: (checked: boolean) => void;
}

const NavBar: React.FC<NavBarProps> = ({ onToggleChange }) => {
  const [isToggled, setIsToggled] = React.useState<boolean>(true);

  const handleToggleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const checked = event.target.checked;
    setIsToggled(checked);
    onToggleChange(checked);
  };

  const handleInfoClick = () => {
    // Handle the information icon click event here
    console.log('Information icon clicked');
  };

  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        p: 1,
        backgroundColor: '#f5f5f5',
        borderBottom: '1px solid #ddd',
        boxShadow: 1,
        position: 'relative',
      }}
    >
      <Box sx={{ flex: '1', display: 'flex', alignItems: 'center' }}>
        <IconButton onClick={handleInfoClick} sx={{ p: 0 }}>
          <img
            src="/careless-whisperer-icon.png"
            alt="Logo"
            style={{ height: '20px', width: 'auto' }}
          />
        </IconButton>
      </Box>

      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          flexGrow: 1,
          justifyContent: 'center',
        }}
      >
        <IconButton
          onClick={() => handleToggleChange({ target: { checked: true } } as any)}
          sx={{ p: 0, color: isToggled ? 'grey' : '#3a9ffc' }}
        >
          <MessageIcon />
        </IconButton>
        <Switch
          checked={isToggled}
          onChange={handleToggleChange}
          color="default"
          sx={{
            '& .MuiSwitch-thumb': {
              backgroundColor: isToggled ? '#8B4513' : '#3a9ffc',
            },
            '& .MuiSwitch-track': {
              backgroundColor: isToggled ? '#8B4513' : '#3a9ffc',
            }
          }}
        />
        <IconButton
          onClick={() => handleToggleChange({ target: { checked: false } } as any)}
          sx={{ p: 0, color: isToggled ? '#8B4513' : 'grey' }}
        >
          <InsertDriveFileIcon />
        </IconButton>
      </Box>

      <Box sx={{ flex: '1', display: 'flex', justifyContent: 'flex-end' }}>
        <IconButton onClick={handleInfoClick} sx={{ p: 0 }}>
          <InfoIcon />
        </IconButton>
      </Box>
    </Box>
  );
};

export default NavBar;