import { NextFunction, Request, Response } from 'express';
import https from "https";
import { WHATSAPP_TOKEN, WHATSAPP_VERIFY_TOKEN } from '../config';

class WebhookController {

  public get = async (req: Request, res: Response, next: NextFunction) => {
    let queryParams = req?.query;
    if (queryParams != null) {
      const mode = queryParams["hub.mode"];
      if (mode == "subscribe") {
        const verifyToken = queryParams["hub.verify_token"];
        if (verifyToken == WHATSAPP_VERIFY_TOKEN) {
          let challenge = queryParams["hub.challenge"];
          res.status(200).json(Number(challenge));
          const response = {
            "statusCode": 200,
            "body": challenge,
            "isBase64Encoded": false
          };
          res.status(200).json(response);
        } else {
          const responseBody = "Error, wrong validation token";
          const response = {
            "statusCode": 403,
            "body": JSON.stringify(responseBody),
            "isBase64Encoded": false
          };
          res.status(200).json(response);
        }
      } else {
        const responseBody = "Error, wrong mode";
        const response = {
          "statusCode": 403,
          "body": JSON.stringify(responseBody),
          "isBase64Encoded": false
        };
        res.status(200).json(response);
      }
    }
  }

  public post = async (req: Request, res: Response, next: NextFunction) => {
    let body = JSON.parse(req.body)
    let entries = body.entry;
    for (let entry of entries) {
      for (let change of entry.changes) {
        let value = change.value;
        if (value != null) {
          let phone_number_id = value.metadata.phone_number_id;
          if (value.messages != null) {
            for (let message of value.messages) {
              if (message.type === 'text') {
                let from = message.from;
                let message_body = message.text.body;
                let reply_message = "Ack from AWS lambda: " + message_body;
                sendReply(phone_number_id, WHATSAPP_TOKEN, from, reply_message);
                const responseBody = "Done";
                const response = {
                  "statusCode": 200,
                  "body": JSON.stringify(responseBody),
                  "isBase64Encoded": false
                };
                res.status(200).json(response);
              }
            }
          }
        }
      }
    }
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
