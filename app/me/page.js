"use client"
import { axiosLogin } from "@/utils/axiosMain";
import { Alert, Button, Container, TextField } from "@mui/material";
import Grid from '@mui/material/Unstable_Grid2';
import { useEffect, useState } from "react";

function MePage() {
    const [getInfo, setGetInfo] = useState({ FName: '', LName: '', email: '', pass: '', newPass: '', confirmNewPass: '' })
    const [isChanging, setIsChanging] = useState(false)
    const [handelErrorMassege, setHandelErrorMassege] = useState('')
    const [handelSuccsessMassege, setHandelSuccsessMassege] = useState('')

    const handelSubmit = (e) => {
        e.preventDefault()
        const allData = e.data
        if (getInfo.FName.length != 0 && getInfo.LName.length != 0 && getInfo.email.length != 0 && getInfo.pass.length != 0 && getInfo?.newPass == getInfo?.confirmNewPass) {
            axiosLogin.patch('/account', getInfo, { headers: { Authorization: localStorage?.getItem('token') || '' } })
                .then((e) => { localStorage.setItem('token', e.data.token), setIsChanging(true), setHandelSuccsessMassege('Your Data Has Been Changed'), setTimeout(() => { setHandelSuccsessMassege('') }, 2000) })
                .catch(() => { setHandelErrorMassege('Please Check Your Data'), setTimeout(() => { setHandelErrorMassege('') }, 3000) })
        }
    }

    useEffect(() => {
        axiosLogin.get('/account', { headers: { Authorization: localStorage?.getItem('token') || '' } })
            .then((e) => {
                const allData = e.data
                setGetInfo({ ...getInfo, FName: allData.FName, LName: allData.LName, email: allData.email })
                setIsChanging(false)
            })
            .catch((err) => { console.log(err) })
    }, isChanging)
    return (
        <Container sx={{ display: 'flex', width: '100%', height: '80vh', background: '#0299d1', margin: '35px auto', borderRadius: '20px', justifyContent: 'center', alignItems: 'center' }}>
            <form onSubmit={(e) => handelSubmit(e)} style={{ width: '100%' }}>
                <Grid margin={'15px auto'}>
                    {handelErrorMassege && <Alert severity="error">{handelErrorMassege}</Alert>}
                    {handelSuccsessMassege && < Alert severity="success">{handelSuccsessMassege}</Alert>}
                </Grid>
                <Grid container spacing={1} width={'100%'} boxShadow={2} justifyContent={'center'} padding={1}>
                    <Grid xs={6}>
                        <TextField id="outlined-basic" label="Frist Name" variant="outlined" color="error" fullWidth autoComplete="off" value={getInfo.FName} onChange={(e) => setGetInfo({ ...getInfo, FName: e.target.value.toLowerCase().trim() })} required />
                    </Grid>
                    <Grid xs={6}>
                        <TextField id="outlined-basic" label="Last Name" variant="outlined" color="error" fullWidth autoComplete="off" value={getInfo.LName} onChange={(e) => setGetInfo({ ...getInfo, LName: e.target.value.toLowerCase().trim() })} required />
                    </Grid>
                    <Grid xs={6}>
                        <TextField id="outlined-basic" label="Email" variant="outlined" color="error" type="email" fullWidth autoComplete="off" value={getInfo.email} onChange={(e) => setGetInfo({ ...getInfo, email: e.target.value.toLowerCase().trim() })} required />
                    </Grid>
                    <Grid xs={6}>
                        <TextField id="outlined-basic" label="Passoword" variant="outlined" color="error" type="password" fullWidth autoComplete="off" onChange={(e) => setGetInfo({ ...getInfo, pass: e.target.value })} required />
                    </Grid>
                    <Grid xs={6}>
                        <TextField id="outlined-basic" label="New Passowrd" variant="outlined" color="error" type="password" fullWidth autoComplete="off" onChange={(e) => setGetInfo({ ...getInfo, newPass: e.target.value })} />
                    </Grid>
                    <Grid xs={6}>
                        <TextField id="outlined-basic" label="Confirm New Passoword" variant="outlined" color="error" type="password" fullWidth autoComplete="off" onChange={(e) => setGetInfo({ ...getInfo, confirmNewPass: e.target.value })} />
                    </Grid>
                    <Grid xs={12}>
                        <Button color="success" variant="contained" type="submit" fullWidth>Change</Button>
                    </Grid>
                </Grid>
            </form>
        </Container>
    );
}

export default MePage;