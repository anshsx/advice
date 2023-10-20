/** @format */
'use client'


import { QueryClient, QueryClientProvider, useQuery } from "react-query";

const queryClient = new QueryClient();

type Props = {
  children: React.ReactNode;
};

export default function QueryWrappper({ children }: Props) {
  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
}
