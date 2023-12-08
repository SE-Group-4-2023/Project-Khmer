const Question = require('../example/questions');

exports.fetchQuestion = async (req, res) => {

    try {
        const mcq = await Question.aggregate([
            {$sample: {size: 1}},   
        ]);

        if(mcq.length === 0) {
            return res.status(404).json({error: 'No MCQ found'});
        }

        res.json(mcq[0]);
    } catch (error) {
        console.log('Error fetching questions', error);
        res.status(500).json({error: 'Internal server error'});
    }
}