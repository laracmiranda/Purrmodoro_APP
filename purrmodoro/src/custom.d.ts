declare module "*.mp3" {
  const src: string;
  export default src;
}

// src/custom.d.ts
declare module "*.css";
declare module "*.mp3";
declare module "*.png";
declare module "*.gif";

