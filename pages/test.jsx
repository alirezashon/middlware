/** @format */

import Ali from '../Components/GenerateExcel/Ali'
const index = () => {
  const newRows = ['ali','reza','reza','reza','reza','reza','reza']
  const newRows2 = ['ali','reza','reza','reza','reza']
  const excelHeader = ['ali','reza','feshki','akbari']
  return (
		<Ali
			rows1={newRows}
			rows2={newRows2}
			cells={excelHeader}
		/>
	)
}
export default index

// import { useEffect } from 'react';

// const AnimatedSection = () => {
//   useEffect(() => {
//     import('gsap').then((gsap) => {
//       import('gsap/ScrollTrigger').then(() => {
//         // Register ScrollTrigger
//         gsap.default.registerPlugin(gsap.ScrollTrigger);

//         // Animation timeline
//         const tl = gsap.default.timeline({
//           scrollTrigger: {
//             trigger: '.animate-trigger', // Element you want to animate
//             start: 'top center', // When the animation starts
//             end: 'bottom center', // When the animation ends
//             scrub: 1, // Smooth scrolling effect
//           },
//         });

//         // Add animations to the timeline
//         tl.from('.animate-trigger .image', { opacity: 0.4, y: 100, duration: 1, scale: 0.5, rotate: 360, ease: 'power1.out' });

//         // Cleanup GSAP on component unmount
//         return () => tl.kill();
//       });
//     });
//   }, []);

//   return (
//     <div className="animate-trigger">
//       <img className="image" src="/images/ali.jpg" alt="Animated Image" style={{ width: '200px', height: 'auto' }} />
//       <p className="text">Your animated text here.</p>
//     </div>
//   );
// };

// export default AnimatedSection;
