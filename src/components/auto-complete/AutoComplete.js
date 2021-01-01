import React from "react";
import { makeStyles, fade } from "@material-ui/core/styles";
import { TextField, InputAdornment } from "@material-ui/core";
import SearchIcon from "@material-ui/icons/Search";

const useStyles = makeStyles((theme) => ({
  search: {
    display: "flex",
    backgroundColor: fade(theme.palette.common.white, 0.15),
    width: "300px",
    alignItems: "center",
    marginTop: "20px",
  },
  inputRoot: {
    color: "inherit",
    width: "100%",
  },
}));

export default function AutoComplete(props) {
  const classes = useStyles();

  const validateInput = (value) => {
    if (value.match("^[a-zA-Z ]*$") != null) {
      return true;
    }
    return false;
  };


  return (
    <div className={classes.search}>
      <div className={classes.searchIcon}></div>
      <TextField
        placeholder="Search…"
        classes={{
          root: classes.inputRoot,
        }}
        value={props.defaultCity}
        onChange={props.handleChange}
        variant="outlined"
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <SearchIcon />
            </InputAdornment>
          ),
        }}
        error={!validateInput(props.defaultCity)}
        label={!validateInput(props.defaultCity) ? "Incorrect entry." : ""}
      />
    </div>
  );
}
