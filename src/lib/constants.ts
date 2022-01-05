if (process.env.NEXT_PUBLIC_BACKEND_URL === undefined)
  throw new Error("BACKEND_URL is not defined");

export const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL;

export const SIDEBAR_WIDTH = 64;
export const NAVBAR_HEIGHT = 64;
