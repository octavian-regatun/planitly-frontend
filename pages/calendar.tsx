import { Grid } from "@mui/material";
import axios from "axios";
import { GetServerSideProps } from "next";
import { CSSProperties, useEffect } from "react";
import Calendar from "../src/components/Calendar";
import IsAuthenticated from "../src/components/IsAuthenticated";
import Layout from "../src/components/Layout";
import Navbar from "../src/components/Navbar";
import { getPayloadFromJwt, isJwtExpired } from "../src/lib/jwt";
import { useUserStore } from "../src/lib/stores";

export default function CalendarNextPage(): JSX.Element {
  const user = useUserStore((store) => store.user);

  return (
    <IsAuthenticated>
      <Layout>
        <Grid container style={gridContainerStyle}>
          <Grid item xs={12} sm={8} style={calendarGridStyle}>
            <Calendar />
          </Grid>
        </Grid>
      </Layout>
    </IsAuthenticated>
  );
}

const gridContainerStyle: CSSProperties = {
  height: "100%",
};
const calendarGridStyle: CSSProperties = {
  padding: "16px",
};
