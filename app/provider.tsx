// app/providers.tsx
"use client";

import { Provider } from "react-redux";
import { store } from "@/redux/store";
import NavigationChecker from "./components/NavigationChecker/NavigationChecker";
import FooterChecker from "./components/NavigationChecker/FooterChecker";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <Provider store={store}>
      <NavigationChecker />
      {children}
      <FooterChecker />
    </Provider>
  );
}
