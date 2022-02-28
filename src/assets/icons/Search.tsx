import * as React from 'react';
import Svg, {SvgProps, Path} from 'react-native-svg';

const Search = ({fill, ...props}: SvgProps) => (
  <Svg width={20} height={20} {...props}>
    <Path
      d="M18.092 16.908 15 13.842A7.5 7.5 0 1 0 13.842 15l3.066 3.067a.832.832 0 0 0 1.184 0 .833.833 0 0 0 0-1.159ZM9.167 15a5.833 5.833 0 1 1 0-11.666 5.833 5.833 0 0 1 0 11.666Z"
      fill={fill}
    />
  </Svg>
);

export default Search;
