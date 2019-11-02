import React from 'react';
import ReactDOM from 'react-dom';
// import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { BrowserRouter as Router, Link, Route } from 'react-router-dom'
// <App />,

const About = () => (
  <div>
    <h2>About</h2>
  </div>
)

const Profile = ({match}) => (
  <div>
    <h2>Profile For Address: {match.params.address}</h2>
  </div>
)

// <Route exact path="/" component={App} />

ReactDOM.render(
  <Router>
      <div>
        <aside>
          <Link to={`/`}>Home</Link>
          <Link to={`/about`}>About</Link>
        </aside>

        <main>
          <Route exact path="/" component={App} />
          <Route exact path="/:address" component={Profile} />
          <Route path="/home" component={App} />
          <Route path="/about" component={About} />
        </main>
      </div>
  </Router>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
