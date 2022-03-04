import * as React from 'react';
import Svg, {SvgProps, Path} from 'react-native-svg';

const AccessTime = (props: SvgProps) => (
  <Svg width={20} height={20} fill="none" {...props}>
    <Path
      d="M9.992 1.667c-4.6 0-8.325 3.733-8.325 8.333s3.725 8.333 8.325 8.333c4.608 0 8.341-3.733 8.341-8.333S14.6 1.667 9.992 1.667Zm.008 15A6.665 6.665 0 0 1 3.333 10 6.665 6.665 0 0 1 10 3.333 6.665 6.665 0 0 1 16.667 10 6.665 6.665 0 0 1 10 16.667ZM9.817 5.833h-.05c-.334 0-.6.267-.6.6v3.934c0 .291.15.566.408.716l3.458 2.075a.594.594 0 0 0 .899-.42.59.59 0 0 0-.29-.605l-3.225-1.916V6.433c0-.333-.267-.6-.6-.6Z"
      fill="#E2E8F0"
    />
  </Svg>
);

export default AccessTime;
