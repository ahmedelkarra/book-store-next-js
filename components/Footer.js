"use client"
import AppBar from '@mui/material/AppBar';
import Container from '@mui/material/Container';
import { Box, Typography } from '@mui/material';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import { GitHub } from '@mui/icons-material';



function Footer() {
    return (
        <AppBar color='info' sx={{ position: 'sticky', bottom: 0 }} >
            <Container maxWidth="lg" sx={{ display: 'flex', justifyContent: 'space-around', alignItems: 'center', margin: '10px auto' }}>
                <Typography variant='h5' sx={{ fontSize: { xs: '13px', md: '20px' } }}>&copy; ALL RIGHT SAVED BY AHMED ALY</Typography>
                <Box display={'flex'} gap={2}>
                <a href='https://www.linkedin.com/in/ahmed-el-karra-ab4629249/' color='info' target='_blank'><LinkedInIcon sx={{ fontSize: '30px', cursor: 'pointer' }} style={{color:'white'}}/></a>
                <a href='https://github.com/ahmedelkarra?tab=repositories' color='info' target='_blank'><GitHub sx={{ fontSize: '30px', cursor: 'pointer' }} style={{color:'white'}}/></a>
                </Box>
            </Container>
        </AppBar>
    );
}
export default Footer;