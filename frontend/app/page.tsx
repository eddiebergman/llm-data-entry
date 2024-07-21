"use client";

import App from "./app";
import { StateProvider } from "./state";

export default function Page() {
  return (
    <StateProvider>
      <App />
    </StateProvider>
  );
}
