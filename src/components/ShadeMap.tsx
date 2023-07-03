import {useEffect} from "react";
import {MapSvg} from "@/components/MapSvg";
import Rainbow from "rainbowvis.js";

export default function ShadeMap({states}) {
    useEffect(() => {
        bindListenersToStates('mouseover', hoverFn);
        bindListenersToStates('mouseleave', mouseLeaveFn)
        return () => {
            removeListenersFromStates('mouseover', hoverFn)
            removeListenersFromStates('mouseleave', mouseLeaveFn)
        }
    }, []);

    useEffect(() => {
        states.filter(state => state.demVotes && state.repVotes).forEach((state) => {
            document?.querySelector('#' + state.state)
                ?.setAttribute("style", "fill:" + getBackgroundColor(state.demVotes, state.repVotes) + "; stroke: #002868;")
        })
    }, [states])

    const getBackgroundColor = (demVotes: number, repVotes: number) => {
        if (demVotes + repVotes === 0) {
            return ''
        }

        const rainbow = new Rainbow()
        rainbow.setSpectrum('blue', 'white', 'red')
        const votePercentage = (repVotes / (repVotes + demVotes)) * 100

        return "#" + rainbow.colorAt(votePercentage);
    }

    return (
        <MapSvg/>
    )
}

const hoverFn = (e) => {
    document.querySelector('#info-box').style.display = 'block'
    document.querySelector('#info-box').innerHTML = e.target.dataset.info
}

const mouseLeaveFn = (e) => {
    document.querySelector('#info-box').style.display = 'none';
}

const bindListenersToStates = (type, fn) => {
    document.querySelectorAll("path, circle")
        .forEach((state) => state.addEventListener(type, fn));
}

const removeListenersFromStates = (type, fn) => {
    document.querySelectorAll("path, circle")
        .forEach((state) => state.removeEventListener(type, fn));
}