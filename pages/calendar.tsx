import { Grid } from "@mui/material"
import CalendarSelect from "../src/components/CalendarSelect"
import Calendar from "../src/components/Calendar"
import IsAuthenticated from "../src/components/IsAuthenticated"
import Layout from "../src/components/Layout"
import { useUserStore } from "../src/lib/stores"

export default function CalendarNextPage(): JSX.Element {
  const user = useUserStore((store) => store.user)

  return (
    <IsAuthenticated>
      <Layout>
        <Grid container className="CalendarNextPage-gridContainer">
          <Grid
            container
            item
            className="CalendarNextPage-calendarGrid"
            xs={12}
            sm={8}
          >
            <CalendarSelect />
            <Calendar />
          </Grid>
        </Grid>
      </Layout>
    </IsAuthenticated>
  )
}
