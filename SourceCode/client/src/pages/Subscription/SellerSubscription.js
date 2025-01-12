import React, { useEffect, useState } from 'react';
//////
import './Subscription.css'
import axios from 'axios';
import { FaArrowLeft } from 'react-icons/fa';

const BackButton = () => {
  const handleGoBack = () => {
    window.history.back();
  };

  return (
    <button className="back-button" onClick={handleGoBack}>
      <FaArrowLeft className="back-icon" />
    </button>
  );
};

const Box = ({ children }) => {
  return (
    <div
      className="subscription-box"
      style={{
        marginTop: "8rem",
        marginLeft: "8rem",
        marginRight: "5rem",
        borderRadius: "1rem",
        height: "600px",
        width: "400px",
        display: "flex",
        flexDirection: "column",
        backgroundColor: "rgba(73, 196, 212, 0.51)",
        boxShadow: "2px 2px 20px rgba(0, 0, 0, 0.2)",
        transformOrigin: "center",
        perspective: "1000px",
      }}
    >
      {children}
    </div>
  );
};


const SellerSubscription = () => {

  // setting states
  const [prices, setPrices] = useState([])

  useEffect(() => {
    fetchPrices();
  }, []);

  const fetchPrices = async () => {
    const { data: response } = await axios.get(process.env.REACT_APP_SERVER_URL + "/subsseller/subsprices");
    console.log(response);
    setPrices(response.data);
  };

  const SubscriptionBox = ({ price, bulletPoints }) => {
    return (
      <Box>
        <div className="subscription-box-title" key={price.id}>{price.nickname}</div>
        <div className="subscription-price">
          ${price.unit_amount / 100}<span className='month'>/month</span>
        </div>
        <button className="btn-select-plan" onClick={() => createSession(price.id)}>
          Select
        </button>
        <ul className="subscription-bullet-points">
          {bulletPoints.map((point, index) => (
            <li key={index}>{point}</li>
          ))}
        </ul>
      </Box>
    );
  };

  const createSession = async (priceId) => {
    const { data: response } = await axios.post(process.env.REACT_APP_SERVER_URL + "/subsseller/subssession",
      {
        priceId,
      })
    window.location.href = response.url;
  }

  return (
    <>
    <div><BackButton/></div>
      <div>
        <h3 className='subscription-title'>Choose your <span>subscription plan</span></h3>
      </div>
      <div style={{ display: "flex", justifyContent: "space-between", textAlign: "center",}}>
        {prices.map((price) => {
          if (price.nickname === "Elite") {
            const bulletPoints = [
              "Elite Plan",
            ];
            return <SubscriptionBox key={price.id} price={price} bulletPoints={bulletPoints} />;
          } else if (price.nickname === "Ultra Elite") {
            const bulletPoints = [
              "Ultra Elite Plan",
            ];
            return <SubscriptionBox key={price.id} price={price} bulletPoints={bulletPoints} />;
          } else if (price.nickname === "VIP") {
            const bulletPoints = [
              "VIP Plan",
            ];
            return <SubscriptionBox key={price.id} price={price} bulletPoints={bulletPoints} />;
          } else {
            return null;
          }
        })}
      </div>
    </>
  );
};

export default SellerSubscription;

