import Block from "./block.js";
import { cryptoHash } from "./crypto-hash.js";

export default class BlockChain {
  constructor() {
    this.chain = [Block.genesis()];
  }

  // Miners will add block
  addBlock({ data }) {
    const newBlock = Block.mineBlock({
      prevBlock: this.chain[this.chain.length - 1],
      data,
    });
    this.chain.push(newBlock);
  }

  // To verify that all blocks are secure
  static isValidChain(chain) {
    if (JSON.stringify(chain[0]) !== JSON.stringify(Block.genesis())) {
      return false;
    }
    for (let i = 1; i < chain.length; i++) {
      const { timestamp, prevHash, hash, data, nonce, difficulty } = chain[i];
      const realLastHash = chain[i - 1].hash;
      const lastDifficulty = chain[i - 1].difficulty;
      if (prevHash !== realLastHash) return false;
      const validatedHash = cryptoHash(
        timestamp,
        prevHash,
        data,
        nonce,
        difficulty
      );
      if (hash !== validatedHash) return false;
      if(Math.abs(lastDifficulty - difficulty) > 1) return false;
    }
    return true;
  }

  // To replace the chain if any big chain is build
  replaceChain(chain) {
    if (chain <= this.chain.length) {
      console.error("The incoming chain is not longer");
      return;
    }
    if (!BlockChain.isValidChain(chain)) {
      console.error("The incoming chain is not valid");
      return;
    }
    this.chain = chain;
  }
}

const blockChain = new BlockChain();

blockChain.addBlock({ data: { name: "Uttam", email: "test@example.com" } });
// blockChain.addBlock({
//   data: { name: "Divyesh", email: "Divyesh@example.com" },
// });
// blockChain.addBlock({
//   data: { name: "Aashutosh", email: "Aashutosh@example.com" },
// });
// blockChain.addBlock({
//   data: { name: "Aaditya", email: "Aaditya@example.com" },
// });

// console.log(BlockChain.isValidChain(blockChain.chain));
// console.log(blockChain);
