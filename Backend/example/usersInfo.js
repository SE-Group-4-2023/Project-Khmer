const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
    fullname: {
      type: String,
      required: true,
    },
    phoneNumber: {
      type: String,
      required: true,
      minLength: [9, "no should have minimum 19 digits"],
      maxLength: [10, "no should have maximum 10 digits"],
      match: [/\d{9}/, "no should only have digits"],
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
});

userSchema.pre('save', function(next) {
  if(this.isModified('password')){
    bcrypt.hash(this.password, 8, (err, hash) => {
      if(err) return next(err);

      this.password = hash;
      next();
    })
  }
})

userSchema.methods.comparePassword = async function(password) {
  if(!password) throw new Error('Missing password');

  try{
    const result = await bcrypt.compare(password, this.password);
    return result;
  }catch (error){
    console.log('Error while comparing password', error.message); 
  }
}

userSchema.statics.isThisPhoneNumInUse = async function(phoneNumber) {
    if(!phoneNumber) throw new Error('invalid phone number');

    try{
      const user = await this.findOne({phoneNumber})
    if(user) return false
    return true;
    } catch(error) {
      console.log('error inside isThisPhoneNumInUse method', error.message)
      return false
    }
}

module.exports = mongoose.model('User', userSchema, 'UsersInfo');