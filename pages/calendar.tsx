import axios from "axios";
import { GetServerSideProps } from "next";
import { useEffect } from "react";
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
        <h1>
          Logged in as {user?.firstName} {user?.lastName}
        </h1>
      </Layout>
    </IsAuthenticated>
  );
}
