import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Link, Redirect } from 'react-router-dom';
import { savePlayerInfo } from '../redux/actions';
import '../styles/login.css';

import getToken from '../services/TriviaAPI/requestToken';

class Login extends Component {
  state = {
    inputName: '',
    inputEmail: '',
    btnDisabled: true,
    loginPage: false,
    gamePage: false,
  };

  handleChange = ({ target }) => {
    const { name, value } = target;

    this.setState({
      [name]: value,
    });

    const regEx = /^[a-z0-9.]+@[a-z0-9]+\.[a-z]+(\.[a-z]+)?$/i;
    const { inputName, inputEmail } = this.state;
    const loginValidation = regEx.test(inputEmail)
      && inputName.length > 0
      ? this.setState({ btnDisabled: false })
      : this.setState({ btnDisabled: true });

    return loginValidation;
  };

  handleClick = async () => {
    const { dispatch } = this.props;
    const responseCode = await getToken();

    if (responseCode !== 0) {
      localStorage.removeItem('token');
      this.setState({ loginPage: true });
    } else {
      this.setState({ gamePage: true });
    }

    const { inputName, inputEmail } = this.state;
    dispatch(savePlayerInfo({ inputName, inputEmail }));
  };

  render() {
    const { inputName, inputEmail, btnDisabled, loginPage, gamePage } = this.state;
    const { handleChange, handleClick } = this;

    if (loginPage) return <Redirect to="/" />;
    if (gamePage) return <Redirect to="/game" />;

    return (
      <main className="login-container">
        <label className="label-input" htmlFor="inputName">
          Nome
          <input
            id="inputName"
            name="inputName"
            type="text"
            data-testid="input-player-name"
            onChange={ handleChange }
            value={ inputName }
          />
        </label>

        <label className="label-input" htmlFor="inputEmail">
          Email
          <input
            id="inputEmail"
            name="inputEmail"
            type="text"
            data-testid="input-gravatar-email"
            onChange={ handleChange }
            value={ inputEmail }
          />
        </label>

        <div className="play-config">
          <button
            type="button"
            data-testid="btn-play"
            disabled={ btnDisabled }
            onClick={ handleClick }
          >
            Play
          </button>

          <Link to="/config">
            <button
              type="button"
              data-testid="btn-settings"
            >
              Config
            </button>
          </Link>
        </div>
      </main>
    );
  }
}

Login.propTypes = {
  dispatch: PropTypes.func,
  history: PropTypes.func,
}.isRequired;

export default connect()(Login);
