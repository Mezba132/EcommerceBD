import {gql} from "@apollo/client";

//*********** Registration *******************//

export const NewUser = gql`
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
                mobile
                gender
            }
        }
    `

//****************** Login ********************//

export const SignIn = gql `
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

// export const loginSuccess = (data) => {
// 	return {
// 		type: LOGGED_IN_USER,
// 		payload: data
// 	}
// }
//
// export const loginCheck = (values) => {
//
// 	let isLoading = true;
// 		const mutation = gql`
// 		    mutation login(
// 		        $email : String!,
// 		        $hashPassword : String!,
// 		    ) {
// 		         login ( loginUser : {
// 		            email: $email,
// 		            hashPassword : $hashPassword
// 		         }
// 		            ) {
// 		            user {
// 		                  name
// 		                  email
// 		                  mobile
// 		                  role
// 		                }
// 		                token
// 		            }
// 		    }
// 		`
//
// 		Client.mutate({
// 			variables : {
// 				email: values.email,
// 				hashPassword : values.password,
// 			},
// 			mutation : mutation
// 		})
// 				.then(res => {
// 					const data = res.data.login;
// 					authenticate(data)
// 					dispatch(loginSuccess(data))
// 					isLoading = false
// 					dispatch(hasLoading(isLoading))
// 					window.location.href = '/'
// 				})
// 				.catch(err => {
// 					isLoading = false
// 					dispatch(hasLoading(isLoading))
// 					dispatch(hasError(err))
// 					console.log(err)
// 				})
// 	}
//
// }
