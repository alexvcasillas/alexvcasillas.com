import { ThemeProvider } from 'next-themes';
import Script from 'next/script';
import { darkTheme } from '../stitches.config';

function App({ Component, pageProps }) {
  return (
    <ThemeProvider
      attribute='class'
      defaultTheme='system'
      value={{
        dark: darkTheme.className,
        light: 'light',
      }}
    >
      <Component {...pageProps} />
      <Script id='google-analytics' strategy='afterInteractive'>
        {`
          window.ga=window.ga||function(){(ga.q=ga.q||[]).push(arguments)};ga.l=+new Date;
          ga('create', 'UA-78795842-4', 'auto');
          ga('send', 'pageview');
        `}
      </Script>
      <Script
        src='https://www.google-analytics.com/analytics.js'
        strategy='afterInteractive'
      />
    </ThemeProvider>
  );
}

export default App;
