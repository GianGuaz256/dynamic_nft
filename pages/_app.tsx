/** Uncomment the below codeblock if you want to add google analytics for more info please visit our docs analytics section */
/** 
import { useEffect } from 'react';
import Router from 'next/router';
import { initGA, logPageView } from 'analytics';
*/

import '@fontsource/archivo';
import '@fontsource/archivo/600.css';
import '@fontsource/dm-sans';
import '@fontsource/dm-sans/500.css';
import '@fontsource/dm-sans/700.css';
import type { AppProps } from 'next/app'
import 'rc-drawer/assets/index.css';
import { useEffect } from 'react';
import '../styles/globals.css'
import 'react-modal-video/css/modal-video.min.css';
import { MoralisProvider } from "react-moralis";
import getConfig from "next/config";
const { publicRuntimeConfig } = getConfig();
import { APP_ID, SERVER_URL} from '../config'
import Head from 'next/head'

export default function CustomApp({ Component, pageProps }: AppProps) {
  
   useEffect(() => {
     console.log(SERVER_URL)
     //initGA();
     //logPageView();
     //Router.events.on('routeChangeComplete', logPageView);
   }, []);

  return (
    <MoralisProvider appId={publicRuntimeConfig.APP_ID} serverUrl={publicRuntimeConfig.SERVER_URL}>
      <Head>
          <title>Dynamic NFT</title>
      </Head>
      <Component {...pageProps} />
    </MoralisProvider>
  )
}




/*import '../styles/globals.css'
import type { AppProps } from 'next/app'

function MyApp({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />
}
export default MyApp*/
