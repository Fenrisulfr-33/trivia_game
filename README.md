## Trivia Game

Get 10 Random Quetions with different difficulties and see if you can get on the top ten scoreboard!

## How to install

    1. git clone <this repo>, into a directory of your choosing
    2. open terminal from within the folder, run 'npm install'
    3. In a different terminal run 'npx json-server --watch db/high_scores.json --port 8000'
    4. Check localhost:8000/high_scores to make sure server is working
    5. In a different terminal run npm run start
    6. Play the game and beat my High Score!

## Commits

- First commit
    - Got the main page setup with the questions, difficulty, possible answers, and total score.
    - Need to implement the total score state, and the onClick handler for when the answers are selected.
    - Stop page from refreshing during updates.

- Second commit
    - Componenets added
        - Total score state and current card tracker
        - Next button with disabling features
        - Previous button with disabling features
        - The ability to go back through the cards without editing the answers you have already made
    - Features
        - Added a replacement tool for qoutes and backticks, still doesn't work if there are 4 of either or
        - A JSON server to store the scores
        - A fetch request for the JSON server
        - A Game over menu that displays all leaderboard scores
    
    - ***Known Issues***
        - Submit not posting, 'Cannot read property 'id' or undefined.
            - Archer - Trying to remember on a post if an ID is necessary for a test DB
        - useHistory is no longer in the 'react-router-dom', had to use a window.refresh() to 'history.goBack()'