import * as React from 'react';
import Svg, {SvgProps, Path} from 'react-native-svg';

const Plus = (props: SvgProps) => (
  <Svg width={24} height={24} fill="none" viewBox="0 0 24 24" {...props}>
    <Path
      d="M20.485 12H3.515M12 3.515v16.97"
      stroke="#fff"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);

export default Plus;
