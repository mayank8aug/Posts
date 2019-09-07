import React, { Component } from 'react';
import { render } from 'react-dom';
import { Route, Switch } from "react-router-dom";
import { BrowserRouter } from "react-router-dom";
import Posts from './Components/Posts';
import Post from './Components/Post';
import User from './Components/User';

class App extends Component {
  constructor() {
    super();
    this.state = {
      users: [],
      posts: []
    };
  }

  componentDidMount() {
    fetch('https://jsonplaceholder.typicode.com/posts')
      .then(response => response.json())
      .then(json => (() => { this.setState({ posts: json }); })() );
      
    fetch('https://jsonplaceholder.typicode.com/users')
      .then(response => response.json())
      .then(json => (() => { this.setState({ users: json }); })() );
  }

  render() {
    const { posts, users } = this.state;
    return (
      <div>
        <Switch>
          <Route exact path="/" component={props => <Posts {...props} posts={posts} users={users} />} />
          <Route path="/post/:id" component={props => <Post {...props} posts={posts} users={users} />} />
          <Route path="/user/:id" component={props => <User {...props} users={users} />} />
        </Switch>
      </div>
    );
  }
}

render(<BrowserRouter>
    <App />
  </BrowserRouter>, document.getElementById('root'));
