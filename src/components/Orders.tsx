import React, { useState, useEffect } from "react";
import "../styles/Orders.css";
import { Radio } from "antd";
import allOrders from "../orders.json";

export default function Orders() {
  const [orders, setOrders] = useState<
    {
      id: string;
      productName: string;
      dateOrdered: string;
      orderStatus: string;
    }[]
  >(allOrders);

//filterApplied refers to if the orders have been filtered by anything. If a filter has been applied, a p tag and remove filter button appear
  const [filterApplied, setFilterApplied] = useState<boolean>(false);
  //filteredBy is a reuseable bit of state, so the orders can be filtered by accepted/inprogress/complete
  const [filteredBy, setFilteredBy] = useState<string>("");
  //value refers to the radio filter buttons, so only 1 can be applied at any time
  const [value, setValue] = useState<number>(0);


  //Changes the document title to display the number of orders currently displaying
  useEffect(() => {
    document.title = `(${orders.length}) - My orders`;
  }, [orders]);

  //filters orders by order progress
  const handleFilter = (orderStatus: string) => {
    setFilterApplied(true);
    setFilteredBy(orderStatus);
    setOrders(
      allOrders.filter((order) => {
        return order.orderStatus === orderStatus;
      })
    );
  };

  //removes all filter options, and displays all orders
  const handleRemoveFilter = () => {
    setFilterApplied(false);
    setOrders(allOrders);
    setValue(0);
  };

  const onChange = (e: any) => {
    setValue(e.target.value);
  };

  return (
    <>
      <h1>Orders : {orders.length}</h1>
      <div className="orders__status--wrapper">
        <Radio.Group onChange={onChange} value={value}>
          <Radio
            onClick={() => handleFilter("accepted")}
            value={1}
            className="order__option order__accepted"
          >
            Accepted
          </Radio>
          <Radio
            onClick={() => handleFilter("inProgress")}
            value={2}
            className="order__option order__in-progress"
          >
            In Progress
          </Radio>
          <Radio
            onClick={() => handleFilter("complete")}
            value={3}
            className="order__option order__complete"
          >
            Complete
          </Radio>
        </Radio.Group>
      </div>
      {/*Checks if a filter button has been selected. If so, it renders a p tag(showing what is being filtered by) and a button to remove the filter*/ }
      {filterApplied ? (
        <div className="order__filter">
          {/*If filtering by inProgress, it renders the more user friendly "In Progress" instead of "inProgress"*/ }
          {filteredBy === "inProgress" ? (
            <>
              <p>Filtered by: In Progress</p>
              <button onClick={handleRemoveFilter}>x</button>
            </>
          ) : (
            <>
              <p>Filtered by: {filteredBy}</p>
              <button onClick={handleRemoveFilter}>x</button>
            </>
          )}
        </div>
      ) : (
        <></>
      )}

      <div className="orders__all">
        {orders.map((order) => {
          return (
            <div className="order__card" key={order.id}>
              <ul>{order.productName}</ul>
              <div className="order__card--bottom">
                <div>
                  <li className="order__subtitle">Order Date:</li>
                  {/*Below changes the received dateOrdered to a more user friendly string*/}
                  <li>{new Date(order.dateOrdered).toString().slice(4, 16)}</li>
                </div>
                <div>
                  <li className="order__subtitle">Order Status:</li>
                  {/*Below adds green text to complete orders, and blue for any other orders*/}
                  <li
                    style={
                      order.orderStatus === "complete"
                        ? { color: "green", fontWeight: "bold" }
                        : { color: "blue", fontWeight: "bold" }
                    }
                  >
                    {/*Below changes the received dateOrdered to a more user friendly string*/}
                    {order.orderStatus === "inProgress"
                      ? "In Progress"
                      : order.orderStatus}
                  </li>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
}
