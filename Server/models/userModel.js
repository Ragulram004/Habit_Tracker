import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  name:{
    type: String,
    required: true
  },
  username:{
    type: String,
    required: true,
    unique: true
  },
  email:{
    type: String,
    required: true,
    unique: true
  },
  password:{
    type: String,
    minLenght: 6,
    required: true
  },
  age:{
    type: Number,
    required: true,
  },
  weigth:{
    type: Number,
    required: false,
  },
  height:{
    type: Number,
    required: false,
  },
  country:{
    type: String,
    required: true,
  }
  
},{timestamps: true});

export default mongoose.model('User', userSchema);