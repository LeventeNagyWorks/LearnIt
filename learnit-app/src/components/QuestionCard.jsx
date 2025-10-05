import PropTypes from 'prop-types';
import Button from './Button';
import CheckBox from './CheckBox';
import Dropdown from './Dropdown';
import { IoAdd, IoClose, IoTrashOutline } from 'react-icons/io5';
import { FiEdit, FiSave } from 'react-icons/fi';

const QuestionCard = ({
  item,
  isEditing,
  editedQuestion,
  questionType,
  dropdownOptions,
  onEdit,
  onSave,
  onCancel,
  onQuestionChange,
  onAnswerChange,
  onQuestionTypeChange,
  onAddAnswer,
  onRemoveAnswer,
}) => {
  return (
    <div className='w-full h-fit flex flex-col justify-center items-start bg-slate-800 rounded-2xl py-3 px-5'>
      <div className='w-full flex justify-between items-center'>
        {isEditing ? (
          <div className='flex-1 mr-4'>
            <input
              type='text'
              value={editedQuestion?.question || ''}
              onChange={e => onQuestionChange(e.target.value)}
              className='w-full text-2xl bg-transparent border-b border-accent_green_dark outline-none caret-accent_green_dark'
              placeholder='Enter question...'
            />
          </div>
        ) : (
          <h2 className='text-2xl'>
            {item.index}. {item.question}
          </h2>
        )}

        {isEditing ? (
          <div className='flex gap-2'>
            <Button
              icon={<FiSave />}
              severity='primary'
              size='small'
              glow={true}
              onClick={onSave}
            />
            <Button
              icon={<IoClose className='w-6 h-6' />}
              severity='outline'
              glow={true}
              color='red'
              onClick={onCancel}
              size='small'
            />
          </div>
        ) : (
          <Button
            icon={<FiEdit />}
            severity='outline'
            size='small'
            glow={true}
            onClick={onEdit}
          />
        )}
      </div>

      <span className='w-[90%] h-[4px] rounded-full bg-gradient-to-r from-green-500 my-3' />

      <div className='w-full h-fit flex-col gap-3'>
        {isEditing ? (
          <div className='space-y-2'>
            <div className='flex gap-2 justify-between items-center'>
              <Dropdown
                array={dropdownOptions}
                placeholder='Select Question Type'
                selectedValue={questionType}
                onChange={onQuestionTypeChange}
              />
              <Button
                icon={<IoAdd className='w-7 h-7' />}
                text='Add Answer'
                severity='noBg'
                size='small'
                onClick={onAddAnswer}
                disabled={questionType === 'True/False'}
              />
            </div>
            {editedQuestion?.answers.map((answer, answerIndex) => (
              <div key={answerIndex} className='flex items-center gap-2'>
                <CheckBox
                  isChecked={answer.right}
                  setIsChecked={newValue =>
                    onAnswerChange(answerIndex, 'right', newValue)
                  }
                  disabled={questionType === 'True/False'}
                />
                <input
                  type='text'
                  value={answer.text}
                  onChange={e =>
                    onAnswerChange(answerIndex, 'text', e.target.value)
                  }
                  className='flex-1 bg-transparent border-b border-gray-600 outline-none caret-accent_green_dark'
                  placeholder='Enter answer...'
                  disabled={questionType === 'True/False'}
                />
                {editedQuestion?.answers.length > 2 &&
                  questionType !== 'True/False' && (
                    <Button
                      icon={<IoTrashOutline className='w-6 h-6' />}
                      severity='noBg'
                      color='red'
                      size='small'
                      onClick={() => onRemoveAnswer(answerIndex)}
                    />
                  )}
              </div>
            ))}
          </div>
        ) : (
          <>
            <div className='flex justify-between items-center mb-2'>
              <span className='text-sm text-gray-400'>
                {item.questionTypeDisplay}
              </span>
            </div>
            {item.rightAnswer.map((answer, answerIndex) => (
              <div className='w-full h-fit py-1' key={`right-${answerIndex}`}>
                <p className='text-xl text-green-400'>{answer}</p>
              </div>
            ))}
            {item.falseAnswer &&
              item.falseAnswer.map((answer, answerIndex) => (
                <div className='w-full h-fit py-1' key={`false-${answerIndex}`}>
                  <p className='text-xl'>{answer}</p>
                </div>
              ))}
          </>
        )}
      </div>
    </div>
  );
};

QuestionCard.propTypes = {
  item: PropTypes.shape({
    index: PropTypes.number.isRequired,
    question: PropTypes.string.isRequired,
    questionTypeDisplay: PropTypes.string.isRequired,
    rightAnswer: PropTypes.array.isRequired,
    falseAnswer: PropTypes.array,
  }).isRequired,
  index: PropTypes.number.isRequired,
  isEditing: PropTypes.bool.isRequired,
  editedQuestion: PropTypes.shape({
    question: PropTypes.string,
    answers: PropTypes.array,
  }),
  questionType: PropTypes.string,
  dropdownOptions: PropTypes.array.isRequired,
  onEdit: PropTypes.func.isRequired,
  onSave: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired,
  onQuestionChange: PropTypes.func.isRequired,
  onAnswerChange: PropTypes.func.isRequired,
  onQuestionTypeChange: PropTypes.func.isRequired,
  onAddAnswer: PropTypes.func.isRequired,
  onRemoveAnswer: PropTypes.func.isRequired,
};

export default QuestionCard;
