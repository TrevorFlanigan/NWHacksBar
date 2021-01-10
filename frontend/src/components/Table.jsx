import {
  Paper,
  Container,
  makeStyles,
  Button,
  TextField,
} from "@material-ui/core";
import Cookies from "js-cookie";
import { useEffect } from "react";
import { useState } from "react";
import { useHistory, useParams } from "react-router-dom";

import socket from "./Socket";

const useStyles = makeStyles({
  root: {
    background:
      "linear-gradient(180deg, #7F95D1 0%, rgba(255, 235, 231, 0.51) 100%)",
    minHeight: "100vh",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    fontFamily: "Work Sans",
  },
  header: {
    display: "flex",
    justifyContent: "center",
    flex: "1",
    alignItems: "center",
    flexDirection: "column",
  },
  headerText: {
    display: "flex",
    flex: "0 1 25%",
    textAlign: "center",
    fontSize: "clamp(20px, 10vw, 400px)",
    justifyContent: "center",
  },
  body: {
    display: "flex",
    flexDirection: "column",
    flex: "1 0 300px",
    width: "100%",
    alignItems: "center",
  },
  chat: {
    minHeight: "200px",
    height: "50%",
    maxHeight: "700px",
    display: "flex",
    flexDirection: "column",
    width: "66%",
    minWidth: "200px",
  },
  upper: {
    display: "flex",
    flexDirection: "column",
    flexGrow: 1,
  },
  lower: {
    display: "flex",
    flexBasis: "50px",
  },
  textField: {},
});
const Table = (props) => {
  let params = useParams();
  let { id } = params;
  console.log(id);
  const classes = useStyles();

  const [name, setName] = useState("");
  const [age, setAge] = useState();
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState("");
  useEffect(() => {
    socket.on("postMessage", (data) => {
      setMessages([...messages, data]);
    });
  }, []);

  const history = useHistory();

  const leaveTable = () => {
    socket.emit("leaveRoom", { room: { id }, name: name });
    history.push("/bar");
  };

  const sendMessage = () => {
    if (message === "") return;
    socket.emit("chatMessage", message);
  };

  return (
    <div
      style={{
        display: "flex",
        height: "100vh",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <Container className={classes.root}>
        <Container className={classes.header}>
          <div className={classes.headerText}>Room {id}</div>
          <div className={classes.body}>
            <p>Welcome to Room {id}!</p>
            <Paper className={classes.chat}>
              chat goes here
              <div className={classes.upper}>upper</div>
              <div className={classes.lower}>
                <TextField
                  label="Chat"
                  className={classes.textField}
                  onSubmit={sendMessage}
                  onChange={(e) => setMessage(e.target.value)}
                />
              </div>
            </Paper>
            <Button onClick={() => leaveTable()}>Leave Room</Button>
          </div>
        </Container>
      </Container>
    </div>
  );
};

export default Table;
