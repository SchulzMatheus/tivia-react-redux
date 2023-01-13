import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import Header from '../components/Header';
import getQuestions from '../services/TriviaAPI/requestQuestions';

import '../styles/game.css';

const CORRECT_ANSWER = 'correct-answer';
const WRONG_ANSWER = 'wrong-answer';

class Game extends Component {
  state = {
    questions: [],
    randomQuestions: [],
    isLoading: true,
    currentQuestion: 0,
    timeLeft: 30,
    btnDisabled: false,
  };

  async componentDidMount() {
    const { history } = this.props;

    this.handleTimer();

    const token = localStorage.getItem('token');
    if (!token) {
      history.push('/');
    } else {
      const questionsObj = await getQuestions(token);
      if (questionsObj.response_code !== 0) {
        history.push('/');
      }
      this.setState({
        questions: questionsObj.results,
        isLoading: false,
      }, this.handleQuestions);
    }
  }

  handleTimer = () => {
    const second = 1000;

    this.timer = setInterval(() => {
      this.setState((prevState) => ({ timeLeft: prevState.timeLeft - 1 }));

      const { timeLeft } = this.state;
      if (timeLeft === 1) {
        clearInterval(this.timer);
        this.setState({ btnDisabled: true });
      }
    }, second);
  };

  handleQuestions = () => {
    const { questions, currentQuestion } = this.state;
    this.setState({
      randomQuestions: this.handleRandom(
        questions[currentQuestion]?.correct_answer,
        questions[currentQuestion]?.incorrect_answers,
      ),
    });
  };

  handleRandom = (correctAnswer, incorrectAnswers) => {
    const newAnswers = [...incorrectAnswers, correctAnswer];
    const randonAnswers = newAnswers.map((value) => ({ value, sort: Math.random() }))
      .sort((a, b) => a.sort - b.sort)
      .map(({ value }) => value);
    return randonAnswers;
  };

  handleResult = () => {
    const allOptions = document.getElementById('answer-options');
    const options = allOptions.childNodes;

    options.forEach((option) => {
      if (option.id === CORRECT_ANSWER) {
        option.className = 'rigth';
      } else {
        option.className = 'wrong';
      }
    });
  };

  render() {
    const { questions, randomQuestions, isLoading,
      currentQuestion, timeLeft, btnDisabled } = this.state;

    return (
      <section>
        { isLoading
          ? 'Loading'
          : (
            <div>
              <Header />
              <main>
                <h2 data-testid="question-category">
                  { questions[currentQuestion]?.category }
                </h2>
                <h3 data-testid="question-text">
                  { questions[currentQuestion]?.question }
                </h3>
                <div id="answer-options" data-testid="answer-options">
                  { randomQuestions.map((a, answerIndex) => (
                    <button
                      key={ answerIndex }
                      type="button"
                      disabled={ btnDisabled }
                      id={
                        a === questions[currentQuestion]?.correct_answer
                          ? CORRECT_ANSWER
                          : `${WRONG_ANSWER}-${answerIndex}`
                      }
                      onClick={ this.handleResult }
                      data-testid={
                        a === questions[currentQuestion]?.correct_answer
                          ? CORRECT_ANSWER
                          : `${WRONG_ANSWER}-${answerIndex}`
                      }
                    >
                      { a }
                    </button>
                  ))}
                </div>
              </main>
            </div>
          )}
        <p>
          Timer:
          {' '}
          <span>{ timeLeft }</span>
        </p>
      </section>
    );
  }
}

Game.propTypes = {
  history: PropTypes.func,
}.isRequired;

export default connect()(Game);
