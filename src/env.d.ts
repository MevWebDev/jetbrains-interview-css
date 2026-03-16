/// <reference types="vite/client" />

// Minimal declaration file to satisfy TypeScript for static imports.
// Keeps things strict for CSS Modules while allowing side-effect CSS imports.

// Side-effect style imports (regular global CSS)
declare module "*.css";
declare module "*.scss";
declare module "*.sass";

// CSS Modules (typed map of class names)
declare module "*.module.css" {
  const classes: { readonly [key: string]: string };
  export default classes;
}
declare module "*.module.scss" {
  const classes: { readonly [key: string]: string };
  export default classes;
}

// Static assets
declare module "*.png";
declare module "*.jpg";
declare module "*.jpeg";
declare module "*.gif";
declare module "*.webp";
declare module "*.svg" {
  const src: string;
  export default src;
}

// If you prefer everything looser, you can replace specific declarations with:
// declare module '*';
