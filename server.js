import express from "express";
import BlockChain from "./blockchain.js";
import PubSub from "./publishsubscriber.js";
import request from "request";

const app = express();
const blockChain = new BlockChain();
const pubSub = new PubSub(blockChain);

setTimeout(() => pubSub.broadcastChain(), 1000);

app.use(express.json());
app.get("/api/blocks", (req, res) => {
  res.json(blockChain.chain);
});

app.post("/api/mine", (req, res) => {
  const { data } = req.body;
  console.log(data);
  blockChain.addBlock({ data });
  pubSub.broadcastChain();
  res.redirect("/api/blocks");
});

const DEFAULT_PORT = 3000;
const ROOT_NODE_ADDRESS = `http://localhost:${DEFAULT_PORT}`;

const synChains = () => {
  request({ url: `${ROOT_NODE_ADDRESS}/api/blocks` }, (err, res, body) => {
    if (!err && res.statusCode === 200) {
      const rootChain = JSON.parse(body);
      console.log(rootChain);
      console.log("Rootchain:", rootChain);
      console.log("Replace chain on sync with", rootChain);
      blockChain.replaceChain(rootChain);
    }
  });
};

let PEER_PORT;
if (process.env.GENERATE_PEER_PORT === "true") {
  PEER_PORT = DEFAULT_PORT + Math.ceil(Math.random() * 1000);
}

const PORT = PEER_PORT || DEFAULT_PORT;
app.listen(PORT, () => {
  console.log(`Server is started on port ${PORT}`);
  synChains();
});
