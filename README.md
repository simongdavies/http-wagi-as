# http-wagi-as
# AssemblyScript example of making an HTTP Request from [WAGI](https://github.com/deislabs/wagi) using [wasi-experimental-http](https://github.com/deislabs/wasi-experimental-http)

_WAGI is the easiest way to get started doing cloud-side WASM web apps._
_wasi_experimental_http provides a temporary workaround to enable HTTP requests from WASM modules until the capability is available via the WASI networking API_

**WARNING:** This is experimental code .
It is not considered production-grade by its developers, neither is it "supported" software.


## What It Does

This is an example of WAGI. It is written in [AssemblyScript](https://www.assemblyscript.org/),
a WebAssembly-oriented dialect of TypeScript/JavaScript.

This example makes an HTTP POST request to https://postman-echo.com/ using WAGI and [wasi-experimental-http](https://github.com/deislabs/wasi-experimental-http).

## Building

- Clone this repo to `http-wagi-as` and enter that directory.
- Use `npm i` to install all dependencies.
- Use `npm run asbuild` to build a WASM binary.

## Configuring and Running

You can run this module using either the [WAGI server](https://github.com/deislabs/wagi) or [wagi-dotnet] (https://github.com/deislabs/wagi-dotnet).

## wagi-dotnet

The simplehttp example contains a [sample](https://github.com/deislabs/wagi-dotnet/tree/main/examples/simplehttp#readme) that runs this module. 

## WAGI server

In your `modules.toml` for the WAGI server, add the following:

```toml
[[module]]
route = "/test"
module = "/path/to/http-wagi-as/build/optimized.wasm"
```

Substitute the correct module path for wherever you cloned this repo.

At that point, you should be able to access this program at `http://localhost:3000/test`
(Possibly substituting in your own domain and port, depending on the WAGI server).

You can use `curl` to test:

```
curl -d "Test" http://localhost:3000/test -v
*   Trying 127.0.0.1...
* TCP_NODELAY set
* Connected to localhost (127.0.0.1) port 3000 (#0)
> POST /test HTTP/1.1
> Host: localhost:3000
> User-Agent: curl/7.58.0
> Accept: */*
> Content-Length: 4
> Content-Type: application/x-www-form-urlencoded
>
* upload completely sent off: 4 out of 4 bytes
< HTTP/1.1 200 OK
< Date: Thu, 10 Jun 2021 19:12:12 GMT
< Content-Type: application/json; charset=utf-8
< Server: Kestrel
< Transfer-Encoding: chunked
<
{"args":{},"data":"Test","files":{},"form":{},"headers":{"x-forwarded-proto":"https","x-forwarded-port":"443","host":"postman-echo.com","x-amzn-trace-id":"Root=1-60c2640c-58ffc97501ccd62c5f254dd0","content-length":"4","traceparent":"00-4671ab1d04d2e84c9ec1b5bd77d2fcef-062c6c2ca34ccc41-00","cookie":"sails.sid=s%3AiRsZ3Qzq2GsNrTQQxi3AhEELcyW7Hn6w.yRzXCs2iaMdX4LAyOafZ9QfhJyQp1Liu%2FJx3kllNjs8","content-type":"text/plain"},"json":null,"url":"https://postman-echo.com/post"}
```

