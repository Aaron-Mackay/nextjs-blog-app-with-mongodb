import Head from 'next/head';

import Nav from '../components/Nav';
import ShadedStateCard from "@/components/ShadedStateCard";
import styles from '../styles/Home.module.css';
import {useUser} from "@auth0/nextjs-auth0/client";
import {withPageAuthRequired} from "@auth0/nextjs-auth0";
import {Key} from "react";


export default function AllVotes({states}: { states: any }) {
    const {user, error, isLoading} = useUser();
    if (isLoading) return <div>Loading...</div>;
    if (error) return <div>{error.message}</div>;

    return (
        <div style={{height: "100vh"}}>
            <Head>
                <title>Home</title>
            </Head>

            <Nav user={user}/>
            <main>
                <div className={styles.gridcontainer}>
                    {/*TODO make css editing thing*/}
                    {/*<div className={styles.map}>*/}
                    {/*    <ShadeMap states={states}/>*/}
                    {/*</div>*/}
                    {/*TODO different version of statecards, to show vote balance*/}
                    <div className={styles.stateslist}>
                        {states.length === 0 ? (
                            <>
                                <h2>States not loaded</h2>
                                <p></p>
                            </>
                        ) : (
                            <>
                                {
                                    states.map((state: any, i: Key | null | undefined) => (
                                        <ShadedStateCard state={state} key={state.state} user={user}/>
                                    ))}
                            </>
                        )}
                    </div>
                </div>
            </main>
        </div>
    );
}

export const getServerSideProps = withPageAuthRequired({
    async getServerSideProps(ctx) {
        // get the current environment
        const dev = process.env.NODE_ENV !== 'production';
        let statesArr;

        statesArr = await getStatesAndAllVoteData(dev);

        return {
            props: {
                states: statesArr,
            }
        };
    }
});


async function getStatesAndAllVoteData(dev: boolean) {
    const {DEV_URL, PROD_URL} = process.env;

    // request states from api
    const statesRes = await fetch(`${dev ? DEV_URL : PROD_URL}/api/states`);
    // extract the data
    const statesResJson = await statesRes.json();
    const statesArr: Array<any> = statesResJson['message']
    statesArr.forEach(state => {
        state.demVotes = 0;
        state.repVotes = 0;
    })

    // request votes from api
    const userVotesRes = await fetch(`${dev ? DEV_URL : PROD_URL}/api/vote`);
    // extract the data
    const userVotesResJson = await userVotesRes.json();
    const userVotesArr: Array<any> = userVotesResJson['message']

    // go through each userVote, tot up votes on state
    userVotesArr.forEach(userVote => {
        const matchedState = statesArr.find(state => state.state === userVote.state)
        switch (userVote.vote) {
            case 'dem':
                matchedState.demVotes++;
                break;
            case 'rep':
                matchedState.repVotes++;
                break;
        }
    })
    return statesArr;
}