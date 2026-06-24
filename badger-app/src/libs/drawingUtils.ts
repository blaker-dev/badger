export interface Point {
  x: number;
  y: number;
}

export const getSvgPathFromStroke = (stroke: Point[]) => {
    if (!stroke.length) return "";
    const d = stroke.reduce(
        (acc, point, i) => {
        return acc + (i === 0 ? `M ${point.x} ${point.y}` : ` L ${point.x} ${point.y}`);
        },
        ""
    );
    return d;
};