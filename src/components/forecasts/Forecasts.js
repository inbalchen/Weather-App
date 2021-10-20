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
    marginTop: "7px",
  },
  degree: {
    paddingBottom: "10px",
  },
  wrapper: {
    padding: "0 20px",
  },
  wrapperItem: {
    minWidth: "20%",
  },
  itemCard: {
    fontSize: "0.9rem",
    textAlign: "center",
    background: 'rgba(249,249,249, 0.6)',
    color: 'rgba(0, 12, 30, 0.8)',
    transition: '0.4s',
    cursor: 'pointer'
  },
  cardHeader: {
    padding: "7px 0",
    color: 'rgba(0, 12, 30, 0.8)',
    transition: '0.4s'
  },
}));

export default function Forecasts({forecasts}) {
  const classes = useStyles();
  return (
    <Grid
      container
      justify="center"
      spacing={2}
      className={classes.wrapper}
    >
      {forecasts.DailyForecasts.map((forecast, i) => {
        return (
          <Grid item key={i} xs={12} sm={6} md={4} lg={4} className={classes.wrapperItem}>
            <Card className={classes.itemCard}>
              <CardHeader
                title={Days[i]}
                className={classes.cardHeader + ' card-header-anim'}
              />
              <div>{forecast.Date.substring(0, 10)}</div>
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
              <Divider style={{margin: '10px 0'}} />
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
