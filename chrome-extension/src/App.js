import PopUp from "./PopUp";
import Success from "./Success";
import GlobalStyle from "./GlobalStyle";
import { useState } from "react";

const App = () => {
  const [success, setSuccess] = useState(false);
  const handlePage = () => setSuccess(true);
  return <> {!success ? <PopUp handlePage={handlePage} /> : <Success />}</>;
};

export default App;
