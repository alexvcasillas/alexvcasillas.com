import { keyframes, styled } from '../stitches.config';
import { ToptalLogo } from '../components/ToptalLogo';
import { useTheme } from 'next-themes';

const Text = styled('p', {
  color: '$hiContrast',
  fontSize: '1.2rem',
  variants: {
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
      cormorant: {
        fontFamily: 'Cormorant, serif',
      },
    },
  },
  defaultVariants: {
    align: 'center',
  },
});

const Link = styled('a', {
  textDecoration: 'none',
  color: '$purple400',
});

const Container = styled('div', {
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

const Grid = styled('div', {
  width: '100%',
  display: 'grid',
  gap: 40,
  alignItems: 'center',
  variants: {
    media: {
      desktop: {
        gridTemplateColumns: 'auto auto auto',
        gridTemplateRows: 'auto',
        gridTemplateAreas: "'left center right'",
      },
      mobile: {
        gridTemplateAreas: "'center' 'left' 'right'",
        gridTemplateColumns: 'auto',
        gridTemplateRows: "'auto auto auto'",
      },
    },
  },
  defaultVariants: {
    media: 'desktop',
  },
});

const Info = styled('div', {
  display: 'flex',
  flexDirection: 'column',
  variants: {
    position: {
      left: {
        gridArea: 'left',
        alignItems: 'flex-start',
        justifyContent: 'flex-start',
      },
      right: {
        gridArea: 'right',
        justifyContent: 'flex-end',
      },
    },
  },
});

const scaleUp = keyframes({
  '0%': { transform: 'scale(1)', opacity: 1 },
  '20%': { transform: 'scale(1.2)', opacity: 0 },
  '100%': { transform: 'scale(1.2)', opacity: 0 },
});

const AvatarWrapper = styled('div', {
  gridArea: 'center',
  borderRadius: 9999,
  padding: 20,
  borderWidth: 1,
  borderStyle: 'solid',
  borderColor: '$gray400',
  margin: '0 auto',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  position: 'relative',

  '&::before': {
    content: '',
    position: 'absolute',
    width: '100%',
    height: '100%',
    borderWidth: 1,
    borderStyle: 'solid',
    borderColor: '$gray400',
    animation: `${scaleUp} 5s ease-in-out 0s infinite`,
    br: 9999,
  },

  '&::after': {
    content: '',
    position: 'absolute',
    width: '100%',
    height: '100%',
    borderWidth: 1,
    borderStyle: 'solid',
    borderColor: '$gray400',
    animation: `${scaleUp} 5s ease-in-out 1s infinite`,
    br: 9999,
  },
});

const Avatar = styled('div', {
  borderRadius: 9999,
  width: 256,
  height: 512,
  background: 'url(alex-casillas.png) no-repeat center center',
  backgroundPosition: 'left center',
});

const VerticalSpacer = styled('div', {
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

export const Main: React.FC<{}> = () => {
  const { resolvedTheme } = useTheme();

  return (
    <Container
      size={{ '@initial': '3', '@bp1': '1', '@bp2': '2', '@bp3': '3' }}
    >
      {/* <StitchesLogo /> */}
      <Text heading='h1' family='marcellus'>
        Alex Casillas
      </Text>
      <Text heading='h2' color='secondary' family='marcellus'>
        Software Engineer
      </Text>
      <Text heading='h2' color='secondary' family='marcellus'>
        Based in Spain
      </Text>
      <VerticalSpacer size='xLarge' />
      <Grid
        media={{
          '@initial': 'mobile',
          '@bp1': 'mobile',
          '@bp2': 'desktop',
          '@bp3': 'desktop',
        }}
      >
        <Info>
          <Text
            heading='h2'
            align={{
              '@initial': 'right',
              '@bp1': 'left',
              '@bp2': 'right',
              '@bp3': 'right',
            }}
            family='marcellus'
          >
            Biography
          </Text>
          <VerticalSpacer size='small' />
          <Text
            align={{
              '@initial': 'right',
              '@bp1': 'left',
              '@bp2': 'right',
              '@bp3': 'right',
            }}
            color='secondary'
          >
            Highly motivated, self-taught technology developer who&apos;s being
            playing around with computers since his early days.
          </Text>
          <VerticalSpacer size='large' />
          <Text
            heading='h2'
            align={{
              '@initial': 'right',
              '@bp1': 'left',
              '@bp2': 'right',
              '@bp3': 'right',
            }}
            family='marcellus'
          >
            Contact
          </Text>
          <VerticalSpacer size='small' />
          <Text
            align={{
              '@initial': 'right',
              '@bp1': 'left',
              '@bp2': 'right',
              '@bp3': 'right',
            }}
            color='secondary'
          >
            Córdoba, Andalucía, Spain
          </Text>
          <VerticalSpacer size='small' />
          <Text
            align={{
              '@initial': 'right',
              '@bp1': 'left',
              '@bp2': 'right',
              '@bp3': 'right',
            }}
            color='secondary'
          >
            Twitter{' '}
            <Link href='https://twitter.com/alexvcasillas' target='_blank'>
              @alexvcasillas
            </Link>
          </Text>
          <Text
            align={{
              '@initial': 'right',
              '@bp1': 'left',
              '@bp2': 'right',
              '@bp3': 'right',
            }}
            color='secondary'
          >
            LinkedIn{' '}
            <Link href='https://linkedin.com/in/alexvcasillas' target='_blank'>
              Alex Casillas
            </Link>
          </Text>
          <VerticalSpacer size='large' />
          <Text
            heading='h2'
            align={{
              '@initial': 'right',
              '@bp1': 'left',
              '@bp2': 'right',
              '@bp3': 'right',
            }}
            family='marcellus'
          >
            Interests
          </Text>
          <VerticalSpacer size='small' />
          <Text
            align={{
              '@initial': 'right',
              '@bp1': 'left',
              '@bp2': 'right',
              '@bp3': 'right',
            }}
            color='secondary'
          >
            JavaScript, NodeJS, Rust Lang, Serverless, PostgreSQL, Open Source,
            Videogames, Game Development
          </Text>
        </Info>
        <AvatarWrapper>
          <Avatar />
        </AvatarWrapper>
        <Info>
          <div>
            <Text heading='h2' align='left' family='marcellus'>
              Years of Experience
            </Text>
            <Text heading='h1' align='left' color='secondary'>
              6
            </Text>
          </div>
          <VerticalSpacer size='large' />
          <div>
            <Text heading='h2' align='left' family='marcellus'>
              Working for
            </Text>
            <VerticalSpacer size='small' />
            <Text heading='h1' align='left'>
              <Link href='https://toptal.com' target='_blank'>
                <ToptalLogo
                  fillText={
                    resolvedTheme === 'light' ? undefined : 'hsl(206,2%,93%)'
                  }
                />
              </Link>
            </Text>
          </div>
          <VerticalSpacer size='large' />
          <div>
            <Text heading='h2' align='left' family='marcellus'>
              Open Source Projects
            </Text>
            <VerticalSpacer size='small' />
            <Text align='left'>
              <Link href='https://github.com/alexvcasillas/animated-styled-components'>
                💅 Animated Styled-Components
              </Link>
            </Text>
            <Text align='left'>
              <Link href='https://github.com/alexvcasillas/cratebox'>
                📦 Cratebox
              </Link>
            </Text>
            <Text align='left'>
              <Link href='https://github.com/alexvcasillas/react-native-loading-dots'>
                🔵 React Native Loading Dots
              </Link>
            </Text>
            <Text align='left'>
              <Link href='https://github.com/alexvcasillas/graphdb'>
                📁 GraphDB
              </Link>
            </Text>
          </div>
        </Info>
      </Grid>

      <VerticalSpacer size='large' />
    </Container>
  );
};
