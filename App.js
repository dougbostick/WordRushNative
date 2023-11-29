import { StatusBar } from 'expo-status-bar';
import { generateLetter, generateWordLength } from './gameFunctions';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Button,
  FlatList,
} from 'react-native';
import { useState, useEffect, useRef } from 'react';
import axios from 'axios';

export default function App() {
  const [timer, setTimer] = useState(30);
  const [score, setScore] = useState(0);
  const [correct, setCorrect] = useState(false);
  const [intervalId, setIntervalId] = useState(null);
  const [gameStatus, setGameStatus] = useState(false);
  const [wordLength, setWordLength] = useState('???');
  const [firstLetter, setFirstLetter] = useState('???');
  const [guess, setGuess] = useState('');
  // const [guessList, setGuessList] = useState({});
  const [guessList, setGuessList] = useState([]);
  const [message, setMessage] = useState(
    'Guess words with the correct first letter and length'
  );
  const [repeatedWord, setRepeatedWord] = useState('');

  const handleGuess = async (e) => {
    e.preventDefault();
    console.log(guessList);
    //check to see if word has been guessed already
    if (guess.length === 0) return;
    if (guessList.includes(guess)) {
      setMessage('Already guessed');
      setRepeatedWord(guess);
      setTimeout(() => setRepeatedWord(''), 500);
      return;
    }
    //check first letter of guess is correct
    if (guess[0].toUpperCase() !== firstLetter) {
      setMessage('Incorrect first letter');
      return;
    }
    //check to see if guess if proper length
    if (guess.length !== wordLength) {
      setMessage('Incorrect word length');
      return;
    }
    try {
      //check to see if word exists
      await axios
        .get(`https://api.dictionaryapi.dev/api/v2/entries/en/${guess}`)
        .then((res) => {
          if (res.data) {
            //add guess to guessList and increment score
            // setGuessList({ ...guessList, [guess]: true });
            setGuessList([...guessList, guess]);
            console.log(guessList, guess);
            setScore(score + 1);
            setMessage('');
            sound();
            setCorrect(true);
            setTimeout(() => setCorrect(false), 500);
            setGuess('');
          }
        });
    } catch (err) {
      //if word doesn't exist, the api call fails
      setMessage('Not a word');
    }
  };

  const endGame = () => {
    setGameStatus(false);
    setGuess('');
    setMessage('Good Game!');
    clearInterval(intervalId);
  };

  const countdown = () => {
    if (timer > 0) {
      setTimer(timer - 1);
    } else {
      endGame();
    }
  };

  const test = useRef(countdown);

  useEffect(() => {
    test.current = countdown;
  }, [timer]);

  const startGame = () => {
    console.log('start pressed');
    resetGameParams();
    setGameStatus(true);
    setIntervalId(setInterval(() => test.current(), 1000));
  };

  const resetGameParams = () => {
    setTimer(30);
    setScore(0);
    setGuessList([]);
    setGuess('');
    setMessage('');
    setFirstLetter(generateLetter());
    setWordLength(generateWordLength());
  };

  return (
    <View style={styles.container}>
      <View style={styles.logo}>
        <Text>LOGO</Text>
      </View>
      <View style={styles.middleRow}>
        <View style={styles.topHalf}>
          <View style={styles.info}>
            <Text>First Letter</Text>
            <View style={styles.box}>
              <Text>{firstLetter}</Text>
            </View>
          </View>
          <View style={styles.info}>
            <Text>Timer</Text>
            <View style={styles.box}>
              <Text>{timer}</Text>
            </View>
          </View>
          <View style={styles.info}>
            <Text>Word Length</Text>
            <View style={styles.box}>
              <Text>{wordLength}</Text>
            </View>
          </View>
        </View>
        <View style={styles.bottomHalf}>
          <Text style={styles.text}>{message}</Text>
        </View>
      </View>
      <View style={styles.row}>
        <View style={styles.info}>
          <Text>Score</Text>
          <View>
            <Text>{score}</Text>
          </View>
        </View>
      </View>
      <View style={styles.row}>
        {!gameStatus && (
          <View>
            <Button title="start" onPress={startGame} />
          </View>
        )}
        {gameStatus && (
          <TextInput
            style={styles.input}
            value={guess}
            onChangeText={(e) => setGuess(e)}
            placeholder="enter a guess..."
          />
        )}
        {gameStatus && (
          <Button style={styles.button} title="+" onPress={handleGuess} />
        )}
      </View>
      <View style={styles.bottomRow}>
        <FlatList
          data={guessList}
          renderItem={({ item }) => (
            <View>
              <Text>{item}</Text>
            </View>
          )}
        />
      </View>
    </View>
  );
}
//style={correct ? styles.score : styles.box}
const styles = StyleSheet.create({
  text: {
    textAlign: 'center',
  },
  container: {
    backgroundColor: 'red',
    flex: 1,
    color: 'red',
    marginTop: 0,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },

  logo: {
    // flex: 1,
    height: '15%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  row: {
    display: 'flex',
    // flex: 1,
    height: '10%',
    width: '80%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    borderColor: 'black',
    borderWidth: 2,
    borderStyle: 'solid',
    borderRadius: 5,
  },
  bottomRow: {
    display: 'flex',
    // flex: 1,
    height: '20%',
    width: '80%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    borderColor: 'black',
    borderWidth: 2,
    borderStyle: 'solid',
    borderRadius: 5,
  },
  middleRow: {
    display: 'flex',
    // flex: 3,
    height: '30%',
    width: '80%',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'space-around',
    borderColor: 'black',
    borderWidth: 2,
    borderStyle: 'solid',
    borderRadius: 5,
  },
  topHalf: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    height: '60%',
  },
  bottomHalf: {
    width: '75%',
    height: '40%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  box: {
    color: 'red',
    width: 50,
    height: 60,
    borderColor: 'black',
    borderWidth: 2,
    borderStyle: 'solid',
    borderRadius: 5,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },

  info: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
  input: {
    height: 40,
  },
  button: {
    borderColor: 'black',
    borderWidth: 2,
    borderStyle: 'solid',
    borderRadius: 5,
    height: 50,
  },
});
