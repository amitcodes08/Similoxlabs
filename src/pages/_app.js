import { HeroUIProvider } from "@heroui/react";
import { useRouter } from "next/router";
import "../styles/globals.css";

export default function App({ Component, pageProps }) {
  const router = useRouter();

  return (
    <HeroUIProvider navigate={router.push}>
      <Component {...pageProps} />
    </HeroUIProvider>
  );
}