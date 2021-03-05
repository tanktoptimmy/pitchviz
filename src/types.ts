export interface Pos { 
  x: number
  y: number
  uuid?: string
}

interface ActionPos extends Pos {
  description: string | null
}
export interface PitchState {
  stringOfPlay: Pos[]
  ballPos: Pos | null,
  actionPos: ActionPos | null
}

export interface ArcState {
  degrees: number
  radius: number
  rotate: number
  x: number
  y: number
}

export interface StringOfPlayState {
  dashLength: number,
  animationDuration: number
}
export type ActionType = "Kick Off" | "Corner" | "Throw In" | "Goal Kick" | "Free Kick" | "Penalty" |  "StringOfPlay";
export type CurrentTeam = "England" | "France";

export type Option = {
  name: string;
  value: string
}

export type SelectorOptions = {
  [key: string]: Option;
}

export type PitchConfig = {
  colour: string;
  pattern: string;
}

export type PitchColour = "Red" | "Green" | "Blue";

export type PitchPattern = "Grid" | "Stripes" | "Checked" | "Slope";

export type PitchLayerState = {
  showArc: boolean
  showArrow: boolean
  ShowSOP: boolean
  showBall: boolean
  ShowPoints: boolean
  showAction: boolean
  showClock: boolean
}

export type PitchLayerType = "showArc" | "showArrow" | "ShowSOP" | "showBall" | "ShowPoints" | "showAction" | "showClock"
