import { ThemeProvider } from "next-themes";
import { darkTheme } from "../stitches.config";

function App({ Component, pageProps }) {
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="system"
      value={{
        dark: darkTheme.className,
        light: "light",
      }}
    >
      <Component {...pageProps} />
    </ThemeProvider>
  );
}

export default App;
