# InVision Challenge: Fullstack

The assignment is to build a simple Producer/Consumer system. In this system the Generator will send a series of random arithmetic expressions, while the Evaluator will accept these expressions, compute the result and then report the solution to the Generator.

### Requirements

At a minimum, we would like to see the following implemented:

+ The Producer and Consumer as separate NodeJS services.
+ The Producer generating random addition expressions of two positive integers, e.g. "2+3="
+ The Consumer computing and returning the correct mathematical result for the each expression it receives
+ The Consumer successfully processing requests from two Producers concurrently at a rate of at least 1 req/sec from each Producer (2 req/sec in aggregate)
+ The Consumer and Producer should log all messages they generate and receive.
+ You are free to support more than simple addition, but it is not required.

### The end product should:

+ Be built in strict JavaScript and run with NodeJS
+ NOT rely on any external services like Redis, ZeroMQ or similar technologies
+ NOT use Express (Connect is Ok)
+ Include UML Activity Diagram and UML Sequence Diagram documenting the business logic
+ Include Unit tests


### How to

> Server
```sh
node server.js [OPTIONAL PORT]
```

> Client
```sh
node client.js [OPTIONAL PORT]
```
or
open up a browser to http://localhost:[PORT]/arithmetic-expression?exp=1%2B1=

> Tests
```sh
mocha
```

### UML Diagrams

#### Activity

![UML Activity Diagram](https://github.com/aquigorka/invision-challenge-fullstack/raw/master/assets/activity.jpg "UML Activity Diagram")

#### Sequence 

![UML Sequence Diagram](https://github.com/aquigorka/invision-challenge-fullstack/raw/master/assets/sequence.jpg "UML Sequence Diagram")

### Notes

> Server

+ Middleware plugins have access to a common logger and there is a request logger middleware (that uses the common lib/logger)
+ Arithmetic Expression Plugin uses the common logger
+ Responds to GET method, could've used POST if more specific routing was required
+ Fires up an http server, would've been fun to create a socket server

> Client

+ Don't forget to encode "+" to "%2B"
+ Starts an interval that will send requests every 100 miliseconds for 30 seconds
+ To stress test simply run a couple of clients, would've been fun to code a script that tries to find the limits of the current box
