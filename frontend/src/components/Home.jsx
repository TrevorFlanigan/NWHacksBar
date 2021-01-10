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
import { useHistory } from "react-router-dom";

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
  card: {
    display: "flex",
    flexDirection: "column",
    flexGrow: 1,
    width: "50%",
    maxWidth: "500px",
    minHeight: "200px",
    height: "60%",
    maxHeight: "500px",
    alignItems: "center",
    justifyContent: "space-evenly",
  },
  startButton: {
    fontFamily: "Work Sans",
  },
  bottom: {
    display: "flex",
    flexDirection: "column",
    flex: "1 1 75%",
  },
  form: {
    display: "flex",
    flexDirection: "column",
    height: "200px",
    justifyContent: "space-evenly",
  },
});
const Home = () => {
  const classes = useStyles();

  const [name, setName] = useState("");
  const [age, setAge] = useState();

  const history = useHistory();

  const join = () => {
      socket.emit("join", {"name": name, "age": age})
  }

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
          <div className={classes.headerText}>ePub</div>
          <Paper className={classes.card}>
            <h1>Join the Bar</h1>
            <div className={classes.form}>
              <TextField
                label="Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
              <TextField
                label="Age"
                type="number"
                value={age}
                onChange={(e) => setAge(e.target.value)}
              />

              <Button
                className={classes.startButton}
                variant="contained"
                onClick={join}
                color="primary"
              >
                JOIN
              </Button>
            </div>
          </Paper>
        </Container>
      </Container>
    </div>
  );
};

export default Home;
