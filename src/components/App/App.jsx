import React, { useState, useEffect } from 'react';
import { Form } from './App.styled';
import { FeedbackOptions, Statistics, Section, Notification } from 'components';

export function App() {
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);
  const [totalFeedback, setTotalFeedback] = useState(0);
  const [feedbackPercentage, setFeedbackPercentage] = useState(0);

  const giveFeedback = event => {
    const { id } = event.target;
    switch (id) {
      case 'good':
        setGood(prevState => prevState + 1);
        break;
      case 'neutral':
        setNeutral(prevState => prevState + 1);
        break;
      case 'bad':
        setBad(prevState => prevState + 1);
        break;
      default:
        throw new Error('Unsupported feedback option');
    }
  };

  useEffect(() => {
    const result = good + neutral + bad;
    setTotalFeedback(() => result);
    setFeedbackPercentage(() => Number(((good / result) * 100).toFixed(0)));
  }, [bad, good, neutral]);

  return (
    <Form>
      <Section title="Please leave your feedback">
        <FeedbackOptions
          options={['good', 'neutral', 'bad']}
          onLeaveFeedback={giveFeedback}
        />
      </Section>

      {totalFeedback === 0 ? (
        <Notification message="No feedback yet" />
      ) : (
        <Section title="Statistics">
          <Statistics
            good={good}
            neutral={neutral}
            bad={bad}
            total={totalFeedback}
            positivePercentage={feedbackPercentage}
          />
        </Section>
      )}
    </Form>
  );
}

// export class App extends Component {
//   state = {
//     good: 0,
//     neutral: 0,
//     bad: 0,
//   };

//   giveFeedback = event => {
//     const { id } = event.target;
//     this.setState(prevState => {
//       return { [id]: prevState[id] + 1 };
//     });
//   };
//   countTotalFeedback = () => {
//     const { good, neutral, bad } = this.state;
//     let result = good + neutral + bad;
//     return result;
//   };

//   countPositiveFeedbackPercentage = () => {
//     const result = this.countTotalFeedback();
//     const { good } = this.state;
//     const percentage = (good * 100) / result;
//     return Math.round(percentage);
//   };

//   render() {
//     const { good, neutral, bad } = this.state;
//     const total = this.countTotalFeedback();
//     const positivePercentage = this.countPositiveFeedbackPercentage();
//     const objKey = Object.keys(this.state);

//     return (
//       <Form>
//         <Section title="Please leave your feedback">
//           <FeedbackOptions
//             options={objKey}
//             onLeaveFeedback={this.giveFeedback}
//           />
//         </Section>

//         {total === 0 ? (
//           <Notification message="No feedback yet" />
//         ) : (
//           <Section title="Statistics">
//             <Statistics
//               good={good}
//               neutral={neutral}
//               bad={bad}
//               total={total}
//               positivePercentage={positivePercentage}
//             />
//           </Section>
//         )}
//       </Form>
//     );
//   }
// }
