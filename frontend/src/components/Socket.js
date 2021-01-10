import io from "socket.io-client";

let socket = io.connect("http://localhost:5000");

socket.on("after connect", () => {
  console.log("Hello");
});
// if (process.env.NODE_ENV !== "production") {
//   socket = io("http://localhost:8000", { transports: ["websocket"] });
// }

export default socket;
