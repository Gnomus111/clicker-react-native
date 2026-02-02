import React from 'react';
import { StyleSheet} from 'react-native';

    const Style = StyleSheet.create({
    Lowerpart: {
        backgroundColor: '#222',
        width: 1200,
        height: 700,
        flexDirection: 'row',
        padding: 10,
        borderRadius: 10,
    },
    LowerpartNumbers: {
        width: 705,
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
    },
    LowerpartNumbersBtn: {
        width: 225,
        height: 145,
        backgroundColor: '#666',
        justifyContent: 'center',
        alignItems: 'center',
        margin: 3,
        borderRadius: 10,
    },
    LowerpartNumbersBtnZero: {
        width: 382,
        height: 145,
        backgroundColor: '#666',
        justifyContent: 'center',
        alignItems: 'center',
        margin: 3,
        borderRadius: 10,
    },
    LowerpartActions: {
        
        display: 'flex',
        flexWrap: 'wrap',
        width: 506,
        height:450,
    },
    buttonText: {
        color: 'white',
        fontSize: 40,
        fontWeight: 'bold',
    },
});


export default Style;