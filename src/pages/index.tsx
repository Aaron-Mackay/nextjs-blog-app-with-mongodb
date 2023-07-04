import Head from 'next/head';

import Nav from '../components/Nav';
import Map from '../components/Map'
import StateCard from '../components/StateCard';
import styles from '../styles/Home.module.css';
import { Key } from 'react';
import {useUser} from "@auth0/nextjs-auth0/client";
import {getSession, Session, withPageAuthRequired} from "@auth0/nextjs-auth0";

export default function Home({states}: { states: any }) {
    const {user, error, isLoading} = useUser();
    if (isLoading) return <div>Loading...</div>;
    if (error) return <div>{error.message}</div>;

    function backToTop() {
        document.getElementById("scrollable-states-list").scroll({top: 0, behavior: "smooth"});
        console.log("clicked")
    }

    function scrollFn() {
        console.log("scrolled")
        if (
            document.getElementById("scrollable-states-list").scrollTop > 20
        ) {
            document.getElementById("btn-back-to-top").style.display = "block";
        } else {
            document.getElementById("btn-back-to-top").style.display = "none";
        }
    }

    return (
        <div>
            <Head>
                <title>Home</title>
            </Head>

            <Nav user={user}/>
            <main>
                <div className={styles.gridcontainer}>
                    <div className={styles.map}>
                        <Map states={states}/>
                    </div>
                    <div
                        id="scrollable-states-list"
                        className={styles.maskedOverflow + " " + styles.stateslist}
                        onScroll={scrollFn}>
                        {states.length === 0 ? (
                            <>
                                <h2>States not loaded</h2>
                                <p></p>
                            </>
                        ) : (
                            <>
                                {
                                    states.map((state: any, i: Key | null | undefined) => (
                                        <StateCard state={state} key={state.state} user={user}/>
                                    ))}
                            </>
                        )}
                    </div>
                    <button
                        type="button"
                        className="btn btn-danger btn-floating btn-lg"
                        id="btn-back-to-top"
                        onClick={backToTop}
                    >
                        &#x2191;
                    </button>
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
        let statesArr;
        if (userData) {
            statesArr = await getStatesAndActiveUserVoteData(dev, userData);
        } else {
            statesArr = []
            console.log("UserData empty")
        }

        return {
            props: {
                states: statesArr,
            }
        };
    }
});


async function getStatesAndActiveUserVoteData(dev: boolean, userData: Session) {
    const {DEV_URL, PROD_URL} = process.env;

    // request states from api
    const statesRes = await fetch(`${dev ? DEV_URL : PROD_URL}/api/states`);
    // extract the data
    const statesResJson = await statesRes.json();
    const statesArr: Array<any> = statesResJson['message']

    // request votes from api
    const userVotesRes = await fetch(`${dev ? DEV_URL : PROD_URL}/api/vote?user=${userData.user.email}`);
    // extract the data
    const userVotesResJson = await userVotesRes.json();
    const userVotesArr: Array<any> = userVotesResJson['message']

    // go through each userVote, add it to state
    userVotesArr.forEach(userVote => {
        const matchedState = statesArr.find(state => state.state === userVote.state)
        matchedState.selection = userVote.vote;
    })
    return statesArr;
}