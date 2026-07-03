import {existsSync, readFileSync} from 'node:fs';
import path from 'node:path';

const staticImgDir = path.resolve(process.cwd(), 'static/img');
const lightLogoPath = path.join(staticImgDir, 'logo_short.svg');
const darkLogoPath = path.join(staticImgDir, 'logo_short_dark.svg');

describe('savant logo assets', () => {
  it('includes the light short logo with the amber mark color', () => {
    expect(existsSync(lightLogoPath)).toBe(true);

    const svg = existsSync(lightLogoPath) ? readFileSync(lightLogoPath, 'utf8') : '';
    expect(svg.toLowerCase()).toContain('#fe9900');
  });

  it('includes a dark short logo without the black outline color', () => {
    expect(existsSync(darkLogoPath)).toBe(true);

    const svg = existsSync(darkLogoPath) ? readFileSync(darkLogoPath, 'utf8') : '';
    expect(svg.toLowerCase()).not.toContain('#020202');
  });
});
