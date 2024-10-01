// src/components/QuestionSection.jsx

import React from "react";
import PropTypes from "prop-types";
import LikertScale from "./LikertScale";

const QuestionSection = ({
  currentTrait,
  currentTraitIndex,
  totalTraits,
  questions,
  onAnswerChange,
}) => {
  if (!currentTrait) return null;

  return (
    <div>
      <h2>
        Trait {currentTraitIndex + 1} of {totalTraits}
      </h2>
      <h3>{currentTrait.trait}</h3>
      <p>{currentTrait.description}</p>

      {questions.map((question, index) => (
        <LikertScale
          key={index}
          question={question.text}
          name={`question_${currentTraitIndex}_${index}`}
          onChange={onAnswerChange}
        />
      ))}
    </div>
  );
};

QuestionSection.propTypes = {
  currentTrait: PropTypes.object.isRequired,
  currentTraitIndex: PropTypes.number.isRequired,
  totalTraits: PropTypes.number.isRequired,
  questions: PropTypes.array.isRequired,
  onAnswerChange: PropTypes.func.isRequired,
};

export default QuestionSection;
