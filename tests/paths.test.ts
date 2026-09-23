import { describe, it, expect } from 'vitest';
import { cleanPath } from '../src/lib/paths';

describe('cleanPath', () => {
  it('maps /index.html to /', () => expect(cleanPath('/index.html')).toBe('/'));
  it('strips .html from a top-level page', () => expect(cleanPath('/about.html')).toBe('/about'));
  it('strips .html from a nested page', () => expect(cleanPath('/writing/a-new-site.html')).toBe('/writing/a-new-site'));
  it('leaves a clean path alone', () => expect(cleanPath('/about')).toBe('/about'));
  it('strips a trailing slash', () => expect(cleanPath('/about/')).toBe('/about'));
  it('keeps root as /', () => expect(cleanPath('/')).toBe('/'));
});
