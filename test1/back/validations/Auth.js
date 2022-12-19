import {body} from 'express-validator'

export const registerValidation = [
body('email', 'Неверный формат почты').isEmail(),
// body('password', 'Пароль должен быть минимум 5 символов').isLength({min: 5}),
body('name', 'Укажите имя').isLength({min: 3}),
body('telephone', "Укажите телефон").isLength({min:12}),
body('secName', 'Укажите имя').isLength({min: 3}),

];