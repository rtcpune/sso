import { Box } from "@mui/material";
import type { ReactNode } from "react";
import React from "react";

interface IComponentWrapper {
  children: ReactNode;
  sidebar: ReactNode;
  header?: ReactNode;
}

export const ComponentWrapper: React.FC<IComponentWrapper> = ({
  children,
  sidebar,
  header
}: any) => {
  return (
    <Box height="100vh" display="flex">
      {sidebar}
      {/* <Sidebar toggle={open} setToggle={setOpen} /> */}
      <Box flexGrow={1} overflow="auto">
        {header}
        {/* <Header open={open} setOpen={setOpen} /> */}
        <Box p={3}>{children}</Box>
      </Box>
    </Box>
  );
};
