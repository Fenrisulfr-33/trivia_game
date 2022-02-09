  /**
   * Previous Button
   * @returns 
   *  Going to the previous question if possible
   */
   export const Previous = ({ previous, index, setCorrect, setDisabled,setNext, setIndex, setPrevious }) => {
    let color = previous ? 'bg-teal-700' : 'bg-teal-400';
    /**
     * Move index backwards
     * Nullify correct
     * Disabled answer buttons
     * Make sure next become available 
     * Id on last index, make sure you cannot go back further
     */
    const handlePrevious = () => {
        setIndex(index => index - 1);
        setCorrect(null);
        setDisabled(true);
        setNext(false);
        if (index === 1) {setPrevious(true)} 
    }

    return(
    <button className={`px-6 h-12 col-span-1 uppercase font-semibold tracking-wider border-2 border-black ${color} hover:bg-teal-700 text-black`}
    disabled={previous}
    onClick={handlePrevious}>
        Previous
    </button>
    )
  }