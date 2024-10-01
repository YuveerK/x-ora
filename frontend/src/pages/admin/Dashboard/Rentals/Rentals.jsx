import React, { useState } from "react";
import Papa from "papaparse";

function CsvToTable() {
  const [csvData, setCsvData] = useState([]);
  const [headers, setHeaders] = useState({});
  const [selectedHeaders, setSelectedHeaders] = useState([]);

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    Papa.parse(file, {
      header: true,
      dynamicTyping: true,
      complete: (result) => {
        const data = result.data;
        if (data.length > 0) {
          const extractedHeaders = extractHeaders(data[0]);
          setHeaders(extractedHeaders);
          setCsvData(data);
        }
      },
    });
  };

  const extractHeaders = (obj, prefix = "") => {
    return Object.keys(obj).reduce((acc, key) => {
      const fullPath = prefix ? `${prefix}.${key}` : key;
      if (Array.isArray(obj[key])) {
        obj[key].forEach((_, index) => {
          acc[`${fullPath}[${index}]`] = false;
        });
      } else if (typeof obj[key] === "object" && obj[key] !== null) {
        acc = { ...acc, ...extractHeaders(obj[key], fullPath) };
      } else {
        acc[fullPath] = false;
      }
      return acc;
    }, {});
  };

  const handleHeaderSelection = (header) => {
    setSelectedHeaders((prevSelected) => {
      if (prevSelected.includes(header)) {
        return prevSelected.filter((h) => h !== header);
      } else {
        return [...prevSelected, header];
      }
    });
  };

  const flattenData = (row) => {
    return selectedHeaders.reduce((acc, key) => {
      const keys = key.split(/[\.\[\]]/).filter(Boolean);
      let value = row;
      for (const k of keys) {
        value = value ? value[k] : undefined;
      }
      acc[key] = value;
      return acc;
    }, {});
  };

  console.log(selectedHeaders);

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center w-full overflow-y-auto">
      <div className="w-full bg-white shadow-lg rounded-lg p-6">
        <h2 className="text-2xl font-semibold text-gray-800 mb-6 text-center">
          CSV Table Viewer
        </h2>
        <input
          type="file"
          accept=".csv"
          onChange={handleFileUpload}
          className="block w-full text-sm text-gray-500
                    file:mr-4 file:py-2 file:px-4
                    file:rounded-full file:border-0
                    file:text-sm file:font-semibold
                    file:bg-blue-50 file:text-blue-700
                    hover:file:bg-blue-100
                    mb-6"
        />
        {Object.keys(headers).length > 0 && (
          <div className="mb-4">
            <h3 className="text-lg font-semibold text-gray-700 mb-2">
              Select Columns to Display:
            </h3>
            <div className="grid grid-cols-2 gap-4 mb-4">
              {Object.keys(headers).map((header, index) => (
                <label key={index} className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    checked={selectedHeaders.includes(header)}
                    onChange={() => handleHeaderSelection(header)}
                  />
                  <span className="text-gray-600">{header}</span>
                </label>
              ))}
            </div>
            <table className="min-w-full bg-white border border-gray-200 rounded-lg shadow-md">
              <thead className="bg-gray-50">
                <tr>
                  {selectedHeaders.map((header, index) => (
                    <th
                      key={index}
                      className="py-3 px-4 text-left text-gray-600"
                    >
                      {header}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {csvData.map((row, rowIndex) => (
                  <tr key={rowIndex} className="bg-gray-50">
                    {selectedHeaders.map((header, colIndex) => (
                      <td
                        key={colIndex}
                        className="py-2 px-4 border-b text-gray-700"
                      >
                        {flattenData(row)[header]}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}

export default CsvToTable;
