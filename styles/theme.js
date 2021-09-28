import React from 'react';
import { theme as chakraTheme } from '@chakra-ui/react';

const theme = {
  ...chakraTheme,
  fonts: {
    ...chakraTheme.fonts,
    body: 'Roboto'
  },
  fontWeights: {
    normal: 400,
    medium: 600,
    bold: 700
  },
  colors: {
    ...chakraTheme.colors,
    brand: {
      100: "#99c1b9",
      yellow: "#DBBD7F",
      blue: "#214261",
      white: "#ffffff",
      green: "rgb(155, 163, 153)"
    }
  },
  styles: {
    global: {
      body: {
        bg: "#F9F7EE"
      }
    }
  },


};

export default theme;