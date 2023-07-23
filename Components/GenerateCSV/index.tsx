import React from 'react';

interface CSVGeneratorProps {
  headers: string[];
  data: string[][];
}

const CSVGenerator: React.FC<CSVGeneratorProps> = ({  data }) => {
  const handleGenerateCSV = () => {
    try {
      // Combine the headers with the data
		const headers = [			'Asset Code',
			'Asset Name', 
			'Asset Number',
			'Category',
			'Brand',
			'Model',
			'Serial No',
			'Size',
			'Status',
			'Asset Location',
			'Department',
			'Transferred To',
			'Remarks',
			'Other Brand',
			'Description',
			'Condition',
			'Vendor Name',
			'PO Number',
			'Agent',
			'Invoice No',
			'Invoice Date',
			'Purchase Price',
			'Purchase Date',
			'Capitalization Price',
			'End Of Life',
			'Depreciation%',
			'Capitalization Date',
			'Scrap Value',
			'Allotted Upto',
			'Quantity',
			'Delivery Date',
			'Unit Type',
			'Color',
			'Material',
			'Guarantee Start Date',
			'Guarantee ExpireDate',
			'IP Address information',
			'Ownership',
			'Property Number',
			'Installed to',
			'Unit (First #)',
			'Unit (Last #)',
			'Part Number',
			'Capacity',
			'IMEI',
			'MAC',
			'IMSI',
			'ICCID',
			'Agent Name',
			'Customer_Name',
			'Customer_Address',
			'Agent Code',
			'Audit File',
			'Host Name',
			'Site ID',
			'Installation Type',
			'Type of allocation (To Contractor)',
			'Clearing Status',
			'Delivery Date (To Contractor)',
			'Document No (Return To WH)',
			'Activity Code',
			'Clearing Number (CFS/TA)',
			'Clearing Date (Agent)',
			'SAP Clearing Document No(GI Number)',
			'SAP Document No (Delivery To Agent)',
			'Clearing Type (Agent)',
			'Item Code_SAP',
			'Settlement Type',
		 ]
      const csvData = [headers, ...data];

      // Convert the data to CSV format
      const csvContent = csvData.map((row) => row.join(',')).join('\n');

      // Create a Blob and download the CSV file
      const blob = new Blob([`\uFEFF${csvContent}`], { type: 'text/csv;charset=utf-8;' });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', 'data.csv');
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (error) {
      console.error('Error generating CSV:', error);
    }
  };

  return (
    <div>
      <button onClick={handleGenerateCSV}>Generate CSV</button>
    </div>
  );
};

export default CSVGenerator;
