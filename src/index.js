import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { store } from "./store";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { persistor } from "./store";
import { I18nextProvider } from "react-i18next";
import i18n from "./i18n/i18";

ReactDOM.render(
  // <React.StrictMode>
  <I18nextProvider i18n={i18n}>
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <App />
      </PersistGate>
      {/* <App /> */}
    </Provider>
  </I18nextProvider>,
  // </React.StrictMode>,
  document.getElementById("root")
);
