# Jetbrains Internship Task

## Overview

This project is a React app built and bundled using **Parcel**.

## Setup and Run Instructions

To install dependencies:

```bash
npm install
```

To build for production

```bash
npm build
```

To see production app

```bash
npx serve dist
```

If there are any issues with build just

```bash
rm -rf dist .parcel-cache
```

## How css is transformed

The authored CSS undergoes several transofmations during build process to optimize it for the browser.

1. Bundling: Parcel finds all CSS files imported in React components, collects them and merges into single production file. This breaks 1-1 relationship between source files and the final file.

2. Transformation: Parcel uses Lightning CSS (Rust based css postprocessor). It translates modern CSS features into a syntax compatible with older browsers.

3. Minification: Lightningcss removes all whitespaces, comments, line breaks. The file is optimitez to be as small as posibble while preserving functionality.

4. Source maps: Parcel generates a .css.map file alongside minified css. This file allows browser DevTools to map transformed wall of text to original source files src/\*css. It allows to debug easily with correct file names and line numbers.

## Example flow

We have a react app with a few components and css files. While we type `npm run build` parcel finds all css files -> combines them into one file -> lightningcss transforms it to old syntax and minifies it. During that, parcel creates sourcemap that allows devtools to show minified css as a original css files that we have in our /src folder

## Where to find sourcemaps

After build they will be in /dist directory

Generated css will have name [name].[hash].css
Generated sourcemap will have name [name].[hash].css.map
