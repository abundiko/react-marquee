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

import {
  type CSSProperties,
  Fragment,
  type ReactNode,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";

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
export default function MarqueeSlider(props: MarqueeSliderProps) {
  const {
    children,
    axis = "x",
    speed = 50,
    clone = true,
    balanceDistance = 400,
    className: _className = "",
    pauseOnHover = false,
  } = props;

  const isVertical = axis.includes("y");
  const [uid, setUid] = useState<string | null>(null);
  const [mFactor, setMFactor] = useState(1);
  const [distance, setDistance] = useState(balanceDistance);
  const viewRef = useRef<HTMLDivElement>(null);
  const holderRef = useRef<HTMLDivElement>(null);

  const flexDirection = !isVertical ? "row" : "column";
  const style: CSSProperties = useMemo(() => {
    return {
      ...props.style,
      display: "flex",
      flexDirection,
      animation: `${uid} ${
        speed * (distance / balanceDistance) || 0
      }s linear infinite`,
    };
  }, [balanceDistance, distance, flexDirection, props.style, speed, uid]);

  const cloneStyle: CSSProperties =
    axis === "y"
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

  const validUid = useMemo(() => uid ?? randomUID(), [uid]);
  // effect for cloning
  useEffect(() => {
    const handleResize = () => {
      const view = viewRef.current,
        holder = holderRef.current;
      if (!view || !holder) return;

      const viewRect = view.getBoundingClientRect();
      const holderRect = holder.getBoundingClientRect();
      setDistance(isVertical ? viewRect.height : viewRect.width);
      if (clone) {
        setMFactor(
          Math.ceil(
            isVertical
              ? viewRect.height / holderRect.height
              : viewRect.width / holderRect.width
          )
        );
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
      .map((it, i) => <Fragment key={i + it.toString()}>{children}</Fragment>);
  }, [children, mFactor]);

  const className = `marquee-${validUid} ${_className}`.trim();

  return (
    <>
      {animationStyle(validUid, axis, pauseOnHover)}
      <div
        style={{
          visibility: "hidden",
          position: "fixed",
          zIndex: "-999",
          display: "flex",
          flexDirection,
        }}
        ref={holderRef}
      >
        {children}
      </div>
      <div
        ref={viewRef}
        style={{
          height: "100%",
          overflow: "clip",

          ...(props.fade ? fadeStyle(props.fade, axis) : {}),
        }}
      >
        <div
          className="marquee-anim"
          style={{
            position: "relative",
            display: "flex",
            flexDirection,
          }}
        >
          <div style={style} className={className}>
            {mappedChildren}
          </div>
          <div style={{ ...cloneStyle, ...style }} className={className}>
            {mappedChildren}
          </div>
        </div>
      </div>
    </>
  );
}

const animationStyle = (
  uid: string,
  axis: MarqueeSliderAxis,
  pauseOnHover = false
) => {
  const anim =
    axis === "-x"
      ? "translateX(100%)"
      : axis === "x"
      ? "translateX(-100%)"
      : axis === "y"
      ? "translateY(-100%)"
      : "translateY(100%)";

  return (
    <style>{`
      .marquee-anim:hover > .marquee-${uid} {
        animation-play-state: ${pauseOnHover ? "paused !important" : "running"};
      }

  @keyframes ${uid}{
    100% {
      transform: ${anim}
    }
  }
`}</style>
  );
};

const randomUID = (): string =>
  `anim-${Array(10)
    .fill(0)
    .map(() => Math.floor(Math.random() * 1000))
    .join("")}`;

const fadeStyle = (
  fade: MarqueeSliderFade,
  axis: MarqueeSliderAxis
): CSSProperties => {
  const gradientDirection =
    axis === "x" || axis === "-x" ? "to right" : "to bottom";
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
