import React from "react";
import FinishTable from "./FinishTable";

function ListTables({ tables }) {
  if (tables.length > 0) {
    return (
      <div className="row">
        {tables.map((table) => {
          return (
            <div key={table.table_id} className="col-sm-6">
              <div className="card">
                <div className="card-body">
                  <h5 className="card-title">{table.table_name}</h5>
                  <h6 className="card-text">
                    Table Size: {table.capacity}
                    <br />
                    {table.reservation_id ? (
                      <FinishTable table={table} />
                    ) : (
                      <p data-table-id-status={table.table_id}>Free</p>
                    )}
                  </h6>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    );
  }
  return null;
}

export default ListTables;
