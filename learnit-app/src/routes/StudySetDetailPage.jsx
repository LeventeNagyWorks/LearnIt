/* eslint-disable react/no-unescaped-entities */
/* eslint-disable no-unused-vars */
import React, { useEffect, useRef, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import {
  isLoading,
  isLoadingEnabled,
  startTransitionFromStudySetDetail,
  startTransitionToStudySetDetail,
  showAddNewQuestion,
  showDeleteQuestionWarningPopup,
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
import Button from '../components/Button';
import { IoArrowUp } from 'react-icons/io5';
import { FiEdit, FiPlus, FiSave } from 'react-icons/fi';
import CheckBox from '../components/CheckBox';
import Dropdown from '../components/Dropdown';
import QuestionCard from '../components/QuestionCard';
import Popup from '../components/Popup';

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
  const [questionTypes, setQuestionTypes] = useState({});
  const [newQuestion, setNewQuestion] = useState({
    question: '',
    answers: [
      { text: '', right: true },
      { text: '', right: false },
    ],
    questionType: 'Choice',
  });
  const [newQuestionType, setNewQuestionType] = useState('Choice');
  const [currentPage, setCurrentPage] = useState(1);
  const [questionsPerPage] = useState(20);
  const [showScrollToTop, setShowScrollToTop] = useState(false);
  const [questionToDelete, setQuestionToDelete] = useState(null);
  const { itemName } = useParams();
  const navigate = useNavigate();

  const dropdownOptions = [
    { id: 'Choice', name: 'Choice' },
    { id: 'True/False', name: 'True / False' },
  ];

  // Helper function to get display name for question type
  const getQuestionTypeDisplayName = queType => {
    if (queType === 'True/False') return 'True / False';
    if (queType === 'Choice') return 'Choice';
    return 'Choice';
  };

  useEffect(() => {
    const token =
      localStorage.getItem('token') || sessionStorage.getItem('token');
    if (!token) {
      navigate('/login', { replace: true });
      return;
    }

    const fetchStudySet = async () => {
      try {
        const response = await fetch('/data', {
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

  // Add scroll listener for scroll-to-top button
  useEffect(() => {
    const handleScroll = () => {
      const secondSection = document.querySelector('section:last-child');
      if (secondSection) {
        const secondSectionTop = secondSection.offsetTop;
        setShowScrollToTop(window.scrollY >= secondSectionTop);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
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
    questionTypeDisplay: getQuestionTypeDisplayName(question.que_type),
  }));

  const currentQuestion = studySet.questions[currentIndex];

  // Calculate pagination
  const totalQuestions = questionsWithAnswers.length;
  const totalPages = Math.ceil(totalQuestions / questionsPerPage);
  const startIndex = (currentPage - 1) * questionsPerPage;
  const endIndex = startIndex + questionsPerPage;
  const currentQuestions = questionsWithAnswers.slice(startIndex, endIndex);

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(prev => prev + 1);
      // Scroll to top of questions section
      window.scrollTo({
        top: document.querySelector('section:last-child').offsetTop,
        behavior: 'smooth',
      });
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(prev => prev - 1);
      // Scroll to top of questions section
      window.scrollTo({
        top: document.querySelector('section:last-child').offsetTop,
        behavior: 'smooth',
      });
    }
  };

  const handleEditQuestion = questionIndex => {
    // Start editing this question
    setEditingQuestion(questionIndex);
    const question = studySet.questions[questionIndex];
    setEditedQuestions(prev => ({
      ...prev,
      [questionIndex]: {
        question: question.question,
        answers: question.answer.map(ans => ({ ...ans })),
        questionType: question.que_type || 'Choice',
      },
    }));
    // Set initial question type
    setQuestionTypes(prev => ({
      ...prev,
      [questionIndex]: question.que_type || 'Choice',
    }));
  };

  const handleQuestionTypeChange = (questionIndex, newTypeId) => {
    setQuestionTypes(prev => ({
      ...prev,
      [questionIndex]: newTypeId,
    }));

    // Update the editedQuestions to keep data in sync
    setEditedQuestions(prev => ({
      ...prev,
      [questionIndex]: {
        ...prev[questionIndex],
        questionType: newTypeId,
      },
    }));

    // If changing to True/False, adjust answers to standard format
    if (newTypeId === 'True/False') {
      setEditedQuestions(prev => ({
        ...prev,
        [questionIndex]: {
          ...prev[questionIndex],
          answers: [
            { text: 'Igaz', right: true },
            { text: 'Hamis', right: false },
          ],
        },
      }));
    }
    // If changing from True/False to Choice, keep existing answers or add default ones
    else if (newTypeId === 'Choice') {
      setEditedQuestions(prev => {
        const currentAnswers = prev[questionIndex]?.answers || [];
        // Only change if it was previously a true/false question with 2 answers
        if (
          currentAnswers.length === 2 &&
          currentAnswers.some(
            ans => ans.text === 'Igaz' || ans.text === 'Hamis'
          )
        ) {
          return {
            ...prev,
            [questionIndex]: {
              ...prev[questionIndex],
              answers: [
                { text: '', right: true },
                { text: '', right: false },
                { text: '', right: false },
              ],
            },
          };
        }
        return prev;
      });
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
          questionType: questionTypes[questionIndex] || editedData.questionType,
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
                  que_type:
                    questionTypes[questionIndex] || editedData.questionType,
                }
              : q
          ),
        }));
        setEditingQuestion(null);
        setEditedQuestions(prev => {
          const { [questionIndex]: removed, ...rest } = prev;
          return rest;
        });
        setQuestionTypes(prev => {
          const { [questionIndex]: removed, ...rest } = prev;
          return rest;
        });
      } else {
        const errorText = await response.text();
        console.error(
          'Failed to update question:',
          response.statusText,
          errorText
        );
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
    setQuestionTypes(prev => {
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

  const handleScrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  // New question handlers
  const handleNewQuestionChange = value => {
    setNewQuestion(prev => ({
      ...prev,
      question: value,
    }));
  };

  const handleNewAnswerChange = (answerIndex, field, value) => {
    setNewQuestion(prev => ({
      ...prev,
      answers: prev.answers.map((ans, i) =>
        i === answerIndex ? { ...ans, [field]: value } : ans
      ),
    }));
  };

  const handleNewQuestionTypeChange = newTypeId => {
    setNewQuestionType(newTypeId);
    setNewQuestion(prev => ({
      ...prev,
      questionType: newTypeId,
    }));

    // If changing to True/False, adjust answers to standard format
    if (newTypeId === 'True/False') {
      setNewQuestion(prev => ({
        ...prev,
        answers: [
          { text: 'Igaz', right: true },
          { text: 'Hamis', right: false },
        ],
      }));
    }
    // If changing from True/False to Choice, reset to default choice answers
    else if (newTypeId === 'Choice') {
      setNewQuestion(prev => ({
        ...prev,
        answers: [
          { text: '', right: true },
          { text: '', right: false },
          { text: '', right: false },
        ],
      }));
    }
  };

  const addNewAnswerToNewQuestion = () => {
    setNewQuestion(prev => ({
      ...prev,
      answers: [...prev.answers, { text: '', right: false }],
    }));
  };

  const removeAnswerFromNewQuestion = answerIndex => {
    setNewQuestion(prev => ({
      ...prev,
      answers: prev.answers.filter((_, i) => i !== answerIndex),
    }));
  };

  const handleSaveNewQuestion = async () => {
    if (!newQuestion.question.trim()) {
      alert('Kérjük, adjon meg egy kérdést!');
      return;
    }

    const hasValidAnswers = newQuestion.answers.some(
      ans => ans.text.trim() !== ''
    );
    if (!hasValidAnswers) {
      alert('Kérjük, adjon meg legalább egy választ!');
      return;
    }

    try {
      const token =
        localStorage.getItem('token') || sessionStorage.getItem('token');
      const response = await fetch('/api/addQuestion', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          itemName,
          questionText: newQuestion.question,
          answers: newQuestion.answers.filter(ans => ans.text.trim() !== ''),
          questionType: newQuestionType,
        }),
      });

      if (response.ok) {
        // Reset new question form
        setNewQuestion({
          question: '',
          answers: [
            { text: '', right: true },
            { text: '', right: false },
          ],
          questionType: 'Choice',
        });
        setNewQuestionType('Choice');
        showAddNewQuestion.value = false;

        // Refresh the study set data
        const fetchResponse = await fetch('/data', {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        });

        if (fetchResponse.ok) {
          const data = await fetchResponse.json();
          const foundSet = data.find(set => set.name === itemName);
          if (foundSet) {
            setStudySet(foundSet);
          }
        }
      } else {
        const errorText = await response.text();
        console.error(
          'Failed to add question:',
          response.statusText,
          errorText
        );
        alert('Hiba történt a kérdés hozzáadása során!');
      }
    } catch (error) {
      console.error('Error adding question:', error);
      alert('Hiba történt a kérdés hozzáadása során!');
    }
  };

  const handleCancelNewQuestion = () => {
    setNewQuestion({
      question: '',
      answers: [
        { text: '', right: true },
        { text: '', right: false },
      ],
      questionType: 'Choice',
    });
    setNewQuestionType('Choice');
    showAddNewQuestion.value = false;
  };

  const handleDeleteQuestion = async () => {
    if (questionToDelete === null) return;

    try {
      const token = localStorage.getItem('token');
      const response = await fetch('/api/deleteQuestion', {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          itemName,
          questionIndex: questionToDelete,
        }),
      });

      if (response.ok) {
        const result = await response.json();

        // Refresh the study set data
        const studySetResponse = await fetch('/data', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (studySetResponse.ok) {
          const allStudySets = await studySetResponse.json();
          const updatedStudySet = allStudySets.find(
            set => set.name === itemName
          );

          if (updatedStudySet) {
            setStudySet(updatedStudySet);

            // Reset pagination if necessary
            const newTotalQuestions = updatedStudySet.questions.length;
            const newTotalPages = Math.ceil(
              newTotalQuestions / questionsPerPage
            );

            if (currentPage > newTotalPages && newTotalPages > 0) {
              setCurrentPage(newTotalPages);
            }

            // Clear editing states
            setEditingQuestion(null);
            setEditedQuestions({});
            setQuestionTypes({});
          }
        }

        showDeleteQuestionWarningPopup.value = false;
        setQuestionToDelete(null);
      } else {
        const errorData = await response.json();
        console.error('Failed to delete question:', errorData.error);
        // You could show an error popup here if desired
      }
    } catch (error) {
      console.error('Error deleting question:', error);
      // You could show an error popup here if desired
    }
  };

  return (
    <>
      {showDeleteQuestionWarningPopup.value && (
        <Popup
          title='Are you sure?'
          message='Are you sure you want to delete this question?'
          type='warning'
          primButtonText='Yes'
          secButtonText='No'
          onClickPrim={handleDeleteQuestion}
          onClickSec={() => {
            showDeleteQuestionWarningPopup.value = false;
            setQuestionToDelete(null);
          }}
        />
      )}
      <div className='h-full w-full flex flex-col items-center flex-grow bg-cstm_bg_dark text-cstm_white font-poppins overflow-x-hidden relative selection:bg-accent_green_dark'>
        {showScrollToTop && (
          <Button
            severity='noBg'
            size='large'
            glow={false}
            icon={<IoArrowUp className='w-20 h-20' />}
            onClick={handleScrollToTop}
            className={`fixed right-6 bottom-6 z-40 hover:text-accent_green_dark hover:scale-110 !bg-transparent transition-all duration-300 opacity-80 hover:opacity-100`}
          />
        )}
        <section className='w-screen h-screen flex flex-col items-center justify-between z-10 pb-8'>
          <div className='w-full flex flex-col justify-center items-center gap-10 py-8 px-5'>
            <div className='flex justify-center items-center'>
              <Button
                text='Back'
                severity='outline'
                onClick={() => navigate(`/study-sets`)}
                className={'fixed left-6 z-40'}
              />
              <h1 className='hidden md:block text-4xl font-semibold'>
                {studySet.name}
              </h1>
              <Button
                text='LEARN IT'
                severity='primary'
                glow={true}
                onClick={() => navigate(`/study-sets/${itemName}/learning`)}
                className={'fixed right-9 max-w-fit z-40'}
              />
            </div>
            <h1 className='md:hidden block text-4xl font-semibold'>
              {studySet.name}
            </h1>
            <div className=''>
              <div
                className={`w-full flex justify-between items-center gap-10 duration-700 bg-slate-500/40 backdrop-blur-md px-2 py-3 rounded-2xl`}
              >
                <Progress isDetailedPage={true} itemName={itemName} />
              </div>
            </div>
          </div>
          {/* TODO: must have one right answer */}
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

        <section className='w-full min-h-screen h-fit flex flex-col items-center px-6 lg:px-80 gap-8 z-10 py-16'>
          <div className='w-full flex justify-between items-center'>
            <Button
              text='Add question'
              icon={<FiPlus className='w-7 h-7' />}
              severity='noBg'
              glow={true}
              onClick={() => {
                showAddNewQuestion.value = true;
                // Initialize new question form
                setNewQuestion({
                  question: '',
                  answers: [
                    { text: '', right: true },
                    { text: '', right: false },
                  ],
                  questionType: 'Choice',
                });
                setNewQuestionType('Choice');
              }}
            />
            {totalPages > 1 && (
              <div className='flex items-center gap-4'>
                <span className='text-sm text-gray-400'>
                  Page {currentPage} of {totalPages}
                </span>
                <div className='flex gap-2'>
                  <Button
                    text='Previous'
                    severity='outline'
                    size='small'
                    onClick={handlePrevPage}
                    disabled={currentPage === 1}
                  />
                  <Button
                    text='Next'
                    severity='outline'
                    size='small'
                    onClick={handleNextPage}
                    disabled={currentPage === totalPages}
                  />
                </div>
              </div>
            )}
          </div>

          {showAddNewQuestion.value && (
            <div className='w-full'>
              <QuestionCard
                isNewQuestion={true}
                isEditing={true}
                editedQuestion={newQuestion}
                questionType={newQuestionType}
                dropdownOptions={dropdownOptions}
                onSave={handleSaveNewQuestion}
                onCancel={handleCancelNewQuestion}
                onQuestionChange={handleNewQuestionChange}
                onAnswerChange={handleNewAnswerChange}
                onQuestionTypeChange={handleNewQuestionTypeChange}
                onAddAnswer={addNewAnswerToNewQuestion}
                onRemoveAnswer={removeAnswerFromNewQuestion}
              />
            </div>
          )}

          {currentQuestions.map((item, index) => (
            <QuestionCard
              key={startIndex + index}
              item={item}
              index={startIndex + index}
              isEditing={editingQuestion === startIndex + index}
              editedQuestion={editedQuestions[startIndex + index]}
              questionType={questionTypes[startIndex + index]}
              dropdownOptions={dropdownOptions}
              onEdit={() => handleEditQuestion(startIndex + index)}
              onSave={() => handleSaveQuestion(startIndex + index)}
              onCancel={() => handleCancelEdit(startIndex + index)}
              onDelete={() => {
                setQuestionToDelete(startIndex + index);
                showDeleteQuestionWarningPopup.value = true;
              }}
              onQuestionChange={value =>
                updateEditedQuestion(startIndex + index, 'question', value)
              }
              onAnswerChange={(answerIndex, field, value) =>
                updateEditedAnswer(
                  startIndex + index,
                  answerIndex,
                  field,
                  value
                )
              }
              onQuestionTypeChange={newTypeId =>
                handleQuestionTypeChange(startIndex + index, newTypeId)
              }
              onAddAnswer={() => addNewAnswer(startIndex + index)}
              onRemoveAnswer={answerIndex =>
                removeAnswer(startIndex + index, answerIndex)
              }
            />
          ))}

          {totalPages > 1 && (
            <div className='w-full flex justify-center gap-4 pt-8'>
              <Button
                text='Previous Page'
                severity='outline'
                onClick={handlePrevPage}
                disabled={currentPage === 1}
              />
              <span className='flex items-center px-4 py-2 text-gray-400'>
                {currentPage} / {totalPages}
              </span>
              <Button
                text='Next Page'
                severity='primary'
                glow={currentPage < totalPages}
                onClick={handleNextPage}
                disabled={currentPage === totalPages}
              />
            </div>
          )}
        </section>
      </div>
    </>
  );
};

export default StudySetDetailPage;
