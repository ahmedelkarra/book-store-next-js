'use client'
import * as React from 'react';
import { AppRouterCacheProvider } from '@mui/material-nextjs/v14-appRouter';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import theme from '@/theme';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { CounterContext } from '@/components/CartCounter';
import { IsLogin } from '@/components/IsLogin';
import axios from 'axios';
import { SearchValue } from '@/components/SearchValue';
import { GetAllData } from '@/components/GetAllData';

export default function RootLayout(props) {
  const [searchValue, setSearchValue] = React.useState('');
  const [cart, setCart] = React.useState(0);
  const [checkIsLogin, setCheckIsLogin] = React.useState(false);
  const [getAllData, setGetAllData] = React.useState({});
  const host = process.env.NEXT_PUBLIC_HOST_URL || 'http://localhost:3000'
  React.useEffect(() => {
    let getToken = localStorage.getItem('token') || '';
    let getCartLength = JSON?.parse(localStorage.getItem('cartInfo'))?.length || 0;
    setCart(getCartLength);

    const checkStatus = () => {
      axios.get(`${host}/api/account`, { headers: { Authorization: getToken } })
        .then((e) => {
          setCheckIsLogin(true);
          setGetAllData(e.data);
        })
        .catch((err) => {
          console.log(err.response.data.message);
          localStorage.removeItem('token');
          setCheckIsLogin(false);
        });
    };

    checkStatus();
  }, []);

  return (
    <html lang="en">
      <body>
        <AppRouterCacheProvider options={{ enableCssLayer: true }}>
          <GetAllData.Provider value={{ getAllData, setGetAllData }}>
            <IsLogin.Provider value={{ checkIsLogin, setCheckIsLogin }}>
              <SearchValue.Provider value={{ searchValue, setSearchValue }}>
                <CounterContext.Provider value={{ cart, setCart }}>
                  <ThemeProvider theme={theme}>
                    <CssBaseline />
                    <Header />
                    {props.children}
                  </ThemeProvider>
                </CounterContext.Provider>
              </SearchValue.Provider>
            </IsLogin.Provider>
          </GetAllData.Provider>
        </AppRouterCacheProvider>
        <Footer />
      </body>
    </html>
  );
}
