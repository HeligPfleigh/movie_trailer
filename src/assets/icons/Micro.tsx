import * as React from 'react';
import Svg, {SvgProps, Path} from 'react-native-svg';

const Micro = ({fill, ...props}: SvgProps) => (
  <Svg width={20} height={20} fill="none" {...props}>
    <Path
      d="M10 12.5a3.334 3.334 0 0 0 3.333-3.333v-5a3.333 3.333 0 0 0-6.666 0v5A3.333 3.333 0 0 0 10 12.5ZM8.333 4.167a1.667 1.667 0 0 1 3.334 0v5a1.667 1.667 0 0 1-3.334 0v-5Zm8.334 5a.833.833 0 1 0-1.667 0 5 5 0 1 1-10 0 .833.833 0 0 0-1.667 0 6.667 6.667 0 0 0 5.834 6.608V17.5H7.5a.833.833 0 0 0 0 1.667h5a.833.833 0 1 0 0-1.667h-1.667v-1.725a6.667 6.667 0 0 0 5.834-6.608Z"
      fill={fill}
    />
  </Svg>
);

export default Micro;
