/**
 * @packageDocumentation
 * @module MarqueeSlider
 * @description Marquee slider made with react
 * @author Abundance Ken-Dickson
 * @copyright 2025 Abundance Ken-Dickson
 * @license MIT
 * @see https://github.com/abundiko/react-marquee
 */
"use client";
import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { Fragment, useEffect, useMemo, useRef, useState, } from "react";
/**
 * A component that renders a marquee slider based on the given axis and speed.
 *
 * @param props The component props.
 * @param props.axis The axis to render the marquee slider on. Defaults to "-y".
 * @param props.children The children to be rendered inside the marquee slider.
 * @param props.clone Whether to clone the children or not. Defaults to true.
 * @param props.balanceDistance The distance to balance the marquee slider. Defaults to 300.
 * @param props.className The className to be applied to the container element.
 * @param props.style The style to be applied to the container element.
 *
 *
 * @returns The JSX element representing the marquee slider.
 */
export default function MarqueeSlider(props) {
    const { children, axis = "x", speed = 50, clone = true, balanceDistance = 400, className: _className = "", pauseOnHover = false, } = props;
    const isVertical = axis.includes("y");
    const [uid, setUid] = useState(null);
    const [mFactor, setMFactor] = useState(1);
    const [distance, setDistance] = useState(balanceDistance);
    const viewRef = useRef(null);
    const holderRef = useRef(null);
    const flexDirection = !isVertical ? "row" : "column";
    const style = useMemo(() => {
        return Object.assign(Object.assign({}, props.style), { display: "flex", flexDirection, animation: `${uid} ${speed * (distance / balanceDistance) || 0}s linear infinite` });
    }, [balanceDistance, distance, flexDirection, props.style, speed, uid]);
    const cloneStyle = axis === "y"
        ? {}
        : axis === "-y"
            ? { position: "absolute", top: "-100%" }
            : axis === "-x"
                ? { position: "absolute", right: "100%" }
                : {};
    useEffect(() => {
        // Generate UID only on the client-side
        setUid(randomUID());
    }, []);
    const validUid = useMemo(() => uid !== null && uid !== void 0 ? uid : randomUID(), [uid]);
    // effect for cloning
    useEffect(() => {
        const handleResize = () => {
            const view = viewRef.current, holder = holderRef.current;
            if (!view || !holder)
                return;
            const viewRect = view.getBoundingClientRect();
            const holderRect = holder.getBoundingClientRect();
            setDistance(isVertical ? viewRect.height : viewRect.width);
            if (clone) {
                setMFactor(Math.ceil(isVertical
                    ? viewRect.height / holderRect.height
                    : viewRect.width / holderRect.width));
            }
        };
        handleResize();
        window.addEventListener("resize", handleResize);
        return () => {
            window.removeEventListener("resize", handleResize);
        };
    }, [viewRef, holderRef, clone, isVertical]);
    const mappedChildren = useMemo(() => {
        return Array(mFactor)
            .fill(0)
            .map((it, i) => _jsx(Fragment, { children: children }, i + it.toString()));
    }, [children, mFactor]);
    const className = `marquee-${validUid} ${_className}`.trim();
    return (_jsxs(_Fragment, { children: [animationStyle(validUid, axis, pauseOnHover), _jsx("div", { style: {
                    visibility: "hidden",
                    position: "fixed",
                    zIndex: "-999",
                    display: "flex",
                    flexDirection,
                }, ref: holderRef, children: children }), _jsx("div", { ref: viewRef, style: Object.assign({ height: "100%", overflow: "clip" }, (props.fade ? fadeStyle(props.fade, axis) : {})), children: _jsxs("div", { className: "marquee-anim", style: {
                        position: "relative",
                        display: "flex",
                        flexDirection,
                    }, children: [_jsx("div", { style: style, className: className, children: mappedChildren }), _jsx("div", { style: Object.assign(Object.assign({}, cloneStyle), style), className: className, children: mappedChildren })] }) })] }));
}
const animationStyle = (uid, axis, pauseOnHover = false) => {
    const anim = axis === "-x"
        ? "translateX(100%)"
        : axis === "x"
            ? "translateX(-100%)"
            : axis === "y"
                ? "translateY(-100%)"
                : "translateY(100%)";
    return (_jsx("style", { children: `
      .marquee-anim:hover > .marquee-${uid} {
        animation-play-state: ${pauseOnHover ? "paused !important" : "running"};
      }

  @keyframes ${uid}{
    100% {
      transform: ${anim}
    }
  }
` }));
};
const randomUID = () => `anim-${Array(10)
    .fill(0)
    .map(() => Math.floor(Math.random() * 1000))
    .join("")}`;
const fadeStyle = (fade, axis) => {
    const gradientDirection = axis === "x" || axis === "-x" ? "to right" : "to bottom";
    const start = fade === "start" || fade === "both" ? "transparent" : "black";
    const end = fade === "end" || fade === "both" ? "transparent" : "black";
    return {
        WebkitMaskImage: `linear-gradient(${gradientDirection}, ${start}, black 20%, black 80%, ${end})`,
        WebkitMaskRepeat: "no-repeat",
        WebkitMaskSize: "100% 100%",
        maskImage: `linear-gradient(${gradientDirection}, ${start}, black 20%, black 80%, ${end})`,
        maskRepeat: "no-repeat",
        maskSize: "100% 100%",
    };
};
//# sourceMappingURL=index.js.map