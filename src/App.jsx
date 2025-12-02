import React, { useState } from 'react';
import { quizData } from './data';

function App() {
  const [started, setStarted] = useState(false);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [selectedOption, setSelectedOption] = useState(null);
  const [isAnswered, setIsAnswered] = useState(false);

  const handleStart = () => {
    setStarted(true);
  };

  const handleOptionClick = (index) => {
    if (isAnswered) return;
    setSelectedOption(index);
    setIsAnswered(true);

    const currentQuestion = quizData.questions[currentQuestionIndex];
    if (index === currentQuestion.answer) {
      setScore(score + 1);
    }

    // Auto advance after short delay
    setTimeout(() => {
      if (currentQuestionIndex < quizData.questions.length - 1) {
        setCurrentQuestionIndex(currentQuestionIndex + 1);
        setSelectedOption(null);
        setIsAnswered(false);
      } else {
        setShowResult(true);
      }
    }, 1500);
  };

  const handleRestart = () => {
    setStarted(false);
    setCurrentQuestionIndex(0);
    setScore(0);
    setShowResult(false);
    setSelectedOption(null);
    setIsAnswered(false);
  };

  if (!started) {
    return (
      <div className="container fade-in">
        <div className="card">
          <h1>{quizData.title}</h1>
          <p style={{ fontSize: '1.2rem', color: '#aaa', marginBottom: '2rem' }}>
            {quizData.subtitle}
          </p>
          <button className="btn" onClick={handleStart}>
            Começar o Quiz
          </button>
        </div>
      </div>
    );
  }

  if (showResult) {
    const percentage = Math.round((score / quizData.questions.length) * 100);
    let message = "";
    if (percentage === 100) message = "Especialista em Cosmelan®!";
    else if (percentage >= 70) message = "Excelente conhecimento!";
    else if (percentage >= 50) message = "Bom, mas pode melhorar.";
    else message = "Vale a pena revisar a cápsula.";

    return (
      <div className="container fade-in">
        <div className="card">
          <h2>Resultado Final</h2>
          <div className="result-score">{percentage}%</div>
          <p style={{ fontSize: '1.2rem', marginBottom: '2rem' }}>
            Você acertou {score} de {quizData.questions.length} questões.
          </p>
          <p style={{ fontSize: '1.5rem', color: 'var(--primary-color)', marginBottom: '2rem' }}>
            {message}
          </p>
          <button className="btn" onClick={handleRestart}>
            Tentar Novamente
          </button>
        </div>
      </div>
    );
  }

  const currentQuestion = quizData.questions[currentQuestionIndex];
  const progress = ((currentQuestionIndex + 1) / quizData.questions.length) * 100;

  return (
    <div className="container fade-in">
      <div className="progress-bar">
        <div className="progress-fill" style={{ width: `${progress}%` }}></div>
      </div>

      <div className="card">
        <h2 style={{ color: '#fff', marginBottom: '2rem' }}>
          {currentQuestion.question}
        </h2>

        <div className="options-grid">
          {currentQuestion.options.map((option, index) => {
            let className = "option-btn";
            if (isAnswered) {
              if (index === currentQuestion.answer) {
                className += " correct";
              } else if (index === selectedOption) {
                className += " wrong";
              }
            }

            return (
              <button
                key={index}
                className={className}
                onClick={() => handleOptionClick(index)}
                disabled={isAnswered}
              >
                {option}
              </button>
            );
          })}
        </div>

        <div style={{ marginTop: '1.5rem', color: '#666', fontSize: '0.9rem' }}>
          Questão {currentQuestionIndex + 1} de {quizData.questions.length}
        </div>
      </div>
    </div>
  );
}

export default App;
