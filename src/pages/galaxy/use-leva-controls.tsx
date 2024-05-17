import { useControls } from "leva";
export type LevaControls = {
  size: number;
  count: number;
  radius: number;
  branches: number;
  spin: number;
  randomness: number;
  randomnessPower: number;
  insideColor: string;
  outsideColor: string;
};
function useLevaControls(): LevaControls {
  const {
    size,
    count,
    radius,
    branches,
    spin,
    randomness,
    randomnessPower,
    insideColor,
    outsideColor,
  } = useControls({
    radius: {
      value: 5,
      min: 1,
      max: 10,
      step: 1,
    },
    count: {
      value: 9000,
      min: 1000,
      step: 100,
      max: 100000,
    },
    size: {
      value: 0.01,
      min: 0.01,
      max: 1,
    },
    branches: {
      value: 3,
      max: 20,
      min: 1,
      step: 1,
    },
    spin: {
      value: 1,
      min: -5,
      max: 5,
      step: 1,
    },
    randomness: {
      value: 0.5,
      min: 0,
      max: 2,
      step: 0.01,
    },
    randomnessPower: {
      value: 2,
      min: 1,
      max: 10,
      step: 1,
    },
    insideColor: {
      value: "#fc9818",
    },
    outsideColor: {
      value: "#0458e8",
    },
  });
  return {
    size,
    count,
    radius,
    branches,
    spin,
    randomness,
    randomnessPower,
    insideColor,
    outsideColor,
  };
}

export default useLevaControls;
