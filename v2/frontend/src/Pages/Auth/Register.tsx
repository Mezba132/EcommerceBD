import React, { useState } from "react";
import Header from "../../Shared/Layout/Auth/Header";
import Footer from "../../Shared/Layout/Auth/Footer";
import RegisterForm from "../../Shared/Components/Form/Register";
import {useMutation} from "@apollo/client";
import {NewUser} from "../../Redux/Actions/auth";
import {useDispatch} from "react-redux";
import { REGISTER_USER } from "../../Redux/Constants";

const Register = () => {

    const [ isLoading, setIsLoading ] = useState(false);
    const [ register , { error } ] = useMutation(NewUser)

    const dispatch = useDispatch();

    const onFinish = (values: any) => {
        setIsLoading(true)
        if(error) {
            console.log('something wrong')
            console.log(error)
        }
        else {
            register({
                variables : {
                    name : values.name,
                    email: values.email,
                    mobile : values.phone,
                    hashPassword : values.password,
                    gender : values.gender
                }
            })
                .then(res => {
                    const data = res.data.register;
                    dispatch({
                        type : REGISTER_USER,
                        payload : data
                    })
                    setIsLoading(false)
                })
                .catch(err => {
                    console.log(err)
                    setIsLoading(false)
                })
        }
    }

    return (
        <React.Fragment>
            <Header/>
            {isLoading ? <h1>Hello</h1> :
                <div className='card bg-light m-5'>
                    <div className='card-body p-5'>
                        <h1 className="title text-center">SignUp</h1>
                        <RegisterForm handleSubmit={(values: any) => onFinish(values)}/>
                    </div>
                </div>
            }
                <Footer/>
        </React.Fragment>
    )
}

export default Register;

