const express=require('express');
const app=express();
const cors=require('cors');
const mongoose=require('mongoose');
const dotenv=require('dotenv');
const Train=require('./models/trainDetails');
dotenv.config({ path: './config.env' });

const DB=process.env.DATABASE.replace('<PASSWORD>',process.env.DATABASE_PASSWORD);

mongoose.connect(DB,{
    useNewUrlParser:true,
}).then(()=>{
    console.log('DB connection successful');
}
);

app.use(cors('*'));

app.get('/train/',async(req,res)=>{
    const trains= await Train.find();
    res.status(200).json({
        status:'success',
        data:{
            trains
        }
    });
}
);




app.listen(8001,()=>{
    console.log('Server is running');
});

