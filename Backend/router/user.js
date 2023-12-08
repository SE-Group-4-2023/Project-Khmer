const express = require('express');


const router = express.Router();
const {createUser, userSignIn} = require('../controllers/userCon');
const {fetchQuestion} = require('../controllers/questionCon');
const {checkAnswer} = require('../middleware/check_answer');
const {validateUserSignUp, userValidation, validateUserSignIn} = require('../middleware/validation/validate_user');
const {isAuth} = require('../middleware/auth.js');

router.post('/create-user',validateUserSignUp, userValidation, createUser);
router.post('/sign_in',validateUserSignIn, userValidation, userSignIn);
router.get('/question', fetchQuestion);
router.post('/check-answer/:mcqId', checkAnswer);
router.post('/create_post',isAuth , (req, res) => {
    res.send('welcome you are in secret route');
})

module.exports = router;