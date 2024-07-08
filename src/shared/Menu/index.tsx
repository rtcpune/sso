import * as React from "react";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";

export default function BasicMenu(props: any) {
  const [selected, setSelected] = React.useState(props?.items[0]);
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = (data: any) => {
    setAnchorEl(null);
  };

  const handleSelect = (data: any) => {
    setSelected(data);
    setAnchorEl(null);
  };

  return (
    <>
      <Button
        sx={{
          display: "flex",
          alignItems: "center",
          padding: 0,
          color: "#5A6474",
          fontSize: "0.8125rem",
          // height: 'auto',
          columnGap: 0.5,
          fontWeight: 500,
          "&:hover": {
            background: "transparent",
          },
        }}
        id="basic-button"
        aria-controls={open ? "basic-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
        onClick={handleClick}
      >
        {selected?.text} 
        {/* <Icon.Down size={16} color="currentColor" /> */}
      </Button>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        anchorOrigin={
          props.anchorOrigin ?? {
            vertical: "top",
            horizontal: "right",
          }
        }
        transformOrigin={
          props.transformOrigin ?? {
            vertical: "top",
            horizontal: "right",
          }
        }
        MenuListProps={{
          "aria-labelledby": "basic-button",
        }}
      >
        {props?.items?.map((item: any, index: number) => (
          <MenuItem
            key={`menu-${index + 1}`}
            selected={item?.id === selected?.id}
            onClick={() => handleSelect(item)}
          >
            {item.text}
          </MenuItem>
        ))}
      </Menu>
    </>
  );
}
