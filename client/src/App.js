import "./App.css";
import { BrowserRouter, Route } from "react-router-dom";
//I only need 4 pages to work with, which is why I'm using a BrowserRouter and Route.
//Pages:
import LandingPage from "./components/LandingPage"; // 1
import Home from "./components/Home"; // 2
import PokemonDetail from "./components/PokemonDetail"; //3
import PokemonCreate from "./components/PokemonCreate"; //4

function App() {
  return (
    <>
      <div className="App">
        <BrowserRouter>
          <Route exact path="/">
            <LandingPage />
          </Route>
          <Route exact path="/home">
            <Home />
          </Route>
          <Route exact path="/create">
            <PokemonCreate />
          </Route>
          <Route exact path="/pokemons/:id">
            <PokemonDetail />
          </Route>
          
        </BrowserRouter>
      </div>
    </>
  );
}

export default App;
