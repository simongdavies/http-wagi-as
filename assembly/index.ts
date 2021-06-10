import "wasi";
import { Console, Environ, CommandLine, Process } from "as-wasi";
import { Method, RequestBuilder, Response } from "../wasi-experimental-http";

let input = Console.readAll() as string;
let body = String.UTF8.encode(input);
let res = new RequestBuilder("https://postman-echo.com/post")
  .header("Content-Type", "text/plain")
  .method(Method.POST)
  .body(body)
  .send();
Console.log(`Content-Type: ${res.headerGet("Content-Type")}`);

// Without \r on windows blank line is not produced by first console.log

Console.write("Status:200\n\r",false);
Console.log("");
let responseBody = res.bodyReadAll();
let bodyval = String.UTF8.decode(responseBody.buffer,true);
Console.log(bodyval);
res.close();

