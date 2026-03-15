import React, { Suspense, useRef, useState, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { useGLTF, ContactShadows, Environment, Float } from '@react-three/drei';
import * as THREE from 'three';
import { useNavigate } from 'react-router-dom';

function Model({ url, scaleMultiplier = 1 }) {
    const { scene } = useGLTF(url);
    const groupRef = useRef();
    const [clonedScene, setClonedScene] = useState(null);

    useEffect(() => {
        if (scene) {
            // Clone the scene so multiple instances don't fight over the same object
            const clone = scene.clone();
            const box = new THREE.Box3().setFromObject(clone);
            const size = box.getSize(new THREE.Vector3());
            const center = box.getCenter(new THREE.Vector3());

            // Center the model
            clone.position.x = -center.x;
            clone.position.y = -center.y;
            clone.position.z = -center.z;

            // Normalize scale
            const maxDim = Math.max(size.x, size.y, size.z);
            // Default 3.0 instead of 2.5, multiplied by custom factor
            const finalScale = (3.2 * scaleMultiplier) / (maxDim || 1);
            clone.scale.setScalar(finalScale);

            setClonedScene(clone);
        }
    }, [scene, url, scaleMultiplier]);

    useFrame((state) => {
        if (groupRef.current) {
            const targetRotationX = (state.mouse.y * 0.3);
            const targetRotationY = (state.mouse.x * 0.3);

            groupRef.current.rotation.x = THREE.MathUtils.lerp(groupRef.current.rotation.x, targetRotationX, 0.1);
            groupRef.current.rotation.y = THREE.MathUtils.lerp(groupRef.current.rotation.y, targetRotationY, 0.1);
        }
    });

    if (!clonedScene) return null;

    return (
        <group ref={groupRef}>
            <primitive object={clonedScene} />
        </group>
    );
}

const ServiceModel = ({ modelUrl, redirectUrl, scaleMultiplier = 1 }) => {
    const navigate = useNavigate();
    const [hovered, setHovered] = useState(false);

    return (
        <div
            className="w-full h-[320px] md:h-[400px] cursor-pointer relative group transition-transform duration-500 hover:scale-105"
            onClick={(e) => {
                e.stopPropagation();
                navigate(redirectUrl);
                setTimeout(() => {
                    window.scrollTo(0, 0);
                }, 100);
            }}
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
        >
            <Canvas
                shadows
                camera={{ position: [0, 0, 8], fov: 35 }}
                style={{ touchAction: 'none' }}
                gl={{ alpha: true, antialias: true }}
            >
                <ambientLight intensity={1} />
                <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} intensity={1.5} castShadow />
                <pointLight position={[-10, -10, -10]} intensity={0.5} />
                <directionalLight position={[0, 5, 5]} intensity={1} />

                <Suspense fallback={
                    <Float speed={2} rotationIntensity={1} floatIntensity={1}>
                        <mesh rotation={[0.4, 0.2, 0]}>
                            <boxGeometry args={[1.5, 1.5, 1.5]} />
                            <meshStandardMaterial color="#0d9488" wireframe />
                        </mesh>
                    </Float>
                }>
                    <Float speed={1.5} rotationIntensity={0.2} floatIntensity={0.5}>
                        <Model url={modelUrl} scaleMultiplier={scaleMultiplier} />
                    </Float>
                    <ContactShadows
                        position={[0, -2.5, 0]}
                        opacity={0.4}
                        scale={10}
                        blur={2.5}
                        far={4.5}
                    />
                    <Environment preset="city" />
                </Suspense>
            </Canvas>

            {/* Overlay hint */}
            <div className={`absolute bottom-4 left-1/2 -translate-x-1/2 px-4 py-1.5 rounded-full bg-caput-mortuum/10 border border-caput-mortuum/20 text-[10px] text-caput-mortuum font-medium tracking-wider uppercase transition-all duration-300 pointer-events-none ${hovered ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2'}`}>
                View Service
            </div>
        </div>
    );
};

export default ServiceModel;
