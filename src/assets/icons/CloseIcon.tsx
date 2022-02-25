import React from 'react';
import Svg, {SvgProps, Path} from 'react-native-svg';

const CloseIcon = (props: SvgProps) => (
  <Svg width={24} height={24} fill="none" {...props}>
    <Path
      d="M6 17.314 17.314 6M6 6l11.314 11.314"
      stroke="#fff"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);

export default CloseIcon;
