import React from 'react';
import {StyleSheet, TextInput } from 'react-native';


const Calculator = () => {
    return (
        <div style={{ color: 'white', display: 'flex', flexDirection: 'column' }}>
            <span style={{ fontSize: 40, alignSelf: 'center' }}>калькулятор</span>
            <TextInput style={{ borderColor: 'yellow', borderWidth: 1, color: 'yellow', fontSize: 50 }}></TextInput>
            <div style={styles.lowerpart}>

                <div style={styles.lowerpart-numbers}>
                    <button>1</button>
                    <button>2</button>
                    <button>3</button>
                    <button>4</button>
                    <button>5</button>
                    <button>6</button>
                    <button>7</button>
                    <button>8</button>
                    <button>9</button>
                    <div className='lowerpart-numbers-zero'>
                        <button>0</button>
                    </div>
                </div>




                <div className='lowerpart-actions'>

                </div>

            </div>
        </div>

    );
}

const styles = StyleSheet.create({
    lowerpart: {
        backgroundColor : 'white',
        width: 1000,
        height: 1000
    },
    

})
export default Calculator;

/*

*/