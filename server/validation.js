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

//提案發布認證+提案身份，含表單1與表單2
const caseValidation = (data) => {
  const schema = Joi.object({
    //提案內容認證
    title: Joi.string().required(),
    description: Joi.string().required(),
    category: Joi.array().items(Joi.string()).min(1),
    target: Joi.string().required(),
    deadline: Joi.string().required(),
    image: Joi.string().required(),
    details: Joi.string().required(),
    organizeId: Joi.string(),
    proposer: Joi.string(),
    //提案身份認證
    // organizeImage: Joi.string().required(),
    // organizeName: Joi.string().required(),
    // personName: Joi.string().required(),
    // idNumber: Joi.string().required(),
    // phoneNumber: Joi.number().required(),
    // email: Joi.string().required(),
    // introduction: Joi.string().required(),
  });
  return schema.validate(data);
};

module.exports.registerValidation = registerValidation;
module.exports.loginValidation = loginValidation;
module.exports.caseValidation = caseValidation;
