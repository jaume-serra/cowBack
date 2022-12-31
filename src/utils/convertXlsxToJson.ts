import xlsx from "xlsx";

export const convertXlsxToJson = (path: string) => {
  const jsonOptions = {
    raw: false,
    dateNF: 'd"/"m"/"yyyy',
  };

  const fileData = xlsx.readFile(path, { type: "buffer" });
  const resultData = fileData.SheetNames.map((sheetName: any) => {
    return xlsx.utils.sheet_to_json(fileData.Sheets[sheetName], jsonOptions);
  });
  return resultData[0];
};
