import React, { useEffect, useState } from 'react';
import {
    Alert,
    Dimensions,
    StyleSheet,
    Text,
    TouchableOpacity,
    View
} from 'react-native';

const BOARD_SIZE = 8;
const { width } = Dimensions.get('window');
const CELL_SIZE = width * 0.9 / BOARD_SIZE;

const CheckersGame = () => {
    const [board, setBoard] = useState([]);
    const [selectedPiece, setSelectedPiece] = useState(null);
    const [currentPlayer, setCurrentPlayer] = useState('white');
    const [validMoves, setValidMoves] = useState([]);

    useEffect(() => {
        initializeGame();
    }, []);

    const initializeGame = () => {
        const newBoard = Array(BOARD_SIZE).fill().map((_, row) =>
            Array(BOARD_SIZE).fill().map((_, col) => {
                const isDark = (row + col) % 2 === 1;
                let piece = null;

                // Расставляем шашки только на темных клетках
                if (isDark) {
                    if (row < 3) {
                        piece = { type: 'black', isKing: false };
                    } else if (row > 4) {
                        piece = { type: 'white', isKing: false };
                    }
                }

                return {
                    row,
                    col,
                    piece,
                    isDark,
                    isEmpty: !piece
                };
            })
        );
        setBoard(newBoard);
        setSelectedPiece(null);
        setValidMoves([]);
        setCurrentPlayer('white');
    };

    const getValidMoves = (row, col) => {
        const moves = [];
        const cell = board[row]?.[col]; // Защита от undefined

        if (!cell || !cell.piece) {
            return moves;
        }

        const piece = cell.piece;
        const directions = piece.isKing
            ? [[-1, -1], [-1, 1], [1, -1], [1, 1]]
            : piece.type === 'white'
                ? [[-1, -1], [-1, 1]] // Белые ходят вверх
                : [[1, -1], [1, 1]];  // Черные ходят вниз

        directions.forEach(([dr, dc]) => {
            const newRow = row + dr;
            const newCol = col + dc;

            if (isValidPosition(newRow, newCol)) {
                const targetCell = board[newRow][newCol];

                if (targetCell.isEmpty) {
                    // Обычный ход
                    moves.push({
                        row: newRow,
                        col: newCol,
                        isCapture: false,
                        fromRow: row,
                        fromCol: col
                    });
                } else if (targetCell.piece && targetCell.piece.type !== piece.type) {
                    // Проверка возможности взятия
                    const jumpRow = newRow + dr;
                    const jumpCol = newCol + dc;

                    if (isValidPosition(jumpRow, jumpCol)) {
                        const jumpCell = board[jumpRow][jumpCol];
                        if (jumpCell.isEmpty) {
                            moves.push({
                                row: jumpRow,
                                col: jumpCol,
                                isCapture: true,
                                capturedRow: newRow,
                                capturedCol: newCol,
                                fromRow: row,
                                fromCol: col
                            });
                        }
                    }
                }
            }
        });

        return moves;
    };

    const isValidPosition = (row, col) => {
        return row >= 0 && row < BOARD_SIZE && col >= 0 && col < BOARD_SIZE;
    };

    const handleCellPress = (row, col) => {
        try {
            const cell = board[row]?.[col];

            if (!cell) return;

            if (selectedPiece) {
                // Пытаемся сделать ход
                const move = validMoves.find(m => m.row === row && m.col === col);
                if (move) {
                    makeMove(move);
                }
                setSelectedPiece(null);
                setValidMoves([]);
            } else if (cell.piece && cell.piece.type === currentPlayer) {
                // Выбираем шашку
                setSelectedPiece(cell);
                const moves = getValidMoves(row, col);
                setValidMoves(moves);

                if (moves.length === 0) {
                    Alert.alert('Нет ходов', 'У этой шашки нет возможных ходов');
                }
            }
        } catch (error) {
            console.error('Error in handleCellPress:', error);
            Alert.alert('Ошибка', 'Произошла ошибка при обработке хода');
        }
    };

    const makeMove = (move) => {
        try {
            const newBoard = board.map(row => [...row]);
            const { fromRow, fromCol, row: toRow, col: toCol, isCapture } = move;

            const piece = { ...newBoard[fromRow][fromCol].piece };

            // Превращение в дамку
            if ((piece.type === 'white' && toRow === 0) ||
                (piece.type === 'black' && toRow === BOARD_SIZE - 1)) {
                piece.isKing = true;
            }

            // Перемещение шашки
            newBoard[toRow][toCol].piece = piece;
            newBoard[fromRow][fromCol].piece = null;
            newBoard[toRow][toCol].isEmpty = false;
            newBoard[fromRow][fromCol].isEmpty = true;

            // Взятие шашки
            if (isCapture) {
                newBoard[move.capturedRow][move.capturedCol].piece = null;
                newBoard[move.capturedRow][move.capturedCol].isEmpty = true;

                // Проверяем возможность дальнейшего взятия (правило множественного взятия)
                const additionalCaptures = getValidMoves(toRow, toCol)
                    .filter(m => m.isCapture);

                if (additionalCaptures.length > 0) {
                    // Оставляем ту же шашку выбранной для продолжения взятия
                    setSelectedPiece(newBoard[toRow][toCol]);
                    setValidMoves(additionalCaptures);
                    setBoard(newBoard);
                    return; // Не меняем игрока
                }
            }

            setBoard(newBoard);
            setCurrentPlayer(currentPlayer === 'white' ? 'black' : 'white');
            setSelectedPiece(null);
            setValidMoves([]);

            // Проверка на победу
            checkGameStatus(newBoard);

        } catch (error) {
            console.error('Error in makeMove:', error);
            Alert.alert('Ошибка', 'Не удалось сделать ход');
        }
    };

    const checkGameStatus = (currentBoard) => {
        let whiteCount = 0;
        let blackCount = 0;

        currentBoard.forEach(row => {
            row.forEach(cell => {
                if (cell.piece) {
                    if (cell.piece.type === 'white') whiteCount++;
                    else blackCount++;
                }
            });
        });

        if (whiteCount === 0) {
            Alert.alert('Игра окончена!', 'Победили черные!');
        } else if (blackCount === 0) {
            Alert.alert('Игра окончена!', 'Победили белые!');
        }
    };

    const renderBoard = () => {
        if (!board || board.length === 0) {
            return <Text>Загрузка доски...</Text>;
        }

        return board.map((row, rowIndex) => (
            <View key={rowIndex} style={styles.row}>
                {row.map((cell, colIndex) => {
                    if (!cell) return null;

                    const isSelected = selectedPiece &&
                        selectedPiece.row === rowIndex &&
                        selectedPiece.col === colIndex;
                    const isValidMove = validMoves.some(m =>
                        m.row === rowIndex && m.col === colIndex
                    );

                    // Проверяем, является ли клетка игровой (темной)
                    const isPlayable = cell.isDark;

                    return (
                        <TouchableOpacity
                            key={`${rowIndex}-${colIndex}`}
                            style={[
                                styles.cell,
                                {
                                    backgroundColor: isValidMove
                                        ? '#FFD700' // Золотой для возможных ходов
                                        : isSelected
                                            ? '#ADD8E6' // Голубой для выбранной
                                            : isPlayable
                                                ? '#769656' // Темная клетка
                                                : '#eeeed2', // Светлая клетка
                                    width: CELL_SIZE,
                                    height: CELL_SIZE
                                },
                                !isPlayable && styles.lightCell
                            ]}
                            onPress={() => handleCellPress(rowIndex, colIndex)}
                            disabled={!isPlayable && !cell.piece && !isValidMove}
                        >
                            {cell.piece && (
                                <View style={[
                                    styles.piece,
                                    {
                                        backgroundColor: cell.piece.type === 'black' ? '#2C2C2C' : '#FFFFFF',
                                        borderColor: cell.piece.type === 'black' ? '#fff' : '#000'
                                    }
                                ]}>
                                    {cell.piece.isKing && (
                                        <View style={styles.crown}>
                                            <Text style={styles.crownText}>♔</Text>
                                        </View>
                                    )}
                                </View>
                            )}
                        </TouchableOpacity>
                    );
                })}
            </View>
        ));
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Шашки</Text>

            <View style={styles.gameInfo}>
                <Text style={[
                    styles.playerText,
                    currentPlayer === 'white' && styles.currentPlayer
                ]}>
                    Белые
                </Text>
                <Text style={styles.vsText}>vs</Text>
                <Text style={[
                    styles.playerText,
                    currentPlayer === 'black' && styles.currentPlayer
                ]}>
                    Черные
                </Text>
            </View>

            <Text style={styles.turnText}>
                Ходят: {currentPlayer === 'white' ? 'белые' : 'черные'}
            </Text>

            <View style={styles.boardContainer}>
                {renderBoard()}
            </View>

            <View style={styles.controls}>
                <TouchableOpacity
                    style={styles.button}
                    onPress={initializeGame}
                >
                    <Text style={styles.buttonText}>Новая игра</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    style={[styles.button, styles.secondaryButton]}
                    onPress={() => {
                        setSelectedPiece(null);
                        setValidMoves([]);
                    }}
                >
                    <Text style={styles.buttonText}>Отменить выбор</Text>
                </TouchableOpacity>
            </View>

            <View style={styles.instructions}>
                <Text style={styles.instructionsText}>
                    • Нажмите на шашку, чтобы выбрать её
                </Text>
                <Text style={styles.instructionsText}>
                    • Золотые клетки - возможные ходы
                </Text>
                <Text style={styles.instructionsText}>
                    • Голубые клетки - выбранная шашка
                </Text>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#f5f5f5',
        alignItems: 'center',
    },
    title: {
        fontSize: 32,
        fontWeight: 'bold',
        marginVertical: 10,
        color: '#333',
    },
    gameInfo: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 10,
    },
    playerText: {
        fontSize: 20,
        paddingHorizontal: 15,
        paddingVertical: 5,
        borderRadius: 20,
        backgroundColor: '#e0e0e0',
    },
    currentPlayer: {
        backgroundColor: '#4CAF50',
        color: 'white',
        fontWeight: 'bold',
    },
    vsText: {
        fontSize: 18,
        marginHorizontal: 10,
        color: '#666',
    },
    turnText: {
        fontSize: 18,
        marginBottom: 20,
        color: '#666',
    },
    boardContainer: {
        borderWidth: 3,
        borderColor: '#654321',
        borderRadius: 8,
        overflow: 'hidden',
        marginBottom: 20,
        backgroundColor: '#654321',
    },
    row: {
        flexDirection: 'row',
    },
    cell: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    lightCell: {
        // Дополнительные стили для светлых клеток
    },
    piece: {
        width: CELL_SIZE * 0.7,
        height: CELL_SIZE * 0.7,
        borderRadius: CELL_SIZE * 0.35,
        borderWidth: 2,
        justifyContent: 'center',
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.3,
        shadowRadius: 3,
        elevation: 5,
    },
    crown: {
        position: 'absolute',
        top: -8,
    },
    crownText: {
        fontSize: 24,
        color: 'gold',
        textShadowColor: '#000',
        textShadowOffset: { width: 1, height: 1 },
        textShadowRadius: 2,
    },
    controls: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',
        paddingHorizontal: 20,
        marginBottom: 20,
    },
    button: {
        backgroundColor: '#4CAF50',
        paddingHorizontal: 25,
        paddingVertical: 12,
        borderRadius: 10,
        minWidth: 140,
        alignItems: 'center',
    },
    secondaryButton: {
        backgroundColor: '#2196F3',
    },
    buttonText: {
        color: 'white',
        fontSize: 16,
        fontWeight: 'bold',
    },
    instructions: {
        backgroundColor: 'white',
        padding: 15,
        borderRadius: 10,
        width: '100%',
        marginTop: 10,
    },
    instructionsText: {
        fontSize: 14,
        color: '#666',
        marginBottom: 5,
    },
});

export default CheckersGame;