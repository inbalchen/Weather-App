import React from "react";
import { makeStyles, fade } from "@material-ui/core/styles";
import {
  TextField,
  InputAdornment,
  ListItem,
  List,
  ListItemText,
} from "@material-ui/core";
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
    background: "#fff",
    boxShadow:
      "0px 2px 4px -1px rgba(0,0,0,0.2), 0px 4px 5px 0px rgba(0,0,0,0.14), 0px 1px 10px 0px rgba(0,0,0,0.12)",
    borderRadius: "4px",
  },
  listWrapper: {
    width: "300px",
    padding: "0",
    background: "#fff",
    border: "0.5px solid rgba(0,0,0,.3)",
    borderRadius: "4px",
    position: "absolute",
    maxHeight: "400px",
    overflow: "auto",
    "& :last-child": {
      borderBottom: "none",
    },
  },
  listItem: {
    borderBottom: "1px solid rgba(0,0,0,.2)",
  },
}));

export default function AutoComplete(props) {
  const classes = useStyles();

  const validateInput = (value) => {
    if (value.match("^[a-zA-Z +_-]*$") != null) {
      return true;
    }
    return false;
  };

  return (
    <div>
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
      <div>
        {props.city && props.city.data && props.city.data.length > 0 && (
          <List className={classes.listWrapper}>
            {props.city.data.map((cityName, i) => {
              return (
                <ListItem
                  button
                  key={i}
                  className={classes.listItem}
                  onClick={() =>
                    props.handleListItemClick(
                      cityName.LocalizedName,
                      cityName.Key
                    )
                  }
                >
                  <ListItemText primary={cityName.LocalizedName} />
                </ListItem>
              );
            })}
          </List>
        )}
      </div>
    </div>
  );
}
