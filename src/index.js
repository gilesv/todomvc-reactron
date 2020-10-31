import Reactron from "reactron";
import "todomvc-app-css/index.css";
import App from "./App.js";

Reactron.load().then(() => {
  Reactron.render(<App />, document.getElementById("root"));
});
