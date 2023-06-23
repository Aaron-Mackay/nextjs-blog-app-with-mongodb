import Head from 'next/head';

import Nav from '../components/Nav';
import PostCard from '../components/PostCard';
import styles from '../styles/Home.module.css';
import { Key } from 'react';

export default function Home({ posts }: { posts: any }) {
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
                            {posts.map((post: any, i: Key | null | undefined) => (
                                <PostCard post={post} key={i} />
                            ))}
                        </ul>
                    )}
                </div>
            </main>
        </div>
    );
}

export async function getServerSideProps(ctx: any) {
    // get the current environment
    const dev = process.env.NODE_ENV !== 'production';
    const { DEV_URL, PROD_URL } = process.env;

    // request posts from api
    const response = await fetch(`${dev ? DEV_URL : PROD_URL}/api/posts`);
    // extract the data
    const data = await response.json();

    return {
        props: {
            posts: data['message'],
        },
    };
}