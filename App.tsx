import React from 'react';
import {Dimensions, SafeAreaView, StyleSheet, View} from 'react-native';
import Svg, {Rect} from 'react-native-svg';

const SCREEN_WIDTH = Dimensions.get('window').width;
const PADDING_HORIZONTAL = 24;
const CHART_WIDTH = SCREEN_WIDTH - PADDING_HORIZONTAL * 2;
const CHART_HEIGHT = (CHART_WIDTH * 200) / 250;
const TIME_AREA_HEIGHT = 48;
const CHART_AREA_HEIGHT = CHART_HEIGHT - TIME_AREA_HEIGHT;
const Y_AXIS_WIDTH = 40;
const CHART_AREA_WIDHT = CHART_WIDTH - Y_AXIS_WIDTH;
const NUMBER_OF_FRAME = 5;

const App: React.FC = () => {
  return (
    <SafeAreaView style={styles.safeView}>
      <View style={styles.container}>
        <Svg width={CHART_WIDTH} height={CHART_HEIGHT}>
          <Rect
            x={0}
            y={0}
            width={Y_AXIS_WIDTH}
            height={CHART_HEIGHT - TIME_AREA_HEIGHT}
            fill="blue"
          />
          <Rect
            x={Y_AXIS_WIDTH}
            y={0}
            width={CHART_AREA_WIDHT}
            height={CHART_AREA_HEIGHT}
            fill="red"
          />
          <Rect
            x={0}
            y={CHART_HEIGHT - TIME_AREA_HEIGHT}
            width={CHART_WIDTH}
            height={TIME_AREA_HEIGHT}
            fill="green"
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
