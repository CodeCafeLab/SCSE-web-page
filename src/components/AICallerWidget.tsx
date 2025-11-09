import { useEffect } from 'react';

export const AICallerWidget = () => {
  useEffect(() => {
    // Create script element
    const script = document.createElement('script');
    script.src = 'https://unpkg.com/@elevenlabs/convai-widget-embed';
    script.async = true;
    script.type = 'text/javascript';

    // Add script to document
    document.body.appendChild(script);

    // Cleanup function to remove script on component unmount
    return () => {
      document.body.removeChild(script);
    };
  }, []);

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <elevenlabs-convai agent-id="agent_4901k9n6mxc3frp885mz69naj733"></elevenlabs-convai>
    </div>
  );
};

export default AICallerWidget;
