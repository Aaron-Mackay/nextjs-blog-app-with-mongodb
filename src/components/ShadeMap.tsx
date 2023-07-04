import {useEffect} from "react";
import {MapSvg} from "@/components/MapSvg";
import getBackgroundColor from "@/getBackgroundColor";

export default function ShadeMap({states}: { states: Array<any> }) {
    useEffect(() => {
        bindListenersToStates('mouseover', hoverFn);
        bindListenersToStates('mouseleave', mouseLeaveFn);
        bindListenersToStates('click', clickFn)
        return () => {
            removeListenersFromStates('mouseover', hoverFn)
            removeListenersFromStates('mouseleave', mouseLeaveFn)
            removeListenersFromStates('click', clickFn)
        }
    }, []);

    useEffect(() => {
        states.filter(state => state.demVotes && state.repVotes).forEach((state) => {
            document?.querySelector('#' + state.state)
                ?.setAttribute("style", "fill:" + getBackgroundColor(state.demVotes, state.repVotes) + "; stroke: #002868;")
        })
    }, [states])

    return (
        <MapSvg/>
    )
}

const hoverFn = (e: Event) => {
    if (e.target instanceof HTMLElement) {
        document.querySelector<HTMLElement>('#info-box').style.display = 'block'
        document.querySelector<HTMLElement>('#info-box').innerHTML = e.target.dataset.info
    }
}

const mouseLeaveFn = () => {
    document.querySelector<HTMLElement>('#info-box').style.display = 'none';
}

const clickFn = (e: Event) => {
    const stateCard = document.querySelector<HTMLElement>('#' + (e.target as HTMLElement).id + "-card")
    stateCard.parentElement.scroll({top: stateCard.offsetTop - 4*stateCard.offsetHeight, behavior: 'smooth'})

    // Add glow effect class
    stateCard.classList.add('glow-effect');

    // Remove glow effect after 1 second
    setTimeout(function() {
        stateCard.classList.remove('glow-effect');
    }, 10000);
}


const bindListenersToStates = (type: string, fn: EventListener) => {
    document.querySelectorAll("path, circle")
        .forEach((state) => state.addEventListener(type, fn));
}

const removeListenersFromStates = (type: string, fn: EventListener) => {
    document.querySelectorAll("path, circle")
        .forEach((state) => state.removeEventListener(type, fn));
}