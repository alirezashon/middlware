import Modal from '../../Components/Modal'
import React, { useState } from 'react';


const ParentComponent: React.FC = () => {
  const [selectedItem, setSelectedItem] = useState('');

  const handleStatusSelect = (selectedStatus: string) => {
    setSelectedItem(selectedStatus);
  };

  return (
    <div>
      <Modal onSelectStatus={handleStatusSelect} />
      {selectedItem && <p>Selected Item: {selectedItem}</p>}
    </div>
  );
};

export default ParentComponent;




// import React from 'react';
// import MyPage from './ali';

// const Sample = () => {
//   // Sample data
//   const data = {
//     assetcodes: ['AST2022306419',  'AST2022306547'],
//     status: 'Contractor---Intact',
//   };

//   return (
//       <div>
//       {data.assetcodes.length > 0 && <MyPage data={data} />}
//       {/* Render MyPage component only if the length of assetcodes is greater than zero */}
//     </div>
//   );
// };

// export default Sample;
