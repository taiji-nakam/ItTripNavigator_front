import '../app/globals.css';
import type { AppProps } from 'next/app';
import { CommonProvider } from "../contexts/commonContext";

function MyApp({ Component, pageProps }: AppProps) {
    return (
      <CommonProvider>
        <Component {...pageProps} />
      </CommonProvider>
    );
  }

export default MyApp;