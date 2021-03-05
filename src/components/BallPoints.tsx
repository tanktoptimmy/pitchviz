import {Pos} from "../types";

const createBalls = (plays: Pos[]) => {
  return plays.map((play, index) => {
      // if(index > 0) return;
      const opacity = (plays.length - index) * 0.2;
      if (1.21 - opacity <= 0) return null;
      return (
          <circle
              key={play.uuid}
              cx={play.x}
              cy={play.y}
              r="3"
              fill="#fff"
              opacity={1.21 - opacity}
          />
      );
  });
}
const BallPoints: React.FC<Props> = ({plays}) => (
  <svg width="100%" height="100%">
      {plays.length > 0 && createBalls(plays)}
  </svg>
);

type Props = {
  plays: Pos[]
}

export default BallPoints;
