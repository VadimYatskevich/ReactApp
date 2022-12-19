import express from 'express'
import mongoose from 'mongoose';
import {registerValidation} from './validations/Auth.js'
import checkAuth from './utils/checkAuth.js'
import { register, login, getMe} from './controlers/userscontrollers.js'
import cors from 'cors'


mongoose.connect(
'mongodb+srv://Vadim:Vadimka2512@cluster0.worgm2j.mongodb.net/reactBd?retryWrites=true&w=majority'
).then(()=>
console.log('DB ok')
).catch((err)=>console.log('DB error',err));

const app = express();

app.use(express.json());//Чтение json
app.use(cors());
app.post('/auth/login', login)
app.post('/auth/register', registerValidation, register)
app.get('/auth/me', checkAuth , getMe)

app.listen(4460, (err)=>{
if(err){
throw err
}

console.log('server OK')
});