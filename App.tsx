import React, {useMemo} from 'react';
import {Dimensions, SafeAreaView, StyleSheet, View} from 'react-native';
import Svg, {G, Line, Path, Rect, Text} from 'react-native-svg';
import {mockData1, mockData2} from './data';
import {scaleLinear} from 'd3-scale';
import * as shape from 'd3-shape';

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

  const closetWithZero = useMemo(
    () => getClosetZeroValue(frameLinePercents) || 0,
    [frameLinePercents],
  );

  const frameValuesToDraws = useMemo(
    () => frameLinePercents.map(value => value - closetWithZero),
    [closetWithZero, frameLinePercents],
  );

  const lineData1: [number, number][] = percentData1.map((item, index) => [
    index,
    item + closetWithZero,
  ]);

  const lineData2: [number, number][] = percentData2.map((item, index) => [
    index,
    item + closetWithZero,
  ]);

  return (
    <SafeAreaView style={styles.safeView}>
      <View style={styles.container}>
        <Svg width={CHART_WIDTH} height={CHART_HEIGHT}>
          {frameValuesToDraws.map((value, index) => (
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
          <CLine
            data={lineData1}
            minPercent={minPercent}
            maxPercent={maxPercent}
            stroke="red"
          />
          <CLine
            data={lineData2}
            minPercent={minPercent}
            maxPercent={maxPercent}
            stroke="blue"
          />
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

type LineProps = {
  data: [number, number][];
  minPercent: number;
  maxPercent: number;
  stroke?: string;
};

const CLine: React.FC<LineProps> = ({data, minPercent, maxPercent, stroke}) => {
  const path = useMemo(() => {
    if (data.length === 0) {
      return '';
    }
    const scaleX = scaleLinear(
      [0, data.length - 1],
      [Y_AXIS_WIDTH, CHART_WIDTH],
    );

    const scaleY = scaleLinear(
      [minPercent, maxPercent],
      [CHART_AREA_HEIGHT, (1 / NUMBER_OF_FRAME) * CHART_AREA_HEIGHT],
    );

    const lineShape = shape
      .line()
      .x(([x]) => scaleX(x))
      .y(([, y]) => scaleY(y));

    return lineShape(data);
  }, [data, maxPercent, minPercent]);

  if (!path) {
    return null;
  }

  return <Path d={path} stroke={stroke} strokeWidth={1} />;
};

export const getClosetZeroValue = (data: number[]) => {
  if (data.length === 0) {
    return 0;
  }
  const hasNegativeNumber = data.find(value => value < 0);
  return hasNegativeNumber ? Math.min(...data.filter(value => value >= 0)) : 0;
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
