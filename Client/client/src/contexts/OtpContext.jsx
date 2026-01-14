import React, { createContext, useContext, useState } from 'react';

const OtpContext = createContext();

export const useOtp = () => useContext(OtpContext);

export const OtpProvider = ({ children }) => {
  const [otpState, setOtpState] = useState({});

  const value = {
    otpState,
    setOtpState
  };

  return (
    <OtpContext.Provider value={value}>
      {children}
    </OtpContext.Provider>
  );
};

export default OtpProvider;
