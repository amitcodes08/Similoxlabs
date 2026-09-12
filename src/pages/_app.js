import { useState } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { HeroUIProvider } from "@heroui/react";
import { useRouter } from "next/router";
import { AuthProvider } from "@/context/AuthContext";
import { TeacherProvider } from "@/context/TeacherContext";
import "../styles/globals.css";

export default function App({ Component, pageProps }) {
  const router = useRouter();

  // Keep a single stable QueryClient per browser session
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            staleTime: 1000 * 60 * 10, // 10 minutes cache
            gcTime: 1000 * 60 * 60, // 1 hour garbage collection
            refetchOnWindowFocus: false,
            retry: 1
          }
        }
      })
  );

  return (
    <QueryClientProvider client={queryClient}>
      <HeroUIProvider navigate={router.push}>
        <AuthProvider>
          <TeacherProvider>
            <Component {...pageProps} />
          </TeacherProvider>
        </AuthProvider>
      </HeroUIProvider>
    </QueryClientProvider>
  );
}