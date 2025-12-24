import React, { useState } from 'react';
import { Text, TextInput, TouchableOpacity, View } from 'react-native';
import Operators from '../../components/Operators';
import Style from '../../components/StylesCalc';

const Calculator = () => {
    const [input, setInput] = useState('');
    const [result, setResult] = useState('');
    const [buffer, setBuffer] = useState('');
    const [operator, setOperator] = useState('');

    const HandleEquation = (operator) => {
        handleButtonPress(buffer + operator);
    }
const handleButtonPress = (value) => {
        if (value === '=') {
            try {
                // Безопасная оценка выражения
                const evalResult = evaluateExpression(input);
                setResult(evalResult.toString());
                setInput(evalResult.toString());
            } catch (error) {
                setResult('Ошибка');
            }
        } else if (value === 'C') {
            setInput('');
            setResult('');
        } else if (value === '⌫') {
            setInput(input.slice(0, -1));
        } else {
            // Проверяем, не пытаемся ли добавить две операции подряд
            const lastChar = input[input.length - 1];
            if (['+', '-', '*', '/'].includes(value) && ['+', '-', '*', '/'].includes(lastChar)) {
                // Заменяем последнюю операцию на новую
                setInput(input.slice(0, -1) + value);
            } else {
                setInput(input + value);
            }
        }
    }

    // Безопасная функция для вычисления математических выражений
    const evaluateExpression = (expr) => {
        // Удаляем все, кроме чисел и операторов
        const cleanExpr = expr.replace(/[^\d+\-*/().]/g, '');
        
        // Проверяем деление на ноль
        if (cleanExpr.includes('/0')) {
            throw new Error('Деление на ноль');
        }
        
        try {
            // Используем Function для безопасного вычисления
            return new Function('return ' + cleanExpr)();
        } catch {
            throw new Error('Некорректное выражение');
        }
    };

    return (
        <View style={{ color: 'white', display: 'flex', flexDirection: 'column' }}>
            <Text style={{ fontSize: 40, alignSelf: 'center', color: 'white' }}>калькулятор</Text>
            
            <TextInput 
                style={{ 
                    borderColor: 'white', 
                    borderWidth: 1, 
                    color: 'white', 
                    fontSize: 40,
                    padding: 10,
                    textAlign: 'right',
                    marginBottom: 10
                }}
                value={input}
                editable={false}
                placeholder="0"
            />
            
            
            {result !== '' && (
                <Text style={{
                    color: 'white', 
                    fontSize: 30,
                    textAlign: 'right',
                    marginBottom: 10,
                    minHeight: 40
                }}>
                    = {result}
                </Text>
            )}

            <View style={Style.Lowerpart}>
                <View style={Style.LowerpartNumbers}>
                    {/* Цифры 1-9 */}
                    {[1, 2, 3, 4, 5, 6, 7, 8, 9].map(num => (
                        <TouchableOpacity 
                            key={num}
                            style={Style.LowerpartNumbersBtn}
                            onPress={() => handleButtonPress(num.toString())}
                        >
                            <Text style={Style.buttonText}>{num}</Text>
                        </TouchableOpacity>
                    ))}
                    
                    <View style={{ flexDirection: 'row', width: '100%' }}>
                        <TouchableOpacity 
                            style={Style.LowerpartNumbersBtnZero}
                            onPress={() => handleButtonPress('0')}
                        >
                            <Text style={Style.buttonText}>0</Text>
                        </TouchableOpacity>
                        
                                            {/* Десятичная точка */}
                    <TouchableOpacity 
                        style={[Style.LowerpartNumbersBtnZero]}
                        onPress={() => handleButtonPress('.')}
                    >
                        <Text style={[Style.buttonText]}>.</Text>
                    </TouchableOpacity>

                        <TouchableOpacity
                            style={[Style.LowerpartNumbersBtnZero, { backgroundColor: '#FFD700' }]}
                            onPress={() => handleButtonPress('=')}
                        >
                            <Text style={[Style.buttonText, { color: 'black' }]}>=</Text>
                        </TouchableOpacity>

                    </View>
                </View>

                <View style={Style.LowerpartActions}>
                    <view style={Style.LowerpartActions}>
                    {['+', '-', '*', '/'].map(op => (
                        <Operators
                        input={op}
                        back={() => HandleEquation(op)}
                        />
                    ))}
                    
                    {/* Кнопка очистки */}
                    <TouchableOpacity
                        style={[Style.LowerpartNumbersBtn, { backgroundColor: 'red' }]}
                        onPress={() => handleButtonPress('C')}
                    >
                        <Text style={Style.buttonText}>C</Text>
                    </TouchableOpacity>
                    
                    {/* Кнопка удаления */}
                    <TouchableOpacity 
                        style={[Style.LowerpartNumbersBtn, { backgroundColor: '#666' }]}
                        onPress={() => handleButtonPress('⌫')}
                    >
                        <Text style={[Style.buttonText,{color:'red'}]}> bckspc</Text>
                    </TouchableOpacity>
                    </view>
                </View>
            </View>
        </View>
    );
}


export default Calculator;
