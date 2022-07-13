import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import Example from "./pages/Example";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/transfer" element={<Example />}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
