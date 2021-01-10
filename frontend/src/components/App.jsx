import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Home from "./Home";

const NotFound = () => {
  return <div>404 not found</div>;
};

const App = () => {
  return (
    <Router>
      <Switch>
        <Route exact path="/">
          <Home />
        </Route>
        <Route path="*" component={NotFound} />
      </Switch>
    </Router>
  );
};

export default App;