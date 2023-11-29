import jwt, { decode } from "jsonwebtoken"
import 'dotenv/config'


const isAuthenticated = (req,res,next)=>{
    try {
        
        const token=req.headers.authorization.split(" ")[1]
        // console.log(headerToken);
        const decoded = jwt.verify(token, "SCECRETKEYIPUTMYSELF");
        console.log("this is",decoded.id)
        // const loggedIn=true
        //IMPORTANT//option chain // guard clause, everything error or negative
        if (!decoded?.id) return  res.status(200).json({message:"authorize"}) 
        req.user=decoded.id
        next()
        
    } catch (error) {
        res.status(401).json({message:"Unauthorize"}) 
        
    }
}

export default isAuthenticated;