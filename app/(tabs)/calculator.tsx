import React from 'react';
import { StyleSheet, TextInput } from 'react-native';


const Calculator = () => {
    return (
        <div style={{ color: 'white', display: 'flex', flexDirection: 'column' }}>
            <span style={{ fontSize: 40, alignSelf: 'center' }}>калькулятор</span>
            <TextInput style={{ borderColor: 'yellow', borderWidth: 1, color: 'yellow', fontSize: 50 }}></TextInput>
            <div style={styles.Lowerpart}>

                <div style={styles.LowerpartNumbers}>
                    <button style={styles.LowerpartNumbersBtn}>1</button>
                    <button style={styles.LowerpartNumbersBtn}>2</button>
                    <button style={styles.LowerpartNumbersBtn}>3</button>
                    <button style={styles.LowerpartNumbersBtn}>4</button>
                    <button style={styles.LowerpartNumbersBtn}>5</button>
                    <button style={styles.LowerpartNumbersBtn}>6</button>
                    <button style={styles.LowerpartNumbersBtn}>7</button>
                    <button style={styles.LowerpartNumbersBtn}>8</button>
                    <button style={styles.LowerpartNumbersBtn}>9</button>
                                    <div>
                    <button style={styles.LowerpartNumbersBtnZero}>0</button>
                    <button style={styles.LowerpartNumbersBtnZero}>=</button>
                </div>

                </div>



                <div style={styles.LowerpartActions}>
                    <button style={styles.LowerpartNumbersBtn}>+</button>
                    <button style={styles.LowerpartNumbersBtn}>-</button>
                    <button style={styles.LowerpartNumbersBtn}>*</button>
                    <button style={styles.LowerpartNumbersBtn}>/</button>
                </div>

            </div>
        </div>

    );
}

const styles = StyleSheet.create({
    Lowerpart: {
        backgroundColor: 'white',
        width: 933,
        height: 580,
        display: 'flex'
    },
    LowerpartNumbers: {
        width: 700,

        justifyContent: "space-around",
        flexWrap: 'wrap',
    },
    LowerpartNumbersBtn: {
        width: 230,
        height: 145,
        marginLeft: 3
    },
    LowerpartNumbersBtnZero: {
        width: 348,
        height: 145,
        marginLeft: 1.5
    },
    LowerpartActions: {
        width: 230,
        height: 1000,

    },



})
export default Calculator;
