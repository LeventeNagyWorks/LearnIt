function txtToJSON(txt) {
  const fileContent = Buffer.from(txt.content).toString('utf8');
  const fileName = txt.name;
  const questions = [];
  const lines = fileContent.split('\n');

  let currentQuestion = null;
  let currentAnswers = [];
  let currentQuestionType = 'Choice';

  lines.forEach(line => {
    if (line.startsWith('/q ')) {
      if (currentQuestion) {
        questions.push({
          _id: `${txt.name}_${currentQuestion}`,
          question: currentQuestion,
          que_type: currentQuestionType,
          answer: currentAnswers,
          learningState: 'notStarted',
          correctCount: 0,
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
          answer: currentAnswers,
          learningState: 'notStarted',
          correctCount: 0,
        });
      }
      currentQuestion = line.substring(4).trim();
      currentAnswers = [];
      currentQuestionType = 'True/False';
    } else if (line.startsWith('/ra')) {
      const answer = line.substring(4).trim();
      currentAnswers.push({ text: answer, right: true });
      if (currentQuestionType === 'True/False') {
        if (answer === 'True' || answer === 'Igaz') {
          currentAnswers.push({
            text: answer === 'True' ? 'False' : 'Hamis',
            right: false,
          });
        } else if (answer === 'False' || answer === 'Hamis') {
          currentAnswers.push({
            text: answer === 'False' ? 'True' : 'Igaz',
            right: false,
          });
        }
      }
    } else if (line.startsWith('/a')) {
      currentAnswers.push({ text: line.substring(3).trim(), right: false });
    }
  });

  if (currentQuestion) {
    questions.push({
      _id: `${txt.name}_${currentQuestion}`,
      question: currentQuestion,
      que_type: currentQuestionType,
      answer: currentAnswers,
      learningState: 'notStarted',
      correctCount: 0,
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
