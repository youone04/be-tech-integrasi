import jwt from "jsonwebtoken";


export const VerifyToken = () => {
    return (req, res, next) => {
        try{
        const authheader = req.headers.authorization;
        const token = authheader && authheader.split(" ")[1]
        
        if(!token) return res.sendStatus(401);
        jwt.verify(token , process.env.JWT_SECRET , (err , decoded) => {
            if(err) return res.sendStatus(403);
            // console.log(decoded.role)
            req.email = decoded.email
            next()
        })

        }catch(error){
            res.status(500).send({
                status: 500,
                message:
                  error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message,
              });
        }
    }
}