"use client"
import { IsLogin } from "@/components/IsLogin";
import { axiosLogin } from "@/utils/axiosMain";
import { Alert, Button, Container, TextField } from "@mui/material";
import Grid from '@mui/material/Unstable_Grid2';
import { useRouter } from "next/navigation";
import { useContext, useState } from "react";

function Login() {
    const router = useRouter()
    const { checkIsLogin, setCheckIsLogin } = useContext(IsLogin)
    const [getValues, setGetValues] = useState({ email: '', pass: '' })
    const [handelError, setHandelError] = useState('')
    const [handelSuccess, setHandelSuccess] = useState('')
    const handelSubmit = (e) => {
        e.preventDefault()
        if (getValues.email.length != 0 && getValues.pass.length != 0) {
            axiosLogin.post('/login', getValues)
                .then((e) => { return localStorage.setItem('token', e.data.token), setHandelSuccess('Welcome'), setCheckIsLogin(true), setTimeout(() => { router.push('/') }, 1200) })
                .catch((err) => { return setHandelError(err.response.data.message) })
        } else {
            return setHandelError(true)
        }
    }
    return (
        <Container sx={{ height: '80vh', background: '#0299d1', margin: '35px auto', borderRadius: '20px' }}>
            <Grid container height={'100%'} justifyContent={'center'} color={'white'} >
                <Grid>
                    <h2>Login Form</h2>
                </Grid>
                <form onSubmit={handelSubmit} style={{ width: '100%' }}>
                    <Grid xs={12} height={70}>
                        {handelError && <Alert severity="error">{handelError}</Alert>}
                        {handelSuccess && <Alert severity="success">{handelSuccess}</Alert>}
                    </Grid>
                    <Grid container spacing={1} width={'100%'} boxShadow={2} justifyContent={'center'} padding={1}>
                        <Grid xs={12}>
                            <TextField type="email" id="outlined-basic" label="Email" variant="outlined" color="error" fullWidth onChange={(e) => { setGetValues({ ...getValues, email: e.target.value.trim().toLowerCase() }), setHandelError() }} required />
                        </Grid>
                        <Grid xs={12}>
                            <TextField type="password" id="outlined-basic" label="Password" variant="outlined" color="error" fullWidth onChange={(e) => { setGetValues({ ...getValues, pass: e.target.value.trim() }), setHandelError() }} required />
                        </Grid>
                        <Grid xs={12}>
                            <Button color="success" variant="contained" type="submit" fullWidth>Submit</Button>
                        </Grid>
                    </Grid>
                </form>
            </Grid>
        </Container>
    );
}

export default Login;