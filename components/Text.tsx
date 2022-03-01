import { styled } from '../stitches.config';

export const Text = styled('p', {
  color: '$hiContrast',
  fontSize: '1.2rem',
  transition: 'color 0.3s ease-in-out',
  variants: {
    size: {
      small: {
        fontSize: '1rem',
      },
    },
    heading: {
      h1: {
        fontSize: '2.8rem',
      },
      h2: {
        fontSize: '1.8rem',
      },
    },
    align: {
      left: {
        textAlign: 'left',
      },
      center: {
        textAlign: 'center',
      },
      right: {
        textAlign: 'right',
      },
    },
    color: {
      secondary: {
        color: '$loContrast',
      },
    },
    family: {
      marcellus: {
        fontFamily: 'Marcellus, serif',
        fontWeight: 400,
      },
    },
  },
  defaultVariants: {
    align: 'center',
  },
});
