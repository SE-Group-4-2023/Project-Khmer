const jwt = require('jsonwebtoken')
const User = require('../example/usersInfo')

exports.createUser = async (req, res) => {
    const { fullname, phoneNumber, password } = req.body;
    const isNewUser = await User.isThisPhoneNumInUse(phoneNumber);
    if (!isNewUser)
      return res.json({
        success: false,
        message: 'This phone number is already in use, try sign-in',
      });
    const user = await User({
      fullname,
      phoneNumber,
      password,
    });
    await user.save();
    res.json({ success: true, user });
};

exports.userSignIn = (req, res) => {
  res.send('sign in'); 
}

exports.userSignIn = async (req, res) => {
  const {phoneNumber, password} = req.body;
  const user = await User.findOne({phoneNumber});

  if(!user) return res.json({success: false, message: 'user not found'});

  const isMatch = await user.comparePassword(password);
  if(!isMatch) return res.json({success: false, message: 'Phonenumber/password does not match'});    
  
  const token = jwt.sign({userId: user._id}, process.env.JWT_SECRET, {expiresIn: "1d"});

  const userInfo = {
    fullname: user.fullname,
    phonenumber: user.phoneNumber,
    id: user._id,
  }

  res.json({sucess: true, user: userInfo, token});
}