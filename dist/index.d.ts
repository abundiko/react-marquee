/**
 * @packageDocumentation
 * @module MarqueeSlider
 * @description Marquee slider made with react
 * @author Abundance Ken-Dickson
 * @copyright 2025 Abundance Ken-Dickson
 * @license MIT
 * @see https://github.com/abundiko/react-marquee
 */
import { type CSSProperties, type ReactNode } from "react";
type MarqueeSliderAxis = "x" | "y" | "-x" | "-y";
type MarqueeSliderFade = "start" | "end" | "both";
export type MarqueeSliderProps = {
    /**
     * The speed of the marquee slider. Defaults to 50.
     * the higher the speed, the slower the marquee will scroll.
     */
    speed?: number;
    /**
     * The children to be rendered inside the marquee slider.
     */
    children: ReactNode;
    /**
     * The axis to render the marquee slider on. Defaults to "x".
     * can be "x", "y", "-x", or "-y".
     */
    axis?: MarqueeSliderAxis;
    /**
     * Whether to clone the children or not. Defaults to true.
     */
    clone?: boolean;
    /**
     * The distance to balance the marquee slider against the speed. Defaults to 400.
     */
    balanceDistance?: number;
    /**
     * The className to be applied to the container element.
     */
    className?: string;
    /**
     * The style to be applied to the container element.
     */
    style?: CSSProperties;
    /**
     * Whether to pause the marquee on hover. Defaults to false.
     */
    pauseOnHover?: boolean;
    fade?: null | MarqueeSliderFade;
};
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
export default function MarqueeSlider(props: MarqueeSliderProps): import("react/jsx-runtime").JSX.Element;
export {};
//# sourceMappingURL=index.d.ts.map