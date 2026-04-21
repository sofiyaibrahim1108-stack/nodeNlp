const loadModel = require('./load');

async function run() {
    const manager = await loadModel();

    // ✅ DEFINE INPUT
    const input = "generate an image of a bike";

    const result = await manager.process('en', input);

    console.log('\n-----------------------------');
    console.log('INPUT:', result.utterance);
    console.log('INTENT:', result.intent);
    console.log('SCORE:', result.score);
    console.log('-----------------------------\n');

    // =========================
    // 🧭 ROUTER
    // =========================
    if (result.score < 0.4) {
        console.log("⚠️ Low confidence → fallback to text_model");
        return;
    }

    switch (result.intent) {
        case 'image_model':
            console.log("➡️ Route to: my_tiny_sd_model");
            break;

        case 'text_model':
            console.log("➡️ Route to: my_smollm_model");
            break;

        case 'code_model':
            console.log("➡️ Route to: code assistant model");
            break;

        case 'chat_model':
            console.log("➡️ Route to: general chat model");
            break;

        default:
            console.log("➡️ Route to: fallback");
    }
}

run();