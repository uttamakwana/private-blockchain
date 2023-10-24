import BlockChain from "./blockchain.js";

const blockChain = new BlockChain();
blockChain.addBlock({ data: "New Data" });
let prevTimestamp, nextTimestamp, nextBlock, timeDiff, averageTime;
const times = [];

for (let i = 0; i < 1000; i++) {
  prevTimestamp = blockChain.chain[blockChain.chain.length - 1].timestamp;
  blockChain.addBlock({ data: `block ${i}` });
  nextBlock = blockChain.chain[blockChain.chain.length - 1];
  nextTimestamp = nextBlock.timestamp;
  timeDiff = nextTimestamp - prevTimestamp;
  times.push(timeDiff);
  averageTime = times.reduce((total, time) => total + time) / times.length;

  console.log(
    `Time to mine block: ${timeDiff}ms, Difficulty: ${nextBlock.difficulty}, Average Time: ${averageTime}ms`
  );
}
