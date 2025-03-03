import { Svg, Path } from "react-native-svg";
import React from 'react'

const ChurchIcon = (props) => {
  return (
<Svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 4 20 10"
    {...props}
  >
    <Path
      fill="#FE7940"
      d="M0 12.713v5.73h4.534v-8.421L0 12.713Zm1.806 3.195v-2.031h1.077v2.031H1.806ZM18.503 12.713l-4.538-2.691v8.422h4.538v-5.73Zm-1.694 3.195h-1.077v-2.031h1.077v2.03Z"
    />
    <Path
      fill="#FE7940"
      d="M5.583 18.444h2.051v-3.708c0-.89.725-1.616 1.616-1.616.89 0 1.616.725 1.616 1.616v3.708h2.051V7.912l2.992 1.885.574-.912L9.76 4.65V2.24h1.176V1.162H9.759V0H8.682v1.162H7.565v1.077h1.117v2.448L2.017 8.886l.574.91 2.992-1.884v10.532ZM8.71 8.237H9.79v2.154H8.71V8.237Z"
    />
    <Path
      fill="#FE7940"
      d="M9.788 14.736a.54.54 0 0 0-1.077 0v3.708h1.077v-3.708Z"
    />
  </Svg>
  )
}

export default ChurchIcon