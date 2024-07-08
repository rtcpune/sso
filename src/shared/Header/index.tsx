import {
  Avatar,
  Box,
  IconButton,
  ListItemIcon,
  Menu,
  MenuItem,
} from "@mui/material";
import { Logout, Menu as MenuIcon } from "@mui/icons-material";
import { useState, type FC, useContext } from "react";
import { AppContext } from "../../App";
import { useNavigate } from "react-router-dom";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { Text } from "../../components/Text";

interface IHeader {
  setOpen: Function;
  open: boolean;
  logoUrl: string;
}

export function stringAvatar(name: string) {
  return {
    children: `${name.split(" ")[0][0].toLocaleUpperCase()}${
      name.split(" ")[1] ? name.split(" ")[1][0].toLocaleUpperCase() : ""
    }`,
  };
}

export const Header: FC<IHeader> = ({ setOpen, open, logoUrl }) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const { state } = useContext(AppContext);
  const navigate = useNavigate();
  const menuOpen = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const logout = () => {
    localStorage.clear();
    window.location.href='SITE_URL'
  };

  const classes = {
    root: {
      position: "sticky",
      top: 0,
      zIndex: 99,
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      height: "4.5rem",
      boxShadow: "0px 2px 10px 0px rgba(27, 46, 94, 0.04)",
      background: "#FFF",
      "& img": {
        height: "38px",
        background: "#000000",
      },
    },
  };
  return (
    <Box pl={open ? 0 : 3} pr={3} sx={classes.root}>
      <Box height={1} display="flex" alignItems="center">
        {open ? (
          <IconButton
            sx={{
              width: "auto",
              ml: "1rem",
              background: "white",
            }}
            onClick={() => setOpen((prev: boolean) => !prev)}
          >
            <MenuIcon />
          </IconButton>
        ) : (
          <img src={logoUrl} alt="logo" />
        )}
      </Box>

      <Box display="flex" gap={2.5}>
        <Box borderLeft="1px solid #E1E3E6" pl={2.5}>
          <IconButton
            onClick={handleClick}
            aria-expanded={menuOpen ? "true" : undefined}
            aria-controls={menuOpen ? "account-menu" : undefined}
            sx={{
              width: "auto",
              height: "auto",
              padding: 0,
              gap: 1,
              backgroundColor: "transparent",

              "&:hover": {
                backgroundColor: "transparent",
              },
            }}
          >
            <Avatar
              sx={{
                width: "2.625rem",
                height: "2.625rem",
              }}
              alt={`${state?.user?.firstName} ${state?.user?.lastName}`}
              src={
                state?.user?.image?.url ||
                "https://external-content.duckduckgo.com/iu/?u=http%3A%2F%2Fpluspng.com%2Fimg-png%2Fuser-png-icon-young-user-icon-2400.png&f=1&nofb=1&ipt=64a35864790504975bf2765d2eb373c809c08a88766a1660fe561f9b0d075fbe&ipo=images"
              }
            />
            <Text
              sx={{
                fontSize: "0.875rem",
                fontWeight: 500,
                color: "#121212",
              }}
            >
              {`${state?.user?.firstName} ${state?.user?.lastName}`}
            </Text>
            {/* <Icon.Down /> */}
          </IconButton>

          <Menu
            anchorEl={anchorEl}
            id="account-menu"
            open={menuOpen}
            onClose={handleClose}
            onClick={handleClose}
            PaperProps={{
              elevation: 0,
              sx: {
                minWidth: "150px",
                overflow: "visible",
                filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
                mt: 1.5,
                "& .MuiAvatar-root": {
                  width: 32,
                  height: 32,
                  ml: -0.5,
                  mr: 1,
                },
                "&:before": {
                  content: '""',
                  display: "block",
                  position: "absolute",
                  top: 0,
                  right: 14,
                  width: 10,
                  height: 10,
                  bgcolor: "background.paper",
                  transform: "translateY(-50%) rotate(45deg)",
                  zIndex: 0,
                },
              },
            }}
            transformOrigin={{ horizontal: "right", vertical: "top" }}
            anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
          >
            {/* <MenuItem onClick={() => navigate(PROFILE)}>
              <ListItemIcon>
                <AccountCircleIcon fontSize="small" />
              </ListItemIcon>
              Profile
            </MenuItem> */}
            <MenuItem onClick={logout}>
              <ListItemIcon>
                <Logout fontSize="small" />
              </ListItemIcon>
              Logout
            </MenuItem>
          </Menu>
        </Box>
      </Box>
    </Box>
  );
};
