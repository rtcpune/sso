import * as routePaths from "./RouteConstant";
import {
  RouteObject,
} from "react-router-dom";
import React, { Suspense, useContext } from "react";
import { AppContext } from "./App";
import { Layout } from "./shared/Layout";


const Dashboard = React.lazy(() =>
  import("./pages").then((module) => ({
    default: module.Dashboard,
  }))
);

const AuthRoutes = ({ component }: any) => {
  const { state } = useContext<any>(AppContext);
  const isLoading = state?.app_loading;

  if (isLoading) return null;

  return (
    <>
      {!isLoading ? (
        <Layout>
          <Suspense fallback={"Loading"}>{component}</Suspense>
        </Layout>
      ) : null}
    </>
  );
};

export const routes: RouteObject[] = [
  {
    path: "/",
    children: [
      {
        path: routePaths.DASHBOARD,
        element: <AuthRoutes component={<Dashboard />} />,
      },
    ],
  },
  {
    path: "*",
    element: (
      <Suspense fallback={"Loading"}>
        <>Page not found</>
      </Suspense>
    ),
  },
];
