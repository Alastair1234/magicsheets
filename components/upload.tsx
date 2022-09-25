import React from "react";
import csvToJson from "papaparse";
import { useRouter } from 'next/router'

import { AppContext, AppContextType } from "../context/appContext";
import { formateCsvData } from "../utils";

const UploadCsv = () => {
  const { setCsvData } = React.useContext(AppContext) as AppContextType
  const router = useRouter();

  const loadData = (e: any) => {
    const jsonData = csvToJson.parse(e.target?.result);
    const data = formateCsvData(jsonData.data);
    setCsvData(data.tableData, data.headings)
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

  return (
    <input
      type="file"
      accept=".csv"
      onChange={handleFileUpload}
    />
  )
}

export default UploadCsv;
