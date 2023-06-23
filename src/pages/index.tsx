import Head from 'next/head';

import Nav from '../components/Nav';
import PostCard from '../components/PostCard';
import styles from '../styles/Home.module.css';

export default function Home({ posts }) {
  return (
      <div>
        <Head>
          <title>Home</title>
        </Head>

        <Nav />

        <main>
          <div className={styles.container}>
            {posts.length === 0 ? (
                <h2>No added posts</h2>
            ) : (
                <ul>
                  {posts.map((post, i) => (
                      <PostCard post={post} key={i} />
                  ))}
                </ul>
            )}
          </div>
        </main>
      </div>
  );
}

export async function getServerSideProps(ctx) {

  return {
    props: {
      posts: ['message'],
    },
  };
}