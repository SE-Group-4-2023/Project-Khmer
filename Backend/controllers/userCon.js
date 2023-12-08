const jwt = require('jsonwebtoken')
const User = require('../example/usersInfo')

exports.createUser = async (req, res) => {
    const { fullname, email, password } = req.body;
    const isNewUser = await User.isThisEmailInUse(email);
    if (!isNewUser)
      return res.json({
        success: false,
        message: 'This email is already in use, try sign-in',
      });
    const user = await User({
      fullname,
      email,
      password,
    });
    await user.save();
    res.json({ success: true, user });
};

exports.userSignIn = (req, res) => {
  res.send('sign in'); 
}

exports.userSignIn = async (req, res) => {
  const {email, password} = req.body;
  const user = await User.findOne({email});

  if(!user) return res.json({success: false, message: 'user not found'});

  const isMatch = await user.comparePassword(password);
  if(!isMatch) return res.json({success: false, message: 'email/password does not match'});    
  
  const token = jwt.sign({userId: user._id}, process.env.JWT_SECRET, {expiresIn: "1d"});

  const userInfo = {
    fullname: user.fullname,
    email: user.email,
    id: user._id,
  }

  res.json({sucess: true, user: userInfo, token});
}