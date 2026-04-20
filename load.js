const { NlpManager } = require('node-nlp');
const fs = require('fs');

async function loadModel() {
    const manager = new NlpManager({ languages: ['en'] });

    const data = JSON.parse(fs.readFileSync('model.nlp'));
    manager.import(data);

    console.log('📦 Model loaded');

    return manager;
}

module.exports = loadModel;