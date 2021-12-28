import {
    ApolloClient,
    InMemoryCache,
    HttpLink,
    from
} from '@apollo/client'
import { onError } from "@apollo/client/link/error";

const errorLink = onError(({ graphQLErrors }) => {
    if(graphQLErrors) {
        graphQLErrors.map(({message }) => {
            alert(`Graphql Error ${message}`)
        })
    }
})

const link = from([
    errorLink,
    new HttpLink({ uri : "http://localhost:5000/graphql" })
])

const Client = new ApolloClient({
    cache : new InMemoryCache(),
    link : link
})

export default Client;