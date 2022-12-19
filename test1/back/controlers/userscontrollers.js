import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt'
import {validationResult} from 'express-validator'
import UserModel from '../models/test.js'




export const register = async (req, res)=>{
try {
const errors = validationResult(req);
if(!errors.isEmpty()){
return res.status(400).json(errors.array())//неверный статус
}

const password = req.body.password;
const salt = await bcrypt.genSalt(10);//алгоритм шифрования
const hash = await bcrypt.hash(password,salt);//шифровка

const doc = new UserModel({
email: req.body.email,
fullName: req.body.fullName,
passwordHash: hash,
})

const user = await doc.save();//сохранение в бд

const token = jwt.sign({
_id: user._id,
},
'secret123',
{
expiresIn:'30d',//срок жизни токена
},);

const {passwordHash, ...userData} = user._doc;//Скрываем пароль, деструктуризацией

res.json({
...userData,
token
})
} catch (err) {
console.log(err);
res.status(500).json({
message: 'Не удалось зарегистрироваться'
})
}
}

export const login = async (req,res) =>{
try {
const user = await UserModel.findOne({email: req.body.email});

if(!user){
return res.status(404).json({
message: 'Пользователь не найден',
});
}

const isValidPass = await bcrypt.compare(req.body.password, user._doc.passwordHash);

if(!isValidPass){
return res.status(400).json({
message: 'Неверный логин или пароль',
})
}

const token = jwt.sign(
{
_id: user._id,
},
'secret123',
{
expiresIn:'30d',//срок жизни токена
},
);

const {passwordHash, ...userData} = user._doc;//Скрываем пароль, деструктуризацией

res.json({
...userData,
token
})
} catch (err) {
console.log(err);
res.status(500).json({
message: 'Не удалось авторизоваться',
})
}
}

export const getMe = async (req,res)=>{
try {
const user = await UserModel.findById(req.userId)
if(!user){
return res.status(404).json({
message: "Пользователь не найден",
});
}

const {passwordHash, ...userData} = user._doc;//Скрываем пароль, деструктуризацией

res.json(userData);
} catch (err) {
console.log(err);
res.status(500).json({
message: 'Нет доступа'})
}
} 