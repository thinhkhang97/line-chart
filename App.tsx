import React, {useMemo} from 'react';
import {Dimensions, SafeAreaView, StyleSheet, View} from 'react-native';
import Svg, {G, Line, Rect, Text} from 'react-native-svg';
import {mockData1, mockData2} from './data';

const SCREEN_WIDTH = Dimensions.get('window').width;
const PADDING_HORIZONTAL = 24;
const CHART_WIDTH = SCREEN_WIDTH - PADDING_HORIZONTAL * 2;
const CHART_HEIGHT = (CHART_WIDTH * 200) / 250;
const TIME_AREA_HEIGHT = 48;
const CHART_AREA_HEIGHT = CHART_HEIGHT - TIME_AREA_HEIGHT;
const Y_AXIS_WIDTH = 40;
const CHART_AREA_WIDHT = CHART_WIDTH - Y_AXIS_WIDTH;
const NUMBER_OF_FRAME = 5;

const percentData1 = mockData1.map(value => value / mockData1[0] - 1);
const percentData2 = mockData2.map(value => value / mockData2[0] - 1);

const colors = {
  mono40: '#1A1A1A66',
  gray4: '#ECECEC',
};

const App: React.FC = () => {
  const maxPercent = Math.max(
    Math.max(...percentData1),
    Math.max(...percentData2),
  );

  const minPercent = Math.min(
    Math.min(...percentData1),
    Math.min(...percentData2),
  );

  const dValue = (maxPercent - minPercent) / (NUMBER_OF_FRAME - 1);
  const dY = CHART_AREA_HEIGHT / NUMBER_OF_FRAME;
  const frameLinePercents = Array.from({length: NUMBER_OF_FRAME}).map(
    (_, index) => minPercent + dValue * index,
  );

  return (
    <SafeAreaView style={styles.safeView}>
      <View style={styles.container}>
        <Svg width={CHART_WIDTH} height={CHART_HEIGHT}>
          {frameLinePercents.map((value, index) => (
            <G key={`line_index_${index}`}>
              <Text
                textAnchor="end"
                fontSize={12}
                fill={colors.mono40}
                x={Y_AXIS_WIDTH - 8}
                y={CHART_AREA_HEIGHT - dY * index}>
                {`${(value * 100).toFixed(0)}%`}
              </Text>
              <Line
                x1={Y_AXIS_WIDTH}
                x2={CHART_WIDTH}
                y1={CHART_AREA_HEIGHT - dY * index}
                y2={CHART_AREA_HEIGHT - dY * index}
                stroke={colors.gray4}
              />
            </G>
          ))}
          <Rect
            x={0}
            y={CHART_HEIGHT - TIME_AREA_HEIGHT}
            width={CHART_WIDTH}
            height={TIME_AREA_HEIGHT}
          />
        </Svg>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeView: {
    flex: 1,
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: PADDING_HORIZONTAL,
  },
});

export default App;
