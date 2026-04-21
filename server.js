const { NlpManager } = require('node-nlp');
const loadModel = require('./load');

let manager;

const getManager = async () => {
    if (!manager) {
        manager = await loadModel();
    }
    return manager;
};

async function predict(text) {
    const nlpManager = await getManager();
    const result = await nlpManager.process('en', text);
    return {
        intent: result.intent,
        score: result.score,
        answer: result.answer 
    };
}

module.exports = { predict };