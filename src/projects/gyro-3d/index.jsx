import { useState, useEffect, useRef } from 'react';
import * as THREE from "three";
import { GLTFLoader } from "three/addons/loaders/GLTFLoader.js";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";
import ProjectLayout from '../../components/ProjectLayout';

export default function Gyro3DDemo() {
  const mountRef = useRef(null);
  const rendererRef = useRef(null);
  const frameRef = useRef(null);
  const modelRef = useRef(null);
  const controlsRef = useRef(null);
  const gyroRef = useRef({
    active: false,
    baseBeta: null,
    baseGamma: null,
    targetX: 0,
    targetY: 0,
    currentX: 0,
    currentY: 0,
  });

  const [isIOS, setIsIOS] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [motionEnabled, setMotionEnabled] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(false);

  // ── Single animation loop — runs once, reads gyroRef each frame ──
  useEffect(() => {
    const isIOSDevice = /iPad|iPhone|iPod/.test(navigator.userAgent);
    const isMobileDevice = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    setIsIOS(isIOSDevice);
    setIsMobile(isMobileDevice);

    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0xf5f5f0);

    const camera = new THREE.PerspectiveCamera(
      75,
      mountRef.current.clientWidth / mountRef.current.clientHeight,
      0.1,
      1000
    );
    camera.position.z = 5;

    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(mountRef.current.clientWidth, mountRef.current.clientHeight);
    rendererRef.current = renderer;
    mountRef.current.appendChild(renderer.domElement);

    const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
    scene.add(ambientLight);
    const dirLight = new THREE.DirectionalLight(0xffffff, 0.8);
    dirLight.position.set(5, 5, 5);
    scene.add(dirLight);
    const fillLight = new THREE.DirectionalLight(0x8899ff, 0.3);
    fillLight.position.set(-5, -3, -5);
    scene.add(fillLight);

    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.05;
    controls.autoRotate = true;
    controls.autoRotateSpeed = 2.0;
    controls.enableZoom = false;
    controls.enablePan = false;
    controlsRef.current = controls;

    const loader = new GLTFLoader();
    console.log('Loading model from: /models/Astronaut.glb');
    loader.load(
      '/models/Astronaut.glb',
      (gltf) => {
        console.log('Model loaded successfully:', gltf);
        const model = gltf.scene;
        const box = new THREE.Box3().setFromObject(model);
        const center = box.getCenter(new THREE.Vector3());
        const size = box.getSize(new THREE.Vector3());
        const maxDim = Math.max(size.x, size.y, size.z);
        const scale = 1.5 / maxDim;
        model.position.sub(center);
        model.scale.multiplyScalar(scale);
        camera.position.z = maxDim * scale * 2.5;
        scene.add(model);
        modelRef.current = model;
        setIsLoading(false);
      },
      undefined,
      (err) => {
        console.error('Model load failed, using fallback:', err);
        console.error('Error details:', err.message, err.stack);
        const geo = new THREE.IcosahedronGeometry(1.5, 1);
        const mat = new THREE.MeshStandardMaterial({ color: 0x5533bb, metalness: 0.6, roughness: 0.3 });
        const mesh = new THREE.Mesh(geo, mat);
        scene.add(mesh);
        modelRef.current = mesh;
        setIsLoading(false);
        setError(true);
      }
    );

    // ── Master animate loop — handles both gyro and orbit ──────────
    const animate = () => {
      frameRef.current = requestAnimationFrame(animate);
      const g = gyroRef.current;

      if (g.active && modelRef.current) {
        // Gyro mode: lerp model rotation, controls are disabled
        const lerpFactor = 0.08;
        g.currentX += (g.targetX - g.currentX) * lerpFactor;
        g.currentY += (g.targetY - g.currentY) * lerpFactor;
        modelRef.current.rotation.x = g.currentX;
        modelRef.current.rotation.y = g.currentY;
      } else {
        // Desktop / drag mode
        controls.update();
      }

      renderer.render(scene, camera);
    };
    animate();

    const handleResize = () => {
      if (!mountRef.current) return;
      const w = mountRef.current.clientWidth;
      const h = mountRef.current.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };
    window.addEventListener('resize', handleResize);

    return () => {
      cancelAnimationFrame(frameRef.current);
      window.removeEventListener('resize', handleResize);
      if (mountRef.current && renderer.domElement) {
        mountRef.current.removeChild(renderer.domElement);
      }
      controls.dispose();
      renderer.dispose();
    };
  }, []);

  // ── Gyro listener — only attaches when motionEnabled ────────────
  useEffect(() => {
    if (!motionEnabled) return;

    if (controlsRef.current) {
      controlsRef.current.enabled = false;
      controlsRef.current.autoRotate = false;
    }

    const handleOrientation = (e) => {
      const g = gyroRef.current;
      const beta = e.beta ?? 0;
      const gamma = e.gamma ?? 0;

      // Calibrate on first reading so model starts at rest
      if (g.baseBeta === null) {
        g.baseBeta = beta;
        g.baseGamma = gamma;
      }

      g.targetX = THREE.MathUtils.clamp(((beta - g.baseBeta) / 90) * Math.PI, -1.5, 1.5);
      g.targetY = THREE.MathUtils.clamp(((gamma - g.baseGamma) / 90) * Math.PI, -1.5, 1.5);
      g.active = true;
    };

    window.addEventListener('deviceorientation', handleOrientation);

    return () => {
      window.removeEventListener('deviceorientation', handleOrientation);
      gyroRef.current.active = false;
      gyroRef.current.baseBeta = null;
      gyroRef.current.baseGamma = null;
      if (controlsRef.current) {
        controlsRef.current.enabled = true;
        controlsRef.current.autoRotate = true;
      }
    };
  }, [motionEnabled]);

  const requestMotionPermission = async () => {
    if (typeof DeviceOrientationEvent?.requestPermission === 'function') {
      try {
        const permission = await DeviceOrientationEvent.requestPermission();
        if (permission === 'granted') setMotionEnabled(true);
      } catch (err) {
        console.error('Motion permission denied:', err);
      }
    } else {
      setMotionEnabled(true);
    }
  };

  return (
    <ProjectLayout title="3D Motion Demo">
      <div className="relative w-full h-[80vh] flex items-center justify-center overflow-hidden">

        {/* Loading */}
        {isLoading && (
          <div className="absolute top-4 left-4 z-10 bg-white px-4 py-2 rounded-lg shadow-lg">
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 border-2 border-caput-mortuum border-t-transparent rounded-full animate-spin" />
              <span className="text-sm font-medium">Loading 3D Model...</span>
            </div>
          </div>
        )}

        {/* Fallback warning */}
        {error && (
          <div className="absolute top-4 left-4 z-10 bg-yellow-100 px-4 py-2 rounded-lg shadow-lg">
            <div className="flex items-center gap-2">
              <span className="text-yellow-600">⚠️</span>
              <span className="text-sm font-medium">Using fallback geometry</span>
            </div>
          </div>
        )}

        {/* iOS permission overlay */}
        {isIOS && !motionEnabled && (
          <div className="absolute inset-0 z-20 flex items-center justify-center bg-black/50">
            <div className="bg-white rounded-xl p-8 max-w-sm mx-4 text-center">
              <div className="text-4xl mb-4">📱</div>
              <h3 className="text-xl font-bold mb-2">Enable Motion Sensor</h3>
              <p className="text-gray-600 mb-6">
                Allow access to your device's gyroscope to control the 3D model by tilting your phone.
              </p>
              <button
                onClick={requestMotionPermission}
                className="bg-caput-mortuum text-white px-6 py-3 rounded-lg font-semibold hover:bg-slate-600 transition-colors"
              >
                Enable Motion Sensor
              </button>
            </div>
          </div>
        )}

        {/* Android-only toggle — hidden on desktop */}
        {isMobile && !isIOS && (
          <div className="absolute bottom-4 left-4 z-10">
            <button
              onClick={() => setMotionEnabled(prev => !prev)}
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                motionEnabled
                  ? 'bg-caput-mortuum text-white'
                  : 'bg-white text-caput-mortuum border border-coffee/20'
              }`}
            >
              {motionEnabled ? '📱 Motion On' : '🖱️ Desktop Mode'}
            </button>
          </div>
        )}

        {/* Instruction hint */}
        <div className="absolute top-4 right-4 z-10 bg-white px-4 py-2 rounded-lg shadow-lg">
          <p className="text-sm text-gray-600">
            {motionEnabled ? 'Tilt your device to rotate' : 'Click and drag to rotate'}
          </p>
        </div>

        {/* Three.js mount */}
        <div ref={mountRef} className="w-full h-full" />
      </div>
    </ProjectLayout>
  );
}