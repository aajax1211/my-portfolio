import { BoxGeometry } from "three";

export const easingFactor = 0.5
export const outsideCurveStrength = 0.05; // how much the page is bent
export const turningCurveStrength = 0.09; // how much the page is bent

export const  PAGE_WIDTH = 1.28;
export const PAGE_HEIGHT = 1.71; // for 4:3 aspect ratio
export const PAGE_DEPTH = 0.0005; // thickness of the page
export const PAGE_SEGMENTS = 30; // how much the page is bent
export const SEGMENT_WIDTH = PAGE_WIDTH / PAGE_SEGMENTS; // width of each segment

export const pageGeometry = new BoxGeometry(
    PAGE_WIDTH,
    PAGE_HEIGHT,
    PAGE_DEPTH,
    PAGE_SEGMENTS,
    PAGE_SEGMENTS,
    2
)

export const BASE_URL = '/';