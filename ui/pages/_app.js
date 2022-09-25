import Head from "next/head";
import "../styles/globals.css";
const noOverlayWorkaroundScript = `
    window.addEventListener('error', event => {
      event.stopImmediatePropagation()
    })

    window.addEventListener('unhandledrejection', event => {
      event.stopImmediatePropagation()
    })
  `;
function MyApp({ Component, pageProps }) {
  return (
    <>
      <Head>
        {process.env.NODE_ENV !== "production" && (
          <script
            dangerouslySetInnerHTML={{ __html: noOverlayWorkaroundScript }}
          />
        )}
      </Head>
      <Component {...pageProps} />
    </>
  );
}

export default MyApp;
