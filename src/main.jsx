import React from "react";
import ReactDOM from "react-dom/client";

import "./index.css";
import { createTheme, MantineProvider } from "@mantine/core";
import { Router } from "./Router.jsx";

const theme = createTheme({
   fontFamily: 'Lato',
   headings: { fontFamily: 'Jost', fontWeight: 700 },
   primaryColor: 'grape',
   primaryShade: {
      light: 6, dark: 9
   },
})

ReactDOM.createRoot(document.getElementById("root")).render(
   <React.StrictMode>
      <MantineProvider defaultColorScheme={'dark'} theme={theme}>
         <Router />
      </MantineProvider>
   </React.StrictMode>
);
