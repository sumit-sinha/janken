# Gumtree UK frontend developer test

## User Story

Create a browser based version of the game ‘Rock, Paper, Scissors’.

Don't know the game? http://en.wikipedia.org/wiki/Rock-paper-scissors

## Acceptance Criteria

- Ability to play against the computer
- Ability to simulate a game (Computer vs Computer)
- Ability to restart the game
- Computer generated plays need to be random

## Guidelines

- The UI can be as simple or as complex as you wish
- We are keen to see how much you think is enough, and how much would go into a Minimum Viable Product.  As a guide, elegant and simple wins over feature rich every time, though extra gold stars are given to people who get excited and do more because they are having fun
- We also consider the extensibility of the code produced.  Well factored code should be relatively easily extended http://en.wikipedia.org/wiki/Rock-paper-scissors-lizard-Spock may be a natural extension
- Bonus points for vanilla JavaScript, unit tests, good accessibility, responsive design, well commented code and comprehensive commit history
- If you could show us how to test-drive your solution using TDD, that's a big plus!

## Technical Requirements

- We prefer to use vanilla Javascript and ES2015/ES6
- Using libs/frameworks is not forbidden, but we want to see your code, not someone else's
- You can style your game assets using SASS or pure CSS
- The solution should work in IE9+ and all modern browsers, bonus points IE8 and lower

## How to start coding

Alongside this document you should find a prepared project with a few example files that help you to get started. Feel free to change the structure or add new files as you see fit.

We provided similar but simplified tooling / setup we use on an everyday basis here at Gumtree UK, but you're welcome to change anything.

### Tooling

The tooling we provide is the following:

- `webpack` to modularise your Javascript code
- `babel` to utilise ES2015/ES6 features today in case you're into it
- `node-sass` to modularise your styling via SASS
- `eslint` to make sure your code meets the standards
- `karma`, `mocha` and `chai` to help you write and run your unit tests in various browsers

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

### Project structure

We've added a few example files under the `src/` folder as a sanity check that the project is up and working.

When you first run `npm run dev` and open the project in the browser at the given url, you should see a text saying *"you are ready to go!"* in white on a green background and *"it works well!"* in the browser's console.

We hope you're already familiar with the CommonJS pattern that Node.js (and `webpack`) uses or the ES2015/ES6 imports. You'll see some examples in the provided files under the `src/js/` folder.

The `src/index.ejs` file is the template to generate `build/index.html` which `webpack` takes care of on the fly. You can add your markup to it as normal but please note, that the generated `main.css` and `main.js` is injected in by `webpack` into the `head` and `body` elements.

Hope it all makes sense, we're looking forward to your solution, happy coding! :)

*The Gumtree UK dev team*
