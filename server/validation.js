const Joi = require("joi");

//註冊認證
const registerValidation = (data) => {
  const schema = Joi.object({
    username: Joi.string().min(3).max(50).required(),
    email: Joi.string().min(6).max(50).required().email(),
    password: Joi.string().min(6).max(255).required(),
    role: Joi.string().required().valid("donor", "proposer", "admin"),
  });
  return schema.validate(data);
};

//登入認證
const loginValidation = (data) => {
  const schema = Joi.object({
    email: Joi.string().min(6).max(50).required().email(),
    password: Joi.string().min(6).max(255).required(),
  });
  return schema.validate(data);
};

//提案發布認證+提案單位，含表單1與表單2
const caseValidation = (data) => {
  const schema = Joi.object({
    //提案內容認證
    title: Joi.string().required(),
    description: Joi.string().min(6).max(50).required(),
    target: Joi.string().required(),
    deadline: Joi.string().required(),
    image: Joi.string().required(),
    //提案單位認證
    organizeImage: Joi.string().min(2).max(999999).required(),
    organizeName: Joi.string().min(2).max(12).required(),
    personName: Joi.string().min(2).max(4).required(),
    idNumber: Joi.string().min(8).max(10).required(),
    phoneNumber: Joi.number().required(),
    email: Joi.string().min(2).max(50).required(),
    introduction: Joi.string().min(10).max(200).required(),
  });
  return schema.validate(data);
};

module.exports.registerValidation = registerValidation;
module.exports.loginValidation = loginValidation;
module.exports.caseValidation = caseValidation;
