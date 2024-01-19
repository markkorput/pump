import { createTheme, Button } from '@mantine/core';
import classes from './theme.module.css';

export default createTheme({
    components: {
      Button: Button.extend({
        classNames: classes,
      }),
    },
  });
  