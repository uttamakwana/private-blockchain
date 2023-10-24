import { GENESIS_BLOCK, MINE_RATE } from "./genesis.js";
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

  // creates genesis block
  static genesis() {
    return new this(GENESIS_BLOCK);
  }

  // To mine block
  static mineBlock({ prevBlock, data }) {
    // const timestamp = Date.now();
    let hash, timestamp;
    const prevHash = prevBlock.hash;
    let { difficulty } = prevBlock;
    let nonce = 0;
    do {
      nonce++;
      timestamp = Date.now();
      difficulty = Block.adjustDifficulty({
        originalBlock: prevBlock,
        timestamp,
      });
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

  // to adjust difficulty
  static adjustDifficulty({ originalBlock, timestamp }) {
    const { difficulty } = originalBlock;

    const difference = timestamp - originalBlock.timestamp;
    if (difficulty < 1) return 1;
    if (difference > MINE_RATE) {
      return difficulty - 1;
    } else {
      return difficulty + 1;
    }
  }
}

const genesisBlock = Block.genesis(GENESIS_BLOCK);

const result = Block.mineBlock({
  prevBlock: genesisBlock,
  data: { name: "Uttam", email: "uttam@gmail.com" },
});
