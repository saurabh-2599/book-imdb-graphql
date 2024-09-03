import jwt from "jsonwebtoken"
const accessTokenSecret = `05956ea946560933b53ceb7e104aa9da8a4c8fd06b493c08616aa2e59e71ea702f67ba2e96fde8d3c21bf2614547a25afbc5629c6f19c6022a22e59d3b649185`
export const generateAuthToken = async(userPayload) => {
    return jwt.sign({
        email:userPayload.email
    },accessTokenSecret,{
        expiresIn:"15m"
    })
}

export const verifyAuthToken = async(token) => {
    return jwt.verify(token,accessTokenSecret)
}