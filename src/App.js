import { Route } from "react-router-dom";
import Search from './contsiners/app/Search'
import Favorites from './contsiners/favorites/Favorites'
import NavBar from './components/nav-bar/Nav'
import {
  createStyles,
  makeStyles,
} from '@material-ui/core';

const useStyles = makeStyles(() => createStyles({
  '@global': {
    '*': {
      boxSizing: 'border-box',
      margin: 0,
      padding: 0,
      fontFamily: 'sans-serif',
    },
    html: {
      '-webkit-font-smoothing': 'antialiased',
      '-moz-osx-font-smoothing': 'grayscale',
      height: '100%',
      width: '100%'
    },
    body: {
      height: '100%',
      width: '100%'
    },
    '#root': {
      height: '100%',
      width: '100%'
    }
  }
}));

function App() {
  useStyles();
  return (
    <div>
      <NavBar />
      <Route path="/" exact component={Search} />
      <Route path="/favorites" exact component={Favorites} />
    </div>
  );
}

export default App;
