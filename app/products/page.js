'use client'
import { Accordion, AccordionDetails, AccordionSummary, Box, Container, Grid, LinearProgress, Pagination } from "@mui/material";
import React, { useContext, useEffect, useState } from "react";
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Image from "next/image";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { CounterContext } from "@/components/CartCounter";
import { SearchValue } from "@/components/SearchValue";

function Products() {
    const { searchValue } = useContext(SearchValue);
    const { cart, setCart } = useContext(CounterContext);
    const [finalData, setFinalData] = useState([]);
    const [paginationValue, setPaginationValue] = useState(1);
    const [postPerPage, setPostPerPage] = useState(9);
    const [cartItems, setCartItems] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const host = process.env.NEXT_PUBLIC_HOST_URL || 'http://localhost:3000'

    useEffect(() => {
        const storedCartItems = JSON.parse(localStorage.getItem('cartInfo')) || [];
        setCartItems(storedCartItems);
        setCart(storedCartItems.length);

        const fetchData = async () => {
            const response = await fetch(`${host}/api/item/`);
            const data = await response.json();
            setFinalData(data);
            setIsLoading(false);
        };

        fetchData();
    }, [setCart]);

    const handleCart = (item) => {
        const updatedCartItems = [...cartItems, item];
        setCartItems(updatedCartItems);
        localStorage.setItem('cartInfo', JSON.stringify(updatedCartItems));
        setCart(updatedCartItems.length);
    };

    const dataFilter = finalData?.filter((e) => e?.title.includes(searchValue));
    const indexOfLastPost = paginationValue * postPerPage;
    const indexOfFirstPost = indexOfLastPost - postPerPage;
    const currentPosts = dataFilter.slice(indexOfFirstPost, indexOfLastPost);
    const pageNumber = Math.ceil(dataFilter.length / postPerPage);

    return (
        <Container sx={{ margin: '20px auto' }}>
            {isLoading && <Box sx={{ width: '100%', margin: '50px auto' }}>
                <LinearProgress />
            </Box>}
            <Grid container justifyContent={'center'} alignItems={'center'} spacing={5}>
                {currentPosts.map((ele) => (
                    <Grid item xs={10} md={4} key={ele._id}>
                        <Card sx={{ maxWidth: 250, height: '100%' }}>
                            <Image src={ele.thumbnailUrl} alt={ele.title} width={250} height={200} />
                            <CardContent>
                                <Typography gutterBottom variant="h5" component="div" fontSize={17} textOverflow={'ellipsis'}>
                                    {ele.title}
                                </Typography>
                                <Typography gutterBottom variant="h5" component="div" fontSize={15}>
                                    {ele.price}$
                                </Typography>
                                <Typography variant="body2" color="text.secondary">
                                    <Accordion>
                                        <AccordionSummary
                                            expandIcon={<ExpandMoreIcon />}
                                            aria-controls="panel1-content"
                                            id="panel1-header"
                                        >
                                            Description
                                        </AccordionSummary>
                                        <AccordionDetails>
                                            {ele.shortDescription || ele.longDescription}
                                        </AccordionDetails>
                                    </Accordion>
                                </Typography>
                            </CardContent>
                            <CardActions>
                                <Button sx={{ margin: 'auto' }} variant="contained" size="small" onClick={() => handleCart(ele)}>Add To Store</Button>
                            </CardActions>
                        </Card>
                    </Grid>
                ))}
            </Grid>
            <Grid item container justifyContent={'center'} alignItems={'center'} xs={11} md={12} margin={'30px auto'}>
                <Pagination count={pageNumber} defaultPage={1} variant="outlined" color="primary" onChange={(e, page) => setPaginationValue(page)} />
            </Grid>
        </Container>
    );
}

export default Products;
