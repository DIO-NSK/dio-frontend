export const BREAKPOINT_MOBILE = 1024;

export const breakpoints = {
    0: 'init',
    360: 'sm',
    768: 'md',
    1024: 'lg',
    1440: 'xl',
    9999 : 'inf'
} as const;

export type BreakpointsKey = keyof typeof breakpoints;
export type BreakpointsValue = typeof breakpoints[BreakpointsKey];