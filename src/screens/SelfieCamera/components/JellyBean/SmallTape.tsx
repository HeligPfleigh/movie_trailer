import * as React from 'react';
import Svg, {SvgProps, Path} from 'react-native-svg';

const SmallTape = (props: SvgProps) => (
  <Svg width={41} height={50} fill="none" {...props}>
    <Path
      opacity={0.7}
      d="m40.743 7.192-9.885 42.692-30.22-6.957L10.524.236l30.22 6.956Z"
      fill="#CFA86C"
    />
  </Svg>
);

export default SmallTape;
