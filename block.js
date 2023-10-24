import { GENESIS_BLOCK } from "./genesis.js";
import { cryptoHash } from "./crypto-hash.js";

export default class Block {
  constructor({ timestamp, data, prevHash, hash, nonce, difficulty }) {
    this.timestamp = timestamp;
    this.data = data;
    this.prevHash = prevHash;
    this.hash = hash;
    this.nonce = nonce;
    this.difficulty = difficulty;
  }

  static genesis() {
    return new this(GENESIS_BLOCK);
  }

  static mineBlock({ prevBlock, data }) {
    // const timestamp = Date.now();
    let hash, timestamp;
    const { difficulty } = prevBlock;
    const prevHash = prevBlock.hash;
    let nonce = 0;
    do {
      nonce++;
      timestamp = Date.now();
      hash = cryptoHash(timestamp, prevHash, data, nonce, difficulty);
    } while (hash.substring(0, difficulty) !== "0".repeat(difficulty));
    return new this({
      timestamp,
      prevHash,
      nonce,
      data,
      hash,
      nonce,
      difficulty,
    });
  }
}

const genesisBlock = Block.genesis(GENESIS_BLOCK);

const result = Block.mineBlock({
  prevBlock: genesisBlock,
  data: { name: "Uttam", email: "uttam@gmail.com" },
});
