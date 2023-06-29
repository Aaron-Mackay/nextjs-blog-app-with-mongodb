import {useState} from 'react';
import {useRouter} from 'next/router';

export default function StateCard({state, user}) {
    const [selection, setSelection] = useState(state.selection || null)
    const [voting, setVoting] = useState(false);
    const router = useRouter();

    const publishVote = async (state, selection) => {
        // change voting state
        setVoting(true);

        try {
            // Update state
            const res = await fetch('/api/vote', {
                method: 'PATCH',
                body: JSON.stringify({
                    state,
                    vote: selection,
                    category: "pres",
                    userEmail: user.email,
                    lastVoted: new Date()
                }),
            });
            console.log(JSON.stringify(res))
            // reset the voting state
            setVoting(false);

            // reload the page
            return router.push(router.asPath);
        } catch (error) {
            // Stop voting state
            return setVoting(false);
        }
    };

    const onSelect = (e) => {
        setSelection(e.target.value)
    }

    return (
        <>
            <form onSubmit={() => publishVote(state.state, selection)}>
                <h3 style={{textTransform: 'capitalize'}}>{state.state.replace("-", " ")} - {selection}</h3>
                <input type="radio" name={"vote-" + state.state} value="rep" id="rep" checked={selection === "rep"}
                       onChange={onSelect}/>
                <label htmlFor="rep">Republican</label>
                <input type="radio" name={"vote-" + state.state} value="dem" id="dem" checked={selection === "dem"}
                       onChange={onSelect}/>
                <label htmlFor="dem">Democrat</label>
                <button type="submit">
                    {voting ? 'Voting' : 'Vote'}
                </button>
            </form>
        </>
    );
}