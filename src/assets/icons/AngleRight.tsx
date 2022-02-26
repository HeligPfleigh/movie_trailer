import * as React from 'react';
import Svg, {SvgProps, Path} from 'react-native-svg';

const AngleRight = (props: SvgProps) => (
  <Svg width={16} height={16} fill="none" {...props}>
    <Path
      d="M10.36 8.473 6.587 12.24a.666.666 0 0 1-1.14-.47c0-.176.069-.345.193-.47l3.3-3.333-3.3-3.3a.667.667 0 0 1 .217-1.088.667.667 0 0 1 .513 0 .667.667 0 0 1 .217.148l3.773 3.766a.666.666 0 0 1 0 .98Z"
      fill="#E884E4"
    />
  </Svg>
);

export default AngleRight;
