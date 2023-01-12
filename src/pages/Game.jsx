import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import Header from '../components/Header';
import getQuestions from '../services/TriviaAPI/requestQuestions';

class Game extends Component {
  state = {
    questions: [],
    isLoading: true,
    currentQuestion: 0,
  };

  async componentDidMount() {
    const { history } = this.props;
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
      });
    }
  }

  handleRandom = (correctAnswer, incorrectAnswers) => {
    const newAnswers = [...incorrectAnswers, correctAnswer];
    const randonAnswers = newAnswers.map((value) => ({ value, sort: Math.random() }))
      .sort((a, b) => a.sort - b.sort)
      .map(({ value }) => value);
    return randonAnswers;
  };

  // nextQuestion = () => {
  //   this.setState((prevState) => ({
  //     currentQuestion: prevState.currentQuestion + 1,
  //   }));
  // };

  render() {
    const { questions, isLoading, currentQuestion } = this.state;
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
                <div data-testid="answer-options">
                  { this.handleRandom(
                    questions[currentQuestion]?.correct_answer,
                    questions[currentQuestion]?.incorrect_answers,
                  )
                    .map((a, answerIndex) => (
                      <button
                        key={ answerIndex }
                        type="button"
                        data-testid={
                          a === questions[currentQuestion]?.correct_answer
                            ? 'correct-answer'
                            : `wrong-answer-${answerIndex}`
                        }
                      >
                        { a }
                      </button>
                    ))}
                </div>
              </main>
            </div>
          )}
      </section>
    );
  }
}

Game.propTypes = {
  history: PropTypes.func,
}.isRequired;

export default connect()(Game);
