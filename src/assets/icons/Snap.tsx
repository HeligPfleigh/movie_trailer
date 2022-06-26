import * as React from 'react';
import Svg, {SvgProps, Circle} from 'react-native-svg';

const SnapIcon = (props: SvgProps) => (
  <Svg width={73} height={73} fill="none" {...props}>
    <Circle cx={36.5} cy={36.5} r={36.5} fill="#525252" />
    <Circle cx={36.5} cy={36.5} r={28.5} fill="#fff" />
    <Circle
      cx={36.5}
      cy={36.5}
      r={25.296}
      fill="#fff"
      stroke="#5B5B5B"
      strokeWidth={2}
    />
  </Svg>
);

export default SnapIcon;
