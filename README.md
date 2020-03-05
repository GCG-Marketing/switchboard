# Switchboard

Dynamic tel link number swapper

## Features

- Swap tel numbers based on presence of URL parameters
- Swap multiple numbers based on JSON endpoint data
- Store swapped numbers locally to persist change across sesions
- Set local storage swap expiration

## Supported Browsers

Switchboard is supported on all popular, modern, evergreen browsers. Switchboard is not compatible with any version of Internet Explorer.

## Setup

1. In `src/switchboard.js`, modify the `table` property.
1. (Optional) Run `gulp` from the directory root to minify the script and place it in the `dist` directory.
1. Add `switchboard.js` or `switchboard.min.js` to the `<script>` tag at the end of the `<body>` in your html file.

### Table Explained

```json
table: {
    gcg: {
      find: "858-555-1234",
      replace: "817-555-9876",
      oldDisplay: "858-555-1234",
      newDisplay: "817-555-9876"
    },
    fbcam: {
      find: "858-555-1234",
      replace: "123-555-9876",
      oldDisplay: "858-555-1234",
      newDisplay: "123-555-9876"
    }
  }
```

In the above example, `gcg` and `fbcam` are different values that could be pulled from the switchboard URL parameter. By default, it's `https://.../?switchboard=...`. If, for example, the page URL was, `https://domain.com/?switchboard=gcg`, the script would store `gcg` in local storage. When the script loads, it will attempt to find all links with a href value of `tel:858-555-1234` and replace the href number and displayed innertext with 817-555-9876.

### Settings

- config.param (default: "switchboard"): This defines the expected parameter to search for.
- config.expiration (default: 2592000000 (30 days)): This defines how long a swapped tel link will remain swapped in local storage.
