import { HeroUIProvider } from "@heroui/react";
import { useRouter } from "next/router";
import { TeacherProvider } from "@/context/TeacherContext";
import "../styles/globals.css";

export default function App({ Component, pageProps }) {
  const router = useRouter();

  return (
    <HeroUIProvider navigate={router.push}>
      <TeacherProvider>
        <Component {...pageProps} />
      </TeacherProvider>
    </HeroUIProvider>
  );
}