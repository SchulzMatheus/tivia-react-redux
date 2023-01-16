import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Header from '../components/Header';
import getQuestions from '../services/TriviaAPI/requestQuestions';
import { sumScore } from '../redux/actions';
import '../styles/game.css';

const CORRECT_ANSWER = 'correct-answer';
const WRONG_ANSWER = 'wrong-answer';
const MAX_QUESTIONS_LENGTH = 4;

class Game extends Component {
  state = {
    questions: [],
    randomQuestions: [],
    isLoading: true,
    currentQuestion: 0,
    timeLeft: 30,
    btnDisabled: false,
    next: false,
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

  handleResult = ({ target }) => {
    const { id } = target;
    const { dispatch } = this.props;
    const { questions, currentQuestion, timeLeft } = this.state;
    const currentDiffiiculty = questions[currentQuestion].difficulty;

    const easy = 1;
    const medium = 2;
    const hard = 3;
    const ten = 10;

    let mod = 0;

    if (currentDiffiiculty === 'easy') {
      mod = easy;
    } else if (currentDiffiiculty === 'medium') {
      mod = medium;
    } else {
      mod = hard;
    }

    console.log(mod);

    if (id === 'correct-answer') {
      const score = ten + (timeLeft * mod);
      dispatch(sumScore(score));
    }

    const allOptions = document.getElementById('answer-options');
    const options = allOptions.childNodes;

    options.forEach((option) => {
      if (option.id === CORRECT_ANSWER) {
        option.className = 'rigth';
      } else {
        option.className = 'wrong';
      }
    });

    this.setState({
      next: true,
    });

    clearInterval(this.timer);
  };

  handleNextQuestion = () => {
    this.setState((prevState) => ({
      currentQuestion: prevState.currentQuestion + 1,
    }), () => this.handleQuestions());

    const allOptions = document.getElementById('answer-options');
    const options = allOptions.childNodes;
    options.forEach((option) => {
      option.className = '';
    });

    this.setState({
      timeLeft: 30,
    }, () => this.handleTimer());
  };

  gotToFeedback = () => {
    const { history } = this.props;
    history.push('/feedback');
  };

  render() {
    const { questions, randomQuestions, isLoading,
      currentQuestion, timeLeft, btnDisabled, next } = this.state;

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
        { next && (
          <button
            type="button"
            onClick={ currentQuestion === MAX_QUESTIONS_LENGTH
              ? this.gotToFeedback : this.handleNextQuestion }
            data-testid="btn-next"
          >
            Next
          </button>
        ) }
      </section>
    );
  }
}

Game.propTypes = {
  history: PropTypes.func,
}.isRequired;

export default connect()(Game);
