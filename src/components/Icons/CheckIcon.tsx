import {AiFillCheckCircle} from "react-icons/ai";

interface Props {
  className: string;
}
export default function CheckIcon({className}: Props) {
  return (
    <AiFillCheckCircle style={style} className={className} />
  )
}

const style= {
    cursor: "pointer",
    fontSize: "1.6rem"
}