'use client';

import { useEffect, useRef } from 'react';
import * as THREE from 'three';

const GUCCI_COLORS = [
  0xe6e6e4, // Light warm gray
  0xdcd9d1, // Warm beige
  0xb3b2af, // Medium gray
  0xbcbcbe, // Cool gray
  0xd7d7d8, // Background gray
  0xcac8c5, // Subtle variation
  0xa8a6a3, // Darker variation
];

const isMobile = () => typeof window !== 'undefined' && window.innerWidth < 768;

const FloralScene = () => {
  const mountRef = useRef<HTMLDivElement>(null);
  const animationRef = useRef<number>();
  const elementsRef = useRef<THREE.Group[]>([]);
  const particlesRef = useRef<THREE.Points | null>(null);

  useEffect(() => {
    const currentMount = mountRef.current;
    if (!currentMount) return;

    // Scene Setup
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0xd7d7d8);

    const DPR = Math.min(window.devicePixelRatio, 2);

    const camera = new THREE.PerspectiveCamera(
      65,
      currentMount.clientWidth / currentMount.clientHeight,
      0.1,
      1000
    );
    camera.position.set(1, 3, 12);
    camera.lookAt(0, 0, 0);

    const renderer = new THREE.WebGLRenderer({
      alpha: false,
      antialias: true
    });
    renderer.setPixelRatio(DPR);
    renderer.setSize(currentMount.clientWidth, currentMount.clientHeight, false);
    renderer.setClearColor(0xd7d7d8, 1);
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;

    currentMount.appendChild(renderer.domElement);

    // Helper: fabric (silk) geometry
    function createFloralFabric(size: number, complexity: number) {
      const group = new THREE.Group();
      const geometry = new THREE.PlaneGeometry(size, size, complexity, complexity);
      return { geometry, group };
    }

    // Helper: petal geometry
    function createPetalElement() {
      const geometry = new THREE.ConeGeometry(0.3, 1.2, 10);
      const pos = geometry.attributes.position;
      for (let i = 0; i < pos.count; i++) {
        const y = pos.getY(i);
        const x = pos.getX(i);
        const z = pos.getZ(i);
        const curve = Math.sin((y + 0.6) * Math.PI) * 0.22;
        pos.setX(i, x + curve);
        pos.setZ(i, z * 0.3);
      }
      pos.needsUpdate = true;
      return geometry;
    }

    // Floating Elements
    const mainElements: THREE.Group[] = [];

    // Fabrics
    for (let i = 0; i < 4; i++) {
      const { geometry, group } = createFloralFabric(isMobile() ? 3.7 : 4.6 + Math.random() * 2, 36);
      const color = GUCCI_COLORS[Math.floor(Math.random() * GUCCI_COLORS.length)];
      const material = new THREE.MeshPhysicalMaterial({
        color,
        transparent: true,
        opacity: 0.65,
        roughness: 0.4,
        clearcoat: 0.35,
        sheen: 0.18,
        side: THREE.DoubleSide,
        reflectivity: 0.18
      });
      const mesh = new THREE.Mesh(geometry, material);
      mesh.castShadow = true;
      mesh.receiveShadow = true;
      group.add(mesh);
      group.position.set(
        (Math.random() - 0.5) * 15,
        (Math.random() - 0.5) * 11,
        (Math.random() - 0.5) * 8
      );
      group.rotation.set(
        Math.random() * Math.PI,
        Math.random() * Math.PI,
        Math.random() * Math.PI
      );
      mainElements.push(group);
      scene.add(group);
    }

    // Petals
    for (let i = 0; i < (isMobile() ? 5 : 8); i++) {
      const group = new THREE.Group();
      const geometry = createPetalElement();
      const color = GUCCI_COLORS[Math.floor(Math.random() * GUCCI_COLORS.length)];
      const material = new THREE.MeshPhysicalMaterial({
        color,
        transparent: true,
        opacity: 0.73,
        roughness: 0.48,
        sheen: 0.28,
        side: THREE.DoubleSide
      });
      const mesh = new THREE.Mesh(geometry, material);
      mesh.castShadow = true;
      group.add(mesh);
      group.position.set(
        (Math.random() - 0.5) * 14,
        (Math.random() - 0.5) * 9,
        (Math.random() - 0.5) * 6
      );
      group.rotation.set(
        Math.random() * Math.PI,
        Math.random() * Math.PI,
        Math.random() * Math.PI
      );
      const scale = 0.45 + Math.random() * 0.6;
      group.scale.setScalar(scale);
      mainElements.push(group);
      scene.add(group);
    }

    // Diamonds
    for (let i = 0; i < (isMobile() ? 3 : 6); i++) {
      const group = new THREE.Group();
      const geometry = new THREE.BoxGeometry(1, 1, 0.1);
      const color = GUCCI_COLORS[Math.floor(Math.random() * GUCCI_COLORS.length)];
      const material = new THREE.MeshLambertMaterial({
        color,
        transparent: true,
        opacity: 0.48
      });
      const mesh = new THREE.Mesh(geometry, material);
      mesh.rotation.z = Math.PI / 4;
      mesh.castShadow = true;
      group.add(mesh);
      group.position.set(
        (Math.random() - 0.5) * 12,
        (Math.random() - 0.5) * 8,
        (Math.random() - 0.5) * 5
      );
      group.rotation.set(
        Math.random() * Math.PI,
        Math.random() * Math.PI,
        Math.random() * Math.PI
      );
      const scale = 0.2 + Math.random() * 0.45;
      group.scale.setScalar(scale);
      mainElements.push(group);
      scene.add(group);
    }
    elementsRef.current = mainElements;

    // Premium particles (pearls/airy dots)
    const particleGeometry = new THREE.BufferGeometry();
    const particleCount = isMobile() ? 30 : 65;
    const particlePositions = new Float32Array(particleCount * 3);
    for (let i = 0; i < particleCount * 3; i += 3) {
      particlePositions[i] = (Math.random() - 0.5) * 18;
      particlePositions[i + 1] = (Math.random() - 0.5) * 14;
      particlePositions[i + 2] = (Math.random() - 0.5) * 8;
    }
    particleGeometry.setAttribute('position', new THREE.BufferAttribute(particlePositions, 3));
    const particleMaterial = new THREE.PointsMaterial({
      color: 0xb3b2af,
      size: 0.022,
      transparent: true,
      opacity: 0.35
    });
    const particles = new THREE.Points(particleGeometry, particleMaterial);
    particlesRef.current = particles;
    scene.add(particles);

    // Lights
    scene.add(new THREE.AmbientLight(0xffffff, 0.76));
    const d1 = new THREE.DirectionalLight(0xffffff, 0.34);
    d1.position.set(10, 10, 5);
    d1.castShadow = true;
    d1.shadow.mapSize.width = 2048;
    d1.shadow.mapSize.height = 2048;
    scene.add(d1);

    const d2 = new THREE.DirectionalLight(0xffffff, 0.22);
    d2.position.set(-6, 7, -3);
    scene.add(d2);

    // Mouse/Touch interaction (premium effect)
    let mouseX = 0, mouseY = 0, targetX = 0, targetY = 0;

    const handlePointerMove = (event: MouseEvent | TouchEvent) => {
      let x = 0, y = 0;
      if (event instanceof MouseEvent) {
        x = event.clientX;
        y = event.clientY;
      } else if (event.touches && event.touches.length > 0) {
        x = event.touches[0].clientX;
        y = event.touches[0].clientY;
      }
      targetX = (x / window.innerWidth) * 2 - 1;
      targetY = -(y / window.innerHeight) * 2 + 1;
    };

    window.addEventListener('mousemove', handlePointerMove);
    window.addEventListener('touchmove', handlePointerMove);

    // Animate loop
    const animate = () => {
      animationRef.current = requestAnimationFrame(animate);
      mouseX += (targetX - mouseX) * 0.08;
      mouseY += (targetY - mouseY) * 0.08;
      const time = Date.now() * 0.00025;

      // Animate elements
      elementsRef.current.forEach((el, idx) => {
        const speed = 0.48 + idx * 0.09;
        const phase = idx * 0.4;

        // Fabric or petal waving (vertex update for 1st mesh of group)
        if (el.children[0] instanceof THREE.Mesh && el.children[0].geometry instanceof THREE.PlaneGeometry) {
          const mesh = el.children[0] as THREE.Mesh;
          const pos = mesh.geometry.attributes.position;
          for (let i = 0; i < pos.count; i++) {
            const x = pos.getX(i), y = pos.getY(i);
            const wave =
              Math.sin(x * 2 + time * 1.7 + phase) * 0.25 +
              Math.cos(y * 3 + time * 2.1 + phase * 1.2) * 0.13 +
              Math.cos((x + y) * 1.8 + time * 1.4 + phase) * 0.15 +
              Math.sin(Math.sqrt(x * x + y * y) * 3 + time * 2.7 + phase) * 0.05;
            pos.setZ(i, wave);
          }
          pos.needsUpdate = true;
          mesh.geometry.computeVertexNormals();
        }

        // Parallax and floating animation
        el.rotation.x += 0.0017 * speed + mouseY * 0.004;
        el.rotation.y += 0.0012 * speed + mouseX * 0.004;
        el.rotation.z += 0.0014 * speed;

        el.position.x += Math.cos(time * speed * 0.5 + phase) * 0.006;
        el.position.y += Math.sin(time * speed + phase) * 0.008;

        // Wrap-around bounds (for infinite feeling)
        if (el.position.x > 14) el.position.x = -14;
        if (el.position.x < -14) el.position.x = 14;
        if (el.position.y > 11) el.position.y = -11;
        if (el.position.y < -11) el.position.y = 11;
      });

      // Animate particles
      if (particlesRef.current) {
        particlesRef.current.rotation.y += 0.0002;
        particlesRef.current.rotation.x += 0.0001;
      }

      // Camera gentle movement
      camera.position.x = 1 + Math.sin(time * 0.23) * 0.4 + mouseX * 0.42;
      camera.position.y = 3 + Math.cos(time * 0.28) * 0.23 + mouseY * 0.23;
      camera.lookAt(0, 0, 0);

      renderer.render(scene, camera);
    };

    animate();

    // Responsive
    const handleResize = () => {
      if (!camera || !renderer || !currentMount) return;
      camera.aspect = currentMount.clientWidth / currentMount.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(currentMount.clientWidth, currentMount.clientHeight, false);
    };
    window.addEventListener('resize', handleResize);

    // Cleanup
    return () => {
      if (animationRef.current) cancelAnimationFrame(animationRef.current);
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handlePointerMove);
      window.removeEventListener('touchmove', handlePointerMove);
      if (currentMount && renderer.domElement) currentMount.removeChild(renderer.domElement);
      elementsRef.current.forEach(el => {
        el.traverse((child) => {
          if (child instanceof THREE.Mesh) {
            child.geometry.dispose();
            if (Array.isArray(child.material)) {
              child.material.forEach(mat => mat.dispose());
            } else if (child.material instanceof THREE.Material) {
              child.material.dispose();
            }
          }
        });
      });
      if (particlesRef.current) {
        (particlesRef.current.geometry as THREE.BufferGeometry).dispose();
        if (particlesRef.current.material instanceof THREE.Material) {
          particlesRef.current.material.dispose();
        }
      }
      renderer.dispose();
    };
  }, []);

  return (
    <div ref={mountRef} className="absolute inset-0 w-full h-full" />
  );
};

export default FloralScene;
