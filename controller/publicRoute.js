const get = (req,res)=>{
    res.status(200).json({message:'Hello world'})
}

const post = (req,res)=>{
    const data=req.body
    res.status(200).json({message:"THIS IS A POST METHOD", data:data})
}

const publicController={get, post}

export default publicController