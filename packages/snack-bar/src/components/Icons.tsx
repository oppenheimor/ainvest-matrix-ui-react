export const SuccessIcon = () => (
  <svg width="24" height="24" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M33.1817 17.6633L20.4537 30.3912L14.7969 24.7344" stroke="currentColor" strokeWidth="3"/>
    <circle cx="24" cy="24" r="18.5" stroke="currentColor" strokeWidth="3"/>
  </svg>
)

export const ErrorIcon = () => (
  <svg width="24" height="24" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="24" cy="24" r="18.5" stroke="currentColor" strokeWidth="3"/>
    <path d="M16 32L32 16" stroke="currentColor" strokeWidth="3"/>
    <path d="M32 32L16 16" stroke="currentColor" strokeWidth="3"/>
  </svg>
)

export const WarningIcon = () => (
  <svg width="24" height="24" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="24" cy="24" r="18.5" stroke="currentColor" strokeWidth="3"/>
    <path d="M24 30C25.1046 30 26 30.8954 26 32C26 33.1046 25.1046 34 24 34C22.8954 34 22 33.1046 22 32C22 30.8954 22.8954 30 24 30ZM25.5 28H22.5V14H25.5V28Z" fill="currentColor"/>
  </svg>
)

export const InfoIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
  <circle cx="10" cy="10" r="9.25" transform="matrix(1 0 0 -1 2 22)" stroke="white" strokeWidth="1.5"/>
  <path d="M12 9C12.5523 9 13 8.55229 13 8C13 7.44771 12.5523 7 12 7C11.4477 7 11 7.44771 11 8C11 8.55229 11.4477 9 12 9ZM12.75 10H11.25V17H12.75V10Z" fill="white"/>
  </svg>
)

export const LoadingIcon = () => (
  <svg width="24" height="24" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" className="animate-spin">
    <rect opacity="0.87" x="21.7344" y="18.7188" width="4.26667" height="10.6667" rx="2.13333" transform="rotate(135 21.7344 18.7188)" fill="currentColor" fillOpacity="0.4"/>
    <rect opacity="0.75" x="18.6641" y="21.8672" width="4.26667" height="10.6667" rx="2.13333" transform="rotate(90 18.6641 21.8672)" fill="currentColor" fillOpacity="0.4"/>
    <rect opacity="0.63" x="18.7188" y="26.2656" width="4.26667" height="10.6667" rx="2.13333" transform="rotate(45 18.7188 26.2656)" fill="currentColor" fillOpacity="0.4"/>
    <rect opacity="0.51" x="21.8672" y="29.3359" width="4.26667" height="10.6667" rx="2.13333" fill="currentColor" fillOpacity="0.4"/>
    <rect opacity="0.39" x="36.8242" y="33.8047" width="4.26667" height="10.6667" rx="2.13333" transform="rotate(135 36.8242 33.8047)" fill="currentColor" fillOpacity="0.4"/>
    <rect opacity="0.27" x="40" y="21.8672" width="4.26667" height="10.6667" rx="2.13333" transform="rotate(90 40 21.8672)" fill="currentColor" fillOpacity="0.4"/>
    <rect opacity="0.15" x="33.8086" y="11.1797" width="4.26667" height="10.6667" rx="2.13333" transform="rotate(45 33.8086 11.1797)" fill="currentColor" fillOpacity="0.4"/>
    <rect x="21.8672" y="8" width="4.26667" height="10.6667" rx="2.13333" fill="currentColor" fillOpacity="0.4"/>
  </svg>
)