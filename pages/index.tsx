import React from 'react';

interface PageProps {
  data: Array<any>;
}

const Page: React.FC<PageProps> = ({data}) => {
  const handleDownload = async () => {
    try {
      const response = await fetch(`/api/GenerateExcel?data=${JSON.stringify(data)}`);
      const blob = await response.blob();
      const link = document.createElement('a');
      link.href = URL.createObjectURL(blob);
      link.download = 'generated_file.xlsx';
      link.click();

      // Clean up the temporary link
      URL.revokeObjectURL(link.href);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <button onClick={handleDownload}>Download Excel</button>
    </div>
  );
};

export default Page;
