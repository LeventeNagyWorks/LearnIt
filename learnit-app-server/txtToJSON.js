function txtToJSON(txt) {
    const fileContent = txt.toString('utf8');
    const questions = [];
    const lines = fileContent.split('\n');
  
    lines.forEach((line) => {
      if (line.startsWith('/q ')) {
        const question = line.substring(3).trim();
        const answers = [];
        let correctAnswer;
        let queType = 'Choice';
  
        for (let i = 1; i < lines.length; i++) {
          const nextLine = lines[i];
          if (nextLine.startsWith('/ra')) {
            correctAnswer = nextLine.substring(4).trim();
          } else if (nextLine.startsWith('/a')) {
            answers.push(nextLine.substring(3).trim());
          } else {
            break;
          }
        }
  
        questions.push({
          _id: `${txt.name}_${question}`,
          question,
          que_type: queType,
          right_answer: [correctAnswer],
          answer: [correctAnswer, ...answers],
        });
      } else if (line.startsWith('/qtf')) {
        const question = line.substring(7).trim();
        let correctAnswer;
        let answer;
        let queType = 'True/False';
  
        for (let i = 0; i < lines.length; i++) {
          const nextLine = lines[i];
          if (nextLine === '/ra True') {
            correctAnswer = 'True';
            answer = 'False';
          } else if (nextLine === '/ra Igaz') {
            correctAnswer = 'Igaz';
            answer = 'Hamis';
          } else if (nextLine === '/ra Hamis') {
            correctAnswer = 'Hamis';
            answer = 'Igaz';
          } else {
            correctAnswer = 'False';
            answer = 'True';
          }
        }
  
        questions.push({
          _id: `${txt.name}_${question}`,
          question,
          que_type: queType,
          right_answer: [correctAnswer],
          answer: [correctAnswer, answer],
        });
      }
    });
  
    const data = {
      name: txt.name.replace('.txt', ''),
      desc: '',
      questions,
    };
  
    return data;
  }
  
  module.exports = txtToJSON;