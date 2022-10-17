import { ApolloProvider } from '@apollo/client';
import { AppProps } from 'next/app';
import Head from 'next/head';
import { apolloClient } from '../apollo/client';
import Layout from '../components/layout/layout';

import './styles.css';

function CustomApp({ Component, pageProps }: AppProps) {
    return (
        <ApolloProvider client={apolloClient}>
            <Head>
                <title>RoBo</title>
            </Head>
            <Layout>
                <main className="app">
                    <Component {...pageProps} />
                </main>
            </Layout>
        </ApolloProvider>
    );
}

export default CustomApp;
