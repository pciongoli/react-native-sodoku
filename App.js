import React, { useState, useEffect } from "react";
import {
   View,
   Text,
   StyleSheet,
   TouchableOpacity,
   TextInput,
   TouchableWithoutFeedback,
   Keyboard,
   Button,
} from "react-native";

// `useState` hook to keep track of the value of the TextInput element
// receives three props: `value`, `onPress`, and `isEditable`
const Cell = ({ value, onPress, isEditable }) => {
   const [inputValue, setInputValue] = useState(value ? value.toString() : "");
   return (
      <View
         style={[
            styles.cell,
            (rowIndex + cellIndex) % 3 === 0 ? styles.thickerBorder : null,
         ]}
      >
         {isEditable ? (
            <TextInput
               style={styles.cellText}
               value={inputValue}
               onChangeText={(text) => {
                  if (
                     text === "" ||
                     (parseInt(text) >= 1 && parseInt(text) <= 9)
                  ) {
                     setInputValue(text);
                     onPress(text);
                  }
               }}
               keyboardType="number-pad"
               maxLength={1}
            />
         ) : (
            <Text style={styles.cellText}>{value}</Text>
         )}
      </View>
   );
};

// Generate full 9x9 grid
const Grid = ({ grid, onCellPress, validateInput }) => {
   const [fullGrid, solutionGrid] = generateFullGrid();
   return (
      <View style={styles.grid}>
         {grid.map((row, rowIndex) => (
            <View key={rowIndex} style={styles.row}>
               {row.map((cell, cellIndex) => (
                  // display cell value
                  <Cell
                     key={cellIndex}
                     value={cell.value}
                     isEditable={cell.isEditable}
                     onPress={(text) => {
                        if (
                           validateInput(rowIndex, cellIndex, parseInt(text))
                        ) {
                           onCellPress(rowIndex, cellIndex, parseInt(text));
                        }
                     }}
                     rowIndex={rowIndex}
                     cellIndex={cellIndex}
                  />
               ))}
            </View>
         ))}
      </View>
   );
};

// take in an array as an argument and return the array with elements randomly shuffled
const shuffle = (arr) => {
   for (let i = arr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [arr[i], arr[j]] = [arr[j], arr[i]];
   }
   return arr;
};

// Replaced hardcoded puzzle with backtracking algorithm to generate random, valid Sudoku grid
const generateFullGrid = () => {
   const grid = [];
   const solutionGrid = []; // added variable to store the solution grid
   for (let i = 0; i < 9; i++) {
      grid[i] = [];
      solutionGrid[i] = []; // added a row to the solution grid
      for (let j = 0; j < 9; j++) {
         grid[i][j] = { value: "", isEditable: true };
         solutionGrid[i][j] = 0; // initialized each cell to 0
      }
   }

   // Check if the number num is a valid input for the cell at position row, col in a grid

   const isValid = (row, col, num) => {
      for (let i = 0; i < 9; i++) {
         if (grid[row][i].value === num || grid[i][col].value === num) {
            return false;
         }
      }

      const subGridRowStart = Math.floor(row / 3) * 3;
      const subGridColStart = Math.floor(col / 3) * 3;
      for (let i = subGridRowStart; i < subGridRowStart + 3; i++) {
         for (let j = subGridColStart; j < subGridColStart + 3; j++) {
            if (grid[i][j].value === num) {
               return false;
            }
         }
      }

      return [grid, solutionGrid];
   };

   // solves a sudoku puzzle represented by a 9x9 grid through use of backtracking
   const solve = () => {
      for (let row = 0; row < 9; row++) {
         for (let col = 0; col < 9; col++) {
            if (grid[row][col].value === "") {
               shuffle([...Array(9).keys()])
                  .map((num) => num + 1)
                  .forEach((num) => {
                     if (isValid(row, col, num)) {
                        grid[row][col].value = num;
                        solutionGrid[row][col] = num; // added line to update solution grid
                        if (solve()) {
                           return true;
                        } else {
                           grid[row][col].value = "";
                           solutionGrid[row][col] = 0; // reset value in solution grid as well
                        }
                     }
                  });
               return false;
            }
         }
      }

      return true;
   };

   solve();
   // console.log(solutionGrid); // console log the grid variable
   return [grid, solutionGrid]; //return both grids
};

const validateInput = (row, col, value) => {
   const [grid, solutionGrid] = generateFullGrid();
   // check if the input is within the range of 1 to 9
   if (value < 1 || value > 9) {
      return false;
   }
   // check if the input is not in the same row
   for (let i = 0; i < 9; i++) {
      if (grid[row][i].value === value) {
         return false;
      }
   }
   // check if the input is not in the same column
   for (let i = 0; i < 9; i++) {
      if (grid[i][col].value === value) {
         return false;
      }
   }

   // check if the input is not in the same 3x3 sub-grid
   const subGridRowStart = Math.floor(row / 3) * 3;
   const subGridColStart = Math.floor(col / 3) * 3;
   for (let i = subGridRowStart; i < subGridRowStart + 3; i++) {
      for (let j = subGridColStart; j < subGridColStart + 3; j++) {
         if (grid[i][j].value === value) {
            return false;
         }
      }
   }
   return true;
};

