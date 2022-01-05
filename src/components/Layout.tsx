import { CSSProperties } from "react";
import { NAVBAR_HEIGHT, SIDEBAR_WIDTH } from "../lib/constants";
import { Media } from "../lib/media";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";

interface Props {
  children: JSX.Element | JSX.Element[];
}

export default function Layout({ children }: Props): JSX.Element {
  return (
    <>
      <Media at="xs">{children}</Media>
      <Media greaterThan="xs">
        <Navbar />
        <Sidebar />
        <div style={childrenContainerStyle}>{children}</div>
      </Media>
    </>
  );
}

const childrenContainerStyle: CSSProperties = {
  marginLeft: `${SIDEBAR_WIDTH}px`,
  height: `calc(100vh - ${NAVBAR_HEIGHT}px)`,
};
