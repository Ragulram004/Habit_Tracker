import User from '../models/userModel.js';
import bcrypt from 'bcrypt';

import mongoose from 'mongoose';
import generateTokenAndSetCookie from '../utils/generateTokenAndSetCookie.js';

export const loginUser = async(req, res) => {
  try{
    const {username, password} = req.body;
    const user = await User.findOne({username});
    const isPasswordValid = await bcrypt.compare(password, user?.password || "");
    if(!user || !isPasswordValid){
      return res.status(400).json({error: "Invalid Credentials"})
    }

    generateTokenAndSetCookie(user._id,res)
    res.status(200).json({
      _id: user._id,
      name: user.name,
      username: user.username,
      email: user.email,
      age: user.age,
      weigth: user.weigth,
      height: user.height,
      country: user.country
    })

  }catch(error){
    res.status(500).json({error: error.message })
    console.log("Error in loginUser", error.message);
  }
}

export const signupUser = async(req, res) =>{
  try{
    const {name, username, email, password, age, weight, height, country} = req.body;
    
    const user = await User.findOne({$or: [{username}, {email}]}); 
    if(user){
      return res.status(400).json({error: "User already exists"})
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    const newUser = await User({
      name,
      username,
      email,
      password: hashedPassword,
      age,
      weigth: weight,
      height,
      country
    });

    await newUser.save()

    if(newUser){
      generateTokenAndSetCookie(newUser._id, res);
      res.status(201).json({
        _id: newUser._id,
        name: newUser.name,
        username: newUser.username,
        email: newUser.email,
        age: newUser.age,
        weigth: newUser.weigth,
        height: newUser.height,
        country: newUser.country
      });
    }else{
      res.status(400).json({error: "Failed to create user"})
    }

  }catch(error){
    res.status(500).json({error: error.message });
    console.log("Error in signupUser", error.message);
  }
}

