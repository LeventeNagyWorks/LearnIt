/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react'
import { useSignals } from '@preact/signals-react/runtime';
import { useParams } from 'react-router-dom';
import LoadingScreen from '../components/LoadingScreen';
import { isLoadingEnabled, sessionLength } from '../signals';
import Result from '../components/StudySets/StudySetsDetail/LearnStudySet/Result';

const LearnStudySet = () => {

    useSignals();

    const [studySet, setStudySet] = useState(null);
    const [currentQuestion, setCurrentQuestion] = useState(null);
    const [options, setOptions] = useState([]);
    const [score, setScore] = useState(0);
    const { itemName } = useParams();
    const [questionsAnsweredCounter, setQuestionsAnsweredCounter] = useState(0);
    const [isSessionComplete, setIsSessionComplete] = useState(false);
    const [incorrectQuestions, setIncorrectQuestions] = useState([]);
    const [correctlyAnsweredQuestions, setCorrectlyAnsweredQuestions] = useState([]);
    const [lastQuestion, setLastQuestion] = useState(null);
    const [selectedAnswer, setSelectedAnswer] = useState(null);
    const [isAnswerCorrect, setIsAnswerCorrect] = useState(null);

    useEffect(() => {
        const fetchStudySet = async () => {
          try {
            const response = await fetch('/api/data');
            if (!response.ok) {
              throw new Error(`HTTP error! status: ${response.status}`);
            }
            const data = await response.json();
            const foundSet = data.find(set => set.name === itemName);
            setStudySet(foundSet);
          } catch (error) {
            console.error('Error fetching study set:', error);
          }
        };
    
        fetchStudySet();
    }, [itemName]);

    useEffect(() => {
        if (studySet) {
            pickRandomQuestion();
        }
    }, [studySet]);

    useEffect(() => {
      isLoadingEnabled.value = true;
    }, [])

    useEffect(() => {
      if (questionsAnsweredCounter === sessionLength.value) {
        setTimeout(() => {
          setIsSessionComplete(true);
        }, 300);
      }
    }, [questionsAnsweredCounter, sessionLength.value]);

    const pickRandomQuestion = () => {
        const randomIndex = Math.floor(Math.random() * studySet.questions.length);
        const question = studySet.questions[randomIndex];
        setCurrentQuestion(question);
    
        const allOptions = [...question.answer];
        const shuffledOptions = allOptions.sort(() => Math.random() - 0.5);
        setOptions(shuffledOptions);
    };

    const handleAnswerClick = (selectedAnswer) => {
      setSelectedAnswer(selectedAnswer);
      const isCorrect = currentQuestion.right_answer.includes(selectedAnswer);
      setIsAnswerCorrect(isCorrect);
    
      setTimeout(() => {
        if (isCorrect) {
          setScore(prevScore => prevScore + 1);
          setCorrectlyAnsweredQuestions(prev => [...prev, currentQuestion]);
        } else {
          setIncorrectQuestions(prev => [...prev, currentQuestion]);
        }

        setQuestionsAnsweredCounter(prevCount => prevCount + 1);
        setSelectedAnswer(null);
        setIsAnswerCorrect(null);
        pickNextQuestion();
      }, 1000);
    };
    

    const pickNextQuestion = () => {
      let nextQuestion;
      if (incorrectQuestions.length > 0) {
        const randomIndex = Math.floor(Math.random() * incorrectQuestions.length);
        nextQuestion = incorrectQuestions[randomIndex];
        // Remove the question from incorrectQuestions after asking
        setIncorrectQuestions(prev => prev.filter((_, index) => index !== randomIndex));
      } else {
        const availableQuestions = studySet.questions.filter(q => 
          !correctlyAnsweredQuestions.some(cq => cq.question === q.question) && q !== lastQuestion
        );
        if (availableQuestions.length > 0) {
          const randomIndex = Math.floor(Math.random() * availableQuestions.length);
          nextQuestion = availableQuestions[randomIndex];
        } else {
          setIsSessionComplete(true);
          return;
        }
      }
      
      // Ensure we're not asking the same question again
      if (nextQuestion === currentQuestion) {
        pickNextQuestion();
        return;
      }
      
      setLastQuestion(currentQuestion);
      setCurrentQuestion(nextQuestion);
      const allOptions = [...nextQuestion.answer];
      const shuffledOptions = allOptions.sort(() => Math.random() - 0.5);
      setOptions(shuffledOptions);
    };
    
    if (!studySet || !currentQuestion || isLoadingEnabled.value === true) {
      return <LoadingScreen />;
    }

    if (isSessionComplete) {
      return <Result score={score} itemName={itemName}/>;
    }

  return (
    <div className='w-full h-screen flex flex-col justify-center items-center bg-gradient-to-br from-cstm_bg_dark to-zinc-900 text-cstm_white font-poppins text-2xl selection:bg-accent_green_dark selection:text-cstm_bg_dark duration-500'>

      <div className='w-full h-24 flex justify-between items-center px-8'>
        <h2 className='text-4xl select-none duration-500'>Score: <span className='text-accent_green_dark'>{score}</span> </h2>
        <h2 className='text-4xl select-none duration-500'>Current Session: <span className='text-accent_green_dark'>{questionsAnsweredCounter} </span> / {sessionLength.value}</h2>
      </div>

        <div className='w-[80%] h-full flex flex-col justify-evenly items-center'>

            <div className='w-full h-[40%] flex justify-center items-center overflow-y-auto'>
              <p className='text-4xl md:text-5xl lg:text-[56px] duration-500 text-center px-4 py-2'>{currentQuestion.question}</p>
            </div>

            {currentQuestion.que_type === "Choice" && (
              <div className='w-full flex flex-col gap-4 duration-500'>
                {options.map((option, index) => (
                  <button
                    key={index}
                    onClick={() => handleAnswerClick(option)}
                    className={`py-2 px-4 rounded-xl ${
                      selectedAnswer === option
                        ? isAnswerCorrect
                          ? 'bg-green-700'
                          : 'bg-red-700'
                        : 'bg-slate-700 hover:bg-slate-600'
                    }`}
                    disabled={selectedAnswer !== null}
                  >
                    {option}
                  </button>
                ))}
              </div>
            )}

            {currentQuestion.que_type === "True/False" && (
              <div className='w-full flex flex-row gap-4 duration-500'>
                {options.map((option, index) => (
                  <button
                    key={index}
                    onClick={() => handleAnswerClick(option)}
                    className={`w-full py-2 px-4 rounded-xl ${
                      selectedAnswer === option
                        ? isAnswerCorrect
                          ? 'bg-green-700'
                          : 'bg-red-700'
                        : 'bg-slate-700 hover:bg-slate-600'
                    }`}
                    disabled={selectedAnswer !== null}
                  >
                    {option}
                  </button>
                ))}
              </div>
            )}

        </div>

    </div>
  )
}

export default LearnStudySet