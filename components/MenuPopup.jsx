import * as React from "react";
import Button from "@mui/material/Button";
import MenuItem from "@mui/material/MenuItem";
import { signOut } from "firebase/auth";
import { auth } from "./Fire";
import ManageAccountsIcon from "@mui/icons-material/ManageAccounts";
import { Typography } from "@mui/material";
import { Drawer } from "@mui/material";

export default function MenuPopupState({ setUser, setAuthState, user }) {
  const [isDrawerOpen, setIsDrawerOpen] = React.useState(false);

  function handleSignOut() {
    signOut(auth)
      .then(() => {
        setUser(null);
        setAuthState("login");
      })
      .catch((err) => {
        alert(err);
      });
  }

  return (
    <React.Fragment>
      <Button
        style={{
          backgroundColor: " rgb(32, 32, 32)",
          height: "3rem",
          width: "3rem",
          borderRadius: 0,
          color: "whitesmoke",
          margin: 0,
          padding: 0,
        }}
        variant="contained"
        onClick={() => setIsDrawerOpen(true)}
      >
        <ManageAccountsIcon />
      </Button>

      <Drawer
        anchor="right"
        open={isDrawerOpen}
        onClose={() => setIsDrawerOpen(false)}
      >
        <MenuItem onClick={() => setIsDrawerOpen(false)}>
          <Typography color="textSecondary" variant="body1">
            Logged in as {user}
          </Typography>
        </MenuItem>
        <MenuItem onClick={handleSignOut}>Logout</MenuItem>
      </Drawer>
    </React.Fragment>
  );
}
