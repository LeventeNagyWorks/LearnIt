/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react'
import { useSignals } from '@preact/signals-react/runtime';
import { useParams } from 'react-router-dom';

const LearnStudySet = () => {

    const [studySet, setStudySet] = useState(null);
    const [currentQuestion, setCurrentQuestion] = useState(null);
    const [options, setOptions] = useState([]);
    const [score, setScore] = useState(0);
    const { itemName } = useParams();

    var questionsAnsweredCounter = 0;

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
        }
        questionsAnsweredCounter++;
        console.log(questionsAnsweredCounter);
        
        pickRandomQuestion();
      };
    
      if (!studySet || !currentQuestion) {
        return <div>Loading...</div>;
      }

  return (
    <div className='w-full h-screen flex justify-center items-center bg-gradient-to-br from-cstm_bg_dark to-zinc-900 text-cstm_white font-poppins text-2xl selection:bg-accent_green_dark selection:text-cstm_bg_dark'>

        <div className='w-[80%] h-full flex flex-col justify-evenly items-center'>
            <h2 className='text-4xl mb-8 select-none'>Score: <span className='text-accent_green_dark'>{score}</span> </h2>
            <p className='h-24 flex items-center justify-center text-[56px] mb-6 text-center'>{currentQuestion.question}</p>
            <div className='w-full flex flex-col gap-4'>
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