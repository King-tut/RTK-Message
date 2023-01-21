import HomeIcon from "@mui/icons-material/Home"
import PersonIcon from "@mui/icons-material/Person"
import SettingsIcon from "@mui/icons-material/Settings"
import MessageIcon from "@mui/icons-material/Message"

import { ChevronLeft,ChevronRightOutlined } from "@mui/icons-material";
       

import {
    Box,
    Drawer,
    Divider,
    IconButton,
    List,
    ListItem,
    ListItemButton,
    ListItemIcon,
    ListItemText,
    Typography,
    useTheme
    } from "@mui/material";

import { useEffect, useState } from 'react';
import { useLocation,useNavigate } from 'react-router-dom';
import FlexBetween from './FlexBetween';
import userEvent from '@testing-library/user-event';
import profileImage from "../assets/fake-user1.jpg";
import { useSelector } from "react-redux";

const navItems = [
    {
        text: "Dashboard",
        icon: <HomeIcon />
    },
    {
        text: "Personal Information",
        icon: <PersonIcon />
    },
    {
        text: "Messages",
        icon: <MessageIcon />
    },
    {
        text: "Settings",
        icon: <SettingsIcon />
    },
]



const Sidebar = ({
    
    drawerWidth,
    isSidebarOpen,
    setIsSidebarOpen,
    isNonMobile,
  }) => {
    const { pathname } = useLocation();
    const [active, setActive] = useState("");
    const navigate = useNavigate();
    const theme = useTheme();
    const user = useSelector((state) => state.persistedReducer.user )
  
    useEffect(() => {
      setActive(pathname.substring(1));
    }, [pathname]);
  
    return (
      
      <Box component="nav">
        {isSidebarOpen && (
          <Drawer
            open={isSidebarOpen}
            onClose={() => setIsSidebarOpen(false)}
            variant="persistent"
            anchor="left"
            sx={{
              width: drawerWidth,
              "& .MuiDrawer-paper": {
                color: theme.palette.secondary[200],
                backgroundColor: theme.palette.background.alt,
                boxSixing: "border-box",
                borderWidth: isNonMobile ? 0 : "2px",
                width: drawerWidth,
              },
            }}
          >
            
            <Box width="100%">
              <Box m="1.5rem 2rem 2rem 3rem">
                <FlexBetween color={theme.palette.primary.main}>
                  <Box display="flex" alignItems="center" gap="0.5rem">
                  <Box
                    position="absolute"
                  component="img"
                  alt="profile"
                  src={profileImage}
                  height="50px"
                  width="50px"
                  borderRadius="50%"
                  sx={{ objectFit: "cover" }}
                />
                   
                   
                   
                    <Typography variant="h5" fontWeight="bold">
                      ECOMVISION
                    </Typography>
                    <Typography>{user.firstName}</Typography>
                    </Box>
                  
                    

                  {!isNonMobile && (
                    <IconButton onClick={() => setIsSidebarOpen(!isSidebarOpen)}>
                      <ChevronLeft />
                    </IconButton>
                  )}
                </FlexBetween>
              </Box>
              
              <List>
                {navItems.map(({ text, icon }) => {
                  if (!icon) {
                    return (
                      <Typography key={text} sx={{ m: "2.25rem 0 1rem 3rem" }}>
                        {text}
                      </Typography>
                    );
                  }
                  const lcText = text.toLowerCase();
  
                  return (
                    <ListItem key={text} disablePadding>
                      <ListItemButton
                        onClick={() => {
                          navigate(`/${lcText}`);
                          setActive(lcText);
                        }}
                        sx={{
                          backgroundColor:
                            active === lcText
                              ? theme.palette.secondary[300]
                              : "transparent",
                          color:
                            active === lcText
                              ? theme.palette.primary[600]
                              : theme.palette.secondary[100],
                        }}
                      >
                        <ListItemIcon
                          sx={{
                            ml: "2rem",
                            color:
                              active === lcText
                                ? theme.palette.primary[600]
                                : theme.palette.secondary[200],
                          }}
                        >
                          {icon}
                        </ListItemIcon>
                        <ListItemText primary={text} />
                        {active === lcText && (
                          <ChevronRightOutlined sx={{ ml: "auto" }} />
                        )}
                      </ListItemButton>
                    </ListItem>
                  );
                })}
              </List>
            </Box>
            
          </Drawer>
        )}
      </Box>
      
    );
}

export default Sidebar