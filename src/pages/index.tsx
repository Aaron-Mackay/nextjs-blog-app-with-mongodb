import Head from 'next/head';

import Nav from '../components/Nav';
import Map from '../components/Map'
import StateCard from '../components/StateCard';
import styles from '../styles/Home.module.css';
import { Key } from 'react';
import {useUser} from "@auth0/nextjs-auth0/client";
import {getSession, withPageAuthRequired} from "@auth0/nextjs-auth0";

export default function Home({ states }: { states: any }) {
    const {user, error, isLoading} = useUser(); //move to serverside
    if (isLoading) return <div>Loading...</div>;
    if (error) return <div>{error.message}</div>;

    return (
        <div>
            <Head>
                <title>Home</title>
            </Head>

            <Nav user={user}/>

            <main>
                <Map states={states}/>
                <div className={styles.container}>
                    {states.length === 0 ? (
                        <h2>No added states</h2>
                    ) : (
                        <ul>
                            {states.map((state: any, i: Key | null | undefined) => (
                                <StateCard state={state} key={i} user={user}/>
                            ))}
                        </ul>
                    )}
                </div>
            </main>
        </div>
    );
}

export const getServerSideProps = withPageAuthRequired({
    async getServerSideProps(ctx) {
        const userData = await getSession(ctx.req, ctx.res);

        // get the current environment
        const dev = process.env.NODE_ENV !== 'production';
        const statesArr = await getStatesAndVoteData(dev, userData);

        return {props: {
                states: statesArr,
            }};
    }
});


async function getStatesAndVoteData(dev: boolean, userData: Session | null | undefined) {
    const {DEV_URL, PROD_URL} = process.env;

    // request states from api
    const statesRes = await fetch(`${dev ? DEV_URL : PROD_URL}/api/states`);
    // extract the data
    const statesResJson = await statesRes.json();
    const statesArr = statesResJson['message']

    // request votes from api
    const userVotesRes = await fetch(`${dev ? DEV_URL : PROD_URL}/api/vote?user=` + userData.user.email);
    // extract the data
    const userVotesResJson = await userVotesRes.json();
    const userVotesArr = userVotesResJson['message']

    // go through each userVote, add it to state
    userVotesArr.forEach(userVote => {
        const matchedState = statesArr.find(state => state.state === userVote.state)
        matchedState.selection = userVote.vote;
    })
    return statesArr;
}