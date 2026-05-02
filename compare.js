const { NlpManager } = require('node-nlp');
const fs = require('fs');
const { performance } = require('perf_hooks'); // Timing measure panna

async function check() {
    const manager = new NlpManager({ languages: ['en'] });
    
    try {
        console.log("🚀 Starting Performance & Accuracy Benchmark...");

        // 1. Model Loading Time (Performance Part 1)
        const loadStart = performance.now();
        const modelData = fs.readFileSync('./model.nlp', 'utf8');
        manager.import(JSON.parse(modelData)); 
        const vectorModule = await import('./router/transformer.mjs');
        const loadEnd = performance.now();
        
        const prompt = "Illustrate a puppy"; // Inga unga prompt-ai maathikkalam
        
        console.log(`✅ Models Loaded in: ${(loadEnd - loadStart).toFixed(2)}ms`);

        // ---------------------------------------------------------
        // 2. VECTOR EMBEDDING ANALYSIS (Timing & Logic)
        // ---------------------------------------------------------
        const vStart = performance.now();
        const vRes = await vectorModule.findMatch(prompt);
        const vEnd = performance.now();
        const vTime = (vEnd - vStart).toFixed(2);

        // ---------------------------------------------------------
        // 3. TRAINED NLP MODEL ANALYSIS (Timing & Logic)
        // ---------------------------------------------------------
        const tStart = performance.now();
        const tRes = await manager.process('en', prompt);
        const tEnd = performance.now();
        const tTime = (tEnd - tStart).toFixed(2);

        // ---------------------------------------------------------
        // 4. FINAL COMPARISON REPORT
        // ---------------------------------------------------------
        console.log("\n" + "=".repeat(50));
        console.log(`📊 COMPARISON REPORT FOR: "${prompt}"`);
        console.log("=".repeat(50));

        // Accuracy & Decision Table
        console.table([
            {
                System: "Vector (Semantic)",
                Decision: vRes.decision.toUpperCase(),
                Confidence: `${vRes.imagePct}% (Img) / ${vRes.textPct}% (Txt)`,
                "Time (Latency)": `${vTime} ms`
            },
            {
                System: "Trained (Pattern)",
                Decision: (tRes.intent || "NONE").toUpperCase(),
                Confidence: `${(tRes.score * 100).toFixed(2)}%`,
                "Time (Latency)": `${tTime} ms`
            }
        ]);

        console.log("=".repeat(50));

        // 5. Performance Summary for your Sir
        console.log("\n💡 PERFORMANCE ANALYSIS:");
        if (parseFloat(tTime) < parseFloat(vTime)) {
            console.log(`- Speed Winner: TRAINED MODEL (Faster by ${Math.round(vTime / tTime)}x)`);
        }
        
        console.log("\n🎯 ACCURACY ANALYSIS:");
        if (vRes.decision.toUpperCase() === (tRes.intent || "").toUpperCase()) {
            console.log("- Status: Both systems are high-accurate for this prompt.");
        } else {
            console.log("- Status: Systems disagree. Vector is usually smarter for synonyms.");
        }
        console.log("=".repeat(50) + "\n");

    } catch (e) {
        console.log("❌ Error:", e.message);
    }
}

check();