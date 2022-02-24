import "wasi";
import { Console } from "as-wasi";
import { Method, RequestBuilder, Response } from "../wasi-experimental-http";

let input = Console.readAll() as string;
let body = String.UTF8.encode(input);
let res = new RequestBuilder("https://postman-echo.com/post")
  .header("Content-Type", "text/plain")
  .method(Method.POST)
  .body(body)
  .send();

console.log(`Content-Type: ${res.headerGet("Content-Type")}`);
console.log("Status:200");
console.log("");
let responseBody = res.bodyReadAll();
let bodyval = String.UTF8.decode(responseBody.buffer,true);
console.log(bodyval);
res.close();

