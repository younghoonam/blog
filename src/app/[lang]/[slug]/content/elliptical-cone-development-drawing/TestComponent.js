"use client";

import { Sandpack } from "@codesandbox/sandpack-react";
import { useTheme } from "next-themes";
import { lightTheme } from "@/app/styles/sandpackThemes";

export default function TestComponent() {
  const { theme, setTheme } = useTheme();
  return (
    <>
      <Sandpack
        theme={theme == "light" ? lightTheme : "dark"}
        options={{ showLineNumbers: true }}
      />
    </>
  );
}
