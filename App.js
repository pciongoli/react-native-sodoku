import React, { useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";

const Cell = ({ value, onPress, isEditable }) => {
   return (
      <TouchableOpacity onPress={onPress} style={styles.cell}>
         <Text style={styles.cellText}>{isEditable ? value : ""}</Text>
      </TouchableOpacity>
   );
};

const Grid = ({ grid, onCellPress }) => {
   return (
      <View style={styles.grid}>
         {grid.map((row, rowIndex) => (
            <View key={rowIndex} style={styles.row}>
               {row.map((cell, cellIndex) => (
                  <Cell
                     key={cellIndex}
                     value={cell.value}
                     isEditable={cell.isEditable}
                     onPress={() => onCellPress(rowIndex, cellIndex)}
                  />
               ))}
            </View>
         ))}
      </View>
   );
};

const generateEmptyGrid = () => {
   const grid = [];
   for (let i = 0; i < 9; i++) {
      const row = [];
      for (let j = 0; j < 9; j++) {
         row.push({ value: "", isEditable: true });
      }
      grid.push(row);
   }
   return grid;
};

const Sudoku = () => {
   const [grid, setGrid] = useState(generateEmptyGrid());

   const onCellPress = (rowIndex, cellIndex) => {
      const updatedGrid = [...grid];
      updatedGrid[rowIndex][cellIndex].value = "1";
      setGrid(updatedGrid);
   };

   return (
      <View style={styles.container}>
         <Grid grid={grid} onCellPress={onCellPress} />
      </View>
   );
};

const styles = StyleSheet.create({
   container: {
      flex: 1,
      alignItems: "center",
      justifyContent: "center",
   },
   grid: {
      width: 300,
      height: 300,
   },
   row: {
      flexDirection: "row",
   },
   cell: {
      width: 30,
      height: 30,
      borderWidth: 1,
      alignItems: "center",
      justifyContent: "center",
   },
   cellText: {
      fontSize: 20,
   },
});

export default Sudoku;
