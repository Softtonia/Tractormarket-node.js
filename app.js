require('dotenv').config();
require('./db/config');


const express = require('express');
const app = express();
const cors = require('cors');
const userRouter = require('./routers/userRouter');


app.use(express.json());
app.use(cors());
app.use(userRouter);

app.use(express.static('./public/'))

app.get('/' , (req,res)=>{
    res.send('server tested ok')
});


app.listen(process.env.PORT , ()=>{
    console.log(`server running at ${process.env.PORT}`)
})