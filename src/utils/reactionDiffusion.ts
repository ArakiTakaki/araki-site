import { range } from "./array";

const presets = [
  { feed: 0.022, kill: 0.051 }, // stripe
  { feed: 0.035, kill: 0.065 }, // spots
  { feed: 0.012, kill: 0.050 }, // wandering bubbles
  { feed: 0.025, kill: 0.050 }, // waves
  { feed: 0.040, kill: 0.060 }, // amorphous
  { feed: 0.025, kill: 0.060 }, // waving spots
  { feed: 0.030, kill: 0.060 }, // snapping strings
  { feed: 0.011, kill: 0.046 }, // balloons
];

type U = number[][];
type V = number[][];
type OPTION = {
  feed: number,
  kill: number,
};

const DEFAULT_OPTION: OPTION = presets[7];
type VEC2 = [number, number];

const uvMap = (target: [U, V], calcCallback: (val: [number, number], t: VEC2) => [number, number]): [U, V] => {
  const [u, v] = target;
  const newU: U = [];
  const newV: V = [];
  for (let i = 0; i < u.length; i++) {
    newU.push([]);
    newV.push([]);
    for (let j = 0; j < u[0].length; j++) {
      const [tu, tv] = calcCallback([u[i][j], v[i][j]], [i, j])
      newU[i][j] = tu;
      newV[i][j] = tv;
    }
  }
  return [newU, newV];
};

const update = (u: U, v: V, delta: number, { feed, kill }: OPTION = DEFAULT_OPTION): [U, V] => {
  const DU = 2e-5;
  const DV = 1e-5;
  const DX = 0.01707;

  const calcLap = (i: number, j: number): [number, number] => {
    const dec_x = (j - 1 < 0) ? u.length - 1 : j - 1;
    const dec_y = (i - 1 < 0) ? u[0].length - 1 : i - 1;

    const inc_x = (j + 1 > u.length - 1) ? 0 : j + 1;
    const inc_y = (i + 1 > u[0].length - 1) ? 0 : i + 1;

    const tu = (u[dec_y][j] + u[inc_y][j] + u[i][dec_x] + u[i][inc_x] - 4 * u[i][j]) / (DX * DX);
    const tv = (v[dec_y][j] + v[inc_y][j] + v[i][dec_x] + v[i][inc_x] - 4 * v[i][j]) / (DX * DX);

    const du = (DU * tu) - (u[i][j] * v[i][j] * v[i][j]) + (feed * (1 - u[i][j]));
    const dv = (DV * tv) + (u[i][j] * v[i][j] * v[i][j]) - (v[i][j] * (feed + kill));

    return [du, dv];
  }

  // calculate laplacian
  const [newU, newV] = uvMap([u, v], ([tu, tv], [i, j]) => {
    const [du, dv] = calcLap(i, j);
    return [
      tu + du * delta,
      tv + dv * delta,
    ];
  });
  return [newU, newV];
}

export const reactionDeffusion = (width: number, height: number) => {
  const SQUARE_SIZE = 10;

  let [u, v] = uvMap([
    range(height).map(() => range(width)),
    range(height).map(() => range(width))
  ], () => [1, 0]);

  const initalize = () => {
    const x_0 = Math.floor(width / 2) - Math.floor(SQUARE_SIZE / 2);
    const y_0 = Math.floor(height / 2) - Math.floor(SQUARE_SIZE / 2);

    for (let i = 0; i < SQUARE_SIZE; i++) {
      u[y_0 + i].fill(0.5, x_0, x_0 + SQUARE_SIZE);
      v[y_0 + i].fill(0.25, x_0, x_0 + SQUARE_SIZE);
    }

    for (let i = 0; i < height; i++) {
      for (let j = 0; j < width; j++) {
        u[i][j] += Math.random() * 0.12;
        v[i][j] += Math.random() * 0.07;
      }
    }
  }

  initalize();

  return (deltaTime = 3) => {
    const [newU, newV] = update(u, v, deltaTime);
    u = newU;
    v = newV;
    return u;
  }
};

