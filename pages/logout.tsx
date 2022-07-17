import { useRouter } from "next/router"
import { useEffect } from "react"
import FullscreenLoading from "../src/components/FullScreenLoading"

export default function LogoutNextPage() {
  const router = useRouter()

  useEffect(() => {
    localStorage.removeItem("token")
    router.push("/")
  })

  return <FullscreenLoading />
}
