import React, { useEffect } from 'react';

const Alert = ({ type, msg, removeAlert }) => {
  useEffect(() => {
    let alert = setTimeout(() => {
      removeAlert();
    }, 2000);
    return () => clearTimeout(alert);
  }, [removeAlert]);
  return <p className={`alert_${type}`}>{msg}</p>;
};

export default Alert;
