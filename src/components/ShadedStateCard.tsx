import styles from "@/styles/StateCard.module.css";
import getBackgroundColor from "@/getBackgroundColor";

export default function ShadedStateCard({state}: { state: any }) {

    return (
        <>
            <div style={{backgroundColor: getBackgroundColor(state.demVotes, state.repVotes)}}
                 className={styles.statecard}>
                <h3 style={state.state === "washington-dc" ? {} : {textTransform: 'capitalize'}}>
                    {state.state.replace("-", " ").replace("washington dc", "Washington DC")}
                </h3>
                <div className={styles.btnGroup + " btn-group"} role={"group"}>
                    <label htmlFor={"rep-" + state.state}
                           className={"btn btn-primary"}>
                        <div className={"btn-check"}
                             id={"rep-" + state.state}/>
                        Republican<br/>{state.repVotes}</label>

                    <label htmlFor={"dem-" + state.state}
                           className={"btn btn-primary"}>
                        <div className="btn-check"
                             id={"dem-" + state.state}/>
                        Democrat<br/>{state.demVotes}</label>
                </div>

            </div>
        </>
    );
}