import './App.css';
import React, { useState, useEffect } from 'react';

export default function App() {
  // Get cards with questions
  const [questions, setQuestions] = useState([]);
  // total score
  const [total, setTotal] = useState(0);

  /**
   * gets 10 stack of questions with answers from API
   */
     useEffect(() => {
      const getQuestions = async () => {
        try {
          const response = await fetch('https://opentdb.com/api.php?amount=10');
          const result = await response.json(); 
          setQuestions(result.results);
        } catch (error) {
          console.log(error)
        }
      }
      getQuestions()
    }, []);

  /**
   * Previous Button
   * @returns 
   *  Going to the previous question if possible
   */
  const Previous = () => {
    return(
      <button className="px-6 h-12 col-span-1 uppercase font-semibold tracking-wider border-2 border-black bg-teal-400 text-black">
        Previous
      </button>
    )
  }

  /**
   * next Button
   * @returns 
   *  Going to the next button if current question has been answered
   */
  const Next = () => {
    return(
      <button className="px-6 h-12 col-span-1 uppercase font-semibold tracking-wider border-2 border-black bg-teal-400 text-black">
        Next
      </button>
    )
  }

  /**
   * 
   * @param {card}
   *  An individual card with various keys for destructuring  
   * @returns 
   *  A componenet
   */
  const Question = ({ card }) => {
    const { category, type, difficulty, question, correct_answer, incorrect_answers } = card;
    // implement an array to be shuffled
    const choices = [ correct_answer, ...incorrect_answers]
    let color = ''
    // change color difficulty
    if (difficulty === 'easy'){
      color = 'bg-green-400';
    } else if (difficulty === 'medium'){
      color = 'bg-orange-500';
    } else {
      color = 'bg-red-500';
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
     * 
     * @param {value} 
     *  The value currently selected 
     */
    const handleChoice = (value) => {
      // NEED TO GET THE TARGET VALUE
      // console.log(value);
    }

    /**
     * @returns
     *  all possible answers in buttons
     */
    const _scramble = choices.map((choice) => {
      // implement a way where when clicked we check for the right answer
      // update the total score
      // and notify the user
      return(
        <button className="col-span-1 px-6 h-12 uppercase font-semibold tracking-wider border-2 border-black bg-teal-400 text-black" 
        onClick={handleChoice}
        >
          {choice}
        </button>
      )
    })

    return (
      <div className="p-4 grid grid-cols-2 border-2 border-indigo-500">
        <div className='col-span-1'>Category: {category}</div>
        <div className={`col-span-1 ${color}`}>Difficulty: {difficulty}</div>
        <div className='col-span-2'>{question}</div>
          {_scramble}
      </div>
    );

  }
  
  /**
   * THIS IS BEUING USED TO VERIFY ALL THE QUESTIONS APPEAR THE SAME
   * WILL NOT BE IN FINAL PRODUCT
   * 
   * @param {deck} 
   *  The whole list of questions 
   * @returns 
   *  All the questions
   */
  const Cardlist = ({ deck }) => {
    const index = 0;
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
    return(
      <div>
        {total}
      </div>
    );
  }

  return (
    <div className="App">
      <header className="App-header">
        <h1 className='my-10 font-mono font-extrabold'>Trivia Game</h1>
        <TotalScore total={total} />
        <div className="grid-cols-2">
          <Previous />
          <Next />
        </div>
        <Cardlist deck={questions}/>
      </header>
    </div>
  );
}