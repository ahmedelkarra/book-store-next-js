"use client"
import { Alert, Button, Container, TextField } from "@mui/material";
import Grid from '@mui/material/Unstable_Grid2';
import React, { useState } from "react";
import { axiosRegister } from "@/utils/axiosMain";
import { useRouter } from "next/navigation";

function Register() {
    const router = useRouter()
    const [getValues, setGetValues] = useState({ FName: '', LName: '', email: '', pass: '', confirmPass: '' })
    const [handelError, setHandelError] = useState(false)
    const [handelErrorMassege, setHandelErrorMassege] = useState('')
    const [handelSuccessMassege, setHandelSuccessMassege] = useState('')
    const handelSubmit = async (e) => {
        e.preventDefault()
        if (getValues.pass === getValues.confirmPass) {
            console.log(getValues);
            setHandelError(false)
        } else {
            return setHandelError(true), setHandelErrorMassege('Your Password Is Not Match')
        }
        if (getValues.pass.length != 0 && getValues.confirmPass.length != 0 && getValues.FName.length != 0 && getValues.LName.length != 0 && getValues.email.length != 0) {
            axiosRegister.post('/register', getValues)
                .then((e) => {
                    setHandelSuccessMassege(e.data.message)
                    setTimeout(() => {
                        router.push('/login')
                    }, 2000)
                })
                .catch((err) => {
                    console.log(err);
                    return (setHandelError(true), setHandelErrorMassege(err.response.data.message))
                })
        }
    }
    return (
        <Container sx={{ height: '80vh', background: '#0299d1', margin: '35px auto', borderRadius: '20px' }}>
            <Grid container height={'100%'} justifyContent={'center'} color={'white'}>
                <Grid xs={12} height={100} textAlign={'center'}>
                    <h2>Register Form</h2>
                </Grid>
                <form onSubmit={handelSubmit} style={{ width: '100%' }}>
                    <Grid xs={12} height={70}>
                        {handelError && <Alert severity="error">{handelErrorMassege}</Alert>}
                        {handelSuccessMassege && < Alert severity="success">{handelSuccessMassege}</Alert>}
                    </Grid>
                    <Grid container spacing={1} width={'100%'} boxShadow={2} justifyContent={'center'} padding={1}>
                        <Grid xs={6}>
                            <TextField id="outlined-basic" label="Frist Name" variant="outlined" color="error" fullWidth onChange={(e) => setGetValues({ ...getValues, FName: e.target.value.trim().toLowerCase() })} required />
                        </Grid>
                        <Grid xs={6}>
                            <TextField id="outlined-basic" label="Last Name" variant="outlined" color="error" fullWidth onChange={(e) => setGetValues({ ...getValues, LName: e.target.value.trim().toLowerCase() })} required />
                        </Grid>
                        <Grid xs={12}>
                            <TextField id="outlined-basic" label="Email" variant="outlined" color="error" type="email" fullWidth onChange={(e) => { setGetValues({ ...getValues, email: e.target.value.trim().toLowerCase() }); setHandelError(false) }} required />
                        </Grid>
                        <Grid xs={6}>
                            <TextField id="outlined-basic" label="Passoword" variant="outlined" color="error" type="password" fullWidth onChange={(e) => { setGetValues({ ...getValues, pass: e.target.value.trim() }); setHandelError(false) }} required />
                        </Grid>
                        <Grid xs={6}>
                            <TextField id="outlined-basic" label="confirm Passoword" variant="outlined" color="error" type="password" fullWidth onChange={(e) => { setGetValues({ ...getValues, confirmPass: e.target.value.trim() }); setHandelError(false) }} required />
                        </Grid>
                        <Grid xs={12}>
                            <Button color="success" variant="contained" type="submit" fullWidth>Change</Button>
                        </Grid>
                    </Grid>
                </form>
            </Grid >
        </Container >
    );
}

export default Register;