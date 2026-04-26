import { useEffect, useRef, useState } from 'react';

export default function IframeProject({ projectPath }) {
  const iframeRef = useRef(null);
  const [height, setHeight] = useState('800px');

  useEffect(() => {
    const iframe = iframeRef.current;
    if (!iframe) return;

    const handleResize = () => {
      try {
        const iframeDocument = iframe.contentDocument || iframe.contentWindow.document;
        const iframeHeight = iframeDocument.body.scrollHeight;
        setHeight(`${iframeHeight + 50}px`);
      } catch (e) {
        // Cross-origin restrictions, use default height
        setHeight('100vh');
      }
    };

    iframe.addEventListener('load', handleResize);
    return () => iframe.removeEventListener('load', handleResize);
  }, [projectPath]);

  return (
    <div className="w-full">
      <iframe
        ref={iframeRef}
        src={projectPath}
        style={{
          width: '100%',
          height: height,
          border: 'none',
          borderRadius: '8px',
        }}
        title="Project Demo"
        sandbox="allow-scripts allow-same-origin allow-forms allow-popups"
      />
    </div>
  );
}
