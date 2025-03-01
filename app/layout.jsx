// app/layout.tsx or app/layout.jsx

import "../src/styles/globals.css";
import { Web3Modal } from "../context/Web3Modal";

export const metadata = {
  title: "Web3Modal",
  description: "Web3Modal Example",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <Web3Modal>{children}</Web3Modal>
      </body>
    </html>
  );
}
