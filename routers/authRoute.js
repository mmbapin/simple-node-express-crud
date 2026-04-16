import express from "express";

const router = express.Router();

const users = [];

router.post('/register', (req, res) => {
  const {userName, email, password} = req.body;
  users.push({userName, email, password});
  res.status(201).json({message: "User registered", user: users});
})

router.post('/login', (req, res) => {
  const {email, password} = req.body;
  const user = users.find(user => user.email === email && user.password === password);
  if(!user || password !== user.password){
    return res.status(401).json({message: "Invalid credentials"});
  }
  req.session.user = user;
  res.status(200).json({message: "User logged in", user});
})

router.post('/logout', (req, res) => {
  res.send("Logout");
})

export default router;