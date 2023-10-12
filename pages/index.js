import Head from "next/head";
import Link from "next/link";
import { getDatabase } from "../lib/notion";
import { Text } from "./[id].js";
import styles from "./index.module.css";
import Image from "next/image";
import logo from "../assets/logo.svg";
export const databaseId = process.env.NOTION_DATABASE_ID;

export default function Home({ posts }) {
  console.log(posts[0]);
  return (
    <div>
      <Head>
        <title>Ramiro's Tech Blog</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.container}>
        <header className={styles.header}>
          <div className={styles.logos}>
            <Image priority src={logo} height={75} alt="Ramiro Logo" />
          </div>
          <h1>Ramiro's Tech Blog</h1>
          <p>Reflections of a technologist</p>
        </header>

        <h2 className={styles.heading}>Latest Posts</h2>
        <ol className={styles.posts}>
          {posts.map((post) => {
            const date = new Date(
              post.properties.Created.created_time
            ).toLocaleString("en-US", {
              month: "short",
              day: "2-digit",
              year: "numeric",
            });
            return (
              <li key={post.id} className={styles.post}>
                <article>
                  <header>
                    <h1 className={styles.postTitle}>
                      <Link href={`/${post.id}`}>
                        <Text text={post.properties.Name.title} />
                      </Link>
                    </h1>
                    <time className={styles.postDescription}>{date}</time>
                  </header>
                  <footer>
                    {post.properties.Tags.multi_select.map((tag) => (
                      <span>{tag.name} - </span>
                    ))}
                  </footer>
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
