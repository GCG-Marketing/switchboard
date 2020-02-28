# Switchboard

Dynamic tel link number swapper

## Features

- Swap tel numbers based on presence of URL parameters
- Swap multiple numbers based on JSON endpoint data
- Store swapped numbers locally to persist change across sesions
- Set local storage swap expiration

## File Structure

### switchboard.js

This is the core JS file.

### switchboard_config.json

This file handles optional settings.

#### Settings

- url_parameter: (default: switchboard) This defines the expected parameter to search for.
- expiration: (blank by default) This defines how long a swapped tel link will remain swapped in local storage. If blank, swapped numbers will remain in local storage indefinitely.

### switchboard_table.json

This file handles number swap definitions.
