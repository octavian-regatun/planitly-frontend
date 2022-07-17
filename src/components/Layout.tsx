import Navbar from "./Navbar"
import Sidebar from "./Sidebar"

interface Props {
  children: JSX.Element | JSX.Element[]
}

export default function Layout({ children }: Props): JSX.Element {
  return (
    <>
      <div className="Layout-mobile">{children}</div>
      <div className="Layout-desktop">
        <Navbar />
        <Sidebar />
        <div className="Layout">{children}</div>
      </div>
    </>
  )
}
