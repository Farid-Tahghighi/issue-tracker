"use client";

import React from "react";
import QueryClientProvider from "./QueryClientProvider";
import AuthProvider from "./auth/provider";
import { Theme } from "@radix-ui/themes";

const Provider = ({ children }: { children: React.ReactNode }) => {
  return (
      <QueryClientProvider>
        <AuthProvider>
          <Theme>{children}</Theme>
        </AuthProvider>
      </QueryClientProvider>
  );
};

export default Provider;
