import '@/styles/globals.css';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { QueryClientProvider } from '@tanstack/react-query';
import { ToastContainer } from 'react-toastify';
import { queryClient } from '@/config/queryClient';
import AuthProvider from '@/context/AuthProvider';
import { Layout } from '@/components/layout';
import type { AppProps } from 'next/app';

export default function App({ Component, pageProps }: AppProps) {
  const router = useRouter();
  const pageNoLayout = ['/auth', '/signup', '/_error'];

  return (
    <QueryClientProvider client={queryClient}>
      <Head>
        <title>Travling</title>
      </Head>

      <AuthProvider>
        {pageNoLayout.includes(router.pathname) ? (
          <Component {...pageProps} />
        ) : (
          <Layout pathname={router.pathname}>
            <Component {...pageProps} />
          </Layout>
        )}
      </AuthProvider>

      <ToastContainer />
    </QueryClientProvider>
  );
}
