import React, { PureComponent } from 'react';
import { Link } from "react-router-dom";
import './User.css';

class User extends PureComponent {
  constructor(props) {
    super(props);
    const { users, match } = this.props;
    this.userId = match.params.id;
    this.state = {
      user: users.find(user => { return user.id == this.userId })
    };
  }

  componentDidUpdate(prevProps) {
      const { users } = this.props;
      if (prevProps.users !== users && users) {
        (() => { this.setState({ user: users.find(user => { return user.id == this.userId }) }); })(); 
      }
  }

  render() {
    const { user } = this.state;
    const { name, username, email, website, company } = user || {};
    return (
      <div>
        <Link className="back-link" to="/">Back to all posts</Link>
        {
          user &&
          <React.Fragment>
            <div>Author name: {name}</div>
            <div>Username: {username}</div>
            <div>EmailId: {email}</div>
            <div>Website: {website}</div>
            <div>Company: {company.name}</div>
          </React.Fragment>
        }
      </div>
    )
  }
}

export default User;