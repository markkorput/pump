// core styles are required for all packages
import '@mantine/core/styles.css';

// other css files are required only if
// you are using components from the corresponding package
// import '@mantine/dates/styles.css';
// import '@mantine/dropzone/styles.css';
// import '@mantine/code-highlight/styles.css';
// ...

import type { AppProps } from 'next/app';
import { MantineProvider } from '@mantine/core';
import theme from "./theme";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <MantineProvider defaultColorScheme="dark" theme={theme}>
      <Component {...pageProps} />
    </MantineProvider>
  );
}