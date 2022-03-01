import Head from 'next/head';
import { styled } from '../stitches.config';
import { useTheme } from 'next-themes';
import { Main } from '../components/Main';
import { ThemeToggle } from '../components/ThemeToggle';

const Box = styled('div', {
  textAlign: 'center',
  minHeight: '100vh',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
});

export default function Home() {
  return (
    <Box
      css={{
        '@bp1': { paddingY: 60 },
        '@bp2': { paddingY: 0 },
        '@bp3': { paddingY: 0 },
      }}
    >
      <Head>
        <title>Alex Casillas - Software Engineer @ Toptal</title>
      </Head>
      <ThemeToggle />
      <Main />
    </Box>
  );
}
