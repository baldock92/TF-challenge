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

  const [filterApplied, setFilterApplied] = useState<boolean>(false);
  const [filteredBy, setFilteredBy] = useState<string>("");
  const [value, setValue] = useState<number>(0);

    useEffect(() => {
      document.title = `(${orders.length}) - My orders`
    }, [orders])



  const handleFilter = (orderStatus: string) => {
    setFilterApplied(true);
    setFilteredBy(orderStatus);
    setOrders(
      allOrders.filter((order) => {
        return order.orderStatus === orderStatus;
      })
    );
  };

  const handleRemoveFilter = () => {
    setFilterApplied(false);
    setOrders(allOrders);
    setValue(0);
  };

  const onChange = (e:any) => {
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
      {filterApplied ? (
        <div className="order__filter">
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
                  <li>Order Date</li>
                  <li>{new Date(order.dateOrdered).toString().slice(4, 16)}</li>
                </div>
                <div>
                  <li>Order Status</li>
                  <li>{order.orderStatus}</li>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
}
