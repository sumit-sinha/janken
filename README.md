# Rock, Paper and Scissors

Don't know the game? http://en.wikipedia.org/wiki/Rock-paper-scissors

## Features

- Ability to play against the computer
- Ability to simulate a game (Computer vs Computer)
- Ability to restart the game

To start developing, fork and clone the project first, then make sure you have Node.js *5.x* or higher and run

```
$ npm install
```

### Helpful commands

You'll have the following CLI commands available:

- `npm run dev` running `webpack-dev-server` and serving the project on `localhost`
- `npm run test -- --browsers Chrome` running unit tests via `karma` in Chrome
- `npm run lint` running `eslint` against your source (and config) files
- `npm run build` running `webpack` build
- `npm run serve` serving the `build/` folder contents

Whilst developing, you'll most likely to run `npm run dev` in a terminal window, `webpack` will take care of everything, bundling your project to an in-memory `build/` folder and serving it from there. Also, `npm run test` in another terminal window to see your tests running / failing on every file change.

If you'd like to see the output as files, just run `npm run build` and the result will be found under a real `build/` folder.
