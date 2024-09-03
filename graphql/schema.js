const typeDefs = `#graphql
type Book{
    _id:String!,
    title:String!,
    shortDescription:String,
    thumbnailUrl:String,
    publishedDate:String,
    pageCount:Int!,
    authors:[String!]
},
type User{
    _id:String!
    fullName:String!,
    email:String!
}
type Message{
    message:String!
}

type LoginSuccess{
    user:User,
    token:String!
}

type Query{
    books:[Book]
    book(_id:String!):Book
}

type Mutation{
    registerUser(user:signUpInput):Message,
    loginUser(user:loginInput):Message,
    verifyOTP(user:verifyOTPInput):LoginSuccess,
    addNewReview:Message,
    deleteExistingReview:Message,
}

input signUpInput{
    email:String!,
    fullName:String!
}

input loginInput{
    email:String!
}

input verifyOTPInput{
    email:String!
    otp:String!
}





`

export default typeDefs