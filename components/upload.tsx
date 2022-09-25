import React from 'react';
import csvToJson from 'papaparse';
import { useRouter } from 'next/router'

import { AppContext, AppContextType } from '../context/appContext';
import { formateCsvData } from '../utils';

const UploadCsv = () => {
  const { setCsvData } = React.useContext(AppContext) as AppContextType;
  const hiddenFileInput = React.useRef<HTMLInputElement>(null);
  const [isLoading, setLoader] = React.useState<boolean>(false);
  const router = useRouter();

  const loadData = (e: any) => {
    setLoader(true);
    const jsonData: any = csvToJson.parse(e.target?.result);
    const data = formateCsvData(jsonData.data);
    setCsvData(data.tableData, data.headings)
    setLoader(false);
    router.push('/sheet');
  }

  const handleFileUpload = (event: any) => {
    const files = event.target.files;
    if (files) {
      const csvFile = files[0];
      const reader = new FileReader();
      reader.onload = loadData;
      reader.readAsText(csvFile);
    }
  }

  const handleSelectFile = () => {
    if (hiddenFileInput.current) {
      hiddenFileInput.current.click();
    }
  }

  return (
    <>
      <code className="rounded-md bg-gray-100 p-3 font-mono text-lg">
        <button onClick={handleSelectFile}>
          your csv
        </button>
      </code>
      <input
        className="hidden"
        type="file"
        accept=".csv"
        onChange={handleFileUpload}
        ref={hiddenFileInput}
      />
      {isLoading ? " Loading...": ""}
    </>
  )
}

export default UploadCsv;
