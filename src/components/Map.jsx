import {useEffect} from "react";
import {MapSvg} from "@/components/MapSvg";

export default function Map({states}) {
    useEffect(() => {
        bindListenersToStates('mouseover', hoverFn);
        bindListenersToStates('mouseleave', mouseLeaveFn)
        bindListenersToStates('click', clickFn)
        return () => {
            removeListenersFromStates('mouseover', hoverFn)
            removeListenersFromStates('mouseleave', mouseLeaveFn)
            removeListenersFromStates('click', clickFn)
        }
    }, []);

    useEffect(() => {
        console.log("painting states")
        states.filter(state => state.selection).forEach((state) => {
            document?.querySelector('#' + state.state)?.setAttribute("class", "state " + state.selection + "-vote")
        })
    }, [states])


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

const clickFn = (e) => {
    const target = document.querySelector('#' + e.target.id + "-card")
    target.parentElement.scroll({top: target.offsetTop - 2*target.offsetHeight, behavior: 'smooth'})

    // Add glow effect class
    target.classList.add('glow-effect');

    // Remove glow effect after 1 second
    setTimeout(function() {
        target.classList.remove('glow-effect');
    }, 10000);
}

const bindListenersToStates = (type, fn) => {
    document.querySelectorAll("path, circle")
        .forEach((state) => state.addEventListener(type, fn));
}

const removeListenersFromStates = (type, fn) => {
    document.querySelectorAll("path, circle")
        .forEach((state) => state.removeEventListener(type, fn));
}