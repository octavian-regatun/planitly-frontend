import { Grid } from "@mui/material"
import IsAuthenticated from "../src/components/IsAuthenticated"
import Layout from "../src/components/Layout"

export default () => {
  return (
    <IsAuthenticated>
      <Layout>
        <Grid container></Grid>
      </Layout>
    </IsAuthenticated>
  )
}
