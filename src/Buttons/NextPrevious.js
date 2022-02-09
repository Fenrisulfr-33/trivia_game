/**
   * next Button
   * @returns 
   *  Going to the next button if current question has been answered
   */
export const Next = ({ index, next, current, setIndex, setPrevious, setCorrect, setCurrent, setDisabled, setNext, formData, total }) => {
    let color = next ? 'bg-teal-700' : 'bg-teal-400';

    /**
     * Move index forward
     * Make Previous available
     * Blank out correct
     * If on current card move Current card
     * Open buttons up for selection
     * Disabled Next
     * If you are one card behind current open up buttons when coming back to the question
     */
    const handleNext = () => {
        formData.score = total;
        setIndex((index) => index + 1)
        setPrevious(false);
        setCorrect(null);
        if(index === current) {
            setCurrent((current) => current + 1);
            setDisabled(false);
            setNext(true);
        } else if (index + 1 === current){
            setDisabled(false);
        }
    }

    return(
        <button className={`px-6 h-12 col-span-1 uppercase font-semibold tracking-wider border-2 border-black ${color} hover:bg-teal-700 text-black`}
        disabled={next}
        onClick={handleNext}>
            Next
        </button>
    )
}