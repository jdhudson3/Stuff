# Sample app

---
Runs a small node server that generates the number of steps taken to complete the [collatz conjecture](https://en.wikipedia.org/wiki/Collatz_conjecture).

---
The server supports the following endpoints:


Primary data generation, which simply returns a number.
 - /collatz/generate/{input}
   
Cache information, json formatted.
 - /cache/stats
 - /cache/dump

--- 
Typescript is required, and the service can be compiled with a simple `tsc` call

The service can then be run locally via `node ./out/app`