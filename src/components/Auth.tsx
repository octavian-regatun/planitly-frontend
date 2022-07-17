import axios from "axios"
import { useEffect, useState } from "react"
import { getPayloadFromJwt, isJwtExpired } from "../lib/jwt"
import { useUserStore } from "../lib/stores"
import FullscreenLoading from "./FullScreenLoading"

interface Props {
  children: JSX.Element | JSX.Element[];
}

export default function Auth({ children }: Props): JSX.Element | null {
  const [loading, setLoading] = useState(true)
  const getUser = useUserStore((store) => store.getUser)

  useEffect(() => {
    void (async () => {
      const jwt = localStorage.getItem("token")

      if (jwt && jwt !== "undefined") {
        if (!isJwtExpired(jwt)) {
          const jwtPayload = await getPayloadFromJwt(jwt)

          axios.defaults.headers.common.Authorization = `Bearer ${jwt}`
          await getUser(jwtPayload.id)
        }
      }

      setLoading(false)
    })()
  })

  return loading ? <FullscreenLoading /> : <>{children}</>
}
