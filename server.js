import express from "express";
import BlockChain from "./blockchain.js";
import PubSub from "./publishsubscriber.js";

const app = express();
const blockChain = new BlockChain();
const pubSub = new PubSub(blockChain);

setTimeout(() => pubSub.broadcastChain(), 1000);

app.use(express.json());
app.get("/api/blocks", (req, res) => {
  res.json({ success: true, data: blockChain.chain });
});

app.post("/api/mine", (req, res) => {
  const { data } = req.body;
  console.log(data);
  blockChain.addBlock({ data });

  pubSub.broadcastChain();
  res.redirect("/api/blocks");
});

const DEFAULT_PORT = 3000;
let PEER_PORT;

if (process.env.GENERATE_PEER_PORT === "true") {
  PEER_PORT = DEFAULT_PORT + Math.ceil(Math.random() * 1000);
}

const PORT = PEER_PORT || DEFAULT_PORT;
app.listen(PORT, () => {
  console.log(`Server is started on port ${PORT}`);
});
