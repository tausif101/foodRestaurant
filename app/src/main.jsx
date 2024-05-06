import React from "react";
import ReactDOM from "react-dom/client";
import { createGlobalStyle } from 'styled-components';
import App from "./App.jsx";

const GlobalStyle = createGlobalStyle`

*{
  box-sizing: border-box;
  margin: 0;
  padding:0;
}

body{
  color: white;
  min-height: 100vh;
  background-color:#323334;
}

`

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <GlobalStyle />
    <App />
  </React.StrictMode>
);
