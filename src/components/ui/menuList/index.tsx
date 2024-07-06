import { Menu, Stack } from "@mui/material";
import { Typography } from "@mui/material";
import { MenuItem, Button } from "@mui/material";
import MoreIcon from "components/@extended/MoreIcon";

import React, { useState } from "react";

const MenuList = ({ option, ...props }: any) => {
  const [anchorEl, setAnchorEl] = useState(null);

  const handleMenuOpen = (event: any) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = (content: () => void) => {
    if (typeof content === "function") {
      content();
      setAnchorEl(null);
    }

    setAnchorEl(null);
  };
  return (
    <div style={{ display: "flex", justifyItems: "center" }}>
      <Button color="secondary" onClick={handleMenuOpen}>
        <MoreIcon />
      </Button>
      <div style={{ position: "absolute" }}>
        <Menu
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={() => setAnchorEl(null)}
          anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
          transformOrigin={{ vertical: "top", horizontal: "left" }}
          onClick={props.onClick}
        >
          {option?.map((ele: any) => (
            <MenuItem
              onClick={() => {
                handleMenuClose(ele?.content);
              }}
            >
              <Stack direction="row" alignItems="center" spacing={1}>
                <Stack textAlign="center">
                  {ele?.icon}
                </Stack>
                <Typography>{ele?.value}</Typography>
              </Stack>
              {/* <div>{ele?.icon}</div>
                <Typography>{ele?.value}</Typography> */}
            </MenuItem>
          ))}
        </Menu>
      </div>
    </div>
  );
};

export default MenuList;
