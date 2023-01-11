import React, { Component } from 'react';

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

  render() {
    const { inputName, inputEmail, btnDisabled } = this.state;
    const { handleChange, handleClick } = this;

    return (
      <div>
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
      </div>
    );
  }
}

export default Login;
