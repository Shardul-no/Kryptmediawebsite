import React from 'react';

const WhatsAppButton = ({ serviceName }) => {
  const message = `Hi, I want help with ${serviceName}`;
  const encodedMessage = encodeURIComponent(message);
  const whatsappUrl = `https://wa.me/919930183457?text=${encodedMessage}`;

  return (
    <div className="flex justify-center mb-8">
      <a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center space-x-2 bg-green-500 hover:bg-green-600 text-white font-medium py-2 px-4 rounded-full transition"
      >
        <img
          src="https://upload.wikimedia.org/wikipedia/commons/6/6b/WhatsApp.svg"
          alt="WhatsApp"
          className="w-6 h-6"
        />
        <span>Chat on WhatsApp</span>
      </a>
    </div>
  );
};

export default WhatsAppButton;
