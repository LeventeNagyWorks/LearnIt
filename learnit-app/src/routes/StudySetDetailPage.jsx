/* eslint-disable react/no-unescaped-entities */
/* eslint-disable no-unused-vars */
import React, { useEffect, useRef, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { isLoading, isLoadingEnabled, startTransitionFromStudySetDetail, startTransitionToStudySetDetail } from '../signals'
import ArrowButton from '../components/StudySets/StudySetsDetail/ArrowButton';
import BackButton from '../components/BackButton';
import { useSignals } from '@preact/signals-react/runtime';
import CustomizeButton from '../components/StudySets/CustomizeButton';
import PrimaryButton from '../components/PrimaryButton';
import LoadingScreen from '../components/LoadingScreen';
import KnowItButton from '../components/StudySets/StudySetsDetail/KnowItButton';
import Progress from '../components/StudySets/Progress';
import Pagination from '../components/StudySets/StudySetsDetail/Pagination';
import Flashcard from '../components/StudySets/StudySetsDetail/FlashCard';

const StudySetDetailPage = () => {

  useSignals()

  const [studySet, setStudySet] = useState(null);
  const [hoveredItem, setHoveredItem] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [displayedContent, setDisplayedContent] = useState(!isFlipped);
  const [textRotation, setTextRotation] = useState(false);
  const { itemName } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/login');
      return;
    }

    const fetchStudySet = async () => {
      try {
        const response = await fetch('/api/data', {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        });

        if (!response.ok) {
          if (response.status === 401) {
            navigate('/login');
            return;
          }
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        const foundSet = data.find(set => set.name === itemName);
        if (!foundSet) {
          navigate('/study-sets');
          return;
        }
        setStudySet(foundSet);
      } catch (error) {
        console.error('Error fetching study set:', error);
      }
    };

    fetchStudySet();
  }, [itemName, navigate]);

  useEffect(() => {
    isLoadingEnabled.value = true;
  }, [])


  const handleClick = (e) => {
    startTransitionFromStudySetDetail.value = true;
    e.preventDefault();
    setTimeout(() => {
      navigate(`/study-sets/`);
    }, 0);
  }

  const handleNext = () => {
    if (currentIndex < studySet.questions.length - 1) {
      setIsFlipped(false);
      setCurrentIndex(prev => prev + 1);
      setDisplayedContent(true);
      setTextRotation(false);
    }
  };

  const handlePrev = () => {
    if (currentIndex > 0) {
      setIsFlipped(false);
      setCurrentIndex(prev => prev - 1);
      setDisplayedContent(true);
      setTextRotation(false);
    }
  };


  if (!studySet || isLoadingEnabled.value === true) {
    return <LoadingScreen />;
  }

  const questionsWithAnswers = studySet.questions.map((question, index) => ({
    index: index + 1,
    question: question.question,
    answers: question.answer,
    rightAnswer: question.right_answer,
    questionType: question.que_type
  }));

  const currentQuestion = studySet.questions[currentIndex];

  return (
    <div className='h-full w-full flex flex-col items-center flex-grow bg-cstm_bg_dark text-cstm_white font-poppins overflow-hidden relative selection:bg-accent_green_dark'>
      <section className='w-screen h-screen flex flex-col items-center justify-between z-10 pb-8'>

        <div className='w-full flex flex-col justify-center items-center gap-10 py-8 px-5'>
          <div className='flex justify-center items-center'>
            <BackButton onClick={handleClick} className={'fixed left-6'} />
            <h1 className='text-5xl font-semibold'>{studySet.name}</h1>
            <PrimaryButton to={`/study-sets/${itemName}/learning`} text='LEARN IT' className={'fixed right-9'} />
          </div>
          <div className=''>
            <div className={`w-full flex justify-between items-center gap-10 duration-700 bg-slate-500/40 backdrop-blur-md px-2 py-3 rounded-2xl`}>
              <Progress isDetailedPage={true} itemName={itemName} />
            </div>
          </div>
        </div>

        <div className="flex-1 w-full h-full flex flex-col items-center justify-center flex-grow relative">

          <div className='absolute w-[85%] top-[42%] flex items-center justify-between'>
            <ArrowButton onClick={handlePrev} className="" />
            <ArrowButton onClick={handleNext} className="rotate-180" />
          </div>

          <Flashcard
            currentIndex={currentIndex}
            setCurrentIndex={setCurrentIndex}
            isFlipped={isFlipped}
            setIsFlipped={setIsFlipped}
            currentQuestion={currentQuestion}
            totalQuestions={studySet.questions.length}
            displayedContent={displayedContent}
            setDisplayedContent={setDisplayedContent}
            textRotation={textRotation}
            setTextRotation={setTextRotation}
          />

          <div className="w-full flex justify-center items-center gap-20 mt-8">
            <Pagination
              totalPages={studySet.questions.length}
              currentPage={currentIndex}
              onPageChange={(pageNumber) => {
                setCurrentIndex(pageNumber);
                setIsFlipped(false);
                setDisplayedContent(true);
                setTextRotation(false);
              }}
            />
          </div>
        </div>
      </section>

      <section className='w-[50%] screen-fit min-h-screen h-fit flex flex-col items-center gap-8 z-10 py-16'>
        {questionsWithAnswers.map((item, index) => (
          <div
            className='w-full h-fit flex flex-col justify-center items-start bg-slate-800 rounded-2xl py-3 px-5'
            key={index}
          >
            <div className='w-full flex justify-between items-center'>
              <h2 className='text-2xl'>{item.index}. {item.question}</h2>
              <CustomizeButton
                index={index}
                isHovered={hoveredItem === index}
                setHoveredItem={setHoveredItem}
              />
            </div>

            <span className='w-[90%] h-[4px] rounded-full bg-gradient-to-r from-green-500 my-3' />

            <div className='w-full h-fit flex-col gap-3'>
              {item.answers.map((answer, answerIndex) => (
                <div
                  className='w-full h-fit py-1'
                  key={answerIndex}
                >
                  <p className='text-xl'>{answer}</p>
                </div>
              ))}
            </div>

          </div>
        ))}
      </section>

    </div>
  );
};

export default StudySetDetailPage;
