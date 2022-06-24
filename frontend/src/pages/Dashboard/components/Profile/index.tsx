import React, { useEffect, useState } from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import LogoutIcon from "@mui/icons-material/Logout";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import Divider from "@mui/material/Divider";

import axios from "axios";

interface ProfileProps {
  email: string;
  role: string;
}
export default function Profile(props: ProfileProps) {
  const { email, role } = props;
  const handleClick = () => {
    axios
      .get("/clear")
      .then((response) => {
        console.log("SUCCESS", response);
        window.location.href = "/";
      })
      .catch((error) => {
        console.log(error);
      });
  };
  return (
    <Box display="flex" alignItems="center">
      <Divider color="white" orientation="vertical" flexItem />
      <Box display="flex" flexDirection="column" pr="10px" pl="20px">
        <Typography fontSize="14px" fontWeight="bold">
          {email}
        </Typography>
        <Typography fontSize="14px" fontWeight="bold">
          {role}
        </Typography>
      </Box>
      <Tooltip title="Log out">
        <IconButton
          onClick={() => {
            handleClick();
          }}
          aria-label="delete"
        >
          <LogoutIcon fontSize="large" sx={{ color: "white" }} />{" "}
        </IconButton>
      </Tooltip>
    </Box>
  );
}
