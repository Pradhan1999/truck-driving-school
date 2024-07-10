// material-ui
import { grey } from "@mui/material/colors";
import { TypographyVariantsOptions } from "@mui/material/styles";

// types
import { FontFamily } from "types/config";

// ==============================|| DEFAULT THEME - TYPOGRAPHY  ||============================== //

export default function Typography(
  fontFamily: FontFamily
): TypographyVariantsOptions {
  return {
    htmlFontSize: 16,
    fontFamily,
    fontWeightLight: 300,
    fontWeightRegular: 400,
    fontWeightMedium: 500,
    fontWeightBold: 600,
    h1: {
      fontWeight: 600,
      fontSize: "2.375rem", // 38px
      lineHeight: 1.21,
    },
    h2: {
      fontWeight: 600,
      fontSize: "1.875rem", // 30px
      lineHeight: 1.27,
    },
    h3: {
      fontWeight: 600,
      fontSize: "1.5rem", // 24px
      lineHeight: 1.33,
    },
    h4: {
      fontWeight: 600,
      fontSize: "1.25rem", // 20px
      lineHeight: 1.4,
    },
    h5: {
      fontWeight: 600,
      fontSize: "1rem", // 16px
      lineHeight: 1.5,
    },
    h6: {
      fontWeight: 400,
      fontSize: "0.875rem", // 14px
      lineHeight: 1.57,
    },
    caption: {
      fontWeight: 400,
      fontSize: "0.75rem", // 12px
      lineHeight: 1.66,
    },
    body1: {
      fontSize: "0.875rem", // 14px
      lineHeight: 1.57,
    },
    body2: {
      fontSize: "0.75rem", // 12px
      lineHeight: 1.66,
    },
    subtitle1: {
      fontSize: "0.875rem", // 14px
      fontWeight: 600,
      lineHeight: 1.57,
    },
    subtitle2: {
      fontSize: "0.75rem", // 12px
      fontWeight: 500,
      lineHeight: 1.66,
    },
    overline: {
      lineHeight: 1.66,
      fontWeight: 600,
      color: grey[500],
    },
    button: {
      textTransform: "capitalize",
    },
  };
}
