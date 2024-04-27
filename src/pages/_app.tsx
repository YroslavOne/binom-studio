import "@/styles/globals.css";
import { ConfigProvider } from "antd";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import {
  HydrationBoundary,
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";
import theme from "./theme/themeConfig";
import { AppProps } from "next/app";
import { useState } from "react";

export default function App({ Component, pageProps }: AppProps) {
  const [queryClient] = useState(() => new QueryClient());

  return (
    <ConfigProvider theme={theme}>
      <QueryClientProvider client={queryClient}>
        <HydrationBoundary state={pageProps.dehydratedState}>
          <Component {...pageProps} />
        </HydrationBoundary>
        <ReactQueryDevtools />
      </QueryClientProvider>
    </ConfigProvider>
  );
}
