import { useState, useEffect } from 'react';

// 定义一个类型来描述窗口的尺寸
interface WindowSize {
  width: number;
  height: number;
}

const useWindowSize = (): WindowSize => {
  // 使用useState来存储窗口的宽度和高度
  const [windowSize, setWindowSize] = useState<WindowSize>({
    width: window.innerWidth,
    height: window.innerHeight
  });

  useEffect(() => {
    // 定义一个事件处理程序来更新窗口尺寸
    const handleResize = () => {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight
      });
    };

    // 监听窗口的resize事件
    window.addEventListener('resize', handleResize);

    // 在组件卸载时移除事件监听器
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return windowSize;
};

export default useWindowSize;
