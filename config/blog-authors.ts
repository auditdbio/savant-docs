export interface BlogAuthor {
  key: string;
  name: string;
  title: string;
  url?: string;
  imageUrl?: string;
  x?: string;
  github?: string;
}

/** Mirrors content/blog/authors.yml (kept as TS to avoid a runtime YAML dependency). */
export const BLOG_AUTHORS: Record<string, BlogAuthor> = {
  snjax: {
    key: "snjax",
    name: "Igor Gulamov",
    title: "ZK Researcher and AI Security Enthusiast",
    url: "https://github.com/snjax",
    imageUrl:
      "https://avatars.githubusercontent.com/u/1750575?s=400&u=0ca6b8ce8ff95d3f3d172216c95371e589e6d23e",
    x: "igorgulamov",
    github: "snjax",
  },
  alexandra: {
    key: "alexandra",
    name: "Alexandra Gulamova",
    title: "Co-founder Savant.Chat",
    imageUrl: "/img/alexandra_gulamova.jpg",
    x: "alexgulamova",
  },
};

export function getAuthor(key: string): BlogAuthor {
  return BLOG_AUTHORS[key] ?? { key, name: key, title: "" };
}
