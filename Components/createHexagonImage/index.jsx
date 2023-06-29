import * as d3 from 'd3';

export const createHexagonImage = (url, size, border, x, y) => {
  const svg = d3.create('svg');

  const hexagonSize = size;
  const largerHexagonSize = hexagonSize * 1.1;

  const hexagonPath = d3
    .line()
    .x((d, i) => hexagonSize * Math.cos((2 * Math.PI * i) / 6))
    .y((d, i) => hexagonSize * Math.sin((2 * Math.PI * i) / 6))
    .curve(d3.curveLinearClosed);

  const largerHexagonPath = d3
    .line()
    .x((d, i) => largerHexagonSize * Math.cos((2 * Math.PI * i) / 6))
    .y((d, i) => largerHexagonSize * Math.sin((2 * Math.PI * i) / 6))
    .curve(d3.curveLinearClosed);

  const svgContainer = svg
    .attr('width', largerHexagonSize * 2)
    .attr('height', largerHexagonSize * 2);

  svgContainer
    .append('path')
    .attr('d', largerHexagonPath(d3.range(6)))
    .attr('transform', `translate(${largerHexagonSize},${largerHexagonSize})`)
    .attr('fill', 'white')
    .attr('stroke', border)
    .attr('stroke-width', 2);

  const imagePatternId = `image-pattern-${Math.random().toString(36).substr(2, 9)}`; // Generate unique ID
  const imageHexagon = svgContainer
    .append('path')
    .attr('d', hexagonPath(d3.range(6)))
    .attr('transform', `translate(${largerHexagonSize},${largerHexagonSize})`)
    .attr('stroke', '#f5fc26')
    .attr('fill', `url(#${imagePatternId})`)
    .attr('stroke', '#a5cd39').attr('stroke-width', 2);

  const pattern = svgContainer
    .append('defs')
    .append('pattern')
    .attr('id', imagePatternId) // Use the unique ID for pattern ID
    .attr('patternUnits', 'userSpaceOnUse')
    .attr('width', hexagonSize * 2)
    .attr('height', hexagonSize * 2)
    .attr('x', hexagonSize)
    .attr('y', hexagonSize + hexagonSize / 7);

  pattern
    .append('image')
    .attr('xlink:href', url)
    .attr('width', hexagonSize *2)
    .attr('height', hexagonSize * 2)
    .attr('x', x )
    .attr('y', y - hexagonSize);

  return svgContainer.node();
};
