"use client";

import App from "./app";
import { StateProvider } from "./state";
import { I18nextProvider } from "react-i18next";
import i18n from "./i18n";

export default function Page() {
  return (
    <I18nextProvider i18n={i18n}>
      <StateProvider>
        <App />
      </StateProvider>
    </I18nextProvider>
  );
}
