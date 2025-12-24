import React from 'react';
import { Text, TouchableOpacity } from 'react-native';
import Style from '../components/StylesCalc';
import input from '@/app/(tabs)/calculator';

type operationButton = {
    input: string;
    back: (value: string) => void
};


const Operators = (props: operationButton) => {
    const test = (t: string) => {
        props.back(t);
    }
    
    
    return (
        
        <TouchableOpacity
            key={props.input}
            style={[Style.LowerpartNumbersBtn, { backgroundColor: '#444' }]}
            onPress={() => test(props.input)}
        >
            <Text style={[Style.buttonText, { color: 'white' }]}>{props.input}</Text>
        </TouchableOpacity>

    );
};

export default Operators;
