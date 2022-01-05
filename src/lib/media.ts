import { createMedia } from "@artsy/fresnel";

const ExampleAppMedia = createMedia({
  breakpoints: {
    xs: 0,
    sm: 600,
    md: 900,
    lg: 1200,
    xl: 1536,
  },
});

// Make styles for injection into the header of the page
export const mediaStyles = ExampleAppMedia.createMediaStyle();

export const { Media, MediaContextProvider } = ExampleAppMedia;
