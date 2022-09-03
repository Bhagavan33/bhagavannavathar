const mongoose=require('mongoose')

const newUserSchema=new mongoose.Schema({
    firstName : String,
    lastName:String,

   mobile:{
    type:String,
    required:true
   },

    emailId:{
        type:String,
        required:true
       },
   password:{
    type:String,
    required:true
   },
 gender :{
        type:String,
        enum:["male","female"]
    },
        
	isDeleted:{
        type:Boolean,
        default:false

    } ,
    age :Number 
},{ timestamps: true });

module.exports= mongoose.model('newUser', newUserSchema)
