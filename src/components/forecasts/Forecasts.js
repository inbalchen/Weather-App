import { Grid, Card, CardHeader, Divider } from "@material-ui/core";
import { Days, dayIcons, nightIcons } from "../../utils/map";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  img: {
    maxWidth: "50px",
    margin: "8px 0 0 0",
  },
  day: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    padding: "10px 0",
  },
  degree: {
    paddingTop: "10px",
  },
  wrapper: {
    padding: "20px",
  },
  wrapperItem: {
    minWidth: "20%",
  },
  itemCard: {
    padding: "10px 3px",
    fontSize: "0.9rem",
    textAlign: "center",
    minHeight: "250px",
  },
  cardHeader: {
    padding: "7px 0",
  },
}));

export default function Forecasts(props) {
  const classes = useStyles();
  return (
    <Grid
      container
      justify="center"
      alignItems="center"
      spacing={2}
      className={classes.wrapper}
    >
      {props.forecasts.data.DailyForecasts.map((forecast, i) => {
        return (
          <Grid
            item
            key={i}
            xs={12}
            sm={4}
            md={2}
            lg={2}
            className={classes.wrapperItem}
          >
            <Card className={classes.itemCard}>
              <CardHeader
                title={Days[i]}
                subheader={forecast.Date.substring(0, 10)}
                className={classes.cardHeader}
              />
              <div className={classes.day}>
                {"Day: " + forecast.Day.IconPhrase}
                <img
                  src={dayIcons(forecast.Day.IconPhrase)}
                  alt="condition"
                  className={classes.img}
                />
              </div>
              <div className={classes.day}>
                {"Night: " + forecast.Night.IconPhrase}
                <img
                  src={nightIcons(forecast.Night.IconPhrase)}
                  alt="condition"
                  className={classes.img}
                />
              </div>
              <Divider />
              <div className={classes.degree}>
                {forecast.Temperature.Maximum.Value}&#176;{" "}
                {forecast.Temperature.Maximum.Unit}
              </div>
            </Card>
          </Grid>
        );
      })}
    </Grid>
  );
}
