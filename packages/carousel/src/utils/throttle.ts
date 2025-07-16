// 节流函数
export const throttle = <T extends (...args: unknown[]) => void>(
  func: T,
  delay: number
) => {
  let timeoutId: NodeJS.Timeout | null = null;
  let lastExecTime = 0;
  return function (...args: Parameters<T>) {
    const currentTime = Date.now();

    if (currentTime - lastExecTime > delay) {
      func.apply(this, args);
      lastExecTime = currentTime;
    } else {
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
      timeoutId = setTimeout(() => {
        func.apply(this, args);
        lastExecTime = Date.now();
      }, delay - (currentTime - lastExecTime));
    }
  };
};
