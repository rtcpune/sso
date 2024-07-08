import {
  Box,
  Collapse,
  Divider,
  IconButton,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
// import { Icon } from "@lipihipi/rtc-ui-components";
import React, { FC } from "react";
import { Link, useLocation } from "react-router-dom";
import { themeVars } from "../../theme";
import { Menu } from "@mui/icons-material";

interface ISidebar {
  toggle: boolean;
  setToggle: Function;
  logoUrl: string;
  menuArr: any[];
}

export const Sidebar: FC<ISidebar> = ({
  toggle,
  setToggle,
  logoUrl,
  menuArr,
}) => {
  const [open, setOpen] = React.useState("");
  const location = useLocation();

  const classes = {
    root: {
      backgroundColor: themeVars.primaryStrong,
      flexShrink: 0,
      height: "100vh",
      display: "flex",
      flexDirection: "column",
      // transition: 'all ease-in-out .3s',
    },

    header: {
      flexShrink: 0,
      height: "4.5rem",
      padding: "0 0.75rem",
      display: "flex",
      alignItems: "center",
      "& img": {
        height: "38px",
      },
    },

    body: {
      overflowY: "auto",
      overglowX: "hidden",
      flexGrow: 1,
      "&::-webkit-scrollbar": { width: "5px" },
      "::-webkit-scrollbar-track": { background: "transparent" },
      "::-webkit-scrollbar-thumb": { background: "#5c504a" },
      "::-webkit-scrollbar-thumb:hover": {
        background: "#5c504a",
      },
    },
  };
  const handleItemClick = (item: any) => {
    if (item.external) {
      window.location.href = item.link;
    }
  };
  return (
    <Box
      sx={{
        ...classes.root,
        width: toggle ? "16.875rem" : "4rem",
        display: "flex",
        flexDirection: "column",
        transition: "all ease-in-out .3s",
        gap: 1,
      }}
    >
      <Box sx={classes.header}>
        {!toggle ? (
          <IconButton
            sx={{
              background: "transparent",
              color: "white",
              transition : "100ms ease all",
              ":hover": {
                background : "white",
                color: "black",
              },
            }}
            onClick={() => setToggle((prev: boolean) => !prev)}
          >
            <Menu />
          </IconButton>
        ) : (
          <img src={logoUrl} alt="logo" />
        )}
      </Box>
      <Divider
        sx={{
          background: "#7A6C65",
        }}
      />
      <Box sx={classes.body}>
        {menuArr?.map((menu: any) => (
          <Box key={menu?.id}>
            <List
              component="nav"
              sx={{
                display: "flex",
                flexDirection: "column",
                gap: 1,
                overflowX: "hidden",
              }}
            >
              {menu?.data?.map((item: any, idx: number) => {
                const selected = location?.pathname === item?.link;
                if (item?.child) {
                  return (
                    <>
                      <ListItemButton
                        selected={open?.includes(item?.id)}
                        key={`list-button-${idx + 1}`}
                       
                        onClick={() => {
                          if (!toggle) {
                            setToggle(true);
                          }
                          setOpen(() =>
                            open?.includes(item?.id) ? "" : item?.id
                          );
                        }}
                      >
                        <ListItemIcon>
                          <item.icon color="currentColor" />
                        </ListItemIcon>
                        {toggle && (
                          <>
                            <ListItemText primary={item?.text} />
                            {/* <Icon.Right
                              color="currentColor"
                              style={{
                                transform: open?.includes(item?.id)
                                  ? "rotate(90deg)"
                                  : "rotate(0deg)",
                              }}
                            /> */}
                          </>
                        )}
                      </ListItemButton>

                      {toggle && (
                        <Box px={3}>
                          <Collapse
                            in={open?.includes(item?.id)}
                            timeout="auto"
                            unmountOnExit
                          >
                            <List component="div">
                              {item?.child?.map((child: any) => (
                                <ListItemButton
                                  selected={location?.pathname === child?.link}
                                  disabled={!child.active}
                                  component={Link}
                                  key={child?.id}
                                  to={child?.link}
                                  sx={{
                                    pl: 4,
                                    borderRadius: 2,
                                    "&.Mui-selected": {
                                      backgroundolor: "red",
                                      "& .MuiListItemText-primary": {
                                        fontWeight: 400,
                                      },
                                      "&:before": {
                                        display: "none",
                                      },
                                    },
                                  }}
                                >
                                  <ListItemText primary={child?.text} />
                                </ListItemButton>
                              ))}
                            </List>
                          </Collapse>
                        </Box>
                      )}
                    </>
                  );
                }
                return (
                  <ListItemButton
                    component={item.external ? 'div' : Link}
                    onClick={() => handleItemClick(item)}
                    to={item.external ? undefined : item?.link}
                    selected={selected}
                    sx={{
                      "&.Mui-selected": {
                        backgroundColor: "#2D2723",
                        "& .MuiListItemText-primary": {
                          fontWeight: 400,
                        },
                      },
                    }}
                    disabled={!item.active}
                    key={item?.id}
                  >
                    <ListItemIcon>
                      <item.icon color={selected ? "currentColor" : "white"} />
                    </ListItemIcon>
                    {toggle && (
                      <ListItemText
                        primaryTypographyProps={{
                          fontWeight: selected ? 500 : 200,
                        }}
                        sx={{ whiteSpace: "nowrap" }}
                        primary={item?.text}
                      />
                    )}
                  </ListItemButton>
                );
              })}
            </List>
          </Box>
        ))}
      </Box>
    </Box>
  );
};
