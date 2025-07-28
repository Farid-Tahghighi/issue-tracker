"use client";

import React from "react";
import { Provider as ReduxProvider } from "react-redux";
import { store } from "./store/store";
import QueryClientProvider from "./QueryClientProvider";
import AuthProvider from "./auth/provider";
import { Theme } from "@radix-ui/themes";

const Provider = ({ children }: { children: React.ReactNode }) => {
  return (
    <ReduxProvider store={store}>
      <QueryClientProvider>
        <AuthProvider>
          <Theme>{children}</Theme>
        </AuthProvider>
      </QueryClientProvider>
    </ReduxProvider>
  );
};

export default Provider;
