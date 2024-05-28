import React from "react";
import { ThemeProvider, createTheme, CssBaseline } from "@mui/material";
import '@fontsource/roboto'; // Roboto 폰트를 불러옵니다.

const theme = createTheme({
  typography: {
    fontFamily: 'Roboto, Arial, sans-serif',
  },
});

function NotFoundPage() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
          color: "black",
        }}
      >
        <div style={{ textAlign: "center", marginTop: "-50vh" }}>
          <h1>Error 404: Page not found</h1>
          <p>
            The page you are looking for might have been removed, had its name
            changed, or is temporarily unavailable.
          </p>
        </div>
      </div>
    </ThemeProvider>
  );
}

export default NotFoundPage;