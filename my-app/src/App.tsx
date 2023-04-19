// import { AssertionError } from "assert";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./Home";
import Login from "./Login";

import Food from "./components/Food";
import { Footer } from "./components/footer.css";
import Menu from "./components/Menu";
import BuyList from "./components/BuyList";
import CookingList from "./components/cookingList";

import { Box, ChakraProvider } from "@chakra-ui/react";

import theme from "./theme/theme";
import GlobalNav from "./GlobalNav";
import About from "./About";
import Register from "./Register";

import axios from "axios";
import ReactDOM from "react-dom";

axios.defaults.baseURL = "http://localhost:8888/";
axios.defaults.headers.post["Content-Type"] = "application/json";
axios.defaults.headers.post["Accept"] = "application/json";
axios.defaults.withCredentials = true;
axios.interceptors.request.use(function (config) {
    const token = localStorage.getItem("auth_token");
    config.headers.Authorization = token ? `Bearer ${token}` : "";
    return config;
});

const App = () => {
    return (
        <div className="App">
            <ChakraProvider theme={theme}>
                <Box mb={"55px"}>
                    <BrowserRouter>
                        <GlobalNav />{" "}
                        <Routes>
                            <Route path={`/register/`} element={<Register />} />
                            <Route path={`/login/`} element={<Login />} />
                            <Route path={`/food/`} element={<Food />} />

                            <Route path={`/about/`} element={<About />} />
                            <Route path={`/`} element={<Food />} />

                            <Route path={`/menu/`} element={<Menu />} />
                            <Route path={`/buyList/`} element={<BuyList />} />
                            <Route
                                path={`/cookingList/`}
                                element={<CookingList />}
                            />
                        </Routes>
                    </BrowserRouter>{" "}
                </Box>
                <Box>
                    <Footer />
                </Box>
            </ChakraProvider>
        </div>
    );
};
if (document.getElementById("nav")) {
    ReactDOM.render(<App />, document.getElementById("nav"));
}

if (document.getElementById("nav")) {
    ReactDOM.render(<App />, document.getElementById("nav"));
}

export default App;
