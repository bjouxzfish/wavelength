
import React from 'react';
import { 
  BOARD_CX, BOARD_CY, BOARD_RADIUS, DIAL_LENGTH, TARGET_SLICE_ANGLE_RAD, 
  MAX_SLOTS, SCORE_COLORS, LID_COLOR, DIAL_KNOB_COLOR, DIAL_LINE_COLOR, 
  BOARD_BG_COLOR, BOARD_OUTLINE_COLOR, DIAL_MIN_ANGLE, DIAL_MAX_ANGLE,
  MARK_COLOR, MARK_LENGTH, MARK_STROKE_WIDTH
} from '../constants';

interface GameBoardProps {
  targetPosition: number; // 0 to MAX_SLOTS - 1
  dialAngleDegrees: number; // -90 to +90
  lidOpen: boolean;
}

const polarToCartesian = (centerX: number, centerY: number, radius: number, angleInRadians: number) => {
  return {
    x: centerX + radius * Math.cos(angleInRadians),
    y: centerY + radius * Math.sin(angleInRadians), 
  };
};

const describePieSlice = (cx: number, cy: number, radius: number, startAngleRad: number, endAngleRad: number): string => {
  const startPoint = polarToCartesian(cx, cy, radius, startAngleRad);
  const endPoint = polarToCartesian(cx, cy, radius, endAngleRad);
  
  let angleDiff = endAngleRad - startAngleRad;
  while (angleDiff < 0) angleDiff += 2 * Math.PI;
  while (angleDiff > 2 * Math.PI) angleDiff -= 2 * Math.PI;

  const largeArcFlag = angleDiff <= Math.PI ? "0" : "1";
  const sweepFlag = "1"; 

  const d = [
    "M", cx, cy, 
    "L", startPoint.x, startPoint.y, 
    "A", radius, radius, 0, largeArcFlag, sweepFlag, endPoint.x, endPoint.y, 
    "Z", 
  ].join(" ");
  return d;
};

// Helper function to map dial degrees (-90 to +90) to SVG radians (PI to 2PI for upper semi-circle)
const mapDialDegreesToSVGRadians = (degrees: number): number => {
  // Map [-90, 90] to [0, 180]
  const normalizedDegrees = degrees + 90;
  // Map [0, 180] to [0, PI] radians
  const angleInPiRange = (normalizedDegrees / 180) * Math.PI;
  // Shift to [PI, 2PI] range for upper semi-circle where PI is left, 1.5PI is top, 2PI is right
  return angleInPiRange + Math.PI;
};

