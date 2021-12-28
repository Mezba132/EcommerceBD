import React, {Component} from "react";
import Header from "../../Shared/Layout/Auth/Header";
import Footer from "../../Shared/Layout/Auth/Footer";
import RegisterForm from "../../Shared/Components/Form/Register";
import { gql } from "@apollo/client"
import Client from "../../GraphQLClient";

export class Register extends Component {

    constructor(props : any) {
        super(props);
    }

    onFinish = async (values : any) => {

        const mutation = gql`
            mutation register(
                $name : String!, 
                $email : String!, 
                $mobile : String!,
                $hashPassword : String!,
                $gender : String!
            ) {
                 register (registerUser : { 
                    name : $name, 
                    email: $email, 
                    mobile: $mobile
                    hashPassword : $hashPassword
                    gender : $gender
                  }) {
                    name
                    email
                }
            }
        `

        let res = await Client.mutate({
            variables : {
                name : values.name,
                email: values.email,
                mobile : values.phone,
                hashPassword : values.password,
                gender : values.gender
            },
            mutation : mutation
        })

    };

    render() {
        return (
            <React.Fragment>
                <Header/>
                    <div className='card bg-light m-5'>
                        <div className='card-body p-5'>
                            <h1 className="title text-center">SignUp</h1>
                            <RegisterForm handleSubmit={ (values : any) => this.onFinish(values) } />
                        </div>
                    </div>
                <Footer/>
            </React.Fragment>
        )
    }
}