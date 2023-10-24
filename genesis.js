const INITIAL_DIFFICULTY = 2;
export const MINE_RATE = 1000; // 1second = 1000ms

export const GENESIS_BLOCK = {
  timestamp: "1",
  prevHash: "none",
  hash: "none",
  difficulty: INITIAL_DIFFICULTY,
  nonce: 0,
  data: "GENESIS_BLOCK_DATA",
};
