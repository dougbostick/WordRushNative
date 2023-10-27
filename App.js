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
          <View>
            <Text>{score}</Text>
          </View>
        </View>
      </View>
    </View>
  );
}
//style={correct ? styles.score : styles.box}
const styles = StyleSheet.create({
  container: {
    backgroundColor: 'red',
    // textAlign: 'center',
    flex: 1,
    // flexWrap: 'wrap',
    color: 'red',
    marginTop: 0,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    // borderColor: 'blue',
    // borderWidth: 10,
    // borderStyle: 'solid',
    // borderRadius: 5,
  },
  box: {
    color: 'red',
    width: 50,
    height: 50,
    borderColor: 'black',
    borderWidth: 1,
    borderStyle: 'solid',
    borderRadius: 5,
  },
});
