import React, {Component} from 'react';
import {
    BrowserRouter as Router,
    Route,
    Routes
} from "react-router-dom";
import { ApolloProvider } from '@apollo/client'
import Client from "./GraphQLClient";
import { Login } from "./Pages/Auth/Login";
import { Register } from "./Pages/Auth/Register";
import {Home} from "./Pages/Home";

export class App extends Component {

    render() {
        return (
            <React.Fragment>
                <ApolloProvider client={Client}>
                    <Router>
                        <Routes>

                                <Route path="/" element={<Home/>} />
                                <Route path="/register" element={<Register/>} />
                                <Route path="/login" element={<Login/>} />
                        </Routes>
                    </Router>
                </ApolloProvider>
            </React.Fragment>
        )
    }
}
