import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import { createTheme, ThemeProvider, CssBaseline } from '@mui/material';
import '@fontsource/roboto'; // Roboto 폰트를 불러옵니다.

const theme = createTheme({
  typography: {
    fontFamily: 'Roboto, Arial, sans-serif',
  },
});

function CustomTabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
      style={{ height: '100%' }}
    >
      {value === index && (
        <Box sx={{ height: '100%' }}>
          <div className="tab-panel-content">{children}</div>
        </Box>
      )}
    </div>
  );
}

CustomTabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

function NavBar({ isLogin, isAdmin, setIsLogin, setIsAdmin }) {
  const navigate = useNavigate();
  const [value, setValue] = useState(0);

  const handleLogout = () => {
    localStorage.removeItem('userId');
    localStorage.removeItem('token');
    setIsLogin(false);
    setIsAdmin(false);
    navigate('/');
  };

  const handleChange = (event, newValue) => {
    setValue(newValue);
    switch (newValue) {
      case 0:
        navigate('/');
        break;
      case 1:
        navigate('/about');
        break;
      case 2:
        navigate('/eats');
        break;
      case 3:
        navigate('/dibs/:id');
        break;
      case 4:
        navigate('/users');
        break;
      case 5:
        navigate('/foodtags');
        break;
      case 6:
        if (isAdmin) {
          navigate('/admin');
        }
        break;
      default:
        break;
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box sx={{ width: '100%', mb: 3, position: 'fixed', top: 0, zIndex: 1100, bgcolor: 'background.paper' }}>
        <Box sx={{ borderBottom: 1, borderColor: 'divider', display: 'flex', alignItems: 'center' }}>
          <Tabs value={value} onChange={handleChange} aria-label="nav tabs example" sx={{ flexGrow: 1 }}>
            <Tab label="Home" {...a11yProps(0)} />
            <Tab label="About" {...a11yProps(1)} />
            <Tab label="Eats" {...a11yProps(2)} />
            <Tab label="Dibs" {...a11yProps(3)} />
            <Tab label="User" {...a11yProps(4)} />
            <Tab label="Food Tags" {...a11yProps(5)} />
            {isAdmin && <Tab label="Admin" {...a11yProps(6)} />}
          </Tabs>
          <Box sx={{ display: 'flex', alignItems: 'center', ml: 2 }}>
            {isLogin && !isAdmin && (
              <>
                {value === 2 && (
                  <Button variant="contained" onClick={() => navigate('/users/eats')} sx={{ ml: 1 }}>My Eats Manage</Button>
                )}
                {value === 3 && (
                  <Button variant="contained" onClick={() => navigate('/users/dibs')} sx={{ ml: 1 }}>My Dibs Manage</Button>
                )}
              </>
            )}
            {isLogin && (
              <Button variant="contained" onClick={handleLogout} sx={{ ml: 1 }}>Logout</Button>
            )}
            {!isLogin && (
              <>
                <Button variant="outlined" href="/login" sx={{ ml: 1 }}>Login</Button>
                <Button variant="outlined" href="/signup" sx={{ ml: 1 }}>Signup</Button>
              </>
            )}
          </Box>
        </Box>
        <Box sx={{ height: '100%', display: 'flex', flexDirection: 'column', flexGrow: 1, mt: 0, ml: 3 }}>
          <CustomTabPanel value={value} index={0}>
            
          </CustomTabPanel>
          <CustomTabPanel value={value} index={1}>
            
          </CustomTabPanel>
          <CustomTabPanel value={value} index={2}>
            
          </CustomTabPanel>
          <CustomTabPanel value={value} index={3}>
            
          </CustomTabPanel>
          <CustomTabPanel value={value} index={4}>
            
          </CustomTabPanel>
          <CustomTabPanel value={value} index={5}>
            
          </CustomTabPanel>
          {isAdmin && (
            <CustomTabPanel value={value} index={6}>
              
            </CustomTabPanel>
          )}
        </Box>
      </Box>
    </ThemeProvider>
  );
}

NavBar.propTypes = {
  isLogin: PropTypes.bool.isRequired,
  isAdmin: PropTypes.bool.isRequired,
  setIsLogin: PropTypes.func.isRequired,
  setIsAdmin: PropTypes.func.isRequired,
};

export default NavBar;