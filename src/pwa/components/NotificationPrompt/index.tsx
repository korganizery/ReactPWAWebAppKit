import React, { useState, useEffect } from 'react';
import { useSubscribe } from "react-pwa-push-notifications";

const NotificationPrompt: React.FC = () => {
  const [publicKey, setPublicKey] = useState<string | null>(null);
  const [messageCount, setMessageCount] = useState<number>(0);
  
  useEffect(() => {
    // const fetchPublicKey = async () => {
    //   try {
    //     const response = await fetch('/vapidPublicKey');
    //     const data = await response.json();
    //     console.log('vapidPublicKey', response);
    //     setPublicKey(data.publicKey);
    //   } catch (error) {
    //     console.error('Error fetching public key:', error);
    //   }
    // };

    // fetchPublicKey();
  }, []);

  const { getSubscription } = useSubscribe({ publicKey: publicKey || '' });

  const onSubmitSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const subscription = getSubscription();
      await fetch('http://localhost:5000/subscribe', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ subscription })
      });

      console.log('Subscribe success');
    } catch (e) {
      console.warn(e);
    }
  };

  const triggerNotification = () => {
    navigator.serviceWorker.ready.then(registration => {
      registration.showNotification('测试通知', {
        body: '这是一条测试通知消息。',
        icon: 'pwa-192x192.png',
      });
      setMessageCount(prevCount => prevCount + 1);
    });
  };

  useEffect(() => {
    if (publicKey) {
      const subscribe = () => {
        const subscription = getSubscription();
        console.log('Subscription:', subscription);
      };

      subscribe();
    }
  }, [publicKey, getSubscription]);

  return (
    <div className="page">
      <button onClick={onSubmitSubscribe} className="button">
        Subscribe
      </button>
      <div>
        <h1>推送通知示例</h1>
        <h1>messageCount: {messageCount}</h1>
        <button onClick={triggerNotification}>发送测试通知</button>
      </div>
    </div>
  );
};

export default NotificationPrompt;
