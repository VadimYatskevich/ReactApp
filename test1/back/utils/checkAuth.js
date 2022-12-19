import jwt from 'jsonwebtoken'

export default (req, res , next)=>{//next-сл ф-ция в параметрах
const token = (req.headers.authorization || '').replace(/Bearer\s?/,'');//удаление слова Bearer и замена его на пустую строчку
if(token){
try {
const decoded = jwt.verify(token, 'secret123')//токен и ключ расшифровки
req.userId = decoded._id;//вытаскиваем id
next();
} catch (error) {
return res.status(403).json({
message: "Нет доступа",
})
}
}else{
return res.status(403).json({
message: "Нет доступа",
})
}

}
