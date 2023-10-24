import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { useState } from 'react';

export default function App() {
  const [timer, setTimer] = useState(30);
  const [score, setScore] = useState(0);
  const [correct, setCorrect] = useState(false);
  const [intervalId, setIntervalId] = useState(null);
  const [gameStatus, setGameStatus] = useState(false);
  const [wordLength, setWordLength] = useState('???');
  const [firstLetter, setFirstLetter] = useState('???');
  const [guess, setGuess] = useState('');
  const [guessList, setGuessList] = useState({});
  const [message, setMessage] = useState(
    'Guess words with the correct first letter and length'
  );
  const [repeatedWord, setRepeatedWord] = useState('');

  return (
    <View style={styles.container}>
      <View style={styles.row}>
        <View>
          <Text>First Letter</Text>
          <View style={styles.box}>
            <Text>{firstLetter}</Text>
          </View>
        </View>
        <View>
          <Text>Timer</Text>
          <View style={styles.box}>
            <Text>{timer}</Text>
          </View>
        </View>
        <View>
          <Text>Word Length</Text>
          <View style={styles.box}>
            <Text>{wordLength}</Text>
          </View>
        </View>
      </View>
      <View style={styles.row}>
        <View>
          <Text>Score</Text>
          <View style={correct ? styles.score : styles.box}>
            <Text>{score}</Text>
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    // text-align: 'center',
    // height: 100,
    flex: 1,
    border: '1px solid black',
    color: 'black',
    marginTop: 0,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
});
