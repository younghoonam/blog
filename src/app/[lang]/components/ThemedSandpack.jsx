import { Sandpack } from "@codesandbox/sandpack-react";

export default function ThemedSandpack(props) {
  return (
    <Sandpack
      {...props}
      options={{
        showLineNumbers: true,
        editorHeight: 500,
      }}
      theme={{
        colors: {
          surface1: "var(--bg-color)",
          surface2: "var(--border-color)",
          surface3: "var(--border-color)",
          clickable: "var(--color-4)",
          base: "#323232",
          disabled: "#C5C5C5",
          hover: "#4D4D4D",
          accent: "var(--attr-name-color)",
          error: "#ff453a",
          errorSurface: "#ffeceb",
        },
        syntax: {
          plain: "var(--text-color)",
          comment: {
            color: "var(--comment-color)",
            fontStyle: "italic",
          },
          keyword: "var(--property-color)",
          tag: "#d28cf6",
          punctuation: "var(--text-color)",
          definition: "var(--variable-color)",
          property: "var(--property-color)",
          static: "var(--boolean-number-color)",
          string: "var(--string-color)",
        },
      }}
    />
  );
}
