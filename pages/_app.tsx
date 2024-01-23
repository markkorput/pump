import { useEffect } from "react";
import type { AppProps } from "next/app";
import { Button, MantineProvider, createTheme } from "@mantine/core";
import { createLogger } from "@lib/logging";
import classes from "../app/theme.module.css";

// core styles are required for all packages
import "@mantine/core/styles.css";

// other css files are required only if
// you are using components from the corresponding package
// import '@mantine/dates/styles.css';
// import '@mantine/dropzone/styles.css';
// import '@mantine/code-highlight/styles.css';
// ...

const log = createLogger("app");

const theme = createTheme({
  components: {
    Button: Button.extend({
      classNames: classes,
    }),
  },
});

const App = ({ Component, pageProps }: AppProps) => {
  useEffect(() => {
    try {
      log.info("Requesting wake lock...");
      navigator.wakeLock.request("screen").then((sentinel) => {
        if (!sentinel.released) log.info("Wake lock obtained.");
      });
    } catch (err) {
      // the wake lock request fails - usually system related, such being low on battery
      log.error("Failed to get wake lock: ", err);
    }
  }, []);

  return (
    <MantineProvider defaultColorScheme="dark" theme={theme}>
      <Component {...pageProps} />
    </MantineProvider>
  );
};

export default App;
