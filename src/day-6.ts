type Race = [number, number]; // time, distance

export function getRaces(_input: string): Race[] {
  const input = _input.replace(/\n/g, '#');
  const times = (input.match(/Time:\s+(.*?)(#|$)/)?.[1] || '').split(/\s+/g).map((value) => parseInt(value, 10));
  const distances = (input.match(/Distance:\s+(.*?)(#|$)/)?.[1] || '')
    .split(/\s+/g)
    .map((value) => parseInt(value, 10));
  return times.map((time, index) => [time, distances[index]]);
}

export function availableSpeedParams(race: Race): number {
  const speed = 0;
  const [time, distance] = race;
  const b = speed - time;
  const c = distance - speed * time;
  const D = Math.pow(b, 2) - 4 * c;

  if (D < 0) {
    throw new Error('wrong input');
  }

  const x1 = (-b - Math.sqrt(D)) / 2;
  const x2 = (-b + Math.sqrt(D)) / 2;

  const resX1 = x1 % 1 === 0 ? x1 + 1 : Math.ceil(x1);
  const resX2 = x2 % 1 === 0 ? x2 - 1 : Math.floor(x2);

  return Math.abs(resX1 - resX2) + 1;
}
