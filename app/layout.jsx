import React from "react";
import "@styles/globals.css";
import Nav from "@components/Nav";
import Provider from "@components/Provider";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { Toaster } from "sonner";
import AutoLogin from "@components/AutoLogin";

export const metadata = {
  title: "PromptsBook",
  description: "Discover & Share AI prompts",
};

function RootComponent({ children }) {
  return (
    <html lang="en">
      <body>
        <Provider>
          <AutoLogin>
            <main className="flex">
              <Toaster position="top-right" richColors />
              <Nav />
              {children}
            </main>

            <SpeedInsights />
          </AutoLogin>
        </Provider>
      </body>
    </html>
  );
}

export default RootComponent;