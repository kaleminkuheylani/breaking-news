// App.js

import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "./Pages/Homepage";


const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />

      </Routes>
    </BrowserRouter>
  );
};

export default App;
