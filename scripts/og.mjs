import sharp from 'sharp';
import { writeFile } from 'node:fs/promises';

const svg = `
<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630" viewBox="0 0 1200 630">
  <rect width="1200" height="630" fill="#F6F2E8"/>
  <rect x="0" y="470" width="1200" height="160" fill="#0C1B24"/>
  <text x="96" y="230" font-family="Georgia, serif" font-size="92" fill="#1F2A26" letter-spacing="-2">I make small, quiet software.</text>
  <text x="96" y="330" font-family="Georgia, serif" font-size="72" font-style="italic" fill="#2F5D4A" letter-spacing="-1">For the web, and for your pocket.</text>
  <text x="96" y="560" font-family="Helvetica, Arial, sans-serif" font-size="30" fill="#F3E9D6">Alex Casillas</text>
  <text x="1104" y="560" text-anchor="end" font-family="Helvetica, Arial, sans-serif" font-size="30" fill="#E9B85C">alexvcasillas.com</text>
</svg>`;

const png = await sharp(Buffer.from(svg)).png().toBuffer();
await writeFile(new URL('../public/og.png', import.meta.url), png);
console.log('wrote public/og.png');
