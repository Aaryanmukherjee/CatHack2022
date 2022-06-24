import * as React from "react";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import FormLabel from "@mui/material/FormLabel";
import RadioGroup from "@mui/material/RadioGroup";
import FormControl from "@mui/material/FormControl";
import Radio from "@mui/material/Radio";

type userType = {
  email: string;
  role: string;
};

interface newUserProps {
  setNewUser: Function;
  newUser: userType;
}

export default function PaymentForm(props: newUserProps) {
  const { setNewUser, newUser } = props;
  return (
    <React.Fragment>
      <Typography variant="h6" gutterBottom>
        Access
      </Typography>
      <FormControl>
        <RadioGroup
          aria-labelledby="demo-radio-buttons-group-label"
          // defaultValue="viewer"
          name="radio-buttons-group"
          value={newUser.role}
        >
          <FormControlLabel
            onClick={() => {
              setNewUser({ email: newUser.email, role: "viewer" });
            }}
            value="viewer"
            control={<Radio />}
            label="Viewer"
          />
          <FormControlLabel
            onClick={() => {
              setNewUser({ email: newUser.email, role: "buyer" });
            }}
            value="buyer"
            control={<Radio />}
            label="Buyer"
          />
          <FormControlLabel
            onClick={() => {
              setNewUser({ email: newUser.email, role: "admin" });
            }}
            value="admin"
            control={<Radio />}
            label="Admin"
          />
        </RadioGroup>
      </FormControl>
    </React.Fragment>
  );
}
