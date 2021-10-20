import React from "react";
import { makeStyles } from "@material-ui/core/styles";
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
    width: "300px",
    alignItems: "center",
    marginTop: "20px",
    justifyContent: "center"
  },
  inputRoot: {
    background: "none",
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
  input: {
    color: 'rgba(0, 12, 30, 0.5)',
  }
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
        <TextField
          placeholder="Search…"
          classes={{
            root: classes.inputRoot,
          }}
          defaultValue={props.defaultCity}
          onChange={props.handleChange}
          variant="outlined"
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon color="white" />
              </InputAdornment>
            ),
            className: classes.input,
          }}
          error={!validateInput(props.defaultCity)}
          label={!validateInput(props.defaultCity) ? "Incorrect entry." : ""}
        />
      </div>
      <div>
        {props.city && props.city.length > 0 && (
          <List className={classes.listWrapper}>
            {props.city.map((cityName, i) => {
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
