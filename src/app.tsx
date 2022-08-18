import { Routes, Route } from "react-router-dom";
import Orders from "./components/Orders";
import Home from "./components/Home";

const App = () => {
  return (
    <div id="container">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/orders" element={<Orders />} />
      </Routes>
    </div>
  );
};

export default App;
