import React, { useState, useEffect } from 'react'
import './App.scss';
import COLORS_ARRAY from './colorsArray';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faQuoteLeft } from '@fortawesome/free-solid-svg-icons'
import { faTwitter } from '@fortawesome/free-brands-svg-icons' 

let quoteDBUrl = "https://gist.githubusercontent.com/nasrulhazim/54b659e43b1035215cd0ba1d4577ee80/raw/e3c6895ce42069f0ee7e991229064f167fe8ccdc/quotes.json"

function App() {
  const [quote, setQuote] = useState('Your time is limited, so don’t waste it living someone else’s life.');
  const [author, setAuthor] = useState('Steve Jobs');
  const [quotesArray, setQuotesArray] = useState(null)
  const [accentColor, setAccentColor] = useState('#282c34')

  const fetchQuotes = async (url) => {
    const response = await fetch(url)
    const parsedJSON = await response.json()
    setQuotesArray(parsedJSON.quotes)
    console.log(parsedJSON)
  }

  useEffect(() => {
    fetchQuotes(quoteDBUrl)
  }, [quoteDBUrl])


 const getRandomQuote = () => {
  let randomInteger = Math.floor(quotesArray.length * Math.random())
  setQuote(quotesArray[randomInteger].quote)
  setAuthor(quotesArray[randomInteger].author)
  setAccentColor(COLORS_ARRAY[randomInteger])
 }
  
  return (
    <div className="App">
      <header className="App-header" style={{backgroundColor: accentColor}}>
        <div id="quote-box" style={{color: accentColor}}>
          <h1 id='titleQuote'>Quote of the Day</h1>
          <p id="text"> <FontAwesomeIcon icon={faQuoteLeft} /> {quote}  </p>
          <p id="author"> - {author} </p>
          <div className='buttons' >
            <a id="tweet-quote" className='button' style={{backgroundColor: accentColor}} target={'_blank'} href={encodeURI(`http://www.twitter.com/intent/tweet?text= ${quote} -${author}`)}><FontAwesomeIcon icon={faTwitter} /></a>
            <button id="new-quote" className='button' style={{backgroundColor: accentColor}} onClick={() => getRandomQuote() }>New Quote</button>
          </div>
        </div>
      </header>
    </div>
  );
}

export default App;
