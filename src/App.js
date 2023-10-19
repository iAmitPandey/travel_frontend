import { Route, Routes } from "react-router-dom";
import { Home, SearchResults, SingleHotel } from "./pages";
import { Filter } from "./component";
import "./App.css";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />}></Route>
      <Route
        path="/hotels/:name/:address/:Id/reserve"
        element={<SingleHotel />}
      ></Route>
      <Route path="hotels/:address" element={<SearchResults />} />
      <Route path="/filters" element={<Filter />} />
    </Routes>
  );
}

export default App;
