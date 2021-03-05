
export const KICK_OFF = "Kick Off";
export const CORNER = "Corner";
export const THROW_IN = "Throw In";
export const GOAL_KICK = "Goal Kick";
export const FREE_KICK = "Free Kick";
export const PENALTY = "Penalty";

export const STRINGOFPLAY = "StringOfPlay"


export const actionEvents = [
  KICK_OFF,
  CORNER,
  THROW_IN,
  GOAL_KICK,
  FREE_KICK,
  PENALTY,
  STRINGOFPLAY
];

export const CENTER_X = 152;
export const CENTER_Y = 95;
export const TOP_Y = 10;
export const BOTTOM_Y = 185;
export const HOME_ENDPOINT_X = 310;
export const AWAY_ENDPOINT_X = 10;

export const HOME_TEAM = "England";
export const AWAY_TEAM = "France";

export const TEAM = [HOME_TEAM, AWAY_TEAM];

export const TEAM_OPTIONS = {
  [HOME_TEAM]: {
    name: HOME_TEAM,
    value: HOME_TEAM
  },
  [AWAY_TEAM]: {
    name: AWAY_TEAM,
    value: AWAY_TEAM
  }
}

export const PITCH_COLOUR_OPTIONS = {
  "Red": {
    name: "Red",
    value: "#590808"
  },
  "Green": {
    name: "Green",
    value: "#315908"
  },
  "Blue": {
    name: "Blue",
    value: "#081659"
  },
}

export const PITCH_PATTERN_OPTIONS = {
  "Stripes": {
    name: "Stripes",
    value: "Stripes"
  },
  "Grid": {
    name: "Grid",
    value: "Grid"
  },
  "Checked": {
    name: "Checked",
    value: "Checked"
  },
  "Slope": {
    name: "Slope",
    value: "Slope"
  },
}

export const ACTION_EVENTS = {
  [KICK_OFF]: {
    name: KICK_OFF,
    arc: {
      radius: 90,
      degrees: 180
    } 
  },
  [CORNER]: {
    name: CORNER,
    arc: {
      radius: 100,
      degrees: 50
    }
  },
  [THROW_IN]: {
    name: THROW_IN,
    arc: {
      radius: 70,
      degrees: 90
    }
  },
  [GOAL_KICK]: {
    name: GOAL_KICK,
    arc: {
      radius: 180,
      degrees: 50
    }
  },
  [FREE_KICK]:{
    name: FREE_KICK,
    arc: {
      radius: 150,
      degrees: 45
    }
  },
  [PENALTY]: {
    name: PENALTY,
    arc: {
      radius: 60,
      degrees: 50
    }
  },
  // [GOAL]: {
  //   name: GOAL,
  //   arc: null
  // },
  [STRINGOFPLAY]: {
    name: STRINGOFPLAY,
    arc: null
  }
}
