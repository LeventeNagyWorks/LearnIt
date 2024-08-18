function txtToJSON(txt) {
  const fileContent = txt.content.toString('utf8');
  const fileName = Buffer.from(txt.name, 'binary').toString('utf8');
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
      const answer = line.substring(4).trim();
      currentAnswers.push(answer);
      if (currentQuestionType === 'True/False') {
        if (answer === 'True' || answer === 'Igaz') {
          currentAnswers.push(answer === 'True' ? 'False' : 'Hamis');
        } else if (answer === 'False' || answer === 'Hamis') {
          currentAnswers.push(answer === 'False' ? 'True' : 'Igaz');
        }
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
    name: fileName.replace('.txt', ''),
    desc: '',
    questions,
  };

  return data;
}

module.exports = txtToJSON;
