import { defineStyle, extendTheme, type ThemeConfig } from "@chakra-ui/react";


const config: ThemeConfig = {
  initialColorMode: "light",
  useSystemColorMode: false,
};

export default extendTheme({
  config,
  semanticTokens: {
    colors: {
      blue: {
          50: "#e6f4ff",
          100: "#bae0ff",
          200: "#91caff",
          300: "#69b1ff",
          400: "#4096ff",
          500: "#1677ff",
          600: "#0958d9",
          700: "#003eb3",
          800: "#002c8c",
          900: "#001d66",
      },
      bg: {
        default: "green.50",
        _dark: "#08090d",
      },
      "surface.1": {
        default: "#e8f5e9",
        _dark: "#12141c",
      },
      "surface.2": {
        default: "#d9f0dd",
        _dark: "#171a23",
      },
      "border.subtle": {
        default: "rgba(0,0,0,0.12)",
        _dark: "rgba(255,255,255,0.12)",
      },
      "text.primary": {
        default: "#0f172a",
        _dark: "#f5f7ff",
      },
      "text.muted": {
        default: "#475569",
        _dark: "#a2abc0",
      },
      "drawer.dialog.bg": {
        default: "white",
        _dark: "gray.900"
      }
    },
  },
  styles: {
    global: defineStyle({
      "html, body": {
        minHeight: "100%",
        bg: "bg.default",
        color: "text.primary",
      },
      body: {
        minW: "320px",
        bg: "bg.default",
        color: "text.primary",
      },
      "#__next": {
        bg: "bg.default",
      },
      ".star": {
        "&.full" : {
          background: "url(/static/images/star/star.png) no-repeat",
          backgroundSize: "auto 100%"
        },
        "&.empty" : {
          background: "url(/static/images/star/empty-star.png) no-repeat",
          backgroundSize: "auto 100%"
        },
        "&.half" : {
          background: "url('/static/images/star/half-star.png') no-repeat, url('/static/images/star/empty-star.png') no-repeat",
          backgroundSize: "auto 100%, auto 100%"
        }
      },
      "ins.adsbygoogle[data-ad-status='unfilled']:not(#goplaygame-Home-Banner):not(#gameworkspace-Home-Banner)": {
        display: "none"
      },
      "#description a" : {
        color: "cyan.500"
      },
      "a": {
        color: "inherit"
      },
      ".gpt-sticky-bottom": {
        position: "fixed",
        left: 0,
        right: 0,
        bottom: 0,
        zIndex: 2147483647,
        display: "flex",
        justifyContent: "center",
        pointerEvents: "none",
        "@media (min-width: 768px)": {
          display: "none"
        }
      },
      ".gpt-sticky-bottom__inner": {
        pointerEvents: "auto",
        minWidth: "320px",
        minHeight: "50px"
      }
    }),
  },
});
