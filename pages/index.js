import Head from "next/head";
import Link from "next/link";
import { getDatabase } from "../lib/notion";
import { Text } from "./[id].js";
import styles from "./index.module.css";
import Image from "next/image";
import logo from "../assets/logo.svg";
export const databaseId = process.env.NOTION_DATABASE_ID;

export default function Home({ posts }) {
  return (
    <div>
      <Head>
        <title>Notion Next.js blog</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.container}>
        <header className={styles.header}>
          <div className={styles.logos}>
            <Image priority src={logo} height={75} alt="Ramiro Logo" />
          </div>
          <h1>Ramiro's Blog</h1>
          <p>Software engineering in times of ...</p>
        </header>

        <h2 className={styles.heading}>Posts</h2>
        <ol className={styles.posts}>
          {posts.map((post) => {
            const date = new Date(post.last_edited_time).toLocaleString(
              "en-US",
              {
                month: "short",
                day: "2-digit",
                year: "numeric",
              }
            );
            return (
              <li key={post.id} className={styles.post}>
                <article>
                  <h1 className={styles.postTitle}>
                    <Link href={`/${post.id}`}>
                      <Text text={post.properties.Name.title} />
                    </Link>
                  </h1>
                  <p className={styles.postDescription}>{date}</p>
                  <Link href={`/${post.id}`}>Read post →</Link>
                </article>
              </li>
            );
          })}
        </ol>
      </main>
    </div>
  );
}

export const getStaticProps = async () => {
  const database = await getDatabase(databaseId);

  return {
    props: {
      posts: database,
    },
    revalidate: 1,
  };
};
