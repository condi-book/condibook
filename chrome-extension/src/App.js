import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import PopUp from "./PopUp";
import Success from "./Success";
import GlobalStyle from "./GlobalStyle";

const App = () => {
  return (
    <Router>
      <GlobalStyle />
      <Routes>
        <Route path="/" element={<PopUp />} />
        <Route path="/:folder" element={<Success />} />
      </Routes>
    </Router>
  );
};

export default App;
