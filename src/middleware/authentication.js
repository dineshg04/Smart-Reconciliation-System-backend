const jwt = require('jsonwebtoken')

const JWT_SECRET= process.env.JWT_SECRET;


const authentication = (req,res,next)=>{

    try{
         const authHeader = req.headers['authorization'];
         if(!authHeader){
            return res.status(401).json({message:"Not authorized"});
        }

        const token = authHeader.split(' ')[1];
        console.log(req.headers);
        
       const decoded = jwt.verify(token,JWT_SECRET)
            req.user = decoded;
           console.log(req.user);
            next();
    }catch(error){
        res.status(401).json({message:"Invalid token"})
    }

};

module.exports = authentication;
