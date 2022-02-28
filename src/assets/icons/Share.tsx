import * as React from 'react';
import Svg, {SvgProps, Path} from 'react-native-svg';

const Share = ({fill, ...props}: SvgProps) => (
  <Svg width={24} height={24} viewBox="0 0 24 24" fill="none" {...props}>
    <Path
      d="M17.5 22a3.461 3.461 0 0 1-3.383-4.352l-6.26-3.578a3.494 3.494 0 1 1 .576-4.47l5.683-3.249a3.494 3.494 0 0 1 .657-3.086 3.531 3.531 0 1 1 .369 4.805l-6.15 3.515c-.007.26-.043.517-.109.768l6.26 3.577A3.494 3.494 0 1 1 17.5 22Zm0-5a1.5 1.5 0 1 0 0 3 1.5 1.5 0 0 0 0-3Zm-12-7a1.5 1.5 0 1 0 0 3 1.5 1.5 0 0 0 0-3Zm12-6a1.5 1.5 0 1 0 0 3 1.5 1.5 0 0 0 0-3Z"
      fill={fill}
    />
  </Svg>
);

export default Share;
