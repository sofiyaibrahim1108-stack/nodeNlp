const { NlpManager } = require('node-nlp');
const loadModel = require('./load');

let manager;

// This function initializes the model only when needed
const getManager = async () => {
    if (!manager) {
        manager = await loadModel();
    }
    return manager;
};

// Export this function so other apps can use it
async function predict(text) {
    const nlpManager = await getManager();
    const result = await nlpManager.process('en', text);
    return {
        intent: result.intent,
        score: result.score,
        answer: result.answer // If you have answers trained
    };
}

module.exports = { predict };
