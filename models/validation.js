const Joi = require('joi');
const allowedValues = ['admin', 'user', 'exclusive user'];

const registerSchema = Joi.object({
    userName: Joi.string().alphanum().min(3).max(30).required(),
    email: Joi.string().email().required(),
    role: Joi.string().valid(...allowedValues).required(),
    password: Joi.string().pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')).required(),
    mobileNumber: Joi.string().regex(/^[0-9]{10}$/).messages({
        'string.pattern.base': 'Invalid mobile number format. Please enter a 10-digit numeric mobile number.',
        'string.empty': 'Mobile number is required.',
    })
});
const loginSchema = Joi.object({
    userName: Joi.string().required(),
    password: Joi.string().required(),

});

var registerValidation = async function (input, validationname) {
    return new Promise(async (resolve, reject) => {
        var validationResult;
        if (validationname == "Register validation") {
            validationResult = await registerSchema.validate(input);
        } else if (validationname == "Login validation") {
            validationResult = await loginSchema.validate(input);
        }
        if (validationResult.error) {
            const errorMessage = validationResult.error.details[0].message;
            return resolve({ 'status': "FAILED", 'Message': errorMessage, });
        } else {
            return resolve({ 'status': "SUCCESS" })
        }
    })
}

module.exports = {
    registerValidation
}