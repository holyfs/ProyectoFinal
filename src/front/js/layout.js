import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import ScrollToTop from "./component/scrollToTop";
import CardPrueba from "./pages/carPrueba";
import {IndexPrueba} from "./pages/indexPrueba";

import { Home } from "./pages/home";
import { MainIndex } from "./pages/mainIndex";
import { Demo } from "./pages/demo";
import App from "./pages/App";
import {Login} from "./component/login.component"
import LoginMensajes from "./component/login.mensajes";
import { Single } from "./pages/single";
import injectContext from "./store/appContext";

import { Navbar } from "./component/navbar";
import { Navbar2 } from "./component/navbar2";
import Signup from "./component/signup";
import { Footer } from "./component/footer";
import { Bio } from "./pages/bio";
import { BioFinal } from "./pages/bio.final";
import { PersonalBio } from "./pages/PersonalBio";
import {Redirect} from "./pages/redirectSignup"
import {ForgetPassword}  from "./component/ForgetPassword";
import { Images } from "./pages/galeriaImagenes";
import {SignUpTest} from "./component/registerComponent.test";
import { ContactNoModal } from "./component/contact.nomodal";
import { ChangePasswordNoModal } from "./component/ChangePassword.nomodal";

//create your first component
const Layout = () => {
    //the basename is used when your project is published in a subdirectory and not in the root of the domain
    // you can set the basename on the .env file located at the root of this project, E.g: BASENAME=/react-hello-webapp/
    const basename = process.env.BASENAME || "";
    

    return (
        <div>
            <BrowserRouter basename={basename}>
                <ScrollToTop>
                    <Navbar2 />
                    <Routes>
                        <Route element={<MainIndex />} path="/" />
                        <Route element={<IndexPrueba />} path="/indexprueba" />
                        <Route element={<Demo />} path="/demo" />
                        <Route element={<App />} path="/app" />
                        <Route element={<Login />} path="/login" />
                        <Route element={<LoginMensajes />} path="/loginmensaje" />
                        <Route element={<Signup />} path="/signup" />
                        <Route element={<SignUpTest />} path="/signup2" />
                        <Route element={<Single />} path="/single/:theid" />
                        <Route element={<h1>Not found!</h1>} />
                        <Route element={<Bio />} path="/bio:uid" />
                        <Route element={<BioFinal />} path="/biofinal:uid" />
                        <Route element={<PersonalBio />} path="/PersonalBio:id" />
                        <Route element={<Redirect />} path="/rederictsignup" />
                        <Route element={<ForgetPassword/>} path="/forgetpassword" />
                        <Route element={<Images/>} path="/images" />
                        <Route element={<ContactNoModal/>} path="/ContactNoModal:id" />
                        <Route element={<ChangePasswordNoModal/>} path="/ChangePasswordNoModal:id" />
                    </Routes>
                    <Footer />
                </ScrollToTop>
            </BrowserRouter>
        </div>
    );
};

export default injectContext(Layout);
