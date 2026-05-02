import { pipeline, cos_sim } from '@xenova/transformers';

const extractor = await pipeline('feature-extraction', 'Xenova/all-MiniLM-L6-v2');


const labels = [
    "generate an image, photo, or visual art",         // Index 0
    "write text or poem, answer a question, or chat"    // Index 1
];


const labelVecs = await Promise.all(
    labels.map(async (l) => {
        const out = await extractor(l, { pooling: 'mean', normalize: true });
        return out.data;
    })
);


export async function findMatch(input) {
    const out = await extractor(input, { pooling: 'mean', normalize: true });
    const userVec = out.data;

    
    const imageScore = cos_sim(userVec, labelVecs[0]);
    const textScore = cos_sim(userVec, labelVecs[1]);

   
    return {
        decision: imageScore > textScore ? "IMAGE_MODEL" : "TEXT_MODEL",
        imagePct: (imageScore * 100).toFixed(2),
        textPct: (textScore * 100).toFixed(2)
    };
}

// ==========================================
// 5. TEST SECTION: 
// ==========================================

if (process.argv[1].endsWith('transformer.mjs')) {
    console.log("\n--- 🚀 Vector Semantic Analysis ---");
    
   
    const myTestInput = "sketch a dog"; 
    
    console.log(`Analyzing: "${myTestInput}"...`);

    findMatch(myTestInput).then(result => {
        console.log("\n--- 📊 Results ---");
        console.log(`📸 Image Match Score: ${result.imagePct}%`);
        console.log(`✍️ Text Match Score:  ${result.textPct}%`);
        console.log("-----------------------");
        console.log(`Final Decision: >> ${result.decision} <<`);
    });
}