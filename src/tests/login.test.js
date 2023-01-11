import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { renderWithRouterAndRedux } from './helpers/renderWithRouterAndRedux';
import Login from '../pages/Login';

describe('Testa a página "Login"', () => {
  it('1 - Verifica os elementos da tela.', () => {
    renderWithRouterAndRedux(<Login />);

    const name = screen.getByRole('textbox', { name: /nome:/i });
    const email = screen.getByRole('textbox', { name: /email:/i });
    const button = screen.getByRole('button', {  name: /play/i });

    expect(name).toBeInTheDocument();
    expect(email).toBeInTheDocument();
    expect(button).toBeInTheDocument();
  });

  it('2 - Testa os verificadores de nome e email.', () => {
    renderWithRouterAndRedux(<Login />);

    const name = screen.getByRole('textbox', { name: /nome:/i });
    const email = screen.getByRole('textbox', { name: /email:/i });
    const button = screen.getByRole('button', {  name: /play/i });

    userEvent.type(name, 'test');
    userEvent.type(email, 'test@gmail.com');

    expect(button).toBeEnabled();
  });

  it('3 - Testa o redirecionamento para iniciar o jogo.', () => {
    const { history } = renderWithRouterAndRedux(<Login />);

    const name = screen.getByRole('textbox', { name: /nome:/i });
    const email = screen.getByRole('textbox', { name: /email:/i });
    const button = screen.getByRole('button', {  name: /play/i });

    userEvent.type(name, 'test');
    userEvent.type(email, 'test@gmail.com');
    userEvent.click(button);

    const { pathname } = history.location;
    expect(pathname).toBe('/game');
  });
});