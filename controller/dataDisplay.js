import { query } from "../database/connection.js";

const dataDisplay = async (req,res)=>{
    try {
        const data= await query (`SELECT * FROM books`)
        console.log(data)
        res.status(200).json({message:"TABLE DISPLAY", data:data})
        
    } catch (error) {
        console.log(error)
    }
}


const fetchById = async (req, res) =>{
    const fetchuserid=req.params.id
    try {
        const data= await query (`SELECT * FROM books where userId=?`, fetchuserid)
        console.log(data)
        res.status(200).json({message:"TABLE DISPLAY", data:data})
        
    } catch (error) {
        console.log(error)
    }
}

const fetchingMethod ={dataDisplay, fetchById}

export default fetchingMethod;