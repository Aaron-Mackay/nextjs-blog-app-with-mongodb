import Head from 'next/head';

import Nav from '../components/Nav';
import StateCard from '../components/StateCard';
import styles from '../styles/Home.module.css';
import { Key } from 'react';

export default function Home({ states }: { states: any }) {
    return (
        <div>
            <Head>
                <title>Home</title>
            </Head>

            <Nav />

            <main>
                <div className={styles.container}>
                    {states.length === 0 ? (
                        <h2>No added states</h2>
                    ) : (
                        <ul>
                            {states.map((state: any, i: Key | null | undefined) => (
                                <StateCard state={state} key={i} />
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

    // request states from api
    const response = await fetch(`${dev ? DEV_URL : PROD_URL}/api/states`);
    // extract the data
    const data = await response.json();

    return {
        props: {
            states: data['message'],
        },
    };
}