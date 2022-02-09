import { useEffect, useState } from 'react';

/**
 * A highscore componenet that pulls from high_scroes.json
 * @returns 
 *  A High Score table with the option to submit your score in the DB
 */
export const HighScores = ({ total, formData, setFormData, handleSubmit }) => {
    const [scores, setScores] = useState([]); // scores for the leaderboard
    // get the scores from the test DB
    useEffect(() => {
        const getScores = async () => {
            try {
                const response = await fetch('http://localhost:8000/high_scores');
                const result = await response.json();
                setScores(result);
            } catch (error) {
                console.log(error);
            }
        }
        getScores();
    }, []);

    const [input, setInput] = useState(true); // This disables the form unless user selects yes
    const list = scores.sort((a,b) => b.score - a.score).slice(0, 10).map((person, index) => {
        return(
            <p key={index}>Username: {person.username} | Highscore: {person.score}</p>
        )
    })

    // This is keep the value of the username getting updated as the user types
    const changeHandler = ({ target: { name, value } }) => {
        setFormData({
            ...formData,
            [name]: value,
        });
    }
    // If user hits no return them to the game
    const refreshPage = () => {
        window.location.reload(false);
    }

    return(
        <div>
            <img src={'./game_over.jpg'} alt="Game Over!" />
            <h1>{`Would you like to add your score: [ ${total} ] to the leaderboards?`}</h1>
            <button className="col-span-1 px-6 h-12 uppercase font-semibold tracking-wider border-2 border-black bg-teal-400 hover:bg-teal-700 text-black"
                onClick={() => {setInput(false);}}>
                Yes
            </button>
            <button className="col-span-1 px-6 h-12 uppercase font-semibold tracking-wider border-2 border-black bg-teal-400 hover:bg-teal-700 text-black"
            onClick={refreshPage}>
                No
            </button>
            <form onSubmit={handleSubmit}>
                <label>Username:</label>
                <input id="username" 
                    name="username" 
                    type="text"
                    disabled={input}
                    value={formData.username}
                    onChange={changeHandler}
                    className="text-black"/>
                <button className="px-6 h-12 uppercase font-semibold tracking-wider border-2 border-black bg-teal-400 hover:bg-teal-700 text-black"
                type="submit" >
                    Submit
                </button>
            </form>
            <div>
                <h4 className="">Leaderboards</h4>
                {list}
            </div>
        </div>
    )
 }
