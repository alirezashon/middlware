// import { useEffect, useRef } from 'react';
// import * as d3 from 'd3';

// const HexagonInputComponent = () => {
//   const fileInputRef = useRef(null);

//   useEffect(() => {
//     // Select the container element
//     const svgContainer = d3.select('#hexagon-container');

//     // Append a hexagon shape
//     const hexagon = svgContainer
//       .append('path')
//       .attr('d', 'M 60 10 L 110 10 L 140 60 L 110 110 L 60 110 L 30 60 Z')
//       .attr('fill', 'steelblue')
//       .attr('stroke', 'black')
//       .attr('stroke-width', 2)
//       .on('click', () => {
//         fileInputRef.current.click();
//       });

//     // Handle file input change event
//     const handleFileChange = (event) => {
//       const file = event.target.files[0];
//       console.log('Selected file:', file);

//       // Pass the file to the back-end for further processing
//       // You can make an API request or use other methods to send the file data
//     };

//     // Append an input element for file selection
//     svgContainer
//       .append('foreignObject')
//       .attr('x', 30)
//       .attr('y', -20)
//       .attr('width', 140)
//       .attr('height', 140)
//       .html(
//         `<input type="file" accept=".txt, .csv" style="width: 100%; height: 100%; opacity: 0;" ref="${fileInputRef}" onChange="${handleFileChange}"/>`
//       );
//   }, []);

//   return (
//     <div>
//       <svg id="hexagon-container" width="200" height="200">
//         {/* The hexagon shape and file input will be appended here */}
//       </svg>
//     </div>
//   );
// };

// export default HexagonInputComponent;










import { useEffect, useRef, useState } from 'react';
import * as d3 from 'd3';

const HexagonInputComponent = () => {
  const fileInputRef = useRef(null);
  const [selectedFile, setSelectedFile] = useState(null);

  useEffect(() => {
    // Select the container element
    const svgContainer = d3.select('#hexagon-container');

    // Append a hexagon shape
    const hexagon = svgContainer
      .append('path')
      .attr('d', 'M 60 10 L 110 10 L 140 60 L 110 110 L 60 110 L 30 60 Z')
      .attr('fill', 'steelblue')
      .attr('stroke', 'black')
      .attr('stroke-width', 2)
      .on('click', () => {
        fileInputRef.current.click();
      });

    // Handle file input change event
    const handleFileChange = (event) => {
      const file = event.target.files[0];
      setSelectedFile(file);
      console.log('Selected file:', file);

      // Pass the file to the back-end for further processing
      // You can make an API request or use other methods to send the file data
    };

    // Append an input element for file selection
    svgContainer
      .append('foreignObject')
      .attr('x', 30)
      .attr('y', -20)
      .attr('width', 140)
      .attr('height', 140)
      .html(
        `<input type="file" accept=".txt, .csv" style="width: 100%; height: 100%; opacity: 0;" ref="${fileInputRef}" onChange="${handleFileChange}"/>`
      );
  }, []);

  return (
    <div>
      <svg id="hexagon-container" width="200" height="200">
        {/* The hexagon shape and file input will be appended here */}
      </svg>
      {selectedFile && (
        <p>
          Selected file: <span>{selectedFile.name}</span>
        </p>
      )}
    </div>
  );
};

export default HexagonInputComponent;





// import { useEffect, useRef, useState } from 'react';
// import * as d3 from 'd3';

// const HexagonInputComponent = () => {
//   const fileInputRef = useRef(null);
//   const [selectedFile, setSelectedFile] = useState(null);

//   useEffect(() => {
//     // Select the container element
//     const svgContainer = d3.select('#hexagon-container');

//     // Append a hexagon shape
//     const hexagon = svgContainer
//       .append('path')
//       .attr('d', 'M 60 10 L 110 10 L 140 60 L 110 110 L 60 110 L 30 60 Z')
//       .attr('fill', 'steelblue')
//       .attr('stroke', 'black')
//       .attr('stroke-width', 2)
//       .on('click', () => {
//         fileInputRef.current.click();
//       });

//     // Handle file input change event
//     const handleFileChange = (event) => {
//       const file = event.target.files[0];
//       setSelectedFile(file);
//       console.log('Selected file:', file);

//       // Pass the file to the back-end for further processing
//       // You can make an API request or use other methods to send the file data
//     };

//     // Append an input element for file selection
//     svgContainer
//       .append('foreignObject')
//       .attr('x', 30)
//       .attr('y', -20)
//       .attr('width', 140)
//       .attr('height', 140)
//       .html(
//         `<input type="file" accept=".txt, .csv" style="width: 100%; height: 100%; opacity: 0;" ref="${fileInputRef}" onChange="${handleFileChange}"/>`
//       );
//   }, []);

//   return (
//     <div>
//       <svg id="hexagon-container" width="200" height="200">
//         {/* The hexagon shape and file input will be appended here */}
//       </svg>
//       {selectedFile && <p>Selected file: {selectedFile.name}</p>}
//     </div>
//   );
// };

// export default HexagonInputComponent;
