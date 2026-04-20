const fs = require('fs');
const path = require('path');
const { NlpManager } = require('node-nlp');

async function loadModel() {
    const manager = new NlpManager({ languages: ['en'], forceNER: true });
    
    // Use __dirname to ensure it looks INSIDE the ai-model folder
    const modelPath = path.join(__dirname, 'model.nlp');

    if (fs.existsSync(modelPath)) {
        const data = fs.readFileSync(modelPath, 'utf8');
        manager.import(data);
        console.log("✅ AI Model loaded successfully from package folder");
    } else {
        console.warn("⚠️ model.nlp not found at " + modelPath + ". Training fresh...");
        await manager.train();
        manager.save(modelPath);
    }
    
    return manager;
}

module.exports = loadModel;
