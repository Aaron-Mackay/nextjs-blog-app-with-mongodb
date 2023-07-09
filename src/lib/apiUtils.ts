export const sendVote = async (state, vote, user) => {
    await fetch('/api/vote', {
        method: 'PATCH',
        body: JSON.stringify({
            state,
            vote,
            category: "pres",
            userEmail: user.email,
            lastVoted: new Date()
        }),
    });
}

export const prefill = async (user) => {
    await fetch('/api/prefill', {
        method: 'PATCH',
        body: JSON.stringify({
            userEmail: user.email,
            lastVoted: new Date()
        }),
    });
}