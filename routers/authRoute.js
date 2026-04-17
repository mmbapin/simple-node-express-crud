import express from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const router = express.Router();

const users = [];

router.post('/register',async (req, res) => {
  const {username, email, password} = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);
  users.push({
    username, 
    email, 
    password: hashedPassword
  });
  res.status(201).json({message: "User registered", user: users});
  console.log("User List:", users)
})

router.post('/login',async (req, res) => {
  console.log("User List:", users)
  const {email, password} = req.body;
  const user = users.find(user => user.email === email);
  console.log("User :", user)
  if(!user || !(await bcrypt.compare(password, user.password))){
    return res.status(401).json({message: "Invalid credentials"});
  }
  const token = jwt.sign({username: user.username}, 'test#secret', {expiresIn: '1h'});
  res.status(200).json({message: "User logged in", user, token});
})

router.post('/logout', (req, res) => {
  res.send("Logout");
})

export default router;