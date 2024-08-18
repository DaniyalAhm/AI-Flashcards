// pages/_app.js
import '/home/daniyal/FlashCard-App/frontend/src/app/globals.css'

import { ClerkProvider } from '@clerk/nextjs';


function MyApp({ Component, pageProps }) {
  <ClerkProvider>
  return <Component {...pageProps} />
  </ClerkProvider>
}

export default MyApp;
