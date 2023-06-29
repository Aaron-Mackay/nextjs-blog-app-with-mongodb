import {useEffect} from "react";
import {MapSvg} from "@/components/MapSvg";

export default function Map({states}) {
    useEffect(() => {
        bindListenersToStates('mouseover', hoverFn);
        bindListenersToStates('mouseleave', mouseLeaveFn)
        return () => {
            removeListenersFromStates('mouseover', hoverFn)
            removeListenersFromStates('mouseleave', mouseLeaveFn)
        }
    }, []);

    states.filter(state => state.selection).forEach((state) => {
        document?.querySelector('#' + state.state)?.classList.add(state.selection + "-vote")
    })

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