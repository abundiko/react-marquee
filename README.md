# React Marquee

A simple and customizable marquee component for React.

[![NPM](https://img.shields.io/npm/v/react-marquee)](https://www.npmjs.com/package/react-marquee)
[![MIT License](https://img.shields.io/badge/license-MIT-green.svg)](https://choosealicense.com/licenses/mit/)
[![GitHub repo stars](https://img.shields.io/github/stars/abundiko/react-marquee?style=social)](https://github.com/abundiko/react-marquee)

## Installation

```bash
npm install @abundiko/react-marquee
```

or

```bash
bun add @abundiko/react-marquee
```

## Usage

```tsx
import MarqueeSlider from "@abundiko/react-marquee";

<MarqueeSlider speed={80} axis="-x" className="gap-6" pauseOnHover fade={"both"}>
  {Array(20)
    .fill(1)
    .map((it, i) => (
      <div
        key={i}
        className="size-14 bg-red-800 border-8 border-white mx-0"
      >
        {i + 1}
      </div>
    ))}
</MarqueeSlider>;
```

**Note:** When using vertical mode (`axis="y"` or `axis="-y"`), the parent container of the `<MarqueeSlider>` must have a fixed height.

## Props

| Prop              | Type                               | Default | Description                                                                                                 |
| ----------------- | ---------------------------------- | ------- | ----------------------------------------------------------------------------------------------------------- |
| `speed`           | `number`                           | `50`    | The speed of the marquee. Higher numbers mean slower scrolling.                                             |
| `children`        | `ReactNode`                        |         | The content to be displayed inside the marquee.                                                             |
| `axis`            | `"x"` \| `"y"` \| `"-x"` \| `"-y"` | `"x"`   | The direction of the marquee scroll.                                                                        |
| `clone`           | `boolean`                          | `true`  | Whether to clone the children to create a seamless loop.                                                    |
| `balanceDistance` | `number`                           | `400`   | The distance to balance the marquee slider against the speed.                                               |
| `className`       | `string`                           | `""`    | Additional CSS classes to apply to the container.                                                           |
| `style`           | `CSSProperties`                    | `{}`    | Inline styles to apply to the container.                                                                    |
| `pauseOnHover`    | `boolean`                          | `false` | Whether to pause the marquee when the mouse is over it.                                                     |
| `fade`            | `"start"` \| `"end"` \| `"both"`   | `null`  | Adds a fade effect to the start, end, or both sides of the marquee.                                         |

## Contributing

Contributions are welcome! Please feel free to submit a pull request.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

## Author

- **Abundance Ken-Dickson** - [abundiko](https://github.com/abundiko)