import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { fetchTokenPlayer } from '../redux/actions';
import '../styles/login.css';

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

  handleClick = async () => {
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
      <div className="login-container">
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
