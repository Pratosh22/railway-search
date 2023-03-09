const mongoose=require('mongoose');
const trainDetailsSchema=new mongoose.Schema({
    name:{
        type:String,
        required:[true,'A train must have a name'],
        unique:true
    },
    stop:{
        type:Array,
    },
    distance:{
        type:Array,
    },
    time:{
        type:Array,
    },

},
{
    collection:'trains'
}
);

const Train=mongoose.model('Train',trainDetailsSchema);
module.exports=Train;
