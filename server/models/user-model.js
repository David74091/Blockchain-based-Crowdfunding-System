const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const { required } = require("joi");

const userSchema = new mongoose.Schema({
  picture: {
    type: String,
    required: false,
    default: null,
  },
  email: {
    type: String,
    required: true,
    minLength: 6,
    maxLength: 100,
  },
  username: {
    type: String,
    required: true,
    minLength: 3,
    maxLength: 50,
  },
  phoneNumber: {
    type: String,
    require: false,
    default: null,
  },
  password: {
    type: String,
    required: true,
    minLength: 6,
    maxLength: 1024,
  },
  role: {
    type: String,
    enum: ["donor", "proposer", "admin"],
    require: true,
  },
  birth: {
    type: String,
    require: false,
    default: null,
  },
  sex: {
    type: String,
    require: false,
    default: null,
  },
  address: {
    type: String,
    require: false,
  },
  date: {
    type: Date,
    default: Date.now,
    default: null,
  },
  organize: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Organize",
    require: false,
    default: null,
  },
});

//確認身份是否為學生
userSchema.method.isDonor = function () {
  return this.role == "donor";
};

userSchema.method.isProposer = function () {
  return this.role == "proposer";
};

userSchema.method.isAdmin = function () {
  return this.role == "admin";
};

//mongoose schema middleare
userSchema.pre("save", async function (next) {
  //save前要做的事
  if (this.isModified("password") || this.isNew) {
    const hash = await bcrypt.hash(this.password, 10); //加密密碼
    this.password = hash;
    next();
  } else {
    return next();
  }
});

//檢查用戶輸入的密碼是否與資料庫裡加密的密碼相符
userSchema.methods.comparePasswords = function (password, callback) {
  bcrypt.compare(password, this.password, (err, isMatch) => {
    if (err) {
      return callback(err, isMatch);
    }
    callback(null, isMatch);
  });
};

module.exports = mongoose.model("User", userSchema);
