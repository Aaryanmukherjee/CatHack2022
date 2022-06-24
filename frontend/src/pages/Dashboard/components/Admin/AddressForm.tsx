import * as React from "react";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
type userType = {
  email: string;
  role: string;
};

interface newUserProps {
  setNewUser: Function;
  newUser: userType;
}

export default function AddressForm(props: newUserProps) {
  const { setNewUser, newUser } = props;

  return (
    <React.Fragment>
      <Typography variant="h6" gutterBottom>
        User Information
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <TextField
            required
            id="email"
            name="email"
            label="Email"
            fullWidth
            autoComplete="shipping address-line1"
            variant="standard"
            value={newUser.email}
            onChange={(e) => setNewUser({ email: e.target.value, role: "" })}
          />
          {/* <TextField
            required
            id="company"
            name="company"
            label="Company"
            fullWidth
            autoComplete="shipping address-line1"
            variant="standard"
            // value={newUser.email}
            // onChange={(e) => setNewUser({ email: e.target.value, role: "" })}
          /> */}
        </Grid>
      </Grid>
    </React.Fragment>
  );
}
