const { NlpManager } = require('node-nlp');
const fs = require('fs');

async function trainModel() {
    const manager = new NlpManager({ languages: ['en','ta'] });

    // =========================
    // 🎨 IMAGE MODEL
    // =========================
    const imagePhrases = [
        'generate an image of %object%',
        'create image of %object%',
        'make an image of %object%',
        'draw %object%',
        'sketch %object%',
        'render %object% image',
        'can you generate a picture of %object%',
        'I want an image of %object%',
        'show me a photo of %object%',
        'build an illustration of %object%',
        'vanakam',
        'visualize %object%'
    ];

    imagePhrases.forEach(p => manager.addDocument('en', p, 'image_model'));

    // =========================
    // 💬 TEXT MODEL
    // =========================
    const textPhrases = [
        'tell me a joke',
        'make me laugh',
        'share a funny joke',
        'tell a story',
        'give me a short story',
        'tell me something interesting',
        'give me a quote',
        'share an inspirational quote',
        'what is %object%',
        'explain %object%',
        'define %object%',
        'describe %object%',
        'oru kadhai sollu'
    ];

    textPhrases.forEach(p => manager.addDocument('en', p, 'text_model'));

    // =========================
    // ⚙️ CODE MODEL
    // =========================
    const codePhrases = [
        'write code for %object%',
        'generate code for %object%',
        'build %object% program',
        'fix error in this code',
        'debug my code',
        'solve this coding issue',
        'optimize this code',
        'help me with programming %object%'
    ];

    codePhrases.forEach(p => manager.addDocument('en', p, 'code_model'));

    // =========================
    // 🧠 CHAT MODEL
    // =========================
    const chatPhrases = [
        'hi',
        'hello',
        'hey',
        'good morning',
        'good evening',
        'how are you',
        'what is your name',
        'who are you',
        'help me',
        'can you help me',
        'thanks',
        'thank you',
        'bye',
        'see you'
    ];
    chatPhrases.forEach(p => manager.addDocument('en', p, 'chat_model'));

    console.log('🚀 Training...');
    await manager.train();

    // ✅ SAVE MODEL (IMPORTANT)
    const model = manager.export();
    fs.writeFileSync('model.nlp', JSON.stringify(model));

    console.log('✅ Model trained & saved as model.nlp');
}

trainModel();