import { useState, useEffect } from 'react';
import './styles.css';

export default function DMXDemo() {
  const [activeSection, setActiveSection] = useState('hero');
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <div className="dmx-demo px-8 py-8">
      {/* Hero Section with Interactive Elements */}
      <section className="demo-hero relative h-96 bg-gradient-to-br from-blue-600 to-purple-700 rounded-2xl overflow-hidden mb-12">
        <div 
          className="absolute inset-0 opacity-20"
          style={{
            background: `radial-gradient(circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(255,255,255,0.3) 0%, transparent 50%)`
          }}
        />
        <div className="relative z-10 flex items-center justify-center h-full text-white text-center">
          <div>
            <h2 className="text-4xl font-bold mb-4">DMX Interactive Demo</h2>
            <p className="text-xl opacity-90">Experience the future of web design</p>
            <button 
              onClick={() => setActiveSection('features')}
              className="mt-6 bg-white text-blue-600 px-6 py-3 rounded-lg font-semibold hover:bg-blue-50 transition-colors"
            >
              Explore Features
            </button>
          </div>
        </div>
      </section>

      {/* Interactive Features */}
      <section className="demo-features grid md:grid-cols-3 gap-6 mb-12">
        {[
          { title: 'Responsive Design', icon: '📱', description: 'Adapts perfectly to any screen size' },
          { title: 'Smooth Animations', icon: '✨', description: 'Engaging micro-interactions throughout' },
          { title: 'Modern Stack', icon: '⚡', description: 'Built with cutting-edge technologies' }
        ].map((feature, index) => (
          <div 
            key={index}
            className="bg-white p-6 rounded-xl border border-teal-500/10 hover:border-teal-500/30 transition-all duration-300 hover:shadow-lg hover:scale-105 cursor-pointer"
            onClick={() => setActiveSection(`feature-${index}`)}
          >
            <div className="text-3xl mb-3">{feature.icon}</div>
            <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
            <p className="text-charcoal-muted">{feature.description}</p>
          </div>
        ))}
      </section>

      {/* Interactive Component */}
      <section className="demo-interactive bg-white rounded-xl p-8 border border-teal-500/10">
        <h3 className="text-2xl font-bold mb-6">Try It Yourself</h3>
        <InteractiveComponent />
      </section>

      {/* Extra padding at bottom for better UX */}
      <div className="h-32"></div>
    </div>
  );
}

// Example interactive component
function InteractiveComponent() {
  const [count, setCount] = useState(0);
  const [text, setText] = useState('');

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <button 
          onClick={() => setCount(count - 1)}
          className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition-colors"
        >
          -
        </button>
        <span className="text-2xl font-bold w-16 text-center">{count}</span>
        <button 
          onClick={() => setCount(count + 1)}
          className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition-colors"
        >
          +
        </button>
      </div>
      
      <div>
        <input 
          type="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Type something..."
          className="w-full px-4 py-2 border border-teal-500/20 rounded-lg focus:outline-none focus:border-teal-500"
        />
        {text && (
          <p className="mt-2 text-charcoal-muted">
            You typed: <span className="font-semibold text-teal-600">{text}</span>
          </p>
        )}
      </div>
    </div>
  );
}
