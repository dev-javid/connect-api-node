import { NextFunction, Request, Response } from 'express';
import https from "https";
import { WHATSAPP_TOKEN, WHATSAPP_VERIFY_TOKEN, WHATSAPP_TOKEN_SHADAB, WHATSAPP_VERIFY_TOKEN_SHADAB } from '../config';

class WebhookController {

  public get = async (req: Request, res: Response, next: NextFunction) => {
    const customerId: string = req.params.customerId;
    const token = customerId == 'Shadab' ? WHATSAPP_VERIFY_TOKEN_SHADAB : WHATSAPP_VERIFY_TOKEN;
    let queryParams = req?.query;
    if (queryParams != null) {
      const mode = queryParams["hub.mode"];
      if (mode == "subscribe") {
        const verifyToken = queryParams["hub.verify_token"];
        if (verifyToken == token) {
          let challenge = queryParams["hub.challenge"];
          res.status(200).json(Number(challenge));
        } else {
          const responseBody = "Error, wrong validation token";
          res.status(403).json(JSON.stringify(responseBody));
        }
      } else {
        const responseBody = "Error, wrong mode";
        res.status(403).json(JSON.stringify(responseBody));
      }
    }
  }

  public post = async (req: Request, res: Response, next: NextFunction) => {
    const customerId: string = req.params.customerId;
    const token = customerId == 'Shadab' ? WHATSAPP_TOKEN_SHADAB : WHATSAPP_TOKEN;
    console.log("\n\n");
    console.log(JSON.stringify(req.body));
    console.log("\n\n");
    res.status(200).json({
      result: true
    });
  //   let entries = req.body.entry;
  //   for (let entry of entries) {
  //     for (let change of entry.changes) {
  //       let value = change.value;
  //       if (value != null) {
  //         let phone_number_id = value.metadata.phone_number_id;
  //         if (value.messages != null) {
  //           for (let message of value.messages) {
  //             if (message.type === 'text') {
  //               let from = message.from;
  //               let message_body = message.text.body;
  //               let reply_message = "You typed: " + message_body;
  //               sendReply(phone_number_id, token, from, reply_message);
  //               const responseBody = "Done";
  //               const response = {
  //                 "statusCode": 200,
  //                 "body": JSON.stringify(responseBody),
  //                 "isBase64Encoded": false
  //               };
  //               res.status(200).json(responseBody);
  //             }
  //           }
  //         }
  //       }
  //     }
  //   }
  };
}



const sendReply = (phone_number_id, whatsapp_token, to, reply_message) => {
  let json = {
    messaging_product: "whatsapp",
    to: to,
    text: { body: reply_message },
  };
  let data = JSON.stringify(json);
  let path = "/v12.0/" + phone_number_id + "/messages?access_token=" + whatsapp_token;
  let options = {
    host: "graph.facebook.com",
    path: path,
    method: "POST",
    headers: { "Content-Type": "application/json" }
  };
  let callback = (response) => {
    let str = "";
    response.on("data", (chunk) => {
      str += chunk;
    });
    response.on("end", () => {
    });
  };
  let req = https.request(options, callback);
  req.on("error", (e) => { });
  req.write(data);
  req.end();
}

export default WebhookController;
