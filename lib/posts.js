import { readFile, readdir } from "fs/promises";

import matter from "gray-matter";
import path from "path";

export async function getPostsData(postsDirectory) {
  const dirents = await readdir(postsDirectory, { withFileTypes: true });
  return Promise.all(
    dirents
      .filter((dirent) => dirent.isFile())
      .map((dirent) => dirent.name)
      .map((fileName) => {
        const slug = fileName.replace(/\.mdx$/, "");
        const fullPath = path.join(postsDirectory, fileName);
        return readFile(fullPath, "utf8").then((fileContents) => {
          const matterResult = matter(fileContents);
          return {
            slug,
            ...matterResult.data,
          };
        });
      })
  );
}
