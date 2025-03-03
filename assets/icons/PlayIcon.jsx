import * as React from "react"
import Svg, { Path } from "react-native-svg"
const PlayIcon = (props) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={22}
    height={24}
    fill="none"
    {...props}
  >
    <Path
      fill="#F2DAD7"
      d="M5.82 23.135A5.828 5.828 0 0 1 0 17.315V5.82C0 2.613 2.61 0 5.82 0 6.835 0 7.837.27 8.724.783l9.956 5.746a5.756 5.756 0 0 1 2.91 5.038 5.76 5.76 0 0 1-2.907 5.038l-9.956 5.747a5.847 5.847 0 0 1-2.905.783Z"
    />
    <Path
      fill="#FE7940"
      d="M17.348 9.232 6.939 3.223c-1.8-1.038-4.046.259-4.046 2.336v12.02c0 2.077 2.25 3.374 4.046 2.336l10.409-6.009c1.797-1.041 1.797-3.636 0-4.674Z"
    />
  </Svg>
)
export default PlayIcon