// const onCellPress = (row, col, value) => {
//    const newGrid = [...generateFullGrid()];
//    newGrid[row][col].value = value;
//    setGrid(newGrid);
// };

const SubmitButton = ({ onPress }) => (
   <TouchableOpacity onPress={onPress} style={styles.submitButton}>
      <Text style={styles.submitButtonText}>Submit</Text>
   </TouchableOpacity>
);

const ResetButton = ({ onPress }) => (
   <TouchableOpacity onPress={onPress} style={styles.resetButton}>
      <Text style={styles.resetButtonText}>Reset</Text>
   </TouchableOpacity>
);

const Sudoku = () => {
   const [initialGrid, initialSolutionGrid] = generateFullGrid();
   const [grid, setGrid] = useState(initialGrid);
   const [solutionGrid, setSolutionGrid] = useState(initialSolutionGrid);
   const [elapsedTime, setElapsedTime] = useState(0);
   const [isRunning, setIsRunning] = useState(true);
   const [intervalId, setIntervalId] = useState(null);
   const [showMessage, setShowMessage] = useState(false);
   const [isComplete, setIsComplete] = useState(false);

   const onCellPress = (rowIndex, cellIndex, value) => {
      const newGrid = [...grid];
      newGrid[rowIndex][cellIndex].value = value;
      setGrid(newGrid);
   };

   useEffect(() => {
      if (isRunning) {
         setIntervalId(
            setInterval(() => {
               setElapsedTime((prevTime) => prevTime + 1);
            }, 1000)
         );
      }

      return () => {
         clearInterval(intervalId);
      };
   }, [isRunning]);

   const handleSubmit = () => {
      setIsRunning(true);
      for (let i = 0; i < 9; i++) {
         for (let j = 0; j < 9; j++) {
            if (grid[i][j].value !== solutionGrid[i][j]) {
               setShowMessage(true);
               setIsComplete(false);
               return;
            }
         }
      }
      setIsRunning(false);
      setElapsedTime(0);
      setShowMessage(true);
      setIsComplete(true);
   };

   const handleReset = () => {
      clearInterval(intervalId);
      setGrid(initialGrid);
      setSolutionGrid(initialSolutionGrid);
      setIsRunning(false);
      setElapsedTime(0);
      setShowMessage(false);
      setIsComplete(false);
      setIsRunning(true);
      setIntervalId(
         setInterval(() => {
            setElapsedTime((prevTime) => prevTime + 1);
         }, 1000)
      );
   };

   const handleBlur = () => {
      Keyboard.dismiss();
   };

   return (
      <TouchableWithoutFeedback onPress={handleBlur}>
         <View style={styles.container}>
            <View style={styles.titleAndTimerContainer}>
               <Text style={styles.titleText}>Sudoku</Text>
               <View style={styles.timerContainer}>
                  <Text style={styles.timerText}>{elapsedTime}</Text>
               </View>
            </View>
            <Grid
               grid={grid}
               onCellPress={onCellPress}
               validateInput={validateInput}
            />

            <View style={styles.buttonContainer}>
               <Button title="Submit" onPress={handleSubmit} />
               <Button title="Reset" onPress={handleReset} />
            </View>
            {showMessage && (
               <View style={styles.messageContainer}>
                  <Text style={styles.messageText}>
                     {isComplete
                        ? "Congratulations! You solved the puzzle!"
                        : "Incorrect. Please try again!"}
                  </Text>
               </View>
            )}
         </View>
      </TouchableWithoutFeedback>
   );
};

// StyleSheet
const styles = StyleSheet.create({
   container: {
      flex: 1,
      backgroundColor: "f2f2f2",
      alignItems: "center",
      justifyContent: "center",
   },
   titleAndTimerContainer: {
      width: "100%",
      height: 50,
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "center",
   },
   timerContainer: {
      width: 100,
      height: 50,
      alignItems: "center",
      justifyContent: "center",
      marginLeft: 10,
   },
   timerText: {
      fontSize: 18,
   },
   titleText: {
      fontSize: 30,
      fontWeight: "bold",
      marginBottom: 20,
   },
   grid: {
      width: 300,
      height: 300,
      flexDirection: "column",
   },
   row: {
      flexDirection: "row",
   },
   cell: {
      width: 30,
      height: 30,
      alignItems: "center",
      justifyContent: "center",
      backgroundColor: "white",
      padding: 5,
      borderWidth: 1,
      borderColor: "gray",
   },
   thickerBorder: {
      borderLeftWidth: 2,
      borderTopWidth: 2,
   },
   cellText: {
      fontSize: 20,
      fontFamily: "sans-serif-medium",
   },
   submitButton: {
      backgroundColor: "blue",
      padding: 10,
      borderRadius: 5,
      marginTop: 20,
   },
   submitButtonText: {
      color: "white",
      fontSize: 20,
   },
   resetButton: {
      backgroundColor: "red",
      padding: 10,
      borderRadius: 5,
      marginTop: 20,
   },
   resetButtonText: {
      color: "white",
      fontSize: 20,
   },
   messageContainer: {
      width: "100%",
      height: 50,
      alignItems: "center",
      justifyContent: "center",
      marginTop: 20,
   },
   messageText: {
      fontSize: 20,
      color: "red",
   },
   thickerBorder: {
      borderWidth: 2,
   },
});

export default Sudoku;
