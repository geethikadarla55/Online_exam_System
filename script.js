const quizData = [
    {
      question: 'What is the most fundamental unit of a computer?',
      options: ['CPU', 'Hard Drive', 'RAM', 'Motherboard'],
      answer: 'CPU',
    },
    {
      question: 'Which programming language is known for its use in artificial intelligence and data analysis?',
      options: ['Java', 'Python', 'C++', 'JavaScript'],
      answer: 'Python',
    },
    {
      question: 'What is the term for the simultaneous execution of multiple processes on a CPU?',
      options: ['Multithreading', 'Multiprocessing', 'Concurrency', 'Parallelism'],
      answer: 'Multithreading',
    },
    {
      question: 'Which data structure operates on a last-in, first-out (LIFO) basis?',
      options: ['Queue', 'Stack', 'Heap', 'Linked List'],
      answer: 'Stack',
    },
    {
      question: 'What does HTML stand for in the context of web development?',
      options: ['HyperText Markup Language', 'High-Level Text Markup Language', 'Hyper Transfer Markup Language', 'Hyper Tool Multi-Language'],
      answer: 'HyperText Markup Language',
    },
    {
      question: 'Which sorting algorithm has an average and worst-case time complexity of O(n*log(n))?',
      options: ['Bubble Sort', 'Insertion Sort', 'Quick Sort', 'Selection Sort'],
      answer: 'Quick Sort',
    },
    {
      question: 'What is the binary representation of the decimal number 10?',
      options: ['0000', '0101', '1010', '1111'],
      answer: '1010',
    },
    {
      question: 'Which network protocol is used to retrieve email from a mail server?',
      options: ['FTP', 'HTTP', 'SMTP', 'POP3'],
      answer: 'POP3',
    },
    {
      question: 'Which data structure is used for efficient searching in a sorted list of elements?',
      options: ['Array', 'Linked List', 'Stack', 'Binary Search Tree'],
      answer: 'Binary Search Tree',
    },
    {
      question: 'What does CPU stand for in computer science?',
      options: ['Central Processing Unit', 'Computer Personal Unit', 'Central Process Unit', 'Central Processor Unit'],
      answer: 'Central Processing Unit',
    },
  ];
  const quizContainer = document.getElementById('quiz');
  const resultContainer = document.getElementById('result');
  const submitButton = document.getElementById('submit');
  const retryButton = document.getElementById('retry');
  const showAnswerButton = document.getElementById('showAnswer');
  
  let currentQuestion = 0;
  let score = 0;
  let incorrectAnswers = [];
  
  function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
  }
  
  function displayQuestion() {
    const questionData = quizData[currentQuestion];
  
    const questionElement = document.createElement('div');
    questionElement.className = 'question';
    questionElement.innerHTML = questionData.question;
  
    const optionsElement = document.createElement('div');
    optionsElement.className = 'options';
  
    const shuffledOptions = [...questionData.options];
    shuffleArray(shuffledOptions);
  
    for (let i = 0; i < shuffledOptions.length; i++) {
      const option = document.createElement('label');
      option.className = 'option';
  
      const radio = document.createElement('input');
      radio.type = 'radio';
      radio.name = 'quiz';
      radio.value = shuffledOptions[i];
  
      const optionText = document.createTextNode(shuffledOptions[i]);
  
      option.appendChild(radio);
      option.appendChild(optionText);
      optionsElement.appendChild(option);
    }
  
    quizContainer.innerHTML = '';
    quizContainer.appendChild(questionElement);
    quizContainer.appendChild(optionsElement);
  }
  
  function checkAnswer() {
    const selectedOption = document.querySelector('input[name="quiz"]:checked');
    if (selectedOption) {
      const answer = selectedOption.value;
      if (answer === quizData[currentQuestion].answer) {
        score++;
      } else {
        incorrectAnswers.push({
          question: quizData[currentQuestion].question,
          incorrectAnswer: answer,
          correctAnswer: quizData[currentQuestion].answer,
        });
      }
      currentQuestion++;
      selectedOption.checked = false;
      if (currentQuestion < quizData.length) {
        displayQuestion();
      } else {
        displayResult();
      }
    }
  }
  
  function displayResult() {
    quizContainer.style.display = 'none';
    submitButton.style.display = 'none';
    retryButton.style.display = 'inline-block';
    showAnswerButton.style.display = 'inline-block';
    resultContainer.innerHTML = `You scored ${score} out of ${quizData.length}!`;
  }
  
  function retryQuiz() {
    currentQuestion = 0;
    score = 0;
    incorrectAnswers = [];
    quizContainer.style.display = 'block';
    submitButton.style.display = 'inline-block';
    retryButton.style.display = 'none';
    showAnswerButton.style.display = 'none';
    resultContainer.innerHTML = '';
    displayQuestion();
  }
  
  function showAnswer() {
    quizContainer.style.display = 'none';
    submitButton.style.display = 'none';
    retryButton.style.display = 'inline-block';
    showAnswerButton.style.display = 'none';
  
    let incorrectAnswersHtml = '';
    for (let i = 0; i < incorrectAnswers.length; i++) {
      incorrectAnswersHtml += `
        <p>
          <strong>Question:</strong> ${incorrectAnswers[i].question}<br>
          <strong>Your Answer:</strong> ${incorrectAnswers[i].incorrectAnswer}<br>
          <strong>Correct Answer:</strong> ${incorrectAnswers[i].correctAnswer}
        </p>
      `;
    }
  
    resultContainer.innerHTML = `
      <p>You scored ${score} out of ${quizData.length}!</p>
      <p>Incorrect Answers:</p>
      ${incorrectAnswersHtml}
    `;
  }
  
  submitButton.addEventListener('click', checkAnswer);
  retryButton.addEventListener('click', retryQuiz);
  showAnswerButton.addEventListener('click', showAnswer);
  
  displayQuestion();  

  

  