import Link from "next/link";
import { getPostsData } from "../lib/posts";
import path from "path";

const postsDirectory = path.join(process.cwd(), "pages/posts");

export async function getStaticProps() {
  const allPostsData = await getPostsData(postsDirectory);
  return {
    props: {
      allPostsData,
    },
  };
}

export default function Home({ allPostsData }) {
  const linkStyle = { color: "#0070f3", textDecoration: "underline" };
  return (
    <>
      <h1>My blog</h1>
      <ul>
        {allPostsData.map(({ slug, title }) => (
          <li key={slug}>
            <Link href={`/posts/${slug}`}>
              <a style={linkStyle}>{title}</a>
            </Link>
          </li>
        ))}
      </ul>
    </>
  );
}
