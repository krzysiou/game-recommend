const breakpoints = {
  mobile: 640,
};

const mediaQuery = Object.keys(breakpoints)
  .map((key) => [key, breakpoints[key]])
  .reduce((prev, [key, breakpoint]) => {
    prev[key] = `@media (max-width: ${breakpoint}px)`;

    return prev;
  }, {});

export { mediaQuery };
