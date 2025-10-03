/* eslint-disable react/no-unescaped-entities */
/* eslint-disable no-unused-vars */
import React, { useEffect, useRef, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import {
  isLoading,
  isLoadingEnabled,
  startTransitionFromStudySetDetail,
  startTransitionToStudySetDetail,
} from '../signals';
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
import CloseButton from '../components/StudySets/CloseButton';
import DeleteButton from '../components/StudySets/DeleteButton';

const StudySetDetailPage = () => {
  useSignals();

  const [studySet, setStudySet] = useState(null);
  const [hoveredItem, setHoveredItem] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [displayedContent, setDisplayedContent] = useState(!isFlipped);
  const [textRotation, setTextRotation] = useState(false);
  const [editingQuestion, setEditingQuestion] = useState(null);
  const [editedQuestions, setEditedQuestions] = useState({});
  const { itemName } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const token =
      localStorage.getItem('token') || sessionStorage.getItem('token');
    if (!token) {
      navigate('/login', { replace: true });
      return;
    }

    const fetchStudySet = async () => {
      try {
        const response = await fetch('/api/data', {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        });

        if (!response.ok) {
          if (response.status === 401) {
            localStorage.removeItem('token');
            sessionStorage.removeItem('token');
            navigate('/login', { replace: true });
            return;
          }
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        const foundSet = data.find(set => set.name === itemName);
        if (!foundSet) {
          navigate('/study-sets', { replace: true });
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
  }, []);

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
    rightAnswer: question.answer
      .filter(answer => answer.right)
      .map(answer => answer.text),
    falseAnswer: question.answer
      .filter(answer => !answer.right)
      .map(answer => answer.text),
    questionType: question.que_type,
  }));

  const currentQuestion = studySet.questions[currentIndex];

  // TODO: ha refreshelek az oldalra, akkor vissza dob a studysets page-re, feltehetően az url okozza az ékezetes karakterekkel

  const handleEditQuestion = questionIndex => {
    if (editingQuestion === questionIndex) {
      // If already editing this question, save it
      handleSaveQuestion(questionIndex);
    } else {
      // Start editing this question
      setEditingQuestion(questionIndex);
      const question = studySet.questions[questionIndex];
      setEditedQuestions(prev => ({
        ...prev,
        [questionIndex]: {
          question: question.question,
          answers: question.answer.map(ans => ({ ...ans })),
        },
      }));
    }
  };

  const handleSaveQuestion = async questionIndex => {
    const editedData = editedQuestions[questionIndex];
    if (!editedData) return;

    try {
      const token =
        localStorage.getItem('token') || sessionStorage.getItem('token');
      const response = await fetch('/api/updateQuestion', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          itemName,
          questionIndex,
          questionText: editedData.question,
          answers: editedData.answers,
        }),
      });

      if (response.ok) {
        // Update local state
        setStudySet(prev => ({
          ...prev,
          questions: prev.questions.map((q, i) =>
            i === questionIndex
              ? {
                  ...q,
                  question: editedData.question,
                  answer: editedData.answers,
                }
              : q
          ),
        }));
        setEditingQuestion(null);
        setEditedQuestions(prev => {
          const { [questionIndex]: removed, ...rest } = prev;
          return rest;
        });
      }
    } catch (error) {
      console.error('Error updating question:', error);
    }
  };

  const handleCancelEdit = questionIndex => {
    setEditingQuestion(null);
    setEditedQuestions(prev => {
      const { [questionIndex]: removed, ...rest } = prev;
      return rest;
    });
  };

  const updateEditedQuestion = (questionIndex, field, value) => {
    setEditedQuestions(prev => ({
      ...prev,
      [questionIndex]: {
        ...prev[questionIndex],
        [field]: value,
      },
    }));
  };

  const updateEditedAnswer = (questionIndex, answerIndex, field, value) => {
    setEditedQuestions(prev => ({
      ...prev,
      [questionIndex]: {
        ...prev[questionIndex],
        answers: prev[questionIndex].answers.map((ans, i) =>
          i === answerIndex ? { ...ans, [field]: value } : ans
        ),
      },
    }));
  };

  const addNewAnswer = questionIndex => {
    setEditedQuestions(prev => ({
      ...prev,
      [questionIndex]: {
        ...prev[questionIndex],
        answers: [...prev[questionIndex].answers, { text: '', right: false }],
      },
    }));
  };

  const removeAnswer = (questionIndex, answerIndex) => {
    setEditedQuestions(prev => ({
      ...prev,
      [questionIndex]: {
        ...prev[questionIndex],
        answers: prev[questionIndex].answers.filter(
          (_, i) => i !== answerIndex
        ),
      },
    }));
  };

  return (
    <div className='h-full w-full flex flex-col items-center flex-grow bg-cstm_bg_dark text-cstm_white font-poppins overflow-x-hidden relative selection:bg-accent_green_dark'>
      {/* Edit notification */}
      <div
        className={`absolute top-5 left-1/2 -translate-x-1/2 bg-accent_green_dark/80 text-white px-4 py-2 rounded-lg shadow-lg duration-500 z-50 ${
          editingQuestion !== null ? 'translate-y-0' : '-translate-y-[150%]'
        }`}
      >
        <p className='font-medium select-none'>
          You are editing question{' '}
          {editingQuestion !== null ? editingQuestion + 1 : ''}! Click the edit
          button again to save.
        </p>
      </div>

      <section className='w-screen h-screen flex flex-col items-center justify-between z-10 pb-8'>
        <div className='w-full flex flex-col justify-center items-center gap-10 py-8 px-5'>
          <div className='flex justify-center items-center'>
            <BackButton to={`/study-sets`} className={'fixed left-6'} />
            <h1 className='text-4xl font-semibold'>{studySet.name}</h1>
            <PrimaryButton
              to={`/study-sets/${itemName}/learning`}
              text='LEARN IT'
              className={'fixed right-9'}
            />
          </div>
          <div className=''>
            <div
              className={`w-full flex justify-between items-center gap-10 duration-700 bg-slate-500/40 backdrop-blur-md px-2 py-3 rounded-2xl`}
            >
              <Progress isDetailedPage={true} itemName={itemName} />
            </div>
          </div>
        </div>

        <div className='flex-1 w-full h-full flex flex-col items-center justify-center flex-grow relative'>
          <div className='absolute w-[85%] top-[42%] flex items-center justify-between'>
            <ArrowButton onClick={handlePrev} className='' />
            <ArrowButton onClick={handleNext} className='rotate-180' />
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

          <div className='w-full flex justify-center items-center gap-20'>
            <Pagination
              totalPages={studySet.questions.length}
              currentPage={currentIndex}
              onPageChange={pageNumber => {
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
              {editingQuestion === index ? (
                <div className='flex-1 mr-4'>
                  <input
                    type='text'
                    value={editedQuestions[index]?.question || ''}
                    onChange={e =>
                      updateEditedQuestion(index, 'question', e.target.value)
                    }
                    className='w-full text-2xl bg-transparent border-b border-accent_green_dark outline-none caret-accent_green_dark'
                    placeholder='Enter question...'
                  />
                </div>
              ) : (
                <h2 className='text-2xl'>
                  {item.index}. {item.question}
                </h2>
              )}

              <div className='flex gap-2'>
                <div onClick={() => handleEditQuestion(index)}>
                  <CustomizeButton
                    index={index}
                    isHovered={hoveredItem === index}
                    setHoveredItem={setHoveredItem}
                    isEditing={editingQuestion === index}
                  />
                </div>
                {editingQuestion === index && (
                  <CloseButton
                    onClick={() => handleCancelEdit(index)}
                    className='px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600'
                  >
                    Cancel
                  </CloseButton>
                )}
              </div>
            </div>

            <span className='w-[90%] h-[4px] rounded-full bg-gradient-to-r from-green-500 my-3' />

            <div className='w-full h-fit flex-col gap-3'>
              {editingQuestion === index ? (
                <div className='space-y-2'>
                  {editedQuestions[index]?.answers.map(
                    (answer, answerIndex) => (
                      <div
                        key={answerIndex}
                        className='flex items-center gap-2'
                      >
                        <input
                          type='checkbox'
                          checked={answer.right}
                          onChange={e =>
                            updateEditedAnswer(
                              index,
                              answerIndex,
                              'right',
                              e.target.checked
                            )
                          }
                          className='accent-accent_green_dark'
                        />
                        <input
                          type='text'
                          value={answer.text}
                          onChange={e =>
                            updateEditedAnswer(
                              index,
                              answerIndex,
                              'text',
                              e.target.value
                            )
                          }
                          className='flex-1 bg-transparent border-b border-gray-600 outline-none caret-accent_green_dark'
                          placeholder='Enter answer...'
                        />
                        {editedQuestions[index]?.answers.length > 1 && (
                          <DeleteButton
                            isWide={false}
                            onClick={() => removeAnswer(index, answerIndex)}
                          />
                        )}
                      </div>
                    )
                  )}
                  <button
                    onClick={() => addNewAnswer(index)}
                    className='mt-2 px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600'
                  >
                    Add Answer
                  </button>
                </div>
              ) : (
                <>
                  {item.rightAnswer.map((answer, answerIndex) => (
                    <div
                      className='w-full h-fit py-1'
                      key={`right-${answerIndex}`}
                    >
                      <p className='text-xl text-green-400'>{answer}</p>
                    </div>
                  ))}
                  {item.falseAnswer &&
                    item.falseAnswer.map((answer, answerIndex) => (
                      <div
                        className='w-full h-fit py-1'
                        key={`false-${answerIndex}`}
                      >
                        <p className='text-xl'>{answer}</p>
                      </div>
                    ))}
                </>
              )}
            </div>
          </div>
        ))}
      </section>
    </div>
  );
};

export default StudySetDetailPage;
