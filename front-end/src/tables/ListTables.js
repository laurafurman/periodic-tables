import React from "react";
import FinishTable from "./FinishTable";

function ListTables({ tables }) {
  if (tables.length > 0) {
    return (
      <div className="card-deck">
        {tables.map((table) => {
          return (
            <div key={table.table_id} className="card my-2">
              <div className="card-header">
                <h5 className="card-title">{table.table_name}</h5>
              </div>
              <div className="card-body">
                <div className="container">
                  <div className="row">
                    <div className="col">
                      <p>Capacity: {table.capacity} </p>
                    </div>
                    <div className="col">
                      {table.reservation_id ? (
                        <FinishTable table={table} />
                      ) : (
                        <p data-table-id-status={table.table_id}>Free</p>
                      )}{" "}
                    </div>
                  </div>
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
