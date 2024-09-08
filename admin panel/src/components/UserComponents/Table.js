import { Delete, Edit } from "@mui/icons-material";
import { Column } from "primereact/column";
import { DataTable } from "primereact/datatable";
import { Toast } from "primereact/toast";
import React, { useRef, useState } from "react";

const Table = ({
  data,
  title,
  actions,
  columns,
  btnTitle,
  onRowEdit,
  onBtnClick,
  exportData,
  handleRedirect,
  addBtn = false,
  search = true,
  exportBtn = true,
  marginTop = true,
}) => {
  const dt = useRef(null);
  const toast = useRef(null);
  const [selectedRows, setSelectedRows] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  const exportCSV = () => {
    const csvContent = exportData
      .map((row) => columns.map((col) => row[col.field]))
      .join("\n");

    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", "data.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const searchInData = (data, searchTerm) => {
    return data.filter((row) => {
      return Object.keys(row).some((key) => {
        if (key.includes(".")) {
          const [mainKey, nestedKey] = key.split(".");

          return (
            row[mainKey] &&
            typeof row[mainKey] === "object" &&
            row[mainKey][nestedKey] !== undefined &&
            row[mainKey][nestedKey] !== null &&
            row[mainKey][nestedKey]
              .toString()
              .toLowerCase()
              .includes(searchTerm.toLowerCase())
          );
        } else {
          return (
            row[key] !== undefined &&
            row[key] !== null &&
            row[key].toString().toLowerCase().includes(searchTerm.toLowerCase())
          );
        }
      });
    });
  };

  const filteredData = searchInData(data, searchQuery);

  const header = (
    <div className="flex items-center justify-between mb-5">
      {title && <span className="text-xl font-semibold">{title}</span>}
      <div className="flex items-center justify-end gap-3 ms-auto">
        {search && (
          <input
            type="search"
            placeholder="Search..."
            onChange={(e) => setSearchQuery(e.target.value)}
            value={searchQuery}
            className="block w-[300px] text-black border font-[500] border-[#D2D8DD] sm:text-sm sm:leading-4 px-3 py-[7px] rounded-sm focus:border-transparent"
          />
        )}
        {addBtn && (
          <button
            type="button"
            onClick={onBtnClick}
            className="2xl:text-[16px] text-[14px] font-[500] leading-[18px] text-[#fff] py-[7px] 2xl:px-4 px-3 bg-[#0147ff] rounded-[2px] flex items-center justify-center 2xl:gap-[10px] gap-[6px]"
          >
            {btnTitle}
          </button>
        )}
        {exportBtn && (
          <button
            type="button"
            onClick={exportCSV}
            className="2xl:text-[16px] text-[14px] font-[500] text-[#fff] py-1 px-4 bg-[#0147ff] rounded-[2px]"
          >
            Export
          </button>
        )}
      </div>
    </div>
  );

  return (
    <div className={`${marginTop ? "mt-6" : ""}`}>
      <Toast ref={toast} />
      <div className="card">
        <DataTable
          ref={dt}
          value={filteredData}
          selection={selectedRows}
          onSelectionChange={(e) => setSelectedRows(e.value)}
          dataKey="id"
          paginator
          rows={10}
          header={header}
        >
          {columns.map((col) => (
            <Column
              key={col.field}
              field={col.field}
              sortable={col.sortable}
              body={col.body}
              header={col.header}
              headerClassName="custom-header 2xl:text-[14px] text-[12px]"
              bodyClassName="custom-body 2xl:text-[14px] text-[12px]"
              style={{
                maxWidth: col.width,
                minWidth: col.width,
              }}
              className="truncate"
            />
          ))}
          {actions && (
            <Column
              body={(rowData) => (
                <div className="flex items-center justify-center gap-2">
                  <button
                    type="button"
                    onClick={() => handleRedirect(rowData)}
                    className="text-[14px] text-[#000] rounded"
                  >
                    <Delete fontSize="small" />
                  </button>
                  <button onClick={() => onRowEdit(rowData)}>
                    <Edit fontSize="small" />
                  </button>
                </div>
              )}
              headerClassName="custom-header"
              bodyClassName="custom-body"
              style={{
                maxWidth: "40px",
                minWidth: "40px",
                padding: "0.75rem 0",
                textAlign: "center",
              }}
              className="truncate 2xl:text-[14px] text-[12px]"
            />
          )}
        </DataTable>
      </div>
    </div>
  );
};

export default Table;
