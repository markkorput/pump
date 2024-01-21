import type { AppProps } from "next/app";
import { Button, MantineProvider, createTheme } from "@mantine/core";
import classes from "../app/theme.module.css";

// core styles are required for all packages
import "@mantine/core/styles.css";

// other css files are required only if
// you are using components from the corresponding package
// import '@mantine/dates/styles.css';
// import '@mantine/dropzone/styles.css';
// import '@mantine/code-highlight/styles.css';
// ...

const theme = createTheme({
  components: {
    Button: Button.extend({
      classNames: classes,
    }),
  },
});

export default function App({ Component, pageProps }: AppProps) {
  return (
    <MantineProvider defaultColorScheme="dark" theme={theme}>
      <Component {...pageProps} />
    </MantineProvider>
  );
}
