import './index.js'
import './App.css';
//have to import useState from React. This is a 'hook' that will help us. I will explain more below.
import {useState} from "react"

function App() {
    
    // Please do some research into React hooks. They are kind of the heart and soul of React. useState is the most basic
    // Here we are defining a new state 'enteredText' and assigning it to an empty string ''. 
    // We can then use 'setEnteredText' to modify the 'enteredText' state. 
    const [enteredText, setEnteredText] = useState('')
    
    // Here I am creating a new state that will handle capitalization for us... more on that below :) 
    const [caps, setCaps] = useState('')
    
    // Here we create a 'valueClickHandler' that we will add to the button's onClick events
    // onClick fires an event. We can take this event and get the button's value with e.target.value
    // then we will use the setEnteredText function to combine two strings, the existing enteredText and the new e.target.value
    // We also are handeling capitalization. Maybe it looks complicated but it's pretty straightforward
    const valueClickHandler = (e) => {
        // first we check if the shift key is activated. We also check if it's a letter that's been clicked
        // because if it is not a letter, we don't care about capitalization.
        // so here, if shift key is activated, we add the capital letter to the string, and then reset the caps
        // state because with shift we only want one character to be capitalized
        if (caps === 'shift' && e.target.value.toUpperCase() != e.target.value.toLowerCase()) {
            setEnteredText(enteredText + e.target.value)
            setCaps('')
        // Here we do a similar thing with capsLock, but instead of reseting the caps state, we let it persist,
        // because if the user hits caps lock they want many characters to be capitalized
        } else if (caps === 'capsLock' && e.target.value.toUpperCase() != e.target.value.toLowerCase()) {
            setEnteredText(enteredText + e.target.value)
        // and then this statement handles clicks if no capitalization is activated, or if the target value is not a letter
        } else {
            setEnteredText(enteredText + e.target.value.toLowerCase())
        }
    }

    // We need a seprate function for the backspace key. Here we are using the .slice js method on enteredText
    // to remove the last character of our enteredText string. Note that we have to check if the last two characters
    // are \n (this is how we use the enter button to create a new line, see below.) If it is \n on the end of the string, we
    // have to slice off the last two characters instead of just one.
    const backspaceClickHandler = (e) => {
        if (enteredText.slice(-2) === '\n') {
            setEnteredText(enteredText.slice(0, -2))
        } else {
            setEnteredText(enteredText.slice(0, -1))
        }
    }

    // And here we need to create a seperate function and state for capitalization. 
    // Basically, we want to know whether the 'shift' or 'capsLock' key has been touched. 
    // We will take the target.value and set the caps state based on it. If the caps state is already active,
    // we will remove caps state ('')
    const capitalizeClickHandler = (e) => {
        if (caps === '') {
            setCaps(e.target.value)
        } else {
            setCaps('')
        }
    }

    return (

<div className='keyboard-input'>
    
    {/* Here we are making the text area render whatever the {enteredText} state is. 
    I changed it to a <p> element instead of textarea, because the user can still type
    in the textarea with their computers keyboard instead of using the virtual keyboard.*/}
    <p class="use-keyboard-input">
        {enteredText}
    </p>
    
        <div className='keyboard-base'>
        <div className = 'keyBoard-wrapper'>
        <div className = 'keyNumbers'>

        {/* To make this work, we have to add some properties to the buttons. For each we add the value wich is just
        a string of whatever the key is, and onClick which will fire the valueClickHandler we defined above. Also, we add the
        backspaceClickHandler to the backspace button*/}
        <button value={'1'} onClick={valueClickHandler}> 1 </button> 
        <button value={'2'} onClick={valueClickHandler}> 2 </button> 
        <button value={'3'} onClick={valueClickHandler}> 3 </button> 
        <button value={'4'} onClick={valueClickHandler}> 4 </button> 
        <button value={'5'} onClick={valueClickHandler}> 5 </button> 
        <button value={'6'} onClick={valueClickHandler}> 6 </button> 
        <button value={'7'} onClick={valueClickHandler}> 7 </button> 
        <button value={'8'} onClick={valueClickHandler}> 8 </button> 
        <button value={'9'} onClick={valueClickHandler}> 9 </button> 
        <button value={'0'} onClick={valueClickHandler}> 0 </button> 
        <button value={'-'} onClick={valueClickHandler}> - </button> 
        <button value={'+'} onClick={valueClickHandler}> + </button> 
        <button value={'='} onClick={valueClickHandler}> = </button> 
        <button onClick={backspaceClickHandler} className = 'span-two' > backspace </button>


        
        <button value={'    '} onClick={valueClickHandler} className = 'spantwo'> tab </button> 
        <button value={'Q'} onClick={valueClickHandler}> Q </button> 
        <button value={'W'} onClick={valueClickHandler}> W </button> 
        <button value={'E'} onClick={valueClickHandler}> E </button> 
        <button value={'R'} onClick={valueClickHandler}> R </button> 
        <button value={'T'} onClick={valueClickHandler}> T </button> 
        <button value={'Y'} onClick={valueClickHandler}> Y </button> 
        <button value={'U'} onClick={valueClickHandler}> U </button> 
        <button value={'I'} onClick={valueClickHandler}> I </button> 
        <button value={'O'} onClick={valueClickHandler}> O </button> 
        <button value={'P'} onClick={valueClickHandler}> P </button> 
        <button value={'['} onClick={valueClickHandler}> [ </button> 
        <button value={']'} onClick={valueClickHandler}> ] </button> 
        {/* Notice here we use two backslashes (\\). Check out: https://stackoverflow.com/questions/3903488/javascript-backslash-in-variables-is-causing-an-error  
        for an explanation.*/}
        <button value={'\\'} onClick={valueClickHandler} className='span-two'> \ </button>


        {/* Notice here also I am adding a conditional className 'caps-active'. The idea is that if the user has 
        activated capsLock (or shift) we want them to know, so we change the background on the button
        when it is active. We do pretty much the same thing for shift. If the caps state is equal to capsLock, we add
        the className 'caps-active'. Otherwise, we do not add a className ('')*/}
        <button value={'capsLock'} onClick={capitalizeClickHandler} className ={'span-two ' + (caps === 'capsLock' ? 'caps-active' : '')} > caps lock </button> 
        <button value={'A'} onClick={valueClickHandler}> A </button> 
        <button value={'S'} onClick={valueClickHandler}> S </button> 
        <button value={'D'} onClick={valueClickHandler}> D </button> 
        <button value={'F'} onClick={valueClickHandler}> G </button> 
        <button value={'G'} onClick={valueClickHandler}> J </button> 
        <button value={'H'} onClick={valueClickHandler}> K </button> 
        <button value={'J'} onClick={valueClickHandler}> L </button> 
        <button value={'K'} onClick={valueClickHandler}> ; </button> 
        <button value={'L'} onClick={valueClickHandler}> ' </button> 
        {/* The way to add a new line in a string is \n. */}
        <button value={'\n'} onClick={valueClickHandler} className = 'span-four '> enter </button>

        <button value={'shift'} onClick={capitalizeClickHandler} className ={'span-two ' + (caps === 'shift' ? 'caps-active' : '')}> shift </button>
        <button value={'Z'} onClick={valueClickHandler}> Z </button> 
        <button value={'X'} onClick={valueClickHandler}> X </button> 
        <button value={'C'} onClick={valueClickHandler}> C </button> 
        <button value={'V'} onClick={valueClickHandler}> V </button> 
        <button value={'B'} onClick={valueClickHandler}> B </button> 
        <button value={'N'} onClick={valueClickHandler}> N </button> 
        <button value={'M'} onClick={valueClickHandler}> M </button> 
        <button value={','} onClick={valueClickHandler}> , </button> 
        <button value={'.'} onClick={valueClickHandler}> . </button>  
        <button value={'/'} onClick={valueClickHandler}> / </button>
       


        <button value={'.com'} onClick={valueClickHandler} className = 'span-two'> .com </button> 
        <button value={'@'} onClick={valueClickHandler}> @ </button> 
        <button value={' '} onClick={valueClickHandler} className = 'span-twelve'> space bar </button>



        </div> </div></div></div>
    );
}

export default App;