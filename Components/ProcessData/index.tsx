import { useState,useEffect } from "react";
interface ProcessDataProps {
  data: string[][];
}
const ProcessData : React.FC<ProcessDataProps> = ({  data }) => {
 
 return (
   <div>
         {JSON.stringify(data)}
      <button>Generate CSV</button>
    </div>
  );
};
export default ProcessData




