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
                👋 Hey there, I'm a Senior Software Engineer at Toptal. I'm a
                self-taught techie with a solid track record in Software as a
                Service (SaaS) development. I've got a knack for JavaScript and
                many other tools like React, React Native, Vue, Angular,
                SwiftUI, and C#. Along with those, I've got a good handle on
                UX/UI design. I love learning new technologies and keeping my
                skills fresh and up-to-date.
              </p>

              <p>
                Outside the tech world, I'm an entrepreneur always brainstorming
                and breathing life into new projects. It's one of the ways I
                keep growing as a programmer. Unity3D is my go-to for making my
                own games. It's all part of becoming a better version of myself,
                one line of code at a time.
              </p>

              <p>
                But hey, life isn't all about work, right? I love hanging out
                with friends, playing video games, and occasionally going out
                for drinks and a good laugh. I try to keep fit by hitting the
                gym and eating healthy, but who can resist a good pizza or a
                juicy steak? I'm a bit of a songbird 🎵 and a proud cat dad to
                two amazing felines 😸😻
              </p>

              <p>
                To help others navigate the world of Node.js/Web Development, I
                wrote a book all about JavaScript. You can check it out if you
                like. Here's where you can get a printed copy 👉
                <Link
                  href="https://www.amazon.com/Alex-Casillas/dp/B0BW2GGHHT"
                  className="inline-flex font-medium text-zinc-800 transition hover:text-teal-500 dark:text-zinc-200 dark:hover:text-teal-500"
                >
                  Amazon
                </Link>{' '}
                and here for a digital one 👉
                <Link
                  href="https://alexcasillas.gumroad.com/l/javascript-cooking-book"
                  className="inline-flex font-medium text-zinc-800 transition hover:text-teal-500 dark:text-zinc-200 dark:hover:text-teal-500"
                >
                  Gumroad
                </Link>
              </p>

              <p>
                One more thing about me: I've always dreamed of traveling around
                the world, discovering places that, until now, have only lived
                in my imagination. Let's see where this journey takes us!
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
