import { ReactNode, useState } from "react";
import { Header } from "../Header";
import { Sidebar } from "../Sidebar";
import { MenuArr } from "../Sidebar/constant";
import RTC_LOGO from "../../images/rtc-logo.svg";
import { ComponentWrapper } from "./wrapper";

interface IComponentWrapper {
  children: ReactNode;
}

export const Layout: React.FC<IComponentWrapper> = ({ children }) => {
  const [open, setOpen] = useState(true);
  return (
    <ComponentWrapper
      sidebar={
        <Sidebar
          toggle={open}
          setToggle={setOpen}
          logoUrl={RTC_LOGO}
          menuArr={MenuArr}
        />
      }
      header={<Header logoUrl={RTC_LOGO} open={open} setOpen={setOpen} />}
    >
      {children}
    </ComponentWrapper>
  );
};
