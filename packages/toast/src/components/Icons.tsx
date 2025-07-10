import React from "react";

/** 成功图标 */
export const SuccessIcon: React.FC = () => (
  <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M33.1817 17.6633L20.4537 30.3912L14.7969 24.7344" stroke="white" strokeWidth="3"/>
    <circle cx="24" cy="24" r="18.5" stroke="white" strokeWidth="3"/>
  </svg>
);

/** 错误图标 */
export const ErrorIcon: React.FC = () => (
  <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="24" cy="24" r="18.5" stroke="white" strokeWidth="3"/>
    <path d="M16 32L32 16" stroke="white" strokeWidth="3"/>
    <path d="M32 32L16 16" stroke="white" strokeWidth="3"/>
  </svg>
);

/** 信息图标 */
export const InfoIcon: React.FC = () => (
  <svg width="48" height="48" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="12" cy="12" r="9.25" stroke="white" strokeWidth="1.5"/>
    <path d="M12 15C12.5523 15 13 15.4477 13 16C13 16.5523 12.5523 17 12 17C11.4477 17 11 16.5523 11 16C11 15.4477 11.4477 15 12 15ZM12.75 14H11.25V7H12.75V14Z" fill="white"/>
  </svg>
);

/** 警告图标（warn） */
export const WarnIcon: React.FC = () => (
  <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="24" cy="24" r="18.5" stroke="white" strokeWidth="3"/>
    <rect opacity="0.01" width="48" height="48" fill="white"/>
    <path d="M22 32C22 33.1046 22.8954 34 24 34C25.1046 34 26 33.1046 26 32C26 30.8954 25.1046 30 24 30C22.8954 30 22 30.8954 22 32Z" fill="white"/>
    <path d="M18 20C18 20 18 14 24 14C30 14 30 18.5 30 19.5C30 22 28 23 26 24C24 25 24 28 24 28" stroke="white" strokeWidth="3"/>
  </svg>
);

/** 警告图标（warning） */
export const WarningIcon: React.FC = () => (
  <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="24" cy="24" r="18.5" stroke="white" strokeWidth="3"/>
    <rect opacity="0.01" width="48" height="48" fill="white"/>
    <path d="M22 32C22 33.1046 22.8954 34 24 34C25.1046 34 26 33.1046 26 32C26 30.8954 25.1046 30 24 30C22.8954 30 22 30.8954 22 32Z" fill="white"/>
    <path d="M18 20C18 20 18 14 24 14C30 14 30 18.5 30 19.5C30 22 28 23 26 24C24 25 24 28 24 28" stroke="white" strokeWidth="3"/>
  </svg>
); 