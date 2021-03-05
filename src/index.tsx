import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { ActionEventContextProvider } from "./contexts/ActionEventContext";
import { STRINGOFPLAY } from "./constants";

ReactDOM.render(
  <React.StrictMode>
    <ActionEventContextProvider initialAction={STRINGOFPLAY}>
      <App />
    </ActionEventContextProvider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
