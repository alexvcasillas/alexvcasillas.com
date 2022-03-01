import { styled } from '../stitches.config';

export const VerticalSpacer = styled('div', {
  variants: {
    size: {
      small: {
        padding: '10px 0',
      },
      medium: {
        padding: '15px 0',
      },
      large: {
        padding: '20px 0',
      },
      xLarge: {
        padding: '40px 0',
      },
    },
  },
});
