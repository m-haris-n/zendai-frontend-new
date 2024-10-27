import React from "react";
import ReactDOM from "react-dom/client";

import "./index.css";
import { createTheme, MantineProvider } from "@mantine/core";
import { Router } from "./Router.jsx";

const theme = createTheme({
   fontFamily: 'Lato',
   headings: { fontFamily: 'Jost', fontWeight: 700 },
   primaryColor: "dark",
   primaryShade: {
      light: 9
   },
   
})

ReactDOM.createRoot(document.getElementById("root")).render(
   <React.StrictMode>
      <MantineProvider  theme={theme}>
         <Router />
      </MantineProvider>
   </React.StrictMode>
);
