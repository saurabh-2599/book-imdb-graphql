import  "./db.js"
import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";

import {typeDefintions,resolverFuncions} from "./graphql/index.js"


const graphQLServer = new ApolloServer({
    typeDefs:typeDefintions,
    resolvers:resolverFuncions
})




const {url} = await startStandaloneServer(graphQLServer,{
    listen:{
        port:5001
    }
})
console.log("Graphl server url",url)