import type {AppProps} from 'next/app'
import {UserProvider} from '@auth0/nextjs-auth0/client';

import 'bootstrap/dist/css/bootstrap.css'
import '@/styles/globals.css'
import '../styles/Map.css'

export default function App({Component, pageProps}: AppProps) {
    return (
        // <UserProvider>
            <Component {...pageProps} />
        // </UserProvider>
    )

}
