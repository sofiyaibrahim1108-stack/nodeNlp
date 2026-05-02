import { performance } from 'perf_hooks';
const { testData } = await import('./testData.js');

// ✅ FIXED: correct file name
import { route as embeddingRoute } from './transformer.mjs';


async function benchmark() {

  let embedCorrect = 0;
  let embedTime = 0;

  for (let test of testData) {

    // ---------------- EMBEDDING ----------------
    const t1 = performance.now();

    const embedResult = await embeddingRoute(test.input);

    const t2 = performance.now();
    embedTime += (t2 - t1);

    if (embedResult === test.expected) {
      embedCorrect++;
    }

    console.log("\n-------------------");
    console.log("Input:", test.input);
    console.log("Expected:", test.expected);
    console.log("Predicted:", embedResult);
    console.log("Time:", (t2 - t1).toFixed(2), "ms");
  }

  // ---------------- RESULTS ----------------
  console.log("\n===== FINAL RESULTS =====");

  console.log(
    `Embedding Accuracy: ${(embedCorrect / testData.length * 100).toFixed(2)}%`
  );

  console.log(
    `Avg Time: ${(embedTime / testData.length).toFixed(2)} ms`
  );
}

benchmark();