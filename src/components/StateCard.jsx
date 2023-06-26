import { useState } from 'react';
import { useRouter } from 'next/router';

export default function StateCard({ state }) {
    const [publishing, setPublishing] = useState(false);
    const [deleting, setDeleting] = useState(false);
    const router = useRouter();

    // Publish state
    const publishState = async (stateId) => {
        // change publishing state
        setPublishing(true);

        try {
            // Update state
            await fetch('/api/states', {
                method: 'PUT',
                body: stateId,
            });

            // reset the publishing state
            setPublishing(false);

            // reload the page
            return router.push(router.asPath);
        } catch (error) {
            // Stop publishing state
            return setPublishing(false);
        }
    };
    // Delete state
    const deleteState = async (stateId) => {
        //change deleting state
        setDeleting(true);

        try {
            console.log(stateId)
            // Delete state
            await fetch('/api/states?' + new URLSearchParams({
                stateId
            }), {
                method: 'DELETE'
            });

            // reset the deleting state
            setDeleting(false);
            console.log("deleting")

            // reload the page
            return router.push(router.asPath);
        } catch (error) {
            // stop deleting state
            return setDeleting(false);
        }
    };

    return (
        <>
                <h3 style={{textTransform: 'capitalize'}}>{state.state.replace("-", " ")}</h3>
                {!state.published ? (
                    <button type="button" onClick={() => publishState(state._id)}>
                        {publishing ? 'Publishing' : 'Publish'}
                    </button>
                ) : null}
                <button type="button" onClick={() => deleteState(state['_id'])}>
                    {deleting ? 'Deleting' : 'Delete'}
                </button>
        </>
    );
}