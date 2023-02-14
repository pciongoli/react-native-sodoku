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

const Cell = ({ value, onPress, isEditable }) => {
   const [inputValue, setInputValue] = useState(value.toString());
   return (
      <View style={styles.cell}>
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

const Grid = ({ grid, onCellPress, validateInput }) => {
   return (
      <View style={styles.grid}>
         {grid.map((row, rowIndex) => (
            <View key={rowIndex} style={styles.row}>
               {row.map((cell, cellIndex) => (
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
                  />
               ))}
            </View>
         ))}
      </View>
   );
};

const generateFullGrid = () => {
   return [
      [
         { value: 5, isEditable: false },
         { value: 3, isEditable: false },
         { value: 0, isEditable: true },
         { value: 0, isEditable: true },
         { value: 7, isEditable: false },
         { value: 0, isEditable: true },
         { value: 0, isEditable: true },
         { value: 0, isEditable: true },
         { value: 0, isEditable: true },
      ],
      [
         { value: 6, isEditable: false },
         { value: 0, isEditable: true },
         { value: 0, isEditable: true },
         { value: 1, isEditable: false },
         { value: 9, isEditable: false },
         { value: 5, isEditable: false },
         { value: 0, isEditable: true },
         { value: 0, isEditable: true },
         { value: 0, isEditable: true },
      ],
      [
         { value: 0, isEditable: true },
         { value: 9, isEditable: false },
         { value: 8, isEditable: false },
         { value: 0, isEditable: true },
         { value: 0, isEditable: true },
         { value: 0, isEditable: true },
         { value: 0, isEditable: true },
         { value: 6, isEditable: false },
         { value: 0, isEditable: true },
      ],
      [
         { value: 8, iseditable: false },
         { value: 0, isEditable: true },
         { value: 0, isEditable: true },
         { value: 6, isEditable: false },
         { value: 0, isEditable: true },
         { value: 0, isEditable: true },
         { value: 0, isEditable: true },
         { value: 3, isEditable: false },
         { value: 0, isEditable: true },
      ],
      [
         { value: 4, isEditable: false },
         { value: 0, isEditable: true },
         { value: 0, isEditable: true },
         { value: 8, isEditable: false },
         { value: 0, isEditable: true },
         { value: 3, isEditable: false },
         { value: 0, isEditable: true },
         { value: 1, isEditable: false },
         { value: 0, isEditable: true },
      ],
      [
         { value: 7, isEditable: false },
         { value: 0, isEditable: true },
         { value: 0, isEditable: true },
         { value: 0, isEditable: true },
         { value: 2, isEditable: false },
         { value: 0, isEditable: true },
         { value: 0, isEditable: true },
         { value: 0, isEditable: true },
         { value: 6, isEditable: false },
      ],
      [
         { value: 0, isEditable: true },
         { value: 6, isEditable: false },
         { value: 0, isEditable: true },
         { value: 0, isEditable: true },
         { value: 0, isEditable: true },
         { value: 0, isEditable: true },
         { value: 2, isEditable: false },
         { value: 8, isEditable: false },
         { value: 0, isEditable: true },
      ],
      [
         { value: 0, isEditable: true },
         { value: 0, isEditable: true },
         { value: 0, isEditable: true },
         { value: 4, isEditable: false },
         { value: 1, isEditable: false },
         { value: 9, isEditable: false },
         { value: 0, isEditable: true },
         { value: 0, isEditable: true },
         { value: 5, isEditable: false },
      ],
      [
         { value: 0, isEditable: true },
         { value: 0, isEditable: true },
         { value: 0, isEditable: true },
         { value: 0, isEditable: true },
         { value: 8, isEditable: false },
         { value: 0, isEditable: true },
         { value: 0, isEditable: true },
         { value: 7, isEditable: false },
         { value: 9, isEditable: false },
      ],
   ];
};

const validateInput = (row, col, value) => {
   const grid = generateFullGrid();
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
   const [grid, setGrid] = useState(generateFullGrid());
   const [elapsedTime, setElapsedTime] = useState(0);
   const [isRunning, setIsRunning] = useState(true);
   const [intervalId, setIntervalId] = useState(null);
   const [showMessage, setShowMessage] = useState(false);

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
      const solutionGrid = [
         [5, 3, 4, 6, 7, 8, 9, 1, 2],
         [6, 7, 2, 1, 9, 5, 3, 4, 8],
         [1, 9, 8, 3, 4, 2, 5, 6, 7],
         [8, 5, 9, 7, 6, 1, 4, 2, 3],
         [4, 2, 6, 8, 5, 3, 7, 9, 1],
         [7, 1, 3, 9, 2, 4, 8, 5, 6],
         [9, 6, 1, 5, 3, 7, 2, 8, 4],
         [2, 8, 7, 4, 1, 9, 6, 3, 5],
         [3, 4, 5, 2, 8, 6, 1, 7, 9],
      ];
      for (let i = 0; i < 9; i++) {
         for (let j = 0; j < 9; j++) {
            if (grid[i][j].value !== solutionGrid[i][j]) {
               setShowMessage(true);
               return;
            }
         }
      }
      setIsRunning(false);
      setElapsedTime(0);
   };

   const handleReset = () => {
      clearInterval(intervalId);
      setGrid(generateFullGrid());
      setElapsedTime(0);
      setIsRunning(false);
      setShowMessage(false);
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
               validateInput={validateInput}
               onCellPress={(row, col, value) => {
                  const newGrid = [...grid];
                  newGrid[row][col].value = value;
                  setGrid(newGrid);
               }}
            />
            <View style={styles.buttonContainer}>
               <Button title="Submit" onPress={handleSubmit} />
               <Button title="Reset" onPress={handleReset} />
            </View>
            {showMessage && (
               <View style={styles.messageContainer}>
                  <Text style={styles.messageText}>
                     Incorrect. Please try again!
                  </Text>
               </View>
            )}
         </View>
      </TouchableWithoutFeedback>
   );
};

const styles = StyleSheet.create({
   container: {
      flex: 1,
      backgroundColor: "white",
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
      borderWidth: 1,
      width: 30,
      height: 30,
      alignItems: "center",
      justifyContent: "center",
   },
   cellText: {
      fontSize: 16,
   },
   submitButton: {
      backgroundColor: "blue",
      padding: 10,
      marginTop: 10,
      alignSelf: "center",
   },
   submitButtonText: {
      color: "white",
      fontWeight: "bold",
   },
   messageContainer: {
      position: "absolute",
      width: 100,
      height: 50,
      alignItems: "center",
      justifyContent: "center",
      marginTop: 20,
      alignItems: "center",
      justifyContent: "center",
      backgroundColor: "blue",
   },
   messageText: {
      color: "white",
      fontSize: 16,
   },
   thickerBorder: {
      borderWidth: 2,
   },
});

export default Sudoku;
