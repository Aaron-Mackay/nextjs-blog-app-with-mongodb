import Rainbow from "rainbowvis.js";

export default function getBackgroundColor (demVotes: number, repVotes: number) {
    if (demVotes + repVotes === 0) {
        return ''
    }

    const rainbow = new Rainbow()
    rainbow.setSpectrum('blue', 'white', 'red')
    const votePercentage = (repVotes / (repVotes + demVotes)) * 100

    return "#" + rainbow.colorAt(votePercentage);
}