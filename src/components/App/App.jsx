import React, { useState } from 'react';
import { Form } from './App.styled';
import { FeedbackOptions, Statistics, Section, Notification } from 'components';

export const App = () => {
  const [feedbackState, setFeedbackState] = useState({
    good: 0,
    neutral: 0,
    bad: 0,
  });

  const giveFeedback = event => {
    const { id } = event.target;
    setFeedbackState(prevState => ({
      ...prevState,
      [id]: prevState[id] + 1,
    }));
  };

  const countTotalFeedback = () => {
    const { good, neutral, bad } = feedbackState;
    let result = good + neutral + bad;
    return result;
  };
  //test
  const countPositiveFeedbackPercentage = () => {
    const result = countTotalFeedback();
    const { good } = feedbackState;
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
