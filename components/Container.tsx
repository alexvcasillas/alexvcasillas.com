import { styled } from '../stitches.config';

export const Container = styled('div', {
  marginX: 'auto',
  paddingX: '$3',

  variants: {
    size: {
      1: {
        maxWidth: '520px',
      },
      2: {
        maxWidth: '900px',
      },
      3: {
        maxWidth: '1024px',
      },
    },
  },
});
