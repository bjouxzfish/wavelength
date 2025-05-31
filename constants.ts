
export const MAX_SLOTS = 30;
export const DIAL_MIN_ANGLE = -90; // degrees, changed from -179
export const DIAL_MAX_ANGLE = 90;   // degrees, changed from -1

// Game board SVG properties
export const BOARD_CX = 400;
export const BOARD_CY = 400; 
export const BOARD_RADIUS = 300;
export const DIAL_LENGTH = BOARD_RADIUS - 10;

// Angle for each colored score segment/slice on the board
export const TARGET_SLICE_ANGLE_RAD = 0.12; // radians

// --- "Cosmic Indigo" Theme Colors ---
export const SCORE_COLORS = {
  POINTS_4: 'fill-pink-500', 
  POINTS_3: 'fill-teal-400',   
  POINTS_2: 'fill-purple-500' 
};
export const LID_COLOR = 'fill-indigo-600 opacity-90';
export const DIAL_KNOB_COLOR = 'fill-yellow-400'; 
export const DIAL_LINE_COLOR = 'stroke-yellow-400'; 
export const BOARD_BG_COLOR = 'fill-slate-700';
export const BOARD_OUTLINE_COLOR = 'stroke-slate-500';

// Degree Mark Styling
export const MARK_COLOR = 'stroke-slate-400';
export const MARK_LENGTH = 10; // Length of the tick mark in pixels
export const MARK_STROKE_WIDTH = 1.5;