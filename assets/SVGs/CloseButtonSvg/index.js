import * as React from "react";
import Svg, { Path } from "react-native-svg";

const CloseButtonSvg = (props) => {
  const { width, height } = props;
  return (
    <Svg
      width={width}
      height={height}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <Path
        d="m11.664 10 7.991-7.992A1.175 1.175 0 1 0 17.991.345L10 8.337 2.008.345A1.175 1.175 0 1 0 .345 2.008L8.337 10 .345 17.992a1.175 1.175 0 1 0 1.663 1.663L10 11.664l7.991 7.991a1.173 1.173 0 0 0 1.664 0c.46-.46.46-1.203 0-1.663L11.663 10Z"
        fill="black"
      />
    </Svg>
  );
};

export default CloseButtonSvg;
