const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    minLength: 3,
    maxLength: 50,
  },
  email: {
    type: String,
    required: true,
    minLength: 6,
    maxLength: 100,
  },
  password: {
    type: String,
    required: true,
    minLength: 6,
    maxLength: 1024,
  },
  role: {
    type: String,
    enum: ["donor", "proposer"],
    require: true,
  },
  date: {
    type: Date,
    default: Date.now,
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
