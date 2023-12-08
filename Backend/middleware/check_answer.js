const Question = require('../example/questions');

exports.checkAnswer = async (req, res) => {
    const userAnswer = req.body.answer;
    const mcqId = req.params.mcqId;

    try {
        const mcq = await Question.findById(mcqId);

        if(!mcq) {
            return res.status(404).json({error: 'MCQ not found'});
        }

        const isCorrectAnswer = mcq.answer.toUpperCase() === userAnswer.toUpperCase();

        res.json({isCorrectAnswer});
    } catch (error) {
        console.log('Error fetching questions', error);
        res.status(500).json({error: 'Internal server error'});
    }
}