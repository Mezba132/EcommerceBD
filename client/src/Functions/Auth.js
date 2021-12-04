import axios from "axios";
import CryptoJS from "crypto-js";

export const userSignUp = async (data) => {
      let encrypt_pass = CryptoJS.AES.encrypt(data.password, process.env.REACT_APP_CRYPTOJS_SECRETKEY).toString();
      data.password = encrypt_pass;

      return await axios.post(`${process.env.REACT_APP_API}/register`, data,
              {
                  headers : {
                      Accept : 'application/json',
                      'Content-Type' : 'application/json'
                  },
              }
        )
};

export const userSignIn = async (data) => {
      let encrypt_pass = CryptoJS.AES.encrypt(data.password, process.env.REACT_APP_CRYPTOJS_SECRETKEY).toString();
      data.password = encrypt_pass;

      return await axios.post(`${process.env.REACT_APP_API}/login`, data,
            {
                headers : {
                    Accept : 'application/json',
                    'Content-Type' : 'application/json'
                },
            }
      );
};

export const currentAdmin = async (user,token) => {
      return await axios.post(`${process.env.REACT_APP_API}/current-admin`, {user},
            {
                headers : {
                    Accept : 'application/json',
                    'Content-Type' : 'application/json',
                    Authorization: `Bearer ${token}`
                }
            }
      );
};

export const currentUser = async (user, token) => {
    return await axios.post(`${process.env.REACT_APP_API}/current-user`, {user},
            {
                headers : {
                    Accept : 'application/json',
                    'Content-Type' : 'application/json',
                    Authorization: `Bearer ${token}`
                }
            }
    );
};

export const userSignOut = async () => {
    return await axios.post(`${process.env.REACT_APP_API}/logout`, {},
            {
                headers : {
                    Accept : 'application/json',
                    'Content-Type' : 'application/json',
                }
            }
    );
};

export const authenticate = (data, cb) => {
    if(typeof window !== 'undefined') {
        localStorage.setItem('jwt', JSON.stringify(data))
        cb();
    }
}

export const isAuthenticate = () => {
    if(typeof window === 'undefined') return false;
    if(localStorage.getItem('jwt')) {
        return JSON.parse(localStorage.getItem('jwt'));
    }
    else {
        return false;
    }
}

export const resetPassword = async (email) => {
    return await axios.post(`${process.env.REACT_APP_API}/reset-password`, {email},
            {
                headers : {
                    Accept : 'application/json',
                    'Content-Type' : 'application/json',
                }
            }
    );
}

export const newPassword = async (password, token) => {
    return await axios.post(`${process.env.REACT_APP_API}/new-password`, {password, token},
            {
                headers : {
                    Accept : 'application/json',
                    'Content-Type' : 'application/json',
                }
            }
    );
}

export const getUser = async () => {
    return await axios.get(`${process.env.REACT_APP_API}/login/success`,
            {
                credentials: "include",
                headers : {
                    Accept : 'application/json',
                    'Content-Type' : 'application/json',
                }
            }
    );
}

export const createOrUpdateUser = async (authtoken) => {
    return await axios.post(`${process.env.REACT_APP_API}/create-or-update-user`, {},
            {
                headers : {
                    authtoken,
                },
            }
    )
};