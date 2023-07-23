import { useState,useEffect } from "react";
interface ProcessDataProps {
  data: string[][];
}
const ProcessData : React.FC<ProcessDataProps> = ({  data }) => {
 
 return (
     <div>
      <button>Generate CSV</button>
         {JSON.stringify(data)}
    </div>
  );
};
export default ProcessData




