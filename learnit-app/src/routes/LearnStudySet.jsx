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
      if (currentQuestion.right_answer.includes(selectedAnswer)) {
        setScore(prevScore => prevScore + 1);
        // Remove the question from incorrectQuestions if it was answered correctly
        setIncorrectQuestions(prev => prev.filter(q => q.question !== currentQuestion.question));
      } else {
        // Add the question to incorrectQuestions if it wasn't answered correctly
        setIncorrectQuestions(prev => [...prev, currentQuestion]);
      }
      setQuestionsAnsweredCounter(prevCount => prevCount + 1);
      pickNextQuestion();
    };

    const pickNextQuestion = () => {
      if (incorrectQuestions.length > 0) {
        // Pick a random question from the incorrect questions
        const randomIndex = Math.floor(Math.random() * incorrectQuestions.length);
        setCurrentQuestion(incorrectQuestions[randomIndex]);
        const allOptions = [...incorrectQuestions[randomIndex].answer];
        const shuffledOptions = allOptions.sort(() => Math.random() - 0.5);
        setOptions(shuffledOptions);
      } else {
        // If no incorrect questions, pick a new random question
        pickRandomQuestion();
      }
    };
    
    if (!studySet || !currentQuestion || isLoadingEnabled.value === true) {
      return <LoadingScreen />;
    }

    if (isSessionComplete) {
      return <Result score={score}/>;
    }

  return (
    <div className='w-full h-screen flex flex-col justify-center items-center bg-gradient-to-br from-cstm_bg_dark to-zinc-900 text-cstm_white font-poppins text-2xl selection:bg-accent_green_dark selection:text-cstm_bg_dark duration-500'>

      <div className='w-full h-24 flex justify-between items-center px-8'>
        <h2 className='text-4xl select-none duration-500'>Score: <span className='text-accent_green_dark'>{score}</span> </h2>
        <h2 className='text-4xl select-none duration-500'>Current Session: <span className='text-accent_green_dark'>{questionsAnsweredCounter} </span> / {sessionLength.value}</h2>
      </div>

        <div className='w-[80%] h-full flex flex-col justify-evenly items-center'>
            <p className='h-24 flex items-center justify-center text-[56px] mb-6 text-center duration-500'>{currentQuestion.question}</p>
            <div className='w-full flex flex-col gap-4 duration-500'>
                {options.map((option, index) => (
                <button
                    key={index}
                    onClick={() => handleAnswerClick(option)}
                    className='bg-slate-700 hover:bg-slate-600 py-2 px-4 rounded-xl'
                >
                    {option}
                </button>
                ))}
            </div>
        </div>

    </div>
  )
}

export default LearnStudySet