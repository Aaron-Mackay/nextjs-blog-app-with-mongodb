import {useState} from 'react';
import {useRouter} from 'next/router';
import styles from '../styles/StateCard.module.css'

export default function StateCard({state, user}) {
    const [selection, setSelection] = useState(state.selection || null)
    const router = useRouter();

    const onSelect = async (e, state) => {
        try {
            console.log(state, e.target.value)
            // Update state
            const res = await fetch('/api/vote', {
                method: 'PATCH',
                body: JSON.stringify({
                    state,
                    vote: e.target.value,
                    category: "pres",
                    userEmail: user.email,
                    lastVoted: new Date()
                }),
            });
            setSelection(e.target.value)
            // reload the page
            return router.push(router.asPath);
        } catch (error) {
            // Stop voting state
            console.log(error)
        }
    }

    return (
        <>
            <div id={state.state + "-card"} className={styles.statecard + (state.selection ? (" " + styles["voted" + state.selection]) : "")}>
                <h3 style={state.state === "washington-dc" ? {} : {textTransform: 'capitalize'}}>
                    {state.state.replace("-", " ").replace("washington dc","Washington DC")}
                </h3>
                <div className={styles.btnGroup + " btn-group"} role={"group"}>
                    <label htmlFor={"rep-" + state.state}
                           className={"btn btn-primary"
                               + (selection === "rep" ? " active" : "")
                               + " " + styles.voteButton}>
                        <input className={"btn-check"} type="radio" name={"vote-" + state.state}
                               value="rep"
                               id={"rep-" + state.state}
                               checked={selection === "rep"}
                               onChange={(e) => onSelect(e, state.state)}/>
                        Republican</label>

                    <label htmlFor={"dem-" + state.state}
                           className={"btn btn-primary"
                               + (selection === "dem" ? " active" : "")
                                + " " + styles.voteButton}>
                        <input className="btn-check" type="radio"
                               name={"vote-" + state.state}
                               value="dem"
                               id={"dem-" + state.state}
                               checked={selection === "dem"}
                               onChange={(e) => onSelect(e, state.state)}/>
                        Democrat</label>
                </div>

            </div>
        </>
    );
}