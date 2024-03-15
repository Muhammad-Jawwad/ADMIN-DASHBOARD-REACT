import * as React from 'react';
import { styled, useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import CssBaseline from '@mui/material/CssBaseline';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';

import DashboardIcon from '@mui/icons-material/Dashboard';
import HowToRegIcon from '@mui/icons-material/HowToReg';
import LogoutIcon from '@mui/icons-material/Logout';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import { useNavigate } from 'react-router-dom';

const drawerWidth = 240;

const Main = styled('main', { shouldForwardProp: (prop) => prop !== 'open' })(
    ({ theme, open }) => ({
        flexGrow: 1,
        padding: theme.spacing(0),
        transition: theme.transitions.create('margin', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
        marginLeft: `-${drawerWidth}px`,
        ...(open && {
            transition: theme.transitions.create('margin', {
                easing: theme.transitions.easing.easeOut,
                duration: theme.transitions.duration.enteringScreen,
            }),
            marginLeft: 0,
        }),
    }),
);

const AppBar = styled(MuiAppBar, {
    shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
    transition: theme.transitions.create(['margin', 'width'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    }),
    backgroundColor: '#7451f8', // Change the color to your desired color
    ...(open && {
        width: `calc(100% - ${drawerWidth}px)`,
        padding: '0px', // Set the padding to 0px when open is true
        marginLeft: `${drawerWidth}px`,
        transition: theme.transitions.create(['margin', 'width'], {
            easing: theme.transitions.easing.easeOut,
            duration: theme.transitions.duration.enteringScreen,
        }),
    }),
}));

const DrawerHeader = styled('div')(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
    justifyContent: 'flex-end',
}));

export default function ResponsiveDrawer() {
    const theme = useTheme();
    const [open, setOpen] = React.useState(false);
    const [selectedItem, setSelectedItem] = React.useState('Dashboard'); // Default selected item
    const navigate = useNavigate();

    const handleDrawerOpen = () => {
        setOpen(true);
    };

    const handleDrawerClose = () => {
        setOpen(false);
    };

    const handleListItemClick = (text) => {
        if (text === 'Dashboard') {
            navigate(`/dashboard?q=ALL`);
        } else if (text === 'New Registration') {
            navigate(`/registration/new?q=ALL`);
        } else if (text === 'Registered Students') {
            navigate(`/registration?q=ALL`);
        } else if (text === 'Logout') {
            localStorage.clear()
            navigate(`/`);
        }
        setSelectedItem(text);
    };

    return (
        <Box sx={{ display: 'flex' }}>
            <CssBaseline />
            <AppBar position="fixed" open={open}>
                <Toolbar>
                    <IconButton
                        color="inherit"
                        aria-label="open drawer"
                        onClick={handleDrawerOpen}
                        edge="start"
                        sx={{ mr: 2, ...(open && { display: 'none' }) }}
                    >
                        <MenuIcon />
                    </IconButton>
                    <Typography variant="h6" noWrap component="div">
                        Registration Dashboard
                    </Typography>
                </Toolbar>
            </AppBar>
            <Drawer
                sx={{
                    width: drawerWidth,
                    flexShrink: 0,
                    '& .MuiDrawer-paper': {
                        width: drawerWidth,
                        boxSizing: 'border-box',
                    },
                }}
                variant="persistent"
                anchor="left"
                open={open}
            >
                <DrawerHeader style={{ display: 'flex', alignItems: 'center', padding: '0 5px' }}>
                    <div style={{ flex: '0 0 auto', marginRight: 'auto', marginLeft: '16px' }}>
                        <img src='logo.jpg' alt="Logo" style={{ maxHeight: 100, maxWidth: '90%', objectFit: 'contain' }} />
                    </div>
                    <Typography variant="h6" noWrap style={{ flexGrow: 1, textAlign: 'left' }}>
                        Edu-Link
                    </Typography>
                    <IconButton onClick={handleDrawerClose} style={{ color: '#7451f8', marginRight: '12px' }}>
                        {theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
                    </IconButton>
                </DrawerHeader>


                <Divider />
                <List>
                    {['Dashboard'].map((text) => (
                        <ListItem
                            key={text}
                            disablePadding
                            onClick={() => handleListItemClick(text)}
                        >
                            <ListItemButton selected={selectedItem === text}>
                                <ListItemIcon style={{ color: '#7451f8' }}>
                                    <DashboardIcon />
                                </ListItemIcon>
                                <ListItemText primary={text} />
                            </ListItemButton>
                        </ListItem>
                    ))}
                </List>
                <Divider />
                <List>
                    {['Registered Students'].map((text) => (
                        <ListItem
                            key={text}
                            disablePadding
                            onClick={() => handleListItemClick(text)}
                        >
                            <ListItemButton selected={selectedItem === text}>
                                <ListItemIcon style={{ color: '#7451f8' }}>
                                    <HowToRegIcon />
                                </ListItemIcon>
                                <ListItemText primary={text} />
                            </ListItemButton>
                        </ListItem>
                    ))}
                </List>
                <List>
                    {['New Registration'].map((text) => (
                        <ListItem
                            key={text}
                            disablePadding
                            onClick={() => handleListItemClick(text)}
                        >
                            <ListItemButton selected={selectedItem === text}>
                                <ListItemIcon style={{ color: '#7451f8' }}>
                                    <PersonAddIcon />
                                </ListItemIcon>
                                <ListItemText primary={text} />
                            </ListItemButton>
                        </ListItem>
                    ))}
                </List>
                <Divider />
                <List>
                    {['Logout'].map((text) => (
                        <ListItem
                            key={text}
                            disablePadding
                            onClick={() => handleListItemClick(text)}
                        >
                            <ListItemButton selected={selectedItem === text}>
                                <ListItemIcon style={{ color: '#7451f8' }}>
                                    <LogoutIcon />
                                </ListItemIcon>
                                <ListItemText primary={text} />
                            </ListItemButton>
                        </ListItem>
                    ))}
                </List>
                <Divider />
            </Drawer>
            <Main open={open}>
                <DrawerHeader />
            </Main>
        </Box>
    );
}
