import "./App.css";
import { BrowserRouter, Route, Switch } from "react-router-dom";
//I only need 5 pages to work with, which is why I'm using a BrowserRouter and Route.
//Pages:
import LandingPage from "./components/LandingPage"; // 1
import Home from "./components/Home"; // 2
import PokemonDetail from "./components/PokemonDetail"; //3
import PokemonCreate from "./components/PokemonCreate"; //4
import NotFound from "./components/NotFound"; //5

function App() {
  return (
    <>
      <BrowserRouter>
        <div className="App">
          <Switch>
            <Route exact path="/">
              <LandingPage />
            </Route>
            <Route path="/home">
              <Home />
            </Route>
            <Route exact path="/create">
              <PokemonCreate />
            </Route>
            <Route exact path="/pokemons/:id">
              <PokemonDetail />
            </Route>
            <Route component={NotFound} />
          </Switch>

          {/* <NotFound /> */}
          {/* <Route /> */}
        </div>
      </BrowserRouter>
    </>
  );
}

export default App;
