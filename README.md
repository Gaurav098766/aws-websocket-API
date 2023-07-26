# aws-websocket-API
## REST API VS WEBSOCKET API: 
Rest api:
i)	The client initiates the request with HTTP methods like get, post, delete, update and rest api will react accordingly based on the integration it had.  
ii)	In turn server will send some response. So that’s how rest api works its kind of request-response model.
iii)	RA is unidirectional in nature and not suitable for real time app like chatbot.
Websocket API:
i)	Client connects to websocket API by sending websocket upgrade request. So client sends http upgrade request to server. The server will send the acknowledgement packet.
ii)	If everthing is good then the connection will be opened and once it gets opened the bidirectional exchange of message takes place.
iii)	Has a single TCP connection b/w client and server and is suitable for real time commnucation.
![image](https://github.com/Gaurav098766/aws-websocket-API/assets/97042529/432c8ccc-8482-4639-a2c2-e939318529f6)

## WORKING OF ROUTES:
![image](https://github.com/Gaurav098766/aws-websocket-API/assets/97042529/2113fe0e-b542-4bca-b0b7-f0f35a53613d)
i)	Connect: api gateway will call the contact the connect route when persistent connection b/w client and websocket api will be initiated.
ii)	Once connection is established, we will have bidirectional functionality of transfer of messages and that comes as a route selection expression.
iii)	Disconnect: Api calls disconnect route when the client or server disconnects from the sever. Api executes this when there is termination of connection from server or client. It can be timeout or manual termination.
Working:
i)	“action”:”message” it is a key:value pair that gets been called by the route selection expression. Now the value will be the route i.e message. If it is not able to find then it transfer the payload to the default route and route will have some backend integaration as a lamda function.
ii)	If “service”:”message”. Now this also will pass to the default route because it is unable to find the route selection expression.
iii)	For non-json payloads or messages it is always get transferred to the default route because it doesn’t contain key-value pair.
iv)	Now in the above cases if you don’t have default route then the sevice will return error. So it is advisable for a default route.  