const GameBoard: React.FC<GameBoardProps> = ({ targetPosition, dialAngleDegrees, lidOpen }) => {
  const targetAngleOffset = (targetPosition / MAX_SLOTS) * Math.PI; 
  const adjustedBaseMidPointRad = Math.PI + targetAngleOffset;


  const segments = [
    { path: describePieSlice(BOARD_CX, BOARD_CY, BOARD_RADIUS, adjustedBaseMidPointRad, adjustedBaseMidPointRad + TARGET_SLICE_ANGLE_RAD), color: SCORE_COLORS.POINTS_4 },
    { path: describePieSlice(BOARD_CX, BOARD_CY, BOARD_RADIUS, adjustedBaseMidPointRad + TARGET_SLICE_ANGLE_RAD, adjustedBaseMidPointRad + 2 * TARGET_SLICE_ANGLE_RAD), color: SCORE_COLORS.POINTS_3 },
    { path: describePieSlice(BOARD_CX, BOARD_CY, BOARD_RADIUS, adjustedBaseMidPointRad - TARGET_SLICE_ANGLE_RAD, adjustedBaseMidPointRad), color: SCORE_COLORS.POINTS_3 },
    { path: describePieSlice(BOARD_CX, BOARD_CY, BOARD_RADIUS, adjustedBaseMidPointRad + 2 * TARGET_SLICE_ANGLE_RAD, adjustedBaseMidPointRad + 3 * TARGET_SLICE_ANGLE_RAD), color: SCORE_COLORS.POINTS_2 },
    { path: describePieSlice(BOARD_CX, BOARD_CY, BOARD_RADIUS, adjustedBaseMidPointRad - 2 * TARGET_SLICE_ANGLE_RAD, adjustedBaseMidPointRad - TARGET_SLICE_ANGLE_RAD), color: SCORE_COLORS.POINTS_2 },
  ];

  const mappedDialAngleRad = mapDialDegreesToSVGRadians(dialAngleDegrees);
  const dialEndX = BOARD_CX + DIAL_LENGTH * Math.cos(mappedDialAngleRad);
  const dialEndY = BOARD_CY + DIAL_LENGTH * Math.sin(mappedDialAngleRad);
  
  const viewBoxString = `${BOARD_CX - BOARD_RADIUS} ${BOARD_CY - BOARD_RADIUS} ${2 * BOARD_RADIUS} ${BOARD_RADIUS}`;

  const markAnglesBuffer: number[] = [];
  markAnglesBuffer.push(DIAL_MIN_ANGLE);

  const firstRelevantMultiple = Math.ceil(DIAL_MIN_ANGLE / 15) * 15;
  for (let angleDeg = firstRelevantMultiple; angleDeg < DIAL_MAX_ANGLE; angleDeg += 15) {
    if (angleDeg > DIAL_MIN_ANGLE) {
      markAnglesBuffer.push(angleDeg);
    }
  }
  markAnglesBuffer.push(DIAL_MAX_ANGLE);
  
  const uniqueMarkAngles = [...new Set(markAnglesBuffer)].sort((a,b) => a - b);

  const degreeMarks = uniqueMarkAngles.map(angleDeg => {
    const currentMappedAngleRad = mapDialDegreesToSVGRadians(angleDeg); // Map mark angle to SVG radians
    const p1 = polarToCartesian(BOARD_CX, BOARD_CY, BOARD_RADIUS, currentMappedAngleRad);
    const p2 = polarToCartesian(BOARD_CX, BOARD_CY, BOARD_RADIUS - MARK_LENGTH, currentMappedAngleRad);
    
    return (
      <line
        key={`mark-${angleDeg}`}
        x1={p1.x}
        y1={p1.y}
        x2={p2.x}
        y2={p2.y}
        className={MARK_COLOR}
        strokeWidth={MARK_STROKE_WIDTH}
      />
    );
  });

  return (
    <svg 
      viewBox={viewBoxString} 
      className="w-full h-full"
      aria-label="Wavelength game board showing scores and dial position"
      preserveAspectRatio="xMidYMid meet"
    >
      <path
        d={describePieSlice(BOARD_CX, BOARD_CY, BOARD_RADIUS, Math.PI, 2 * Math.PI)}
        className={`${BOARD_BG_COLOR} ${BOARD_OUTLINE_COLOR}`}
        strokeWidth="4"
      />

      {degreeMarks}

      {!lidOpen && segments.map((segment, index) => (
        <path key={index} d={segment.path} className={`${segment.color} ${BOARD_OUTLINE_COLOR}`} strokeWidth="1" />
      ))}
      
      {lidOpen && (
        <path
          d={describePieSlice(BOARD_CX, BOARD_CY, BOARD_RADIUS, Math.PI, 2 * Math.PI)}
          className={`${LID_COLOR} ${BOARD_OUTLINE_COLOR} transition-opacity duration-300`}
          strokeWidth="4"
        />
      )}

      <circle cx={BOARD_CX} cy={BOARD_CY} r="10" className={`${DIAL_KNOB_COLOR} ${BOARD_OUTLINE_COLOR}`} strokeWidth="2" />
      
      <line
        x1={BOARD_CX}
        y1={BOARD_CY}
        x2={dialEndX}
        y2={dialEndY}
        className={`${DIAL_LINE_COLOR}`}
        strokeWidth="3"
      />
    </svg>
  );
};

export default GameBoard;