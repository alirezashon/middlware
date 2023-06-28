// import Modal from '../../Components/Modal'


// const index = () => {
  
//   return (
//     <>
//     <Modal/>
//     </>
// )

// }

// export default index




import React from 'react';
import { ContextProvider } from '../../Contexts/DiagramContext';
import SampleComponent from './AZ';

const App: React.FC = () => {
  return (
    <ContextProvider>
      <SampleComponent />
    </ContextProvider>
  );
};

export default App;
