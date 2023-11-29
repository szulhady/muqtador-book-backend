import { query } from "../database/connection.js";
import bcrypt from "bcryptjs"
import jwt, { decode } from "jsonwebtoken"
import 'dotenv/config'




const userRegister = async (req,res)=>{
    try {
        const userBody=req.body
        console.log(userBody);


        const getDb=await query('SELECT * FROM users WHERE email = ?', [req.body.email])
        console.log(getDb)

        if(getDb.length > 0){
            res.status(409).json({ message: "User already exists", data: userBody });
        }else{

            console.time("hash")
            const salt = bcrypt.genSaltSync(10);
            const hashValue = bcrypt.hashSync(userBody.password,salt);
            // console.log(hashValue)
            console.timeEnd("hash")


            const resDb = await query ("INSERT INTO users (name, email, password) VALUES (?,?,?)",[userBody.name, userBody.email,hashValue])
            res.status(200).json({message:"NEW USER CREATED", data:userBody})
        }

        
    } catch (error) {
        console.log(error)
    }
}


const userLogin = async (req,res)=>{
    try {
        const userBody=req.body
        console.log(userBody)
  
        const getDb=await query('SELECT * FROM users WHERE email = ?', [userBody.email])
         console.log("getDb",getDb)
  
        if(getDb.length == 0 ){
          res.status(404).json({ message: "NO USER"});
        }
          const userData=getDb[0]
  
        
          console.log(userBody.password,userData.password)
          console.time("login")
          const isMatch=await bcrypt.compare(userBody.password, userData.password)
          console.timeEnd("login")
          console.log(isMatch)
         
          

          const token= jwt.sign({ id: userData.userID.toString() }, "SCECRETKEYIPUTMYSELF");
          const newID=userData.userID.toString()
        
        if (isMatch){
            res.status(200).json({message:"LOG IN SUCCESFUL", data:newID, token:token})
        }else{
            res.status(401).json({message:"NO USER", data:null})
        }

          
        
      } catch (error) {
         console.log(error)
      }
}


const publicController= async(req, res) =>{
    res.status(200).json({message:"publicController"})
}


const protectedController = async (req,res) =>{
    res.status(200).json({message:"protectedController",data :{user:req.user}})
}

const authController={userRegister, userLogin, publicController, protectedController}

export default authController;