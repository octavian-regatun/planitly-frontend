import { redirectToSignIn } from "../lib/redirects"
import { useUserStore } from "../lib/stores"
import FullscreenLoading from "./FullScreenLoading"

interface Props {
  children: JSX.Element | JSX.Element[];
}

export default function IsAuthenticated({ children }: Props) {
  const user = useUserStore((store) => store.user)

  if (!user) {
    redirectToSignIn()
  }

  return user ? <>{children}</> : <FullscreenLoading />
}
