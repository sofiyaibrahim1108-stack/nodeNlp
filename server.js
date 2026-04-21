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
    console.log("🧠 NLP Processing prompt:", text); // Node terminal log
    const nlpManager = await getManager();
    const result = await nlpManager.process('en', text);
    
    console.log(`🎯 NLP Result -> Intent: ${result.intent}, Score: ${result.score}`);
    
    return {
        intent: result.intent,
        score: result.score,
        answer: result.answer 
    };
}

// Don't change this if your package.json uses CommonJS
module.exports = { predict };