import express from "express";
import dotenv from "dotenv";
import { connextDB } from "./config/db.js";
import Person from "./models/Person.js";

dotenv.config();

const app = express();

const PORT = process.env.PORT;

app.use(express.json());

await connextDB();

//Get All Person
app.get('/person', async (req, res) => {
  const personData = await Person.find();
  res.status(200).json({
    message: "Person data",
    person: personData
  });
})


//Add Person
app.post('/person', async (req, res) => {
  try {
    console.log(req.body);
    const {name, age, email, phone} = req.body;
  const newPerson = new Person({
    name,
    age,
    email,
    phone
  });
  await newPerson.save();
  res.status(201).json({
    message: "Person created", 
    person: newPerson
  });
  } catch (error) {
    console.log("Error creating person", error);
    res.status(500).json({message: "Internal server error"});
  }
})


//Edit Person
app.put('/person/:id', async (req, res) => {
  try {
    const {id} = req.params;
  // console.log("ID :", id)
  const {name, age, email, phone} = req.body || {};
  const personData = await Person.findByIdAndUpdate(id, {name, age, email, phone}, {new: true});
  if(!personData){
    return res.status(404).json({message: "Person not found"});
  }
  res.status(200).json({
    message: "Person updated",
    person: personData
  });
  } catch (error) {
    console.log("Error updating person", error);
    res.status(500).json({message: "Internal server error"});
  }
})

//Delete Person
app.delete('/person/:id', async (req, res) => {
  const {id} = req.params;
  console.log("ID :", id)
  const personData = await Person.findByIdAndDelete(id);
  if(!personData){
    return res.status(404).json({message: "Person not found"});
  }
  res.status(200).json({
    message: "Person deleted",
    person: personData
  });
})

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
})