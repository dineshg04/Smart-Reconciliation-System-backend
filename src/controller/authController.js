const User = require("../models/User");
const bcrypt = require("bcryptjs");
const generateToken = require("../utils/generatetoken")

const register = async (req,res)=>{

    const {name, email,password}= req.body;
    const existingUser = await User.findOne({ email });
    if (existingUser) {
        return res.status(400).json({ message: "User already exists" });
    }

    const hashedpassword = await bcrypt.hash(password,10);

    const user = await User.create({
        name,
        email,
        password:hashedpassword,
        role:"Viewer"
    });
    const jwttoken = generateToken(user);
    res.status(201).json({
    token: jwttoken,
    user: {
      id: user._id,
      name: user.name,
      role:user.role
    }
  });

}


const login = async (req,res)=>{

  const { email, password } = req.body;

  const user = await User.findOne({ email });
  if (!user) {
    return res.status(401).json({ message: "User not found" });
  }

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    return res.status(401).json({ message: "Invalid credentials" });
  }

  console.log(user);
   const jwttoken = generateToken(user);


  res.json({
    token: jwttoken,
    user: {
      id: user._id,
      name: user.name,
      role: user.role
    }
  });
}


module.exports= {login, register};