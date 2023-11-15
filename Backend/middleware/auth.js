const jwt = require('jsonwebtoken');
const User = require('../example/usersInfo');

exports.isAuth = async (req, res, next) => {
    if(req.headers && req.headers.authorization){
        const token = req.headers.authorization.split(' ')[1];

        try {
            const decode = jwt.verify(token, process.env.JWT_SECRET);

            const user = await User.findById(decode.userId);
        
            if(!user){
                return res.json({sucess: false, message: 'unauthorize access'});
            }

            req.user = user;
            next()
        } catch (error) {
            if(error.name == 'JsonWebTokenError'){
                return res.json({sucess: false, message: 'unauthorize access'});
            }
            if(error.name == 'TokenExpiredError'){
                return res.json({sucess: false, message: 'session expired'});
            }
            res.json({sucess: false, message: 'internal server error'});
        }
    }else{
        res.json({sucess: false, message: 'unauthorize access'});
    }
}