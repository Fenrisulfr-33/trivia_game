import './App.css';
import { Previous } from './Buttons/PreviousButton';
import { Next } from './Buttons/NextPrevious';
import { HighScores } from './Componenets/HighScore';
import React, { useState, useEffect } from 'react';

export default function App() {
  const today = new Date(); // get date for score
  const [questions, setQuestions] = useState([]);   // Get cards with questions
  const [total, setTotal] = useState(0);   // total score
  const [disabled, setDisabled] = useState(false); // disabled question buttons
  const [next, setNext] = useState(true); // disabled next button
  const [previous, setPrevious] = useState(true); // disabled previous button
  const [index, setIndex] = useState(0); // keep track of question index
  const [current, setCurrent] = useState(0); // keep track of current question that needs to be answered
  const [correct, setCorrect] = useState(null); // are you correct?
  const initalFormData = {
    username: '',
    score: total,
    date: today.toDateString().slice(3, 15)
  } // This is to keep the user input data
  const [formData, setFormData] = useState({ ...initalFormData }); // set the formData for input
  // Handles submit of a username and information
  const handleSubmit = async (event) => {
    event.preventDefault();
    fetch('http://localhost:8000/high_scores', {
      method: 'POST',
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify(formData)
    })
    setFormData({ ...initalFormData });
    window.location.reload(false);
  }

  /**
   * gets a 10 stack of questions with answers from API
   */
     useEffect(() => {
      const getQuestions = async () => {
        try {
          const response = await fetch('https://opentdb.com/api.php?amount=10');
          const result = await response.json(); 
          setQuestions(result.results);
        } catch (error) {
          console.log(error);
        }
      }
      getQuestions()
    }, []);

  /**
   * 
   * @param {card}
   *  An individual card with various keys for destructuring  
   * @returns 
   *  A componenet
   */
  const Question = ({ card }) => {
    const { category, difficulty, question, correct_answer, incorrect_answers } = card;
    // This is overkill but I wanted it to look nice
    let questionFixed = question.replace('&quot;', "'").replace('&quot;', "'").replace('&#039;', "`").replace('&#039;', "`");
    
    const choices = [ correct_answer, ...incorrect_answers]     // implement an array to be shuffled
    let color = '';     // change color difficulty
    let multiplier = 1; // Point multiplier
    if (difficulty === 'easy'){
      color = 'bg-green-400';
      multiplier = 1;
    } else if (difficulty === 'medium'){
      color = 'bg-orange-500';
      multiplier = 2;
    } else {
      color = 'bg-red-500';
      multiplier = 3
    }

    /**
     * Shuffle the array so the right answer is not always the first answer
     * @param {array} cards 
     */
    const _shuffle = (cards) => {
      // Take a random number and sorts it over or under 0.5
      // While this is not perfect it will work for small arrays
      cards.sort(() => Math.random() - 0.5)
    }
    // shuffle the choices array
    _shuffle(choices);

    /**
     * @returns
     *  all possible answers in button form
     */
    const _scramble = choices.map((choice, index) => {
      let color = disabled ? 'bg-zinc-700' : 'bg-teal-400';
      // This is overkill but I wanted it to look nice
      let choiceFixed = choice.replace('&quot;', "'").replace('&quot;', "'").replace('&#039;', "`").replace('&#039;', "`"); 

      
      const handleChoice = () => {
        if (choice === correct_answer){
          setTotal((total) => total + (1 * multiplier))  // update the total score
          setCorrect('Correct') // Show user they got it Correct
        }
        setCorrect('Wrong!')
        setDisabled(true); // disable all buttons and move onto the next question
        setNext(false);
      }

      return(
        <button className={`col-span-1 px-6 h-20 w-75 uppercase font-semibold tracking-wider border-2 border-black ${color} hover:bg-teal-700 text-black`} 
        key={index}
        onClick={handleChoice}
        disabled={disabled}>
          {choiceFixed}
        </button>
      )
    })

    /**
     * THIS IS THE FRAME FOR THE QUESTIONS
     * HOWEVER THE ANSWERS ARE MADE IN _SCRAMBLE
     */
    return (
      <div className="p-4 grid grid-cols-2 border-2 border-indigo-500">
        <div className='mr-2 col-span-1'>Category: {category}</div>
        <div className={`col-span-1 ${color}`}>Difficulty: {difficulty}</div>
        <div className='col-span-2'>{questionFixed}</div>
          {_scramble}
      </div>
    );

  }
  
  /**
   * This is the entire deck of questions however only one can be seen
   * @param {deck} 
   *  The whole list of questions 
   * @returns 
   *  One indexed question
   */
  const Cardlist = ({ deck }) => {
    const list = deck.map((card, index) => <Question key={index} card={card} />)
    return (
      <div className='m-4'>
        {list[index]}
      </div>
    );
  }

  /**
   * 
   * @param {total} 
   *  Total score 
   * @returns 
   *  A visual for the total score
   */
  const TotalScore = ({ total }) => {
    return(<div>Total Score: {total}</div>);
  }

  /**
   * 
   * @param {answer}
   *  Either Correct or Wrong 
   * @returns 
   *  Null unless state is set
   */
  const Answer = ({ answer }) => {
    return(<div>{answer}</div>);
  }

  if (current <= 9){
    return (
      <div className="App">
        <header className="App-header">
          <h1 className='my-10 font-mono font-extrabold'>Trivia Game</h1>
          <p>Current: {current} | Total Cards: {questions.length}</p>
          <TotalScore total={total} />
          <div className="grid-cols-2">
            <Previous 
              previous={previous}
              index={index}
              setCorrect={setCorrect}
              setDisabled={setDisabled}
              setNext={setNext}
              setIndex={setIndex}
              setPrevious={setPrevious}
            />
            <Next 
              index={index}
              next={next}
              current={current}
              setIndex={setIndex}
              setPrevious={setPrevious}
              setCorrect={setCorrect}
              setCurrent={setCurrent}
              setDisabled={setDisabled}
              setNext={setNext} 
              formData={formData}
              total={total} 
            />
          </div>
          <Cardlist deck={questions}/>
          <Answer answer={correct}/>
        </header>
      </div>
    );
  } else {
    return(
      <div className="App">
      <header className="App-header">
        <h1 className='my-10 font-mono font-extrabold'>Trivia Game</h1>  
        {/* High score databse results */}
        <HighScores 
          total={total}
          current={current}
          formData={formData}
          setFormData={setFormData}
          handleSubmit={handleSubmit}
        />
      </header>
    </div>
    )
  }

}