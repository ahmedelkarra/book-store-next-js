"use client"
import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import AdbIcon from '@mui/icons-material/Adb';
import LocalGroceryStoreIcon from '@mui/icons-material/LocalGroceryStore';
import Link from 'next/link';
import header from '../style/header.module.css'
import { Badge, TextField } from '@mui/material';
import { CounterContext } from './CartCounter';
import { IsLogin } from './IsLogin';
import { useRouter, usePathname } from 'next/navigation';
import { SearchValue } from './SearchValue';
import { GetAllData } from './GetAllData';


function Header() {
    const path = usePathname()
    const { getAllData, setGetAllData } = React.useContext(GetAllData)
    const { searchValue, setSearchValue } = React.useContext(SearchValue)
    const { checkIsLogin, setCheckIsLogin } = React.useContext(IsLogin)
    const { cart, setCart } = React.useContext(CounterContext)
    const router = useRouter()
    const [anchorElNav, setAnchorElNav] = React.useState(null);
    const [anchorElUser, setAnchorElUser] = React.useState(null);

    const handleOpenNavMenu = (event) => {
        setAnchorElNav(event.currentTarget);
    };
    const handleOpenUserMenu = (event) => {
        setAnchorElUser(event.currentTarget);
    };

    const handleCloseNavMenu = () => {
        setAnchorElNav(null);
    };

    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
    };
    return (
        <AppBar position="sticky" color='info'>
            <Container maxWidth="lg">
                <Toolbar disableGutters>
                    <AdbIcon sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }} />
                    <Link href={'/'} className={header.logo}>
                        <Typography
                            variant="h6"
                            noWrap
                            sx={{
                                mr: 2,
                                display: { xs: 'none', md: 'flex' },
                                fontFamily: 'monospace',
                                fontWeight: 700,
                                letterSpacing: '.3rem',
                                color: 'inherit',
                                textDecoration: 'none',
                            }}
                        >
                            STORE
                        </Typography>
                    </Link>

                    <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
                        <IconButton
                            size="large"
                            aria-label="account of current user"
                            aria-controls="menu-appbar"
                            aria-haspopup="true"
                            onClick={handleOpenNavMenu}
                            color="inherit"
                        >
                            <MenuIcon />
                        </IconButton>
                        <Menu
                            id="menu-appbar"
                            anchorEl={anchorElNav}
                            anchorOrigin={{
                                vertical: 'bottom',
                                horizontal: 'left',
                            }}
                            keepMounted
                            transformOrigin={{
                                vertical: 'top',
                                horizontal: 'left',
                            }}
                            open={Boolean(anchorElNav)}
                            onClose={handleCloseNavMenu}
                            sx={{
                                display: { xs: 'block', md: 'none' },
                            }}
                        >
                            <MenuItem sx={{ display: 'flex', flexDirection: 'column' }}>
                                <Link href={'/products'} className={header.logo}>
                                    <Button
                                        onClick={handleCloseNavMenu}
                                        sx={{ my: 1, color: 'black', display: 'block' }}
                                    >
                                        Products
                                    </Button>
                                </Link>
                                {!checkIsLogin && <Link href={'/register'} className={header.logo}>
                                    <Button
                                        onClick={handleCloseNavMenu}
                                        sx={{ my: 1, color: 'black', display: 'block' }}
                                    >
                                        Register
                                    </Button>
                                </Link>}
                                {!checkIsLogin && <Link href={'/login'} className={header.logo}>
                                    <Button
                                        onClick={handleCloseNavMenu}
                                        sx={{ my: 1, color: 'black', display: 'block' }}
                                    >
                                        Login
                                    </Button>
                                </Link>}
                            </MenuItem>
                        </Menu>
                    </Box>
                    <AdbIcon sx={{ display: { xs: 'flex', md: 'none' }, mr: 1 }} />
                    <Link href={'/'} className={header.logo}>
                        <Typography
                            variant="h5"
                            noWrap
                            sx={{
                                mr: 1,
                                display: { xs: 'flex', md: 'none' },
                                flexGrow: 1,
                                fontFamily: 'monospace',
                                fontWeight: 700,
                                letterSpacing: '.3rem',
                                color: 'inherit',
                                textDecoration: 'none',
                                fontSize: '10px',
                            }}
                        >
                            STORE
                        </Typography>
                    </Link>
                    <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
                        <Link href={'/products'} className={header.logo}>
                            <Button
                                onClick={handleCloseNavMenu}
                                sx={{ my: 2, color: 'white', display: 'block' }}
                            >
                                Products
                            </Button>
                        </Link>
                        {!checkIsLogin && <Link href={'/register'} className={header.logo}>
                            <Button
                                onClick={handleCloseNavMenu}
                                sx={{ my: 2, color: 'white', display: 'block' }}
                            >
                                Register
                            </Button>
                        </Link>}
                        {!checkIsLogin && <Link href={'/login'} className={header.logo}>
                            <Button
                                onClick={handleCloseNavMenu}
                                sx={{ my: 2, color: 'white', display: 'block' }}
                            >
                                Login
                            </Button>
                        </Link>}
                    </Box>
                    <Box marginRight={'20px'}>
                        <form onSubmit={(e) => e.preventDefault()}>
                            {path == '/products' && <TextField id="outlined-basic" label="Search" variant="filled" color='error' type='search' onChange={(e) => setSearchValue(e.target.value || '')} />}
                            {path != '/products' && <TextField id="outlined-basic" label="Only On Products Page" variant="filled" color='error' type='search' disabled />}
                        </form>
                    </Box>
                    {checkIsLogin && <Box sx={{ flexGrow: 0 }}>
                        <Tooltip title="Open settings">
                            <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                                <Avatar alt={getAllData.FName} src="/static/images/avatar/2.jpg" />
                            </IconButton>
                        </Tooltip>
                        <Menu
                            sx={{ mt: '45px' }}
                            id="menu-appbar"
                            anchorEl={anchorElUser}
                            anchorOrigin={{
                                vertical: 'top',
                                horizontal: 'right',
                            }}
                            keepMounted
                            transformOrigin={{
                                vertical: 'top',
                                horizontal: 'right',
                            }}
                            open={Boolean(anchorElUser)}
                            onClose={handleCloseUserMenu}
                        >
                            <Link href={'/me'} className={header.avatarSeting}>
                                <MenuItem onClick={handleCloseUserMenu}>
                                    <Typography textAlign="center">Account</Typography>
                                </MenuItem>
                            </Link>
                            <MenuItem onClick={() => { localStorage.removeItem('token'); setCheckIsLogin(false); router.push('/'); handleCloseUserMenu() }}>
                                <Typography textAlign="center">Logout</Typography>
                            </MenuItem>
                        </Menu>
                    </Box>}
                    <Link href={'store'} className={header.logo}>
                        <Box display={'flex'} justifyContent={'center'} alignItems={'center'} sx={{ marginLeft: '15px', cursor: 'pointer' }}>
                            <Badge badgeContent={cart} color="success">
                                <LocalGroceryStoreIcon fontSize='large' sx={{ fontSize: { xs: '20px', md: '30px' } }} />
                            </Badge>
                        </Box>
                    </Link>
                </Toolbar>
            </Container>
        </AppBar>
    );
}
export default Header;