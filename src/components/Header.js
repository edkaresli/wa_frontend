import React from 'react';

class Header extends React.Component {
  constructor(props) {
    super(props);
    this.state = {}
  }

  render() {
    return (
      <header>
        <img className="logo" src="https://logo-logos.com/wp-content/uploads/2017/07/Linux_Logo_02.png" alt="Some logo" height="40" width="40"/>
        <nav>
          <a href="#">Save</a>
          <a href="#">About</a>
        </nav>
      </header>
    );
  } 
}

export default Header;