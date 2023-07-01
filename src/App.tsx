// import { AssertionError } from "assert";
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Login from './Login';

import Food from './components/Food';
import { Footer } from './components/footer.css';
import Menu from './components/Menu';
import BuyList from './components/BuyList';
import CookingList from './components/cookingList';

import { Box, ChakraProvider } from '@chakra-ui/react';

import theme from './theme/theme';
import GlobalNav from './Nav';
import About from './About';
import Register from './Register';

import axios from 'axios';
import ReactDOM from 'react-dom';
import { ReactNode } from 'react';

// axios.defaults.baseURL = 'http://localhost:8888/';
// axios.defaults.baseURL = 'http://54.150.18.194/';
// axios.defaults.baseURL =
//   'http://ec2-54-150-18-194.ap-northeast-1.compute.amazonaws.com/';
axios.defaults.baseURL = 'https://snowpanda2.sakura.ne.jp/';
axios.defaults.headers.post['Content-Type'] = 'application/json';
axios.defaults.headers.post['Accept'] = 'application/json';
axios.defaults.withCredentials = true;
axios.interceptors.request.use(function (config) {
  const token = localStorage.getItem('auth_token');
  config.headers.Authorization = token ? `Bearer ${token}` : '';
  return config;
});

const App = () => {
  let AuthButtons: ReactNode;

  if (localStorage.getItem('auth_token')) {
    AuthButtons = (
      <>
        <Route path={`/food/`} element={<Food />} />

        <Route path={`/about/`} element={<About />} />

        <Route path={`/menu/`} element={<Menu />} />
        <Route path={`/buyList/`} element={<BuyList />} />
        <Route path={`/cookingList/`} element={<CookingList />} />
      </>
    );
  }

  return (
    <div className="App">
      <ChakraProvider theme={theme}>
        <Box mb={'55px'}>
          <BrowserRouter>
            <GlobalNav />{' '}
            <Routes>
              <Route path={`/register/`} element={<Register />} />
              <Route path={`/login/`} element={<Login />} />
              <Route path={`/`} element={<Login />} />

              {AuthButtons}
            </Routes>
            <Footer />
          </BrowserRouter>{' '}
        </Box>
      </ChakraProvider>
    </div>
  );
};
if (document.getElementById('nav')) {
  ReactDOM.render(<App />, document.getElementById('nav'));
}

export default App;
