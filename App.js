import React, { useState } from "react";
import {
   View,
   Text,
   StyleSheet,
   TouchableOpacity,
   TextInput,
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
                  setInputValue(text);
                  onPress(text);
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
                     onPress={(text) =>
                        onCellPress(rowIndex, cellIndex, parseInt(text))
                     }
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
         { value: 0, isEditable: true },
         { value: 6, isEditable: false },
         { value: 0, isEditable: true },
         { value: 0, isEditable: true },
         { value: 0, isEditable: true },
         { value: 3, isEditable: false },
      ],
      [
         { value: 4, isEditable: false },
         { value: 0, isEditable: true },
         { value: 0, isEditable: true },
         { value: 8, isEditable: false },
         { value: 0, isEditable: true },
         { value: 3, isEditable: false },
         { value: 0, isEditable: true },
         { value: 0, isEditable: true },
         { value: 1, isEditable: false },
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

const styles = StyleSheet.create({
   grid: {
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center",
   },
   row: {
      flexDirection: "row",
   },
   cell: {
      width: 50,
      height: 50,
      borderWidth: 1,
      borderColor: "#000",
      justifyContent: "center",
      alignItems: "center",
   },
   cell: {
      backgroundColor: "#fff",
   },
   cellText: {
      textAlign: "center",
      fontSize: 20,
   },
});

export default function App() {
   const [grid, setGrid] = useState(generateFullGrid());

   const onCellPress = (rowIndex, cellIndex, value) => {
      const newGrid = [...grid];
      newGrid[rowIndex][cellIndex].value = value;
      setGrid(newGrid);
   };

   return (
      <View style={{ flex: 1, padding: 20 }}>
         <Grid grid={grid} onCellPress={onCellPress} />
      </View>
   );
}
