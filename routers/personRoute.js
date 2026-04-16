import express from "express";
import Person from "../models/Person.js";

const router = express.Router();

//Get All Person
router.get('/', async (req, res) => {
  const personData = await Person.find();
  res.status(200).json({
    message: "Person data",
    person: personData
  });
})


//Add Person
router.post('/', async (req, res) => {
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
router.put('/:id', async (req, res) => {
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
router.delete('/:id', async (req, res) => {
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

export default router;