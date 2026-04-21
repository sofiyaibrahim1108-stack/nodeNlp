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
    console.log("🧠 NLP Processing prompt:", text);
    try {
        const nlpManager = await getManager();
        const result = await nlpManager.process('en', text);
        
        console.log(`🎯 NLP Result -> Intent: ${result.intent}, Score: ${result.score}`);
        
        return {
            intent: result.intent || "None",
            score: result.score || 0,
            answer: result.answer || ""
        };
    } catch (error) {
        console.error("❌ Prediction Error:", error.message);
        return { intent: "None", score: 0 };
    }
}

module.exports = { predict };