import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import { type AppType } from "next/dist/shared/lib/utils";
import Layout from "../components/layout/Layout.component";

import "../styles/globals.css";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
    },
  },
});

const MyApp: AppType = ({ Component, pageProps }) => {
  return (
    <QueryClientProvider client={queryClient}>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </QueryClientProvider>
  );
};

export default MyApp;
