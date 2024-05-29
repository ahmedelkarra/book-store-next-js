'use client'
import { Container, Grid } from "@mui/material";
import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Image from "next/image";
import { CounterContext } from "@/components/CartCounter";

function Store() {
    const { cart, setCart } = React.useContext(CounterContext);
    const [getItems, setGetItems] = React.useState([]);

    React.useEffect(() => {
        const storedItems = JSON.parse(localStorage.getItem('cartInfo')) || [];
        setGetItems(storedItems);
        setCart(storedItems.length);
    }, [setCart]);

    const handleRemove = (item, index) => {
        const updatedItems = [...getItems];
        updatedItems.splice(index, 1);
        localStorage.setItem('cartInfo', JSON.stringify(updatedItems));
        setGetItems(updatedItems);
        setCart(updatedItems.length);
    };

    return (
        <>
            {getItems.length !== 0 ? (
                <Container sx={{ width: '100%', height: '80vh', background: '#0299d1', margin: '35px auto', borderRadius: '20px', overflowY: 'scroll' }}>
                    {getItems.map((ele, index) => (
                        <Card sx={{ width: '100%', height: '250px', margin: '10px auto', padding: '10px', boxShadow: 3 }} key={ele.id}>
                            <Grid container width={'100%'} height={'100%'} spacing={2}>
                                <Grid item xs={6}>
                                    <Image src={ele.thumbnailUrl} width={250} height={230} alt={ele.title} />
                                </Grid>
                                <Grid item xs={6}>
                                    <CardContent sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', height: '100%' }}>
                                        <Typography gutterBottom variant="h5" component="h4" sx={{ fontSize: { xs: 15, md: 20 }, textAlign: 'center' }}>
                                            {ele.title}
                                        </Typography>
                                        <Typography gutterBottom variant="h5" component="h4" sx={{ fontSize: { xs: 15, md: 20 }, textAlign: 'center' }} color={'Highlight'}>
                                            {ele.price}$
                                        </Typography>
                                        <CardActions>
                                            <Button size="medium" variant="outlined" color="error" onClick={() => handleRemove(ele, index)}>Remove</Button>
                                        </CardActions>
                                    </CardContent>
                                </Grid>
                            </Grid>
                        </Card>
                    ))}
                </Container>
            ) : (
                <Container sx={{ display: 'flex', width: '100%', height: '80vh', background: '#0299d1', margin: '35px auto', borderRadius: '20px', justifyContent: 'center', alignItems: 'center' }}>
                    <Typography fontSize={20} fontWeight={600} color={'white'}>There Is No Item To Buy</Typography>
                </Container>
            )}
        </>
    );
}

export default Store;
