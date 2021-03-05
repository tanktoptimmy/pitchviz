export const getAngle = (cx:number, cy:number, ex:number, ey:number, degrees:number):number => {
  const dy = ey - cy;
  const dx = ex - cx;
  let theta = Math.atan2(dy, dx); // range (-PI, PI]
  theta *= 180 / Math.PI; // rads to degs, range (-180, 180]
  return Math.round(theta + 90 - degrees);
};

export function getElementFromObject<T, K extends keyof T>(obj: T, key: K) {
  return obj[key];
}
