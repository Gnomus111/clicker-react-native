/*import React, { useState } from 'react';
import { View, PanResponder, StyleSheet, Dimensions } from 'react-native';
import Svg, { Path, G, Text as SvgText, Line, Circle } from 'react-native-svg';

const InteractiveGraph = ({ func, initialRange = [-10, 10] }) => {
  const [range, setRange] = useState(initialRange);
  const [offset, setOffset] = useState({ x: 0, y: 0 });
  const [scale, setScale] = useState(1);

  const width = Dimensions.get('window').width - 40;
  const height = 300;

  // Панорамирование и масштабирование
  const panResponder = PanResponder.create({
    onStartShouldSetPanResponder: () => true,
    onPanResponderMove: (evt, gestureState) => {
      setOffset(prev => ({
        x: prev.x + gestureState.dx / scale,
        y: prev.y - gestureState.dy / scale,
      }));
    },
  });

  const handleZoomIn = () => setScale(prev => Math.min(prev * 1.2, 5));
  const handleZoomOut = () => setScale(prev => Math.max(prev / 1.2, 0.2));

  // Генерация точек с учетом масштаба и смещения
  const generatePathData = () => {
    const [minX, maxX] = range;
    const scaledWidth = (maxX - minX) / scale;
    const centerX = (minX + maxX) / 2 + offset.x;
    const actualMinX = centerX - scaledWidth / 2;
    const actualMaxX = centerX + scaledWidth / 2;

    const points = [];
    const step = (actualMaxX - actualMinX) / 200;

    for (let x = actualMinX; x <= actualMaxX; x += step) {
      try {
        const y = evaluateFunction(func, x);
        if (isFinite(y)) {
          const screenX = ((x - actualMinX) / (actualMaxX - actualMinX)) * width;
          const screenY = height / 2 - (y * 20 * scale);
          points.push(`${screenX},${screenY}`);
        }
      } catch (e) {
        // Пропускаем точки с ошибками
      }
    }

    return points.join(' ');
  };

  return (
    <View style={styles.container}>
      <View {...panResponder.panHandlers} style={styles.graphContainer}>
        <Svg width={width} height={height}>
          // Сетка 
          <G>
            {Array.from({ length: 11 }).map((_, i) => (
              <Line
                key={`v-${i}`}
                x1={(width / 10) * i}
                y1="0"
                x2={(width / 10) * i}
                y2={height}
                stroke="#e0e0e0"
                strokeWidth="1"
              />
            ))}
            {Array.from({ length: 11 }).map((_, i) => (
              <Line
                key={`h-${i}`}
                x1="0"
                y1={(height / 10) * i}
                x2={width}
                y2={(height / 10) * i}
                stroke="#e0e0e0"
                strokeWidth="1"
              />
            ))}
          </G>

          Оси
          <Line
            x1="0"
            y1={height / 2}
            x2={width}
            y2={height / 2}
            stroke="#666"
            strokeWidth="2"
          />
          <Line
            x1={width / 2}
            y1="0"
            x2={width / 2}
            y2={height}
            stroke="#666"
            strokeWidth="2"
          />

          График
          <Path
            d={`M ${generatePathData()}`}
            fill="none"
            stroke="#FF6B6B"
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
          />

          Крестик для позиции
          <Circle cx={width / 2} cy={height / 2} r={4} fill="#2E86AB" />
        </Svg>
      </View>

      <View style={styles.controls}>
        <TouchableOpacity style={styles.controlButton} onPress={handleZoomIn}>
          <Text>+</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.controlButton} onPress={handleZoomOut}>
          <Text>-</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.controlButton} onPress={() => {
          setOffset({ x: 0, y: 0 });
          setScale(1);
        }}>
          <Text>⟲</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
  },
  graphContainer: {
    width: '100%',
    height: 300,
    backgroundColor: 'white',
    borderRadius: 8,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: '#ddd',
  },
  controls: {
    flexDirection: 'row',
    marginTop: 10,
    gap: 10,
  },
  controlButton: {
    backgroundColor: '#2E86AB',
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default function; */