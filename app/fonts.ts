import localFont from "next/font/local";

export const lufga = localFont({
  src: [
    {
      path: "./fonts/Lufga-Thin.ttf",
      weight: "100",
      style: "normal",
    },
    {
      path: "./fonts/LufgaThinItalic.ttf",
      weight: "100",
      style: "italic",
    },
    {
      path: "./fonts/Lufga-Extra-Light.ttf",
      weight: "200",
      style: "normal",
    },
    {
      path: "./fonts/LufgaExtraLightItalic.ttf",
      weight: "200",
      style: "italic",
    },
    {
      path: "./fonts/Lufga-Light.ttf",
      weight: "300",
      style: "normal",
    },
    {
      path: "./fonts/LufgaLightItalic.ttf",
      weight: "300",
      style: "italic",
    },
    {
      path: "./fonts/Lufga-Regular.ttf",
      weight: "400",
      style: "normal",
    },
    {
      path: "./fonts/LufgaItalic.ttf",
      weight: "400",
      style: "italic",
    },
    {
      path: "./fonts/Lufga-Medium.ttf",
      weight: "500",
      style: "normal",
    },
    {
      path: "./fonts/LufgaMediumItalic.ttf",
      weight: "500",
      style: "italic",
    },
    {
      path: "./fonts/Lufga-Semi-Bold.ttf",
      weight: "600",
      style: "normal",
    },
    {
      path: "./fonts/LufgaSemiBoldItalic.ttf",
      weight: "600",
      style: "italic",
    },
    {
      path: "./fonts/Lufga-Bold.ttf",
      weight: "700",
      style: "normal",
    },
    {
      path: "./fonts/LufgaBoldItalic.ttf",
      weight: "700",
      style: "italic",
    },
    {
      path: "./fonts/Lufga-Extra-Bold.ttf",
      weight: "800",
      style: "normal",
    },
    {
      path: "./fonts/LufgaExtraBoldItalic.ttf",
      weight: "800",
      style: "italic",
    },
    {
      path: "./fonts/Lufga-Black.ttf",
      weight: "900",
      style: "normal",
    },
    {
      path: "./fonts/LufgaBlackItalic.ttf",
      weight: "900",
      style: "italic",
    },
  ],
  variable: "--font-lufga-local",
  display: "swap",
  preload: false,
});