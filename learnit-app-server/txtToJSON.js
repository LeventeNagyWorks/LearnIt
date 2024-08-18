function txtToJSON(txt) {
  const fileContent = txt.content.toString('utf8');
  const questions = [];
  const lines = fileContent.split('\n');

  let currentQuestion = null;
  let currentAnswers = [];
  let currentQuestionType = 'Choice';

  lines.forEach((line) => {
    if (line.startsWith('/q ')) {
      if (currentQuestion) {
        questions.push({
          _id: `${txt.name}_${currentQuestion}`,
          question: currentQuestion,
          que_type: currentQuestionType,
          right_answer: [currentAnswers[0]],
          answer: currentAnswers,
        });
      }
      currentQuestion = line.substring(3).trim();
      currentAnswers = [];
      currentQuestionType = 'Choice';
    } else if (line.startsWith('/qtf')) {
      if (currentQuestion) {
        questions.push({
          _id: `${txt.name}_${currentQuestion}`,
          question: currentQuestion,
          que_type: currentQuestionType,
          right_answer: [currentAnswers[0]],
          answer: currentAnswers,
        });
      }
      currentQuestion = line.substring(4).trim();
      currentAnswers = [];
      currentQuestionType = 'True/False';
    } else if (line.startsWith('/ra')) {
      currentAnswers.push(line.substring(4).trim());
      if (currentQuestionType === 'True/False') {
        currentAnswers.push(line.substring(4).trim() === 'True' ? 'False' : 'True');
      }
    } else if (line.startsWith('/a')) {
      currentAnswers.push(line.substring(3).trim());
    }
  });

  if (currentQuestion) {
    questions.push({
      _id: `${txt.name}_${currentQuestion}`,
      question: currentQuestion,
      que_type: currentQuestionType,
      right_answer: [currentAnswers[0]],
      answer: currentAnswers,
    });
  }

  const data = {
    name: txt.name.replace('.txt', ''),
    desc: '',
    questions,
  };

  return data;
}

module.exports = txtToJSON;
