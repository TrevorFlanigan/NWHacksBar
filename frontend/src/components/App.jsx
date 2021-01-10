import { createContext, useContext, useReducer } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import BarPage from "./BarPage";
import Home from "./Home";
import Table from "./Table";

const NotFound = () => {
  return <div>404 not found</div>;
};

const UserStateContext = createContext();
const UserDispatchContext = createContext();

const userReducer = (state, action) => {
  switch (action.type) {
    case "updateName": {
      return { ...state, name: action.payload.name };
    }
    case "updateAge": {
      return { ...state, age: action.payload.age };
    }
    default: {
      throw new Error(`Unhandled action type: ${action.type}`);
    }
  }
};

const App = () => {
  const [state, dispatch] = useReducer(userReducer, { name: "", age: 0 });
  return (
    <UserStateContext.Provider value={state}>
      <UserDispatchContext.Provider value={dispatch}>
        <Router>
          <Switch>
            <Route exact path="/">
              <Home />
            </Route>
            <Route exact path="/bar">
              <BarPage />
            </Route>
            <Route exact path="/table/:id">
              <Table />
            </Route>
            <Route path="*" component={NotFound} />
          </Switch>
        </Router>
      </UserDispatchContext.Provider>
    </UserStateContext.Provider>
  );
};

function useUserState() {
  const context = useContext(UserStateContext);
  if (context === undefined) {
    throw new Error("useCountState must be used within a CountProvider");
  }
  return context;
}
function useUserDispatch() {
  const context = useContext(UserDispatchContext);
  if (context === undefined) {
    throw new Error("useCountDispatch must be used within a CountProvider");
  }
  return context;
}

export { useUserState, useUserDispatch };
export default App;
