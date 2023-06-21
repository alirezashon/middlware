// import { useEffect, useRef } from 'react';
// import * as d3 from 'd3';

// const HexagonalPyramid = () => {
//   const svgRef = useRef(null);

//   useEffect(() => {
//     // Select the SVG element
//     const svg = d3.select(svgRef.current);

//     // Set up the dimensions and margins
//     const width = 400;
//     const height = 400;
//     const margin = { top: 20, right: 20, bottom: 20, left: 20 };
//     const innerWidth = width - margin.left - margin.right;
//     const innerHeight = height - margin.top - margin.bottom;

//     // Define the pyramid data
//     const pyramidData = [
//       { label: 'A', value: 50 },
//       { label: 'B', value: 40 },
//       { label: 'C', value: 30 },
//       { label: 'D', value: 20 },
//       { label: 'E', value: 10 },
//     ];

//     // Set up the scales
//     const xScale = d3
//       .scaleLinear()
//       .domain([0, d3.max(pyramidData, (d) => d.value)])
//       .range([0, innerWidth]);

//     const yScale = d3
//       .scaleLinear()
//       .domain([0, pyramidData.length])
//       .range([innerHeight, 0]);

//     // Create the pyramid shape
//     const pyramid = d3
//       .area()
//       .x0((d) => innerWidth / 2 - xScale(d.value) / 2)
//       .x1((d) => innerWidth / 2 + xScale(d.value) / 2)
//       .y((d, i) => yScale(i))
//       .curve(d3.curveCatmullRom);

//     // Append the pyramid path to the SVG
//     svg
//       .append('path')
//       .datum(pyramidData)
//       .attr('class', 'pyramid')
//       .attr('d', pyramid)
//       .attr('transform', `translate(${margin.left},${margin.top})`)
//       .style('fill', 'steelblue');
//   }, []);

//   return (
//     <svg ref={svgRef} width="400" height="800">
//       {/* You can add any additional SVG elements or components here */}
//     </svg>
//   );
// };

// export default HexagonalPyramid;




import { useEffect, useRef } from 'react';
import * as d3 from 'd3';

const DraggableShape = () => {
  const containerRef = useRef(null);
  const hexGroupRef = useRef(null);

  useEffect(() => {
    const container = d3.select(containerRef.current);
    const hexGroup = d3.select(hexGroupRef.current);

    // Generate the honeycomb pattern
    const numRows = 5;
    const numCols = 7;
    const hexSize = 30;
    const hexMargin = 5;

    for (let row = 0; row < numRows; row++) {
      const offset = row % 2 === 0 ? hexSize + hexMargin / 2 : 0;

      for (let col = 0; col < numCols; col++) {
        const cx = col * (hexSize * 1.5 + hexMargin) + offset;
        const cy = row * (hexSize * Math.sqrt(3) + hexMargin);
        const hexagon = hexGroup.append('polygon')
          .attr('points', getHexagonPoints(cx, cy, hexSize))
          .attr('fill', '#f0f0f0')
          .attr('stroke', '#888')
          .attr('stroke-width', '2')
          .attr('transform', `translate(${cx},${cy})`);

        // Attach drag behavior to each hexagon
        const dragHandler = d3.drag()
          .on('drag', () => {
            const [x, y] = d3.event.subject;
            const [dx, dy] = d3.event.delta;

            // Calculate new position
            const newX = x + dx;
            const newY = y + dy;

            // Update hexagon position
            hexagon.attr('transform', `translate(${newX}, ${newY})`);
          })
          .on('end', () => {
            // Fetch API or perform any desired action here
            const [x, y] = d3.event.subject;
            console.log('Fetching API with hexagon position:', x, y);
          });

        dragHandler(hexagon);
      }
    }
  }, []);

  // Helper function to calculate the points of a hexagon
  const getHexagonPoints = (cx, cy, size) => {
    const angles = d3.range(0, 2 * Math.PI, (2 * Math.PI) / 6);
    const points = angles.map(angle => ({
      x: cx + size * Math.cos(angle),
      y: cy + size * Math.sin(angle)
    }));
    return points.map(p => [p.x, p.y].join(',')).join(' ');
  };

  return (
    <svg width="500" height="500">
      <rect
        ref={containerRef}
        width="100%"
        height="100vh"
        fill="#eee"
      />
      <g ref={hexGroupRef} />
    </svg>
  );
};

export default DraggableShape;
