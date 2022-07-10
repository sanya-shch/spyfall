import React, { useCallback, useMemo } from 'react';

import { ToastContext } from './toast.context.js';
import Toast from "./Toast";

function ToastProvider(props) {
  const { children } = props;

  const setToast = useCallback(({
                      message,
                      position = 'top-right',
                      autoClose = 10000,
                      type = '',
                    }) => {
    new Toast({
      text: message || "Hello",
      position,
      autoClose,
      type,
      pauseOnHover: true,
      pauseOnFocusLoss: true,
    });
  }, []);

  const value = useMemo(
    () => ({
      setToast,
    }),
    [setToast],
  );

  return (
    <ToastContext.Provider value={value}>
      {children}
    </ToastContext.Provider>
  );
}

export default ToastProvider;
