import { HeroUIProvider } from "@heroui/react";
import { useRouter } from "next/router";
import { AuthProvider } from "@/context/AuthContext";
import { TeacherProvider } from "@/context/TeacherContext";
import "../styles/globals.css";

export default function App({ Component, pageProps }) {
  const router = useRouter();

  return (
    <HeroUIProvider navigate={router.push}>
      <AuthProvider>
        <TeacherProvider>
          <Component {...pageProps} />
        </TeacherProvider>
      </AuthProvider>
    </HeroUIProvider>
  );
}