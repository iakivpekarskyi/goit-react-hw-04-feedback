import React, { useReducer } from 'react';
import { Form } from './App.styled';
import { FeedbackOptions, Statistics, Section, Notification } from 'components';

const ACTIONS = {
  INCREMENT: 'increment',
};

const feedbackReducer = (state, action) => {
  switch (action.type) {
    case ACTIONS.INCREMENT:
      return { ...state, [action.payload]: state[action.payload] + 1 };
    default:
      return state;
  }
};

export const App = () => {
  const [feedbackState, dispatch] = useReducer(feedbackReducer, {
    good: 0,
    neutral: 0,
    bad: 0,
  });

  const giveFeedback = event => {
    const { id } = event.target;
    dispatch({ type: ACTIONS.INCREMENT, payload: id });
  };

  const countTotalFeedback = () => {
    const { good, neutral, bad } = feedbackState;
    let result = good + neutral + bad;
    return result;
  };

  const countPositiveFeedbackPercentage = () => {
    const result = countTotalFeedback();
    const percentage = (good * 100) / result;
    return Math.round(percentage);
  };

  const { good, neutral, bad } = feedbackState;
  const total = countTotalFeedback();
  const positivePercentage = countPositiveFeedbackPercentage();
  const objKey = Object.keys(feedbackState);

  return (
    <Form>
      <Section title="Please leave your feedback">
        <FeedbackOptions options={objKey} onLeaveFeedback={giveFeedback} />
      </Section>

      {total === 0 ? (
        <Notification message="No feedback yet" />
      ) : (
        <Section title="Statistics">
          <Statistics
            good={good}
            neutral={neutral}
            bad={bad}
            total={total}
            positivePercentage={positivePercentage}
          />
        </Section>
      )}
    </Form>
  );
};
