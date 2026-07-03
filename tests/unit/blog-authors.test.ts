import {existsSync, readFileSync} from 'node:fs';
import path from 'node:path';

const authorsPath = path.resolve(process.cwd(), 'blog/authors.yml');
const authorsSource = existsSync(authorsPath) ? readFileSync(authorsPath, 'utf8') : '';

type AuthorImage = {
  id: string;
  imageUrl: string;
};

function authorImages(): AuthorImage[] {
  const authors: AuthorImage[] = [];
  let currentId = '';

  for (const line of authorsSource.split('\n')) {
    const authorMatch = line.match(/^([a-z0-9_-]+):\s*$/i);
    if (authorMatch) {
      currentId = authorMatch[1];
      continue;
    }

    const imageMatch = line.match(/^\s+image_url:\s*(.+?)\s*$/);
    if (currentId && imageMatch) {
      authors.push({
        id: currentId,
        imageUrl: imageMatch[1].replace(/^['"]|['"]$/g, ''),
      });
    }
  }

  return authors;
}

function staticPathFor(imageUrl: string): string | null {
  if (/^https?:\/\//.test(imageUrl)) {
    return null;
  }

  return path.resolve(process.cwd(), 'static', imageUrl.replace(/^\//, ''));
}

describe('blog author avatars', () => {
  it('keeps every local author image_url backed by a static asset', () => {
    const missing = authorImages()
      .map(author => ({...author, staticPath: staticPathFor(author.imageUrl)}))
      .filter(author => author.staticPath !== null)
      .filter(author => !existsSync(author.staticPath as string))
      .map(author => `${author.id}: ${author.imageUrl}`);

    expect(missing).toEqual([]);
  });

  it('ships Alexandra Gulamova avatar', () => {
    const avatarPath = path.resolve(process.cwd(), 'static/img/alexandra_gulamova.jpg');

    expect(existsSync(avatarPath)).toBe(true);
  });
});
