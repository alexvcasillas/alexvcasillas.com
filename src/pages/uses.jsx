import Head from 'next/head'

import { Card } from '@/components/Card'
import { Section } from '@/components/Section'
import { SimpleLayout } from '@/components/SimpleLayout'

function ToolsSection({ children, ...props }) {
  return (
    <Section {...props}>
      <ul role="list" className="space-y-16">
        {children}
      </ul>
    </Section>
  )
}

function Tool({ title, href, children }) {
  return (
    <Card as="li">
      <Card.Title as="h3" href={href}>
        {title}
      </Card.Title>
      <Card.Description>{children}</Card.Description>
    </Card>
  )
}

export default function Uses() {
  return (
    <>
      <Head>
        <title>Uses - Spencer Sharp</title>
        <meta
          name="description"
          content="Software I use, gadgets I love, and other things I recommend."
        />
      </Head>
      <SimpleLayout
        title="Software I use, gadgets I love, and other things I recommend."
        intro="The things I use to build software, stay productive, or just because I feel like."
      >
        <div className="space-y-20">
          <ToolsSection title="Working environment">
            <Tool title="16” MacBook Pro 2016, 16GB RAM (2016)">
              My first real working tool. Prior to this I didn't know how does a
              MacBook felt and the difference is night and day. Nowadays the
              fans turn on very often, even under not much heavy loads I put it
              so it's starting to feel like it's time for an M2 😜 (pst.. don't
              tell my wife)
            </Tool>
            <Tool title="Workstation">
              Intel i9 9900K 3.6GHz. Asus NVIDIA RTX 2060 Dual 6GB. Corsair
              Vengeance RGB Pro 32 GB x 2. Asus Intel Z390 ATX.
            </Tool>
          </ToolsSection>
          <ToolsSection title="Development tools">
            <Tool title="Visual Studio Code">
              Ever heard about VIM? We don't do that here 🤫 Productivity bla
              bla bla, not my thing 🤣
            </Tool>
            <Tool title="Warp">
              Best terminal ever made. Otherwise Hyper ⚡️
            </Tool>
            <Tool title="WSL2">
              Want to feel like working on a Linux environment but in Windows?
              Say no more 🙅‍♂️ it has its things, but I'm happy about it 😌
            </Tool>
          </ToolsSection>
          <ToolsSection title="Design">
            <Tool title="Figma">
              We all know and love Figma. This is where I made designs,
              logotypes, social media stuff and who knows what else we can do
              there 🤷‍♂️
            </Tool>
          </ToolsSection>
          {/* <ToolsSection title="Productivity">
            <Tool title="Alfred">
              It’s not the newest kid on the block but it’s still the fastest.
              The Sublime Text of the application launcher world.
            </Tool>
            <Tool title="Reflect">
              Using a daily notes system instead of trying to keep things
              organized by topics has been super powerful for me. And with
              Reflect, it’s still easy for me to keep all of that stuff
              discoverable by topic even though all of my writing happens in the
              daily note.
            </Tool>
            <Tool title="SavvyCal">
              Great tool for scheduling meetings while protecting my calendar
              and making sure I still have lots of time for deep work during the
              week.
            </Tool>
            <Tool title="Focus">
              Simple tool for blocking distracting websites when I need to just
              do the work and get some momentum going.
            </Tool>
          </ToolsSection> */}
        </div>
      </SimpleLayout>
    </>
  )
}
