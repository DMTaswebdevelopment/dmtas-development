import type { Metadata } from "next";
import "./globals.css";
import { Providers } from "./provider";

export const metadata: Metadata = {
  title: "DMTas-development",
  description:
    "Optimize your workflow with cutting-edge document management solutions in Tasmania. Our expert team offers tailored services for efficient organization, secure storage, and seamless retrieval of your important documents. Streamline your processes and enhance productivity. Contact us to revolutionize your document management experience.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <meta
        property="og:url"
        content="https://www.dmtas.com.au/VarietyPuzzleMyPic"
      />
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
