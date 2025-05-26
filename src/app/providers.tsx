'use client';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactNode, useState } from 'react';
import { ApolloProvider } from "@apollo/client";
import {client} from "@lib/graphql/apolloClient"

export default function Providers({ children }: { children: ReactNode }) {
  const [queryClient] = useState(() => new QueryClient());

  return (
    <ApolloProvider client={client}>
  <QueryClientProvider client={queryClient}>
    {children}
    </QueryClientProvider>
    </ApolloProvider>
);
}