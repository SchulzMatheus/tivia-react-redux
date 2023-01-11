import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import logo from '../trivia.png';

import { fetchTokenPlayer } from '../redux/actions';

class Login extends Component {
  state = {
    inputName: '',
    inputEmail: '',
    btnDisabled: true,
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

  handleClick = async (event) => {
    event.preventDefault();
    const { dispatch, history } = this.props;
    await dispatch(fetchTokenPlayer());
    const { token } = this.props;
    localStorage.setItem('token', token);
    history.push('/game');
  };

  render() {
    const { inputName, inputEmail, btnDisabled } = this.state;
    const { handleChange, handleClick } = this;

    return (
      <div>
        <header className="App-header">
          <img src={ logo } className="App-logo" alt="logo" />
        </header>
        <main>
          <label htmlFor="inputName">
            Nome:
            <input
              id="inputName"
              name="inputName"
              type="text"
              data-testid="input-player-name"
              onChange={ handleChange }
              value={ inputName }
            />
          </label>
          <label htmlFor="inputEmail">
            Email:
            <input
              id="inputEmail"
              name="inputEmail"
              type="text"
              data-testid="input-gravatar-email"
              onChange={ handleChange }
              value={ inputEmail }
            />
          </label>
          <button
            type="button"
            data-testid="btn-play"
            disabled={ btnDisabled }
            onClick={ handleClick }
          >
            Play
          </button>
        </main>
      </div>
    );
  }
}

Login.propTypes = {
  dispatch: PropTypes.func,
  history: PropTypes.func,
}.isRequired;

const mapStateToProps = (state) => ({
  token: state.player.token,
});

export default connect(mapStateToProps)(Login);
