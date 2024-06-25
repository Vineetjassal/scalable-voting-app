# Scalable-Voting-App

First, navigate to the `client` direcotory and run the development server:

```bash
npm run dev
```

## Creating a tailwind css plugin:

```typescript
plugins: [
  require("tailwindcss-animate"),
  function ({ matchUtilities, theme }: any) {
    matchUtilities(
      {
        "bg-grid": (value: any) => ({
          backgroundImage: `url("${svgToDataUri(
            `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" width="32" height="32" fill="none" stroke="${value}"><path d="M0 .5H31.5V32"/></svg>`
          )}")`,
        }),
      },
      { values: flattenColorPalette(theme("backgroundColor")), type: "color" }
    );
  },
],

```

Here **svgToDataUri** is a function that has been imported from a library `mini-svg-data-uri` as:

```typescript
const svgToDataUri = require("mini-svg-data-uri");

// flattenColorPalette is a utility provided by taliwindCSS
const {
  default: flattenColorPalette,
} = require("tailwindcss/lib/util/flattenColorPalette");
```
