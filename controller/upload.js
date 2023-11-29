import cloudinary from "../model/cloudinary.js";
import { query } from "../database/connection.js";
import { user } from "../model/user.model.js";

const upload = async (req,res)=>{
    try {
        const userBody=req.body


            // const uploadTry= await cloudinary.uploader.upload(req.file.path,{
            // resource_type:"auto",
            // })
            // const url=uploadTry.url
            
            const resDb = await query ("INSERT INTO books (userID, bookName, publisher, year, price, url) VALUES (?,?,?,?,?,?)",[userBody.userID, userBody.bookname,userBody.publisher, userBody.year, userBody.price, userBody.imageUrl])

            // console.log(uploadTry.asset_id)
        res.status(200).json({message:'Hello world'})
        

        
    } catch (error) {
        console.log(error)
    }
}

export default upload;