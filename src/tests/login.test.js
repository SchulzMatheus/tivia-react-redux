import React from 'react';
import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { renderWithRouterAndRedux } from './helpers/renderWithRouterAndRedux';
import Login from '../pages/Login';

describe('Testa a página "Login"', () => {
  it('1 - Verifica os elementos da tela.', () => {
    renderWithRouterAndRedux(<Login />);

    const name = screen.getByRole('textbox', { name: /nome/i });
    const email = screen.getByRole('textbox', { name: /email/i });
    const play = screen.getByRole('button', { name: /play/i });
    const config = screen.getByRole('button', { name: /config/i })

    expect(name).toBeInTheDocument();
    expect(email).toBeInTheDocument();
    expect(play).toBeInTheDocument();
    expect(config).toBeInTheDocument();
  });

  it('2 - Testa os verificadores de nome e email.', () => {
    renderWithRouterAndRedux(<Login />);

    const name = screen.getByRole('textbox', { name: /nome/i });
    const email = screen.getByRole('textbox', { name: /email/i });
    const play = screen.getByRole('button', { name: /play/i });

    userEvent.type(name, 'test');
    userEvent.type(email, 'test@gmail.com');

    expect(play).toBeEnabled();
  });

  it('3 - Testa o redirecionamento para iniciar o jogo.', async () => {
    const { history } = renderWithRouterAndRedux(<Login />);

    const name = screen.getByRole('textbox', { name: /nome/i });
    const email = screen.getByRole('textbox', { name: /email/i });
    const play = screen.getByRole('button', { name: /play/i });

    userEvent.type(name, 'test');
    userEvent.type(email, 'test@gmail.com');
    userEvent.click(play);

    await waitFor(() => {
      const { pathname } = history.location;
      expect(pathname).toBe('/game');     
    })
  });

  it('4 - Testa o redirecionamento para as configurações.', () => {
    const { history } = renderWithRouterAndRedux(<Login />);

    const config = screen.getByRole('button', { name: /config/i })
    userEvent.click(config);

    const { pathname } = history.location;
    expect(pathname).toBe('/config');
  });
});