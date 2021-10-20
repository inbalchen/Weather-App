import { Route } from "react-router-dom";
import Search from './contsiners/app/Search'
import Favorites from './contsiners/favorites/Favorites'
import NavBar from './components/nav-bar/Nav'
import {
  createStyles,
  makeStyles,
} from '@material-ui/core';
import './assets/styles/index.scss'

const useStyles = makeStyles(() => createStyles({
  '@global': {
    '*': {
      boxSizing: 'border-box',
      margin: 0,
      padding: 0,
    },
    html: {
      '-webkit-font-smoothing': 'antialiased',
      '-moz-osx-font-smoothing': 'grayscale',
      height: '100%',
      width: '100%',
      overflow: 'auto'
    },
    body: {
      height: '100%',
      width: '100%',
      overflow: 'auto'
    }
  }
}));

function App() {
  useStyles();
  return (
    <>
      <NavBar />
      <Route path="/" exact component={Search} />
      <Route path="/favorites" exact component={Favorites} />
    </>
  );
}

export default App;
