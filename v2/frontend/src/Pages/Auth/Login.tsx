import React, {Component} from "react";
import Header from "../../Shared/Layout/Auth/Header";
import Footer from "../../Shared/Layout/Auth/Footer";
import LoginForm from "../../Shared/Components/Form/Login";
import {gql} from "@apollo/client";
import Client from "../../GraphQLClient";
import { authenticate } from "../../Actions/Auth";

export class Login extends Component {

    constructor(props : any) {
        super(props);
    }

    onFinish = (values: any) => {
        const mutation = gql`
            mutation login( 
                $email : String!, 
                $hashPassword : String!,
            ) {
                 login ( loginUser : { 
                    email: $email, 
                    hashPassword : $hashPassword
                 }
                    ) {
                    user {
                          name
                          email
                          mobile
                          role
                        }
                        token
                    }
            }
        `

        Client.mutate({
            variables : {
                email: values.email,
                hashPassword : values.password,
            },
            mutation : mutation
        })
            .then(res => {
                const data = res.data.login;
                authenticate(data)
                window.location.href = '/'
            })
            .catch(err => console.log(err))
    };

    render() {
        return (
            <React.Fragment>
                <Header/>
                <div className='card bg-light m-5'>
                    <div className='card-body mx-auto'>
                        <h1 className="card-title text-center">SignIn</h1>
                        <p>
                            <button
                                className="btn btn-block btn-danger"
                                // onClick={googleLogin}
                            >
                                <i className="fa fa-google"></i> Google
                            </button>
                            <button
                                className="btn btn-block btn-primary"
                                // onClick={facebookLogin}
                            >
                                <i className="fa fa-facebook-f"></i> Facebook
                            </button>
                            <button
                                className="btn btn-block btn-dark"
                                // onClick={githubLogin}
                            >
                                <i className="fa fa-github"></i> Github
                            </button>
                        </p>
                        <LoginForm handleSubmit={ (values : any) => this.onFinish(values) } />
                    </div>
                </div>
                <Footer/>
            </React.Fragment>
        )
    }
}