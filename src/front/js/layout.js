import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import ScrollToTop from "./component/scrollToTop";

import { MainIndex } from "./pages/mainIndex";
import App from "./pages/App";
import Login from "./component/login";
import injectContext from "./store/appContext";

import { Navbar } from "./component/navbar";
import { Footer } from "./component/footer";
import { Bio } from "./pages/bio";
import { PersonalBio } from "./pages/PersonalBio";
import {Redirect} from "./pages/redirectSignup"
import  {SignUp} from "./component/signup";

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
                        <Route element={<MainIndex />} path="/" />
                        <Route element={<App />} path="/app" />
                        <Route element={<Login />} path="/login" />
                        <Route element={<SignUp />} path="/signup" />
                        <Route element={<h1>Not found!</h1>} />
                        <Route element={<Bio />} path="/bio:uid" />
                        <Route element={<PersonalBio />} path="/PersonalBio:id" />
                        <Route element={<Redirect />} path="/rederictsignup" />
                    </Routes>
                    <Footer />
                </ScrollToTop>
            </BrowserRouter>
        </div>
    );
};

export default injectContext(Layout);
