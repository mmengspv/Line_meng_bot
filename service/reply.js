import axios from "axios";
import dotenv from "dotenv";
dotenv.config();

export async function reply(replyToken, message) {
  let header = {
    Authorization: `Bearer ${process.env.CHANNEL_ACCESS_TOKEN}`,
  };
  let body = {
    replyToken: replyToken,
    messages: message
  };
  const resp = await axios.post(
    "https://api.line.me/v2/bot/message/reply",
    body,
    {
      headers: header,
    }
  );
  // return resp;
}


export async function replyMessage({replyToken, message}){
  const msg = [
      {
      type: 'text',
      text: message.text
      }
  ]
  await reply(replyToken, msg);
}


