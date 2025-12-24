import React, { useState } from 'react';
import { Text, TextInput, TouchableOpacity, View } from 'react-native';

const Incryptor = () => {
    const [encryptText, setEncryptText] = useState('');
    const [decryptText, setDecryptText] = useState('');
    const [result, setResult] = useState('');
    let letters = ['й', 'ц', 'у', 'к', 'е', 'н', 'г', 'ш', 'щ', 'з', 'х', 'ъ', 'ф', 'ы', 'в', 'а', 'п', 'р', 'о', 'л', 'д', 'ж', 'э', 'я', 'ч', 'с', 'м', 'и', 'т', 'ь', 'б', 'ю', 'ё', ',', '.', ' ', '!', '?'];
    let shifrs = ['11 ', '12 ', '13 ', '14 ', '15 ', '16 ', '17 ', '18 ', '19 ', '21 ', '22 ', '23 ', '24 ', '25 ', '26 ', '27 ', '28 ', '29 ', '31 ', '32 ', '33 ', '34 ', '35 ', '36 ', '37 ', '38 ', '39 ', '41 ', '42 ', '43 ', '44 ', '45 ', '46 ', '47 ', '48 ', '49 ', '51 ', '52 '];


    // Функция для шифрования
    const handleEncrypt = () => {
        let encryptResult = '';
        for(let i = 0; i < encryptText.length; i++){
            const char = encryptText[i].toLowerCase();
            const index = letters.indexOf(char);
            encryptResult += shifrs[index];

        setResult(encryptResult);
        }
    };

    // Функция для расшифровки 36 49 19 27 38 49 28 32 27 14 27 42 43 49 13 11 33 13 
    const handleDecrypt = () => {
                let decryptResult = '';
        for(let i = 0; i < decryptText.length; i+=3){
            const code = decryptText.substring(i,i+3);
            const index = shifrs.indexOf(code);
            decryptResult += letters[index];

        setResult(decryptResult);
        }
    };

    return (
        <View>
            {/* Поле для шифрования */}
            <TextInput
                style={{
                    borderColor: 'white',
                    borderWidth: 1,
                    color: 'white',
                    fontSize: 40,
                    padding: 10,
                    marginBottom: 10
                }}
                placeholder='текст для шифровки'
                placeholderTextColor="gray"
                value={encryptText}
                onChangeText={setEncryptText} // Сохраняем текст в состояние
            />
            
            {/* Кнопка шифрования */}
            <TouchableOpacity 
                style={{
                    borderColor: 'white',
                    borderWidth: 1,
                    color: 'white',
                    fontSize: 40,
                    padding: 10,
                    marginBottom: 10,
                    width: 205,
                    alignItems: 'center',
                    justifyContent: 'center'
                }}
                onPress={handleEncrypt} // Вызываем функцию шифрования
            >
                <Text style={{color: 'white'}}>шифровать</Text>
            </TouchableOpacity>

            {/* Поле для расшифровки */}
            <TextInput
                style={{
                    borderColor: 'white',
                    borderWidth: 1,
                    color: 'white',
                    fontSize: 40,
                    padding: 10,
                    marginBottom: 10
                }}
                placeholder='текст для расшифровки'
                placeholderTextColor="gray"
                value={decryptText}
                onChangeText={setDecryptText} // Сохраняем текст в состояние
            />
            
            {/* Кнопка расшифровки */}
            <TouchableOpacity 
                style={{
                    borderColor: 'white',
                    borderWidth: 1,
                    color: 'white',
                    fontSize: 40,
                    padding: 10,
                    marginBottom: 10,
                    width: 260,
                    alignItems: 'center',
                    justifyContent: 'center'
                }}
                onPress={handleDecrypt} // Вызываем функцию расшифровки
            >
                <Text style={{color: 'white'}}>расшифровать</Text>
            </TouchableOpacity>

            {/* Поле результата */}
            <TextInput
                style={{
                    borderColor: 'white',
                    borderWidth: 1,
                    color: 'white',
                    fontSize: 40,
                    padding: 10,
                    marginBottom: 10
                }}
                placeholder='результат'
                placeholderTextColor="gray"
                value={result}
                editable={false} // Делаем поле только для чтения
            />
        </View>
    );
};

export default Incryptor;