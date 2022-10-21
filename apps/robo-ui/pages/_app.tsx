import { ApolloProvider } from '@apollo/client';
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import { AppProps } from 'next/app';
import Head from 'next/head';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { TouchBackend } from 'react-dnd-touch-backend';
import { apolloClient } from '../apollo/client';
import Layout from '../components/layout/layout';
import useDeviceTouchscreenDetector from '../components/use-device-touchscreen-detector/use-device-touchscreen-detector';

import './styles.css';

function CustomApp({ Component, pageProps }: AppProps) {
    const deviceHasTouchscreen = useDeviceTouchscreenDetector();

    // deviceHasTouchscreen will be null for a fraction of a second when the page first renders.
    // There's probably a better way to solve this problem, but once the <DndProvider> is rendered
    // with one 'backend', it doesn't seem to re-render if we need to switch the backend after
    // detecting a touchscreen.
    if (deviceHasTouchscreen === null) {
        return null;
    }
    return (
        <DndProvider
            backend={deviceHasTouchscreen ? TouchBackend : HTML5Backend}
        >
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
        </DndProvider>
    );
}

export default CustomApp;
