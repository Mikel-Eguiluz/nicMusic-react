import "./App.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import Header from "./components/Header/Header";

import Home from "./pages/Home/Home";
import AddScore from "./pages/AddScore/AddScore";
import UpdateScore from "./pages/UpdateScore/UpdateScore";
import NotFound from "./pages/NotFound/NotFound";

import { ToastProvider } from "react-toast-notifications";
import { ScoresProvider } from "./context/ScoreContext";

function App() {
  return (
    <Router>
      <Header />
      <ToastProvider>
        <ScoresProvider>
          <Switch>
            <Route exact path="/" component={Home} />
            <Route path="/scores/add" component={AddScore} />
            <Route path="/scores/Update/:id" component={UpdateScore} />
            <Route path="*" component={NotFound} />
          </Switch>
        </ScoresProvider>
      </ToastProvider>
    </Router>
  );
}

export default App;
