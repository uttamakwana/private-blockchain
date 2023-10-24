import express from "express";
import BlockChain from "./blockchain.js";

const app = express();
const blockChain = new BlockChain();

app.use(express.json());

app.get("/api/blocks", (req, res) => {
  res.json({ success: true, data: blockChain.chain });
});

app.post("/api/mine", (req, res) => {
  const { data } = req.body;
  blockChain.addBlock({ data });
  res.redirect("/api/blocks");
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server is started on port ${PORT}`);
});
