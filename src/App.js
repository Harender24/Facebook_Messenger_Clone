import { Button, FormControl, Input, InputLabel } from '@material-ui/core';
import React, { useEffect, useState } from 'react';

import './App.css';
import db from './firebase';
import Message from './Message';
import firebase from 'firebase';
import FlipMove from 'react-flip-move';
import QuestionAnswerIcon from '@material-ui/icons/QuestionAnswer';
import SendIcon from '@material-ui/icons/Send';
import IconButton from '@material-ui/core/IconButton';
function App() {
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState([]);
  const [username, setUsername] = useState('');

  // useSate=variable in react or short term memory
  // useEffect=run code on a condition in react

  useEffect(() => {
    // run code here
    // if its blank inside [], this code runs once when the app components loads
    // if we have a variable like input, it runs every time input changes
    setUsername(prompt('Enter your name'));
  }, []);

  // useEffect=run code on a condition in react
  useEffect(() => {
    db.collection('messages')
      .orderBy('timestamp', 'desc')
      .onSnapshot((snapshot) => {
        setMessages(
          snapshot.docs.map((doc) => ({ id: doc.id, message: doc.data() }))
        );
      });
  }, []);

  const sendMessages = (event) => {
    event.preventDefault();
    db.collection('messages').add({
      message: input,
      username: username,
      timestamp: firebase.firestore.FieldValue.serverTimestamp(),
    });
    setMessages([...messages, { username: username, message: input }]);
    setInput('');
  };
  return (
    <div className='App'>
      <QuestionAnswerIcon />
      <h1>Welcome to facebook messenger</h1>
      <form className='app__form'>
        <FormControl className='app__formControl'>
          <Input
            className='app__input'
            placeholder='Enter your Message'
            value={input}
            onChange={(event) => setInput(event.target.value)}
          />
          <IconButton
            className='app_iconButton'
            color='primary'
            disabled={!input}
            variant='contained'
            color='primary'
            type='submit'
            onClick={sendMessages}>
            <SendIcon />
          </IconButton>
        </FormControl>
      </form>
      <FlipMove>
        {messages.map(({ id, message }) => (
          <Message key={id} username={username} message={message} />
        ))}
      </FlipMove>
    </div>
  );
}

export default App;
