'use client';

import { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';

interface Collection {
  id: string;
  name: string;
  description: string;
  flowers: string[];
  image: string;
  price: string;
}

interface Props {
  selectedCollection: Collection;
}

const InteractiveFlowerGallery = ({ selectedCollection }: Props) => {
  const mountRef = useRef<HTMLDivElement>(null);
  const sceneRef = useRef<THREE.Scene | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const animationRef = useRef<number>();
  const bouquetGroupRef = useRef<THREE.Group>();
  const floatingElementsRef = useRef<THREE.Group>();
  const particleSystemRef = useRef<THREE.Points>();
  const [isDragging, setIsDragging] = useState(false);
  const [isAutoRotate, setIsAutoRotate] = useState(true);
  const [showParticles, setShowParticles] = useState(true);
  const mouseRef = useRef({ x: 0, y: 0 });
  const rotationRef = useRef({ x: 0, y: 0 });
  const touchRef = useRef({ startX: 0, startY: 0, distance: 0 });

  useEffect(() => {
    const currentMount = mountRef.current;
    if (!currentMount) return;

    // Scene setup
    const scene = new THREE.Scene();
    sceneRef.current = scene;

    // Enhanced Gucci background with gradient
    scene.background = new THREE.Color(0xe6e6e4);
    scene.fog = new THREE.Fog(0xe6e6e4, 8, 15);

    const camera = new THREE.PerspectiveCamera(
      50,
      currentMount.clientWidth / currentMount.clientHeight,
      0.1,
      1000
    );

    const renderer = new THREE.WebGLRenderer({
      alpha: false,
      antialias: true,
      powerPreference: "high-performance"
    });
    renderer.setSize(currentMount.clientWidth, currentMount.clientHeight);
    renderer.setClearColor(0xe6e6e4, 1);
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.2;
    rendererRef.current = renderer;

    currentMount.appendChild(renderer.domElement);

    // Create floating fabric elements (Gucci-style)
    const createFloatingFabricElements = () => {
      const fabricGroup = new THREE.Group();
      floatingElementsRef.current = fabricGroup;

      // Create multiple fabric planes with different sizes and materials
      const fabricElements = [
        { size: 2.5, color: 0xdcd9d1, opacity: 0.3, position: [3, 2, -1] },
        { size: 1.8, color: 0xbcbcbe, opacity: 0.25, position: [-2.5, 1.5, 1] },
        { size: 3.2, color: 0xe6e6e4, opacity: 0.2, position: [1, 3, -2] },
        { size: 2.0, color: 0xb3b2af, opacity: 0.35, position: [-1.5, -1, 2] },
        { size: 1.5, color: 0xd7d7d8, opacity: 0.28, position: [2.8, -0.5, 0.5] }
      ];

      fabricElements.forEach((element, index) => {
        // Create fabric plane with wave distortion
        const geometry = new THREE.PlaneGeometry(element.size, element.size, 32, 32);

        // Add wave distortion to geometry
        const positions = geometry.attributes.position;
        for (let i = 0; i < positions.count; i++) {
          const x = positions.getX(i);
          const y = positions.getY(i);
          const wave = Math.sin(x * 2 + index) * Math.cos(y * 2 + index) * 0.1;
          positions.setZ(i, wave);
        }
        geometry.computeVertexNormals();

        const material = new THREE.MeshLambertMaterial({
          color: element.color,
          transparent: true,
          opacity: element.opacity,
          side: THREE.DoubleSide,
          depthWrite: false
        });

        const fabric = new THREE.Mesh(geometry, material);
        fabric.position.set(...element.position as [number, number, number]);
        fabric.rotation.x = Math.PI * Math.random();
        fabric.rotation.y = Math.PI * Math.random();
        fabric.rotation.z = Math.PI * Math.random();

        // Store original rotation for animation
        fabric.userData = {
          originalRotation: { ...fabric.rotation },
          animationOffset: index * 0.5,
          floatSpeed: 0.3 + Math.random() * 0.4
        };

        fabricGroup.add(fabric);
      });

      return fabricGroup;
    };

    // Create particle system for floating elements
    const createParticleSystem = () => {
      const particleCount = 150;
      const geometry = new THREE.BufferGeometry();
      const positions = new Float32Array(particleCount * 3);
      const velocities = new Float32Array(particleCount * 3);
      const scales = new Float32Array(particleCount);

      for (let i = 0; i < particleCount; i++) {
        const i3 = i * 3;

        // Random positions in sphere around scene
        positions[i3] = (Math.random() - 0.5) * 15;
        positions[i3 + 1] = (Math.random() - 0.5) * 10;
        positions[i3 + 2] = (Math.random() - 0.5) * 15;

        // Random velocities
        velocities[i3] = (Math.random() - 0.5) * 0.02;
        velocities[i3 + 1] = (Math.random() - 0.5) * 0.01;
        velocities[i3 + 2] = (Math.random() - 0.5) * 0.02;

        // Random scales
        scales[i] = Math.random() * 0.3 + 0.1;
      }

      geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
      geometry.setAttribute('velocity', new THREE.BufferAttribute(velocities, 3));
      geometry.setAttribute('scale', new THREE.BufferAttribute(scales, 1));

      const material = new THREE.PointsMaterial({
        color: 0xbcbcbe,
        size: 0.05,
        transparent: true,
        opacity: 0.6,
        blending: THREE.AdditiveBlending,
        depthWrite: false
      });

      const particles = new THREE.Points(geometry, material);
      particleSystemRef.current = particles;
      return particles;
    };

    // Create detailed 3D bouquet with enhanced details
    const createInteractiveBouquet = (collectionId: string) => {
      const bouquetGroup = new THREE.Group();
      bouquetGroupRef.current = bouquetGroup;

      // Enhanced collection-specific flower arrangements
      const flowerConfigs = {
        'romantic': {
          flowers: [
            { type: 'rose', count: 12, color: 0xe6e6e4, size: 1.4, spread: 1.2 },
            { type: 'baby-breath', count: 25, color: 0xdcd9d1, size: 0.7, spread: 1.5 },
            { type: 'leaves', count: 18, color: 0xb3b2af, size: 1.1, spread: 1.0 }
          ]
        },
        'modern': {
          flowers: [
            { type: 'geometric', count: 8, color: 0xbcbcbe, size: 1.2, spread: 0.8 },
            { type: 'linear', count: 15, color: 0xd7d7d8, size: 0.9, spread: 1.0 },
            { type: 'accent', count: 6, color: 0xa8a6a3, size: 1.5, spread: 0.6 }
          ]
        },
        'luxury': {
          flowers: [
            { type: 'orchid', count: 7, color: 0xcac8c5, size: 1.8, spread: 1.0 },
            { type: 'premium', count: 12, color: 0xe6e6e4, size: 1.3, spread: 1.1 },
            { type: 'elegant', count: 9, color: 0xb3b2af, size: 1.4, spread: 0.9 }
          ]
        },
        'rustic': {
          flowers: [
            { type: 'wildflower', count: 18, color: 0xdcd9d1, size: 1.0, spread: 1.4 },
            { type: 'natural', count: 12, color: 0xbcbcbe, size: 1.1, spread: 1.2 },
            { type: 'organic', count: 15, color: 0xb3b2af, size: 0.9, spread: 1.3 }
          ]
        },
        'seasonal': {
          flowers: [
            { type: 'seasonal', count: 14, color: 0xe6e6e4, size: 1.1, spread: 1.1 },
            { type: 'fresh', count: 10, color: 0xcac8c5, size: 1.3, spread: 1.0 },
            { type: 'vibrant', count: 12, color: 0xdcd9d1, size: 1.0, spread: 1.2 }
          ]
        }
      };

      const config = flowerConfigs[collectionId as keyof typeof flowerConfigs] || flowerConfigs.romantic;

      // Enhanced stems base with more detail
      const stemGeometry = new THREE.CylinderGeometry(0.5, 0.6, 2.5, 20);
      const stemMaterial = new THREE.MeshLambertMaterial({
        color: 0xb3b2af,

      });
      const stemBase = new THREE.Mesh(stemGeometry, stemMaterial);
      stemBase.position.y = -1.25;
      stemBase.castShadow = true;
      stemBase.receiveShadow = true;
      bouquetGroup.add(stemBase);

      // Create flowers with enhanced arrangements
      config.flowers.forEach((flowerConfig, typeIndex) => {
        for (let i = 0; i < flowerConfig.count; i++) {
          const flower = createDetailedFlower(flowerConfig.type, flowerConfig.color, flowerConfig.size);

          // More natural bouquet formation with layers
          const layer = Math.floor(i / (flowerConfig.count / 3));
          const radius = 0.6 + layer * 0.4 + Math.random() * flowerConfig.spread;
          const angle = (i / flowerConfig.count) * Math.PI * 2 + typeIndex * 0.7 + Math.random() * 0.5;
          const height = 0.3 + layer * 0.5 + Math.random() * 1.2;

          flower.position.x = Math.cos(angle) * radius;
          flower.position.z = Math.sin(angle) * radius;
          flower.position.y = height;

          // More natural variation
          flower.rotation.x = (Math.random() - 0.5) * 0.7;
          flower.rotation.y = Math.random() * Math.PI * 2;
          flower.rotation.z = (Math.random() - 0.5) * 0.4;

          // Store animation data
          flower.userData = {
            originalPosition: { ...flower.position },
            swaySpeed: 0.5 + Math.random() * 0.5,
            swayAmount: 0.02 + Math.random() * 0.03
          };

          bouquetGroup.add(flower);
        }
      });

      return bouquetGroup;
    };

    // Enhanced flower creation with more detail
    const createDetailedFlower = (type: string, color: number, size: number) => {
      const group = new THREE.Group();

      // Enhanced stem with texture
      const stemGeometry = new THREE.CylinderGeometry(0.025, 0.035, 2.0, 12);
      const stemMaterial = new THREE.MeshLambertMaterial({
        color: 0x939393

      });
      const stem = new THREE.Mesh(stemGeometry, stemMaterial);
      stem.position.y = 1.0;
      stem.castShadow = true;
      group.add(stem);

      // Enhanced flower heads based on type
      switch (type) {
        case 'rose':
          // More detailed multi-layered rose
          for (let layer = 0; layer < 5; layer++) {
            const petalCount = 8 + layer * 3;
            for (let i = 0; i < petalCount; i++) {
              const petalGeometry = new THREE.SphereGeometry(0.09 - layer * 0.012, 10, 8);
              const petalMaterial = new THREE.MeshLambertMaterial({
                color: new THREE.Color(color).multiplyScalar(0.75 + layer * 0.06),
                transparent: true,
                opacity: 0.9 - layer * 0.1
              });
              const petal = new THREE.Mesh(petalGeometry, petalMaterial);

              const angle = (i / petalCount) * Math.PI * 2;
              const radius = 0.07 + layer * 0.025;
              petal.position.x = Math.cos(angle) * radius;
              petal.position.z = Math.sin(angle) * radius;
              petal.position.y = 2.0 - layer * 0.025;
              petal.scale.setScalar(0.6 + Math.random() * 0.4);
              petal.castShadow = true;
              group.add(petal);
            }
          }
          break;

        case 'orchid':
          // More sophisticated orchid
          const orchidGeometry = new THREE.ConeGeometry(0.12, 0.18, 8);
          const orchidMaterial = new THREE.MeshLambertMaterial({
            color,
            transparent: true,
            opacity: 0.95
          });
          const orchid = new THREE.Mesh(orchidGeometry, orchidMaterial);
          orchid.position.y = 2.0;
          orchid.rotation.x = Math.PI;
          orchid.castShadow = true;
          group.add(orchid);

          // Enhanced orchid petals
          for (let i = 0; i < 5; i++) {
            const petalGeometry = new THREE.BoxGeometry(0.18, 0.025, 0.1);
            const petal = new THREE.Mesh(petalGeometry, orchidMaterial);
            const angle = (i / 5) * Math.PI * 2;
            petal.position.x = Math.cos(angle) * 0.09;
            petal.position.z = Math.sin(angle) * 0.09;
            petal.position.y = 1.9;
            petal.rotation.y = angle;
            petal.rotation.x = Math.sin(angle) * 0.3;
            petal.castShadow = true;
            group.add(petal);
          }
          break;

        case 'baby-breath':
          // Clustered small flowers with more detail
          for (let cluster = 0; cluster < 3; cluster++) {
            for (let i = 0; i < 6; i++) {
              const smallGeometry = new THREE.SphereGeometry(0.015, 8, 6);
              const smallMaterial = new THREE.MeshLambertMaterial({
                color,
                transparent: true,
                opacity: 0.8
              });
              const small = new THREE.Mesh(smallGeometry, smallMaterial);
              small.position.x = (Math.random() - 0.5) * 0.12 + cluster * 0.05;
              small.position.z = (Math.random() - 0.5) * 0.12;
              small.position.y = 1.8 + Math.random() * 0.25 + cluster * 0.1;
              small.castShadow = true;
              group.add(small);
            }
          }
          break;

        default:
          // Enhanced generic flower
          const flowerGeometry = new THREE.SphereGeometry(0.1, 16, 12);
          const flowerMaterial = new THREE.MeshLambertMaterial({
            color,
            transparent: true,
            opacity: 0.95
          });
          const flower = new THREE.Mesh(flowerGeometry, flowerMaterial);
          flower.position.y = 2.0;
          flower.castShadow = true;
          group.add(flower);

          // Enhanced petals
          for (let i = 0; i < 8; i++) {
            const petalGeometry = new THREE.BoxGeometry(0.05, 0.1, 0.012);
            const petal = new THREE.Mesh(petalGeometry, flowerMaterial);
            const angle = (i / 8) * Math.PI * 2;
            petal.position.x = Math.cos(angle) * 0.11;
            petal.position.z = Math.sin(angle) * 0.11;
            petal.position.y = 2.0;
            petal.rotation.y = angle;
            petal.rotation.x = Math.sin(angle * 2) * 0.2;
            petal.castShadow = true;
            group.add(petal);
          }
      }

      // Enhanced leaves with more detail
      for (let i = 0; i < 2; i++) {
        const leafGeometry = new THREE.BoxGeometry(0.1, 0.04, 0.18);
        const leafMaterial = new THREE.MeshLambertMaterial({
          color: 0x939393,
          transparent: true,
          opacity: 0.9
        });
        const leaf = new THREE.Mesh(leafGeometry, leafMaterial);
        leaf.position.y = 1.0 + Math.random() * 0.6;
        leaf.position.x = (Math.random() - 0.5) * 0.15;
        leaf.rotation.y = Math.random() * Math.PI;
        leaf.rotation.z = (Math.random() - 0.5) * 0.4;
        leaf.castShadow = true;
        group.add(leaf);
      }

      group.scale.setScalar(size);
      return group;
    };

    // Create all elements
    const bouquet = createInteractiveBouquet(selectedCollection.id);
    const floatingElements = createFloatingFabricElements();
    const particles = createParticleSystem();

    scene.add(bouquet);
    scene.add(floatingElements);
    if (showParticles) {
      scene.add(particles);
    }

    // Enhanced ground with texture
    const groundGeometry = new THREE.CircleGeometry(4, 64);
    const groundMaterial = new THREE.MeshLambertMaterial({
      color: 0xd7d7d8,
      transparent: true,
      opacity: 0.7
    });
    const ground = new THREE.Mesh(groundGeometry, groundMaterial);
    ground.rotation.x = -Math.PI / 2;
    ground.position.y = -2.5;
    ground.receiveShadow = true;
    scene.add(ground);

    // Enhanced lighting setup
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.4);
    scene.add(ambientLight);

    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
    directionalLight.position.set(6, 10, 4);
    directionalLight.castShadow = true;
    directionalLight.shadow.mapSize.width = 2048;
    directionalLight.shadow.mapSize.height = 2048;
    directionalLight.shadow.camera.near = 0.5;
    directionalLight.shadow.camera.far = 20;
    directionalLight.shadow.camera.left = -8;
    directionalLight.shadow.camera.right = 8;
    directionalLight.shadow.camera.top = 8;
    directionalLight.shadow.camera.bottom = -8;
    scene.add(directionalLight);

    // Additional accent lighting
    const rimLight = new THREE.DirectionalLight(0xffffff, 0.4);
    rimLight.position.set(-4, 6, -3);
    scene.add(rimLight);

    const fillLight = new THREE.DirectionalLight(0xffffff, 0.2);
    fillLight.position.set(0, 3, 6);
    scene.add(fillLight);

    // Camera position
    camera.position.set(0, 1.5, 5);
    camera.lookAt(0, 0.5, 0);

    // Enhanced interaction handlers
    const handleMouseDown = (event: MouseEvent) => {
      setIsDragging(true);
      setIsAutoRotate(false);
      mouseRef.current.x = event.clientX;
      mouseRef.current.y = event.clientY;
    };

    const handleMouseMove = (event: MouseEvent) => {
      if (!isDragging || !bouquetGroupRef.current) return;

      const deltaX = event.clientX - mouseRef.current.x;
      const deltaY = event.clientY - mouseRef.current.y;

      rotationRef.current.y += deltaX * 0.008;
      rotationRef.current.x += deltaY * 0.008;

      // Smoother rotation limits
      rotationRef.current.x = Math.max(-Math.PI / 2, Math.min(Math.PI / 2, rotationRef.current.x));

      bouquetGroupRef.current.rotation.y = rotationRef.current.y;
      bouquetGroupRef.current.rotation.x = rotationRef.current.x;

      mouseRef.current.x = event.clientX;
      mouseRef.current.y = event.clientY;
    };

    const handleMouseUp = () => {
      setIsDragging(false);
      setTimeout(() => {
        if (!isDragging) {
          setIsAutoRotate(true);
        }
      }, 2000);
    };

    // Touch handlers for mobile
    const handleTouchStart = (event: TouchEvent) => {
      if (event.touches.length === 1) {
        setIsDragging(true);
        setIsAutoRotate(false);
        touchRef.current.startX = event.touches[0].clientX;
        touchRef.current.startY = event.touches[0].clientY;
      } else if (event.touches.length === 2) {
        const touch1 = event.touches[0];
        const touch2 = event.touches[1];
        touchRef.current.distance = Math.sqrt(
          Math.pow(touch2.clientX - touch1.clientX, 2) +
          Math.pow(touch2.clientY - touch1.clientY, 2)
        );
      }
    };

    const handleTouchMove = (event: TouchEvent) => {
      event.preventDefault();

      if (event.touches.length === 1 && isDragging && bouquetGroupRef.current) {
        const deltaX = event.touches[0].clientX - touchRef.current.startX;
        const deltaY = event.touches[0].clientY - touchRef.current.startY;

        rotationRef.current.y += deltaX * 0.005;
        rotationRef.current.x += deltaY * 0.005;

        rotationRef.current.x = Math.max(-Math.PI / 2, Math.min(Math.PI / 2, rotationRef.current.x));

        bouquetGroupRef.current.rotation.y = rotationRef.current.y;
        bouquetGroupRef.current.rotation.x = rotationRef.current.x;

        touchRef.current.startX = event.touches[0].clientX;
        touchRef.current.startY = event.touches[0].clientY;
      } else if (event.touches.length === 2) {
        const touch1 = event.touches[0];
        const touch2 = event.touches[1];
        const distance = Math.sqrt(
          Math.pow(touch2.clientX - touch1.clientX, 2) +
          Math.pow(touch2.clientY - touch1.clientY, 2)
        );

        const zoom = (distance - touchRef.current.distance) * 0.01;
        camera.position.z = Math.max(2, Math.min(10, camera.position.z - zoom));
        touchRef.current.distance = distance;
      }
    };

    const handleTouchEnd = () => {
      setIsDragging(false);
      setTimeout(() => {
        if (!isDragging) {
          setIsAutoRotate(true);
        }
      }, 2000);
    };

    const handleWheel = (event: WheelEvent) => {
      event.preventDefault();
      const zoom = event.deltaY * 0.002;
      camera.position.z = Math.max(2, Math.min(10, camera.position.z + zoom));
    };

    // Add all event listeners
    currentMount.addEventListener('mousedown', handleMouseDown);
    currentMount.addEventListener('touchstart', handleTouchStart);
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('touchmove', handleTouchMove, { passive: false });
    window.addEventListener('mouseup', handleMouseUp);
    window.addEventListener('touchend', handleTouchEnd);
    currentMount.addEventListener('wheel', handleWheel);

    // Enhanced animation loop
    const animate = () => {
      animationRef.current = requestAnimationFrame(animate);

      const time = Date.now() * 0.001;

      // Auto-rotation when not interacting
      if (isAutoRotate && bouquetGroupRef.current) {
        bouquetGroupRef.current.rotation.y = time * 0.15;
        rotationRef.current.y = time * 0.15;
      }

      // Animate floating fabric elements
      if (floatingElementsRef.current) {
        floatingElementsRef.current.children.forEach((fabric, index) => {
          if (fabric.userData) {
            const { originalRotation, animationOffset, floatSpeed } = fabric.userData;

            // Gentle floating motion
            fabric.position.y += Math.sin(time * floatSpeed + animationOffset) * 0.002;
            fabric.rotation.x = originalRotation.x + Math.sin(time * 0.5 + animationOffset) * 0.1;
            fabric.rotation.z = originalRotation.z + Math.cos(time * 0.3 + animationOffset) * 0.05;

            // Wave distortion animation
            const geometry = (fabric as THREE.Mesh).geometry as THREE.PlaneGeometry;
            const positions = geometry.attributes.position;
            for (let i = 0; i < positions.count; i++) {
              const x = positions.getX(i);
              const y = positions.getY(i);
              const wave = Math.sin(x * 2 + time + index) * Math.cos(y * 2 + time + index) * 0.1;
              positions.setZ(i, wave);
            }
            positions.needsUpdate = true;
            geometry.computeVertexNormals();
          }
        });
      }

      // Animate particles
      if (particleSystemRef.current && showParticles) {
        const geometry = particleSystemRef.current.geometry;
        const positions = geometry.attributes.position.array as Float32Array;
        const velocities = geometry.attributes.velocity.array as Float32Array;

        for (let i = 0; i < positions.length; i += 3) {
          positions[i] += velocities[i];
          positions[i + 1] += velocities[i + 1];
          positions[i + 2] += velocities[i + 2];

          // Reset particles that go too far
          if (Math.abs(positions[i]) > 8 || Math.abs(positions[i + 1]) > 6 || Math.abs(positions[i + 2]) > 8) {
            positions[i] = (Math.random() - 0.5) * 2;
            positions[i + 1] = (Math.random() - 0.5) * 2;
            positions[i + 2] = (Math.random() - 0.5) * 2;
          }
        }

        geometry.attributes.position.needsUpdate = true;
      }

      // Animate individual flower movements
      if (bouquetGroupRef.current) {
        bouquetGroupRef.current.children.forEach((child) => {
          if (child.userData && child.userData.originalPosition) {
            const { originalPosition, swaySpeed, swayAmount } = child.userData;
            child.position.x = originalPosition.x + Math.sin(time * swaySpeed) * swayAmount;
            child.position.z = originalPosition.z + Math.cos(time * swaySpeed * 0.7) * swayAmount;
          }
        });
      }

      // Gentle camera movement
      camera.position.y = 1.5 + Math.sin(time * 0.3) * 0.1;

      renderer.render(scene, camera);
    };

    animate();

    // Handle resize
    const handleResize = () => {
      if (!camera || !renderer || !currentMount) return;

      camera.aspect = currentMount.clientWidth / currentMount.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(currentMount.clientWidth, currentMount.clientHeight);
    };

    window.addEventListener('resize', handleResize);

    // Cleanup
    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }

      window.removeEventListener('resize', handleResize);
      currentMount.removeEventListener('mousedown', handleMouseDown);
      currentMount.removeEventListener('touchstart', handleTouchStart);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('touchmove', handleTouchMove);
      window.removeEventListener('mouseup', handleMouseUp);
      window.removeEventListener('touchend', handleTouchEnd);
      currentMount.removeEventListener('wheel', handleWheel);

      if (currentMount && renderer.domElement) {
        currentMount.removeChild(renderer.domElement);
      }

      renderer.dispose();
    };
  }, [selectedCollection, isDragging, isAutoRotate, showParticles]);

  return (
    <div className="relative w-full h-full bg-card">
      <div ref={mountRef} className="absolute inset-0 w-full h-full cursor-grab active:cursor-grabbing" />

      {/* Collection Info */}
      <div className="absolute top-6 left-6 bg-background/95 backdrop-blur-sm p-4 max-w-xs border border-border rounded-sm">
        <h3 className="font-serif text-lg mb-2 text-foreground">
          {selectedCollection.name}
        </h3>
        <p className="text-sm text-muted-foreground mb-3">
          {selectedCollection.description}
        </p>
        <div className="text-xs text-muted-foreground mb-2">
          <strong>Featured:</strong> {selectedCollection.flowers.join(', ')}
        </div>
        <div className="text-sm font-medium text-foreground">
          {selectedCollection.price}
        </div>
      </div>

      {/* Enhanced Interaction Controls */}
      <div className="absolute top-6 right-6 bg-background/95 backdrop-blur-sm p-3 border border-border rounded-sm">
        <div className="text-xs text-muted-foreground space-y-2">
          <div>🖱️ Drag to rotate</div>
          <div>🔄 Scroll to zoom</div>
          <div>📱 Pinch to zoom</div>
          <div className="flex items-center gap-2">
            <span>Auto-rotate:</span>
            <div className={`w-2 h-2 rounded-full ${isAutoRotate ? 'bg-primary' : 'bg-muted'}`} />
          </div>
          <div className="flex items-center gap-2">
            <span>Particles:</span>
            <button
              onClick={() => setShowParticles(!showParticles)}
              className={`w-2 h-2 rounded-full ${showParticles ? 'bg-primary' : 'bg-muted'}`}
            />
          </div>
        </div>
      </div>

      {/* Enhanced Control Panel */}
      <div className="absolute bottom-6 right-6 flex gap-2">
        <button
          onClick={() => setShowParticles(!showParticles)}
          className="bg-secondary text-secondary-foreground px-3 py-2 text-xs hover:bg-secondary/80 transition-colors rounded-sm"
        >
          {showParticles ? '✨ Hide Particles' : '✨ Show Particles'}
        </button>
        <button
          onClick={() => {
            if (bouquetGroupRef.current) {
              bouquetGroupRef.current.rotation.set(0, 0, 0);
              rotationRef.current = { x: 0, y: 0 };
              setIsAutoRotate(true);
            }
          }}
          className="bg-primary text-primary-foreground px-4 py-2 text-sm hover:bg-primary/90 transition-colors rounded-sm"
        >
          Reset View
        </button>
      </div>
    </div>
  );
};

export default InteractiveFlowerGallery;
