import { GoogleAnalytics } from '@next/third-parties/google'
import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html lang="en">
      <Head />
      <body>
        <Main />
        <NextScript />
        <GoogleAnalytics gaId="G-DZWCZWH78P" />
      </body>
    </Html>
  );
}
