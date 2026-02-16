import * as d3 from "d3";
import { useEffect, useRef, useState } from "react";
import styles from "./bucketHat.module.css";

function ConeDevelopment() {
  const [coneDim, setConeDim] = useState(() => {
    const a = 40;
    const b = 60;
    const height = 100;
    return {
      a,
      b,
      height,
      devAngle: devAngle(a, b, height),
    };
  });
  const [svgWidth, setSvgWidth] = useState();
  const svgRef = useRef(null);

  useEffect(() => {
    if (!svgRef.current) return;
    d3.selectAll("#svg > *").remove();

    const svg = d3
      .select(svgRef.current)
      .attr("width", "100%")
      .attr("height", "250px")
      .attr("viewBox", `0 0 ${svgRef.current.clientWidth} ${svgRef.current.clientHeight}`)
      .attr("preserveAspectRatio", "xMidYMid meet");
    setSvgWidth(svgRef.current.clientWidth);

    const lineGenerator = d3
      .line()
      .x((d) => d.x)
      .y((d) => d.y);

    const ellipse = translate(
      leftAlignShape(ellipseShape(coneDim.a, coneDim.b), svgRef.current.clientWidth * 0.6),
      0,
      svgRef.current.clientHeight / 2.5
    );
    const development = translate(
      rightAlignShape(
        ellipticalConeDevelopmentArc(coneDim.a, coneDim.b, coneDim.height, coneDim.devAngle),
        svgRef.current.clientWidth * 0.6
      ),
      0,
      svgRef.current.clientHeight / 2.5
    );

    svg
      .append("path")
      .datum(ellipse)
      .attr("d", lineGenerator)
      .style("fill", "var(--background")
      .style("stroke", "var(--color-1)")
      .style("stroke-width", 1.5);

    svg
      .append("path")
      .datum(development)
      .attr("d", lineGenerator)
      .style("fill", "var(--background")
      .style("stroke", "var(--color-1)")
      .style("stroke-width", 1.5);
  }, [coneDim, svgWidth]);

  function handleChange(e) {
    setConeDim((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    setConeDim((prev) => {
      const newAngle = devAngle(prev.a, prev.b, prev.height);
      return { ...prev, devAngle: newAngle };
    });
  }
  return (
    <>
      <div className={styles.wrapper}>
        <svg ref={svgRef} id="svg"></svg>
        <div className={styles.inputWrapper}>
          <label htmlFor="a">Major Axis</label>
          <input type="range" id="a" name="a" min="30" max="50" onChange={handleChange} />
          <label htmlFor="b">Minor Axis</label>
          <input type="range" id="b" name="b" min="30" max="50" onChange={handleChange} />
          <label htmlFor="height">Height</label>
          <input
            type="range"
            id="height"
            name="height"
            min="30"
            max="100"
            onChange={handleChange}
          />
        </div>
      </div>
    </>
  );
}

function ellipseShape(a, b, segments = 128) {
  const coordinates = [];
  for (let index = 0; index < segments; index++) {
    const angle = (index / segments) * Math.PI * 2;
    coordinates.push({
      x: a * Math.cos(angle),
      y: b * Math.sin(angle),
    });
  }
  coordinates.push(coordinates[0]);
  return coordinates;
}

function ellipticalConeDevelopmentArc(a, b, height, developmentAngle, segments = 128) {
  const coordinates = [{ x: 0, y: 0 }];
  for (let index = 0; index < segments; index++) {
    const ellipseAngleSegment = (index / segments) * 2 * Math.PI;
    const developmentAngleSegment = (index / segments) * developmentAngle;
    const slant = Math.hypot(
      height,
      Math.hypot(a * Math.cos(ellipseAngleSegment), b * Math.sin(ellipseAngleSegment))
    );
    coordinates.push({
      slant: slant,
      x: slant * Math.cos(developmentAngleSegment),
      y: slant * Math.sin(developmentAngleSegment),
    });
  }
  coordinates.push(coordinates[0]);
  return coordinates;
}

function devAngle(a, b, height) {
  const slantA = Math.hypot(a, height);
  const slantB = Math.hypot(b, height);
  const angleA = (2 * Math.PI * a) / slantA;
  const angleB = (2 * Math.PI * b) / slantB;
  return (angleA + angleB) / 2;
}

export function alignShape(points) {
  const minX = Math.min(...points.map((p) => p.x));
  const minY = Math.min(...points.map((p) => p.y));
  return points.map((point) => ({
    ...point,
    x: point.x - minX,
    y: point.y - minY,
  }));
}

export function translate(points, dx, dy) {
  return points.map((point) => ({
    ...point,
    x: point.x + dx,
    y: point.y + dy,
  }));
}

function rightAlignShape(coords, xOffset) {
  if (!Array.isArray(coords) || coords.length === 0) {
    throw new Error("Invalid input: coords should be a non-empty array of {x, y} objects");
  }
  const maxX = Math.max(...coords.map(({ x }) => x));
  const shift = xOffset - maxX;
  return coords.map(({ x, y }) => ({ x: x + shift, y }));
}

function leftAlignShape(coords, xOffset) {
  if (!Array.isArray(coords) || coords.length === 0) {
    throw new Error("Invalid input: coords should be a non-empty array of {x, y} objects");
  }
  const minX = Math.min(...coords.map(({ x }) => x));
  const shift = xOffset - minX;
  return coords.map(({ x, y }) => ({ x: x + shift, y }));
}

export default ConeDevelopment;
export { ConeDevelopment };
