import { useEffect, useState } from 'react';
import { useTheme } from 'next-themes';

import { styled } from '../stitches.config';

import MoonSvg from './svg/Moon';
import SunSvg from './svg/Sun';

const Button = styled('button', {
  cursor: 'pointer',
  position: 'absolute',
  top: 20,
  right: 20,
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',
  gap: 10,
  backgroundColor: '$background',
  transition: 'background-color 0.3s ease-in-out',
  border: 0,
  outline: 'none',
});

const Moon = styled(MoonSvg, {
  fill: '$invertedBackground',
});

export const ThemeToggle = () => {
  const [mounted, setMounted] = useState(false);
  const { setTheme, resolvedTheme } = useTheme();

  useEffect(() => setMounted(true), []);

  if (!mounted) return null;

  const toggleTheme = () => {
    const targetTheme = resolvedTheme === 'light' ? 'dark' : 'light';

    setTheme(targetTheme);
  };

  return (
    <Button onClick={toggleTheme}>
      {resolvedTheme === 'dark' && <Moon />}
      {resolvedTheme === 'light' && <SunSvg />}
    </Button>
  );
};
