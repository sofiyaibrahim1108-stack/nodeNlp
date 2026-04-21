const fs = require('fs');
const path = require('path');
const { NlpManager } = require('node-nlp');

async function loadModel() {
    const manager = new NlpManager({ languages: ['en'], forceNER: true });
    const modelPath = path.join(__dirname, 'model.nlp');

    if (fs.existsSync(modelPath)) {
        try {
            const data = fs.readFileSync(modelPath, 'utf8');
           
            const modelData = JSON.parse(data);
            await manager.import(modelData); 
            console.log("✅ AI Model loaded successfully");
        } catch (err) {
            console.error("❌ Error parsing model.nlp, retraining...");
            await trainFresh(manager, modelPath);
        }
    } else {
        console.warn("⚠️ model.nlp not found. Training fresh...");
        await trainFresh(manager, modelPath);
    }
    
    return manager;
}


async function trainFresh(manager, modelPath) {
    
    manager.addDocument('en', 'generate an image of %text%', 'image_model');
    manager.addDocument('en', 'draw a %text%', 'image_model');
   
    
    await manager.train();
    manager.save(modelPath);
    console.log("✅ Fresh model trained and saved.");
}

<<<<<<< HEAD
module.exports = loadModel;
=======
module.exports = loadModel;
>>>>>>> f8e86ec9ba8588b567a5ed8e2c4729f8cf780940
