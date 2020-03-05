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

### Caveat

When using Switchboard's `switchboard_config.json` and `switchboard_table.json` files, each file must live in the same directory that the `switchboard.js` script is running from.

## File Structure

### switchboard.js

This is the core JS file.

### switchboard_config.json

This file handles optional settings.

#### Settings

- url_parameter (default: "switchboard"): This defines the expected parameter to search for.
- expiration (default: ""): This defines how long a swapped tel link will remain swapped in local storage. If blank, swapped numbers will remain in local storage indefinitely.
- clean_up_list (default: []): This specifies the removal of previously used url_parameter values. Add comma-separated items in quotes to the array for multiple parameter clean-ups.

### switchboard_table.json

This file handles number swap definitions.

## To Do

### Items to Consider

- A "purge" or "reset" to the script to clear all localStorage values
- To clear numbers with an "indefinite expiration", rename or remove numbers from the `switchboard_table.json` file
