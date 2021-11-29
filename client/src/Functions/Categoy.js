import axios from "axios";

export const getCategories = async () =>
            await axios.get(`${process.env.REACT_APP_API}/categories`)

export const createCategory = async (user ,category, token) =>
             await axios.post(`${process.env.REACT_APP_API}/category`, {user, category},
                  {
                      headers : {
                          Accept : 'application/json',
                          'Content-Type' : 'application/json',
                          Authorization: `Bearer ${token}`
                      }
                  })

export const getCategory = async (slug) =>
            await axios.get(`${process.env.REACT_APP_API}/category/${slug}`)

export const updateCategory = async (slug, user, category, token) =>
      await axios.put(`${process.env.REACT_APP_API}/category/${slug}`, {user, category},
            {
                headers : {
                    Accept : 'application/json',
                    'Content-Type' : 'application/json',
                    Authorization: `Bearer ${token}`
                }
            })

export const removeCategory = async (user ,slug, token) =>
      await axios.delete(`${process.env.REACT_APP_API}/category/${slug}`,
                {
                headers : {
                    Accept : 'application/json',
                    'Content-Type' : 'application/json',
                    Authorization: `Bearer ${token}`
                },
                data: {
                    user
                }
            })

export const getSubCategories = async (id) =>
        await axios.get(`${process.env.REACT_APP_API}/category/subs/${id}`)