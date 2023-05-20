// pages/_app.js
import { Inter, Montserrat } from 'next/font/google'

import "@/styles/globals.scss";
import 'normalize.css/normalize.css';
import type { AppProps } from "next/app";
import { Layout } from "@/components/global";
import { useReducer } from 'react';

// If loading a variable font, you don't need to specify the font weight
const poppins = Montserrat({
  subsets: ['latin'],
  weight: ['300', '500', '700'],
  style: ['italic', 'normal']
})

export default function App({ Component, pageProps }: AppProps) {
  return (
    <Layout>
      <div className={poppins.className}>
        <Component {...pageProps} />
      </div>
    </Layout>
  );
}
