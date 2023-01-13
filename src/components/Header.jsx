import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import md5 from 'crypto-js/md5';
import '../styles/header.css';

class Header extends Component {
  render() {
    const { name, gravatarEmail, score } = this.props;
    const hash = md5(gravatarEmail).toString();
    const picture = `https://www.gravatar.com/avatar/${hash}`;

    return (
      <div className="header-container">
        <img data-testid="header-profile-picture" src={ picture } alt="avatar" />
        <span data-testid="header-player-name">{ name }</span>
        <span data-testid="header-score">{ score }</span>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  ...state,
});

Header.propTypes = {
  name: PropTypes.string,
  gravatarEmail: PropTypes.string,
  score: PropTypes.number,
}.isRequired;

export default connect(mapStateToProps)(Header);
