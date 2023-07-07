import { saveAs } from 'file-saver';
import * as XLSX from 'xlsx';

const exportToExcel = (data, filename, sheetname) => {
  const fileType =
    'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
  const fileExtension = '.xlsx';
  const formattedData = formatData(data);

  const workbook = XLSX.utils.book_new();
  const worksheet = XLSX.utils.json_to_sheet(formattedData);
  XLSX.utils.book_append_sheet(workbook, worksheet, sheetname);
  const excelBuffer = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
  const blob = new Blob([excelBuffer], { type: fileType });
  saveAs(blob, `${filename}${fileExtension}`);
};

const formatData = (data) => {
  // Format your data here if needed
  return data;
};

export { exportToExcel };
