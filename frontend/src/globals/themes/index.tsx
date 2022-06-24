import { createTheme, Theme } from "@mui/material/styles";

// eslint-disable-next-line unicorn/prefer-module
require("./noto-sans");

const letterSpacing = "0.5px";

const theme: Theme = createTheme({
  components: {
    MuiTab: {
      styleOverrides: {
        root: {
          color: "#43485C",
          "&.Mui-selected": {
            color: "#43485C",
          },
        },
      },
    },
    MuiPopover: {
      styleOverrides: {
        paper: {
          marginTop: 6,
          boxShadow: "0px 0px 4px 0px #00000052",
          borderRadius: 0,
        },
      },
    },
    MuiInputBase: {
      styleOverrides: {
        input: {
          fontFamily: "NotoSans, Helvetica, Arial, sans-serif",
          fontSize: "14px",
          lineHeight: "16px",
          fontWeight: 400,
          borderBottom: "1px solid #495055",
          "&:hover": {
            borderBottom: "1px solid #FFCC11",
          },
          "&:focus": {
            backgroundColor: "#F3F4F4",
            borderBottom: "1px solid #FFCC11",
          },
        },
        multiline: {
          padding: 0,
        },
      },
    },
    MuiFormLabel: {
      styleOverrides: {
        asterisk: {
          color: "#db3131",
          "&.Mui-error": {
            color: "#db3131",
          },
        },
      },
    },
    MuiInput: {
      styleOverrides: {
        underline: {
          "&:hover:not(.Mui-disabled):before": {
            borderBottom: "1px solid #FFCC11",
          },
          "&:after": {
            borderBottom: `1px solid #FFCC11`,
          },
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 0,
          boxShadow: "none",
          fontSize: "14px",
          fontWeight: 400,
          textTransform: "none",
        },
        contained: {
          backgroundColor: "#000000",
          color: "#FFFFFF",
          boxShadow: "none",
          "&:hover": {
            boxShadow: "none",
          },
        },
        containedPrimary: {
          backgroundColor: "#FFCC11",
          color: "#000000",
          fontWeight: 600,
          "&:hover": {
            boxShadow: "none",
            backgroundColor: "#FEE082",
          },
          "&:disabled": {
            border: "1px solid #DBDEDF",
            background: "#F9FAFA",
            color: "#C3C7C8",
          },
        },
        containedSecondary: {
          backgroundColor: "#FFFFFF",
          border: `1px solid #6E7880`,
          color: "#000000",
          fontWeight: 600,
          "&:hover": {
            boxShadow: "none",
            backgroundColor: "#F9FAFA",
            border: `1px solid #5C656C`,
          },
          "&:disabled": {
            border: "1px solid #DBDEDF",
            background: "#F9FAFA",
            color: "#C3C7C8",
          },
        },
        containedInherit: {
          backgroundColor: "#00000",
          border: `1px solid #6E7880`,
          color: "#FFFFFF",
          fontWeight: 600,
          "&:hover": {
            boxShadow: "none",
            border: `1px solid #0000000a`,
            backgroundColor: "#0000000f",
          },
          "&:disabled": {
            border: "1px solid #DBDEDF",
            background: "#0000001f",
            color: "#00000042",
          },
        },
      },
    },
    MuiLink: {
      styleOverrides: {
        root: {
          fontSize: "12px",
          color: "#127ACA",
          cursor: "pointer",
          "&:hover": {
            fontWeight: 700,
          },
        },
      },
    },
    MuiDialog: {
      styleOverrides: {
        paperWidthMd: {
          height: "80%",
        },
      },
    },
  },
  palette: {
    primary: {
      light: "#78869E",
      main: "#43485c",
      dark: "#000000",
      contrastText: "#fff",
    },
    secondary: {
      light: "#F7F7F3",
      main: "#FFCC11",
      dark: "#DCB520",
      contrastText: "#000000",
    },
    error: {
      light: "#F5D0D1",
      main: "#ED1C24",
      dark: "#ED1C24",
      contrastText: "#fff",
    },
    warning: {
      light: "#FFD4A8",
      main: "#FF8000",
      dark: "#FF8000",
      contrastText: "#fff",
    },
    info: {
      light: "#C2DDF1",
      main: "#1991EB",
      dark: "#1991EB",
      contrastText: "#fff",
    },
    success: {
      light: "#B9DFCC",
      main: "#008A45",
      dark: "#008A45",
      contrastText: "#fff",
    },
  },
  typography: {
    fontFamily: ["NotoSans", "Roboto", "Helvetica", "Arial", "sans-serif"].join(
      ","
    ),
    h1: {
      fontFamily: "NotoSans, Helvetica, Arial, sans-serif",
      fontSize: "48px",
      lineHeight: "58px",
      letterSpacing,
      color: "#43485C",
    },
    h2: {
      fontFamily: "NotoSans, Helvetica, Arial, sans-serif",
      fontSize: "24px",
      lineHeight: "34px",
      letterSpacing,
    },
    // Title within Sub Header
    h3: {
      fontFamily: "NotoSans, Helvetica, Arial, sans-serif",
      fontSize: "20px",
      lineHeight: "32px",
      fontWeight: 700,
      letterSpacing,
    },
    h4: {
      fontFamily: "NotoSans, Helvetica, Arial, sans-serif",
      fontSize: "16px",
      lineHeight: "20px",
      fontWeight: 600,
      letterSpacing,
    },
    h5: {
      fontFamily: "NotoSans, Helvetica, Arial, sans-serif",
      fontSize: "16px",
      lineHeight: "18px",
      letterSpacing,
    },
    h6: {
      fontFamily: "NotoSans, Helvetica, Arial, sans-serif",
      fontSize: "14px",
      lineHeight: "18px",
      letterSpacing,
    },
    subtitle1: {
      fontFamily: "NotoSans, Helvetica, Arial, sans-serif",
      fontSize: "16px",
      lineHeight: "18px",
      fontWeight: 600,
      letterSpacing,
    },
    // Button Text
    subtitle2: {
      fontFamily: "NotoSans, Helvetica, Arial, sans-serif",
      fontSize: "14px",
      lineHeight: "16px",
      fontWeight: 600,
      letterSpacing,
    },
    body1: {
      fontFamily: "NotoSans, Helvetica, Arial, sans-serif",
      fontSize: "14px",
      lineHeight: "16px",
      fontWeight: 400,
      letterSpacing,
    },
    body2: {
      fontFamily: "NotoSans, Helvetica, Arial, sans-serif",
      fontSize: "12px",
      lineHeight: "16px",
      fontWeight: 400,
      letterSpacing,
    },
    button: {
      borderRadius: 0,
      boxShadow: "none",
      fontSize: "14px",
      fontWeight: 600,
      textTransform: "none",
    },
  },
  breakpoints: {
    values: {
      xs: 0,
      sm: 800,
      md: 1024,
      lg: 1366,
      xl: 1920,
    },
  },
});

export default theme;
