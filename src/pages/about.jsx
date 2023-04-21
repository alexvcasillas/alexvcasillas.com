import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'
import clsx from 'clsx'

import { Container } from '@/components/Container'
import {
  GitHubIcon,
  InstagramIcon,
  LinkedInIcon,
  TwitterIcon,
} from '@/components/SocialIcons'
import portraitImage from '@/images/portrait.webp'

function SocialLink({ className, href, children, icon: Icon }) {
  return (
    <li className={clsx(className, 'flex')}>
      <Link
        href={href}
        className="group flex text-sm font-medium text-zinc-800 transition hover:text-teal-500 dark:text-zinc-200 dark:hover:text-teal-500"
      >
        <Icon className="h-6 w-6 flex-none fill-zinc-500 transition group-hover:fill-teal-500" />
        <span className="ml-4">{children}</span>
      </Link>
    </li>
  )
}

function MailIcon(props) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" {...props}>
      <path
        fillRule="evenodd"
        d="M6 5a3 3 0 0 0-3 3v8a3 3 0 0 0 3 3h12a3 3 0 0 0 3-3V8a3 3 0 0 0-3-3H6Zm.245 2.187a.75.75 0 0 0-.99 1.126l6.25 5.5a.75.75 0 0 0 .99 0l6.25-5.5a.75.75 0 0 0-.99-1.126L12 12.251 6.245 7.187Z"
      />
    </svg>
  )
}

export default function About() {
  return (
    <>
      <Head>
        <title>About - Alex Casillas</title>
        <meta
          name="description"
          content="I'm Alex Casillas. I live in Córdoba, where I work and enjoy life"
        />
      </Head>
      <Container className="mt-16 sm:mt-32">
        <div className="grid grid-cols-1 gap-y-16 lg:grid-cols-2 lg:grid-rows-[auto_1fr] lg:gap-y-12">
          <div className="lg:pl-20">
            <div className="max-w-xs px-2.5 lg:max-w-none">
              <Image
                src={portraitImage}
                alt=""
                sizes="(min-width: 1024px) 32rem, 20rem"
                className="aspect-square rotate-3 rounded-2xl bg-zinc-100 object-cover dark:bg-zinc-800"
                placeholder="blur"
              />
            </div>
          </div>
          <div className="lg:order-first lg:row-span-2">
            <h1 className="text-4xl font-bold tracking-tight text-zinc-800 dark:text-zinc-100 sm:text-5xl">
              I'm Alex Casillas. I live in Córdoba, where I work and enjoy life
            </h1>
            <div className="mt-6 space-y-7 text-base text-zinc-600 dark:text-zinc-400">
              <p>
                Senior Software Engineer @ Toptal. Highly motivated, self-taught
                technology developer with years of Software as a Service (SaaS)
                developing experience. Expert in JavaScript. Exceptional at
                React, React Native, Vue, Angular, SwiftUI, C#, and UX/UI
                abilities/skills. I am constantly learning and adapting to new
                technologies to improve my skills and self.
              </p>
              <p>
                A little about me: I'm an entrepreneur. I am always thinking
                about new projects and developing them to improve my skills and
                become a better programmer every day. I like to go to Global
                Game Jams every year to challenge myself in game development and
                meet new people. I work with Unity3D making my own games to
                improve myself.
              </p>
              <p>
                I love to play video games with my friends and hang out for some
                drinks and fun. I like to go to the gym in my spare time and eat
                healthy food (but I won't say no to a good pizza or a tasty
                steak). I like to sing, I sing all the time. I have a passion
                for my cats (got two and they're awesome!).
              </p>
              <p>
                I have written a book about JavaScript to help everyone
                bootstrap their careers into the Nodejs/Web Development world.
                You can grab your printed copy on{' '}
                <Link
                  href="https://www.amazon.com/Alex-Casillas/dp/B0BW2GGHHT"
                  className="inline-flex font-medium text-zinc-800 transition hover:text-teal-500 dark:text-zinc-200 dark:hover:text-teal-500"
                >
                  Amazon
                </Link>{' '}
                or you can grab your digital copy on{' '}
                <Link
                  href="https://alexcasillas.gumroad.com/l/javascript-cooking-book"
                  className="inline-flex font-medium text-zinc-800 transition hover:text-teal-500 dark:text-zinc-200 dark:hover:text-teal-500"
                >
                  Gumroad
                </Link>
                .
              </p>
              <p>
                I had a wish/dream since I was a child and it's to travel around
                the world and discover places that are only in my imagination!
              </p>
            </div>
          </div>
          <div className="lg:pl-20">
            <ul role="list">
              <SocialLink
                href="https://twitter.com/alexvcasillas"
                icon={TwitterIcon}
              >
                Follow on Twitter
              </SocialLink>
              <SocialLink
                href="https://instagram.com/alexvcasillas"
                icon={InstagramIcon}
                className="mt-4"
              >
                Follow on Instagram
              </SocialLink>
              <SocialLink
                href="https://github.com/alexvcasillas"
                icon={GitHubIcon}
                className="mt-4"
              >
                Follow on GitHub
              </SocialLink>
              <SocialLink
                href="https://linkedin.com/in/alexvcasillas"
                icon={LinkedInIcon}
                className="mt-4"
              >
                Follow on LinkedIn
              </SocialLink>
            </ul>
          </div>
        </div>
      </Container>
    </>
  )
}
