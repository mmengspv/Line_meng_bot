import express from "express";
const app = express();
import { replyAirQuality } from "./service/replyAirQuality.js";
import { replyMessage } from "./service/reply.js";
import dotenv from "dotenv";
dotenv.config();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.post("/callback", async (req, res) => {
  const { message } = req.body.events[0];
  let replyToken = req.body.events[0].replyToken;
  if (message.type === "location") {
    await replyAirQuality({ replyToken, message });
  } else if (message.type === "text") {
    await replyMessage({ replyToken, message });
  }
  res.sendStatus(200);
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`run localhost ${port}`);
});
