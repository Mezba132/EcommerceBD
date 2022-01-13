import React, {Component} from 'react';
import {
    BrowserRouter,
    Route,
    Routes
} from "react-router-dom";
import { ApolloProvider } from '@apollo/client'
import Client from "./GraphQLClient";
import  Login  from "./Pages/Auth/Login";
import Register from "./Pages/Auth/Register";
import Home from "./Pages/Home";

const App = () => {
        return (
                <ApolloProvider client={Client}>
                    <BrowserRouter>
                            <Routes>
                                <Route path="/" element={<Home/>} />
                                <Route path="/register" element={<Register/>} />
                                <Route path="/login" element={<Login/>} />
                            </Routes>
                    </BrowserRouter>
                </ApolloProvider>
        )
    }

export default App;
