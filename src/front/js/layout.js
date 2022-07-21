import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import ScrollToTop from "./component/scrollToTop";

import { Home } from "./pages/home";
import { Demo } from "./pages/demo";
import App from "./pages/App";
import {Login} from "./component/login.component"
import Register from "./component/register.component"
import { Single } from "./pages/single";
import injectContext from "./store/appContext";

import { Navbar } from "./component/navbar";
import Signup from "./component/signup";
import { Footer } from "./component/footer";
import { Bio } from "./pages/bio";
import { PersonalBio } from "./pages/PersonalBio";
import ForgetPassword from "./component/ForgetPassword";
import { Images } from "./pages/galeriaImagenes";

//create your first component
const Layout = () => {
    //the basename is used when your project is published in a subdirectory and not in the root of the domain
    // you can set the basename on the .env file located at the root of this project, E.g: BASENAME=/react-hello-webapp/
    const basename = process.env.BASENAME || "";

    return (
        <div>
            <BrowserRouter basename={basename}>
                <ScrollToTop>
                    <Navbar />
                    <Routes>
                        <Route element={<Home />} path="/" />
                        <Route element={<Demo />} path="/demo" />
                        <Route element={<App />} path="/app" />
                        <Route element={<Login />} path="/login" />
                        <Route element={<Register />} path="/register" />
                        <Route element={<Signup />} path="/signup" />
                        <Route element={<Single />} path="/single/:theid" />
                        <Route element={<h1>Not found!</h1>} />
                        <Route element={<Bio />} path="/bio" />
                        <Route element={<PersonalBio />} path="/PersonalBio" />
                        <Route element={<ForgetPassword/>} path="/forgetpassword" />
                        <Route element={<Images/>} path="/images" />
                    </Routes>
                    <Footer />
                </ScrollToTop>
            </BrowserRouter>
        </div>
    );
};

export default injectContext(Layout);
