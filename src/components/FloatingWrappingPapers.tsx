'use client';

import { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';

interface FloatingWrappingPapersProps {
  intensity?: 'subtle' | 'medium' | 'dramatic';
  showControls?: boolean;
  autoStart?: boolean;
}

const FloatingWrappingPapers = ({
  intensity = 'medium',
  showControls = false,
  autoStart = true
}: FloatingWrappingPapersProps) => {
  const mountRef = useRef<HTMLDivElement>(null);
  const sceneRef = useRef<THREE.Scene | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const animationRef = useRef<number>();
  const wrappingPapersRef = useRef<THREE.Group>();
  const particleSystemsRef = useRef<THREE.Points[]>([]);
  const [isAnimating, setIsAnimating] = useState(autoStart);
  const [currentIntensity, setCurrentIntensity] = useState(intensity);

  useEffect(() => {
    const currentMount = mountRef.current;
    if (!currentMount) return;

    // Scene setup
    const scene = new THREE.Scene();
    sceneRef.current = scene;

    // Camera
    const camera = new THREE.PerspectiveCamera(
      45,
      currentMount.clientWidth / currentMount.clientHeight,
      0.1,
      100
    );
    camera.position.set(0, 0, 15);
    camera.lookAt(0, 0, 0);

    // Renderer
    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true,
      powerPreference: "high-performance"
    });
    renderer.setSize(currentMount.clientWidth, currentMount.clientHeight);
    renderer.setClearColor(0x000000, 0);
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.1; // CHANGED: чуть ярче бумаги
    rendererRef.current = renderer;

    currentMount.appendChild(renderer.domElement);

    // Soft bloom effect для бумаг (Blur Postprocessing — через canvas и слои)
    // Можно интегрировать three/examples/jsm/postprocessing, но это core версия без зависимостей.
    // Мягкий свет достигается Material-ами и освещением (см. ниже).

    // ADDED: “Bokeh” Blur Particles
const createBokeh = () => {
  const bokehGroup = new THREE.Group();
  for (let i = 0; i < 8; i++) {
    // уменьшенный размер
    const size = 0.55 + Math.random() * 0.55;
    const geo = new THREE.CircleGeometry(size, 32);
    const color = new THREE.Color(['#ffe9b0','#ffb6c1','#e1f7d5','#c3caff'][i%4]);
    const mat = new THREE.MeshBasicMaterial({
      color,
      opacity: 0.11 + Math.random() * 0.10,
      transparent: true,
      depthWrite: false,
    });
    const mesh = new THREE.Mesh(geo, mat);
    mesh.position.set(
      (Math.random() - 0.5) * 14,
      (Math.random() - 0.5) * 8,
      -2 - Math.random() * 9
    );
    mesh.userData = {
      // замедленная скорость
      speed: 0.013 + Math.random() * 0.015,
      dir: Math.random() > 0.5 ? 1 : -1
    };
    bokehGroup.add(mesh);
  }
  return bokehGroup;
};


    // Create colorful wrapping paper texture patterns with Bloom & Wild colors
    const createColorfulPaperTexture = (type: string, colorType: string) => {
      const canvas = document.createElement('canvas');
      canvas.width = 256;
      canvas.height = 256;
      const ctx = canvas.getContext('2d');
      if (!ctx) return null;

      // Bloom & Wild vibrant colors for wrapping papers
      const colorPalettes = {
        coral: ['#d95871', '#f3a8a8', '#ff6b6b'], // Coral/Pink tones
        sunshine: ['#ede691', '#f4d03f', '#f7dc6f'], // Bright yellows
        emerald: ['#3bb39e', '#52c41a', '#73d13d'], // Green/Turquoise tones
        terra: ['#9c5d37', '#cd6155', '#ec7063'], // Warm browns/oranges
        navy: ['#071a3a', '#3f51b5', '#5c6bc0'], // Deep blues
        peach: ['#d1a794', '#f5b7b1', '#fadbd8'], // Soft peaches
        lavender: ['#b688a3', '#bb8fce', '#d2b4de'], // Purple/Lavender
        golden: ['#d49e4c', '#f39c12', '#f8c471'] // Golden oranges
      };

      const palette = colorPalettes[colorType as keyof typeof colorPalettes] || colorPalettes.coral;
      const baseColor = palette[0];
      const accentColor1 = palette[1];
      const accentColor2 = palette[2];

      // Fill with base color
      ctx.fillStyle = baseColor;
      ctx.fillRect(0, 0, 256, 256);

      switch (type) {
        case 'floral':
          // Floral pattern
          ctx.fillStyle = accentColor1;
          for (let i = 0; i < 20; i++) {
            const x = Math.random() * 256;
            const y = Math.random() * 256;
            ctx.beginPath();
            ctx.arc(x, y, 8 + Math.random() * 6, 0, Math.PI * 2);
            ctx.fill();

            // Add petals
            for (let j = 0; j < 5; j++) {
              const angle = (j / 5) * Math.PI * 2;
              const px = x + Math.cos(angle) * 12;
              const py = y + Math.sin(angle) * 12;
              ctx.beginPath();
              ctx.arc(px, py, 3, 0, Math.PI * 2);
              ctx.fillStyle = accentColor2;
              ctx.fill();
            }
          }
          break;

        case 'stripes':
          // Colorful stripes
          ctx.fillStyle = accentColor1;
          for (let i = 0; i < 256; i += 20) {
            ctx.fillRect(i, 0, 10, 256);
          }
          ctx.fillStyle = accentColor2;
          for (let i = 10; i < 256; i += 40) {
            ctx.fillRect(i, 0, 5, 256);
          }
          break;

        case 'dots':
          // Polka dots
          ctx.fillStyle = accentColor1;
          for (let x = 0; x < 256; x += 32) {
            for (let y = 0; y < 256; y += 32) {
              ctx.beginPath();
              ctx.arc(x + 16, y + 16, 8, 0, Math.PI * 2);
              ctx.fill();
            }
          }
          ctx.fillStyle = accentColor2;
          for (let x = 16; x < 256; x += 32) {
            for (let y = 16; y < 256; y += 32) {
              ctx.beginPath();
              ctx.arc(x + 16, y + 16, 4, 0, Math.PI * 2);
              ctx.fill();
            }
          }
          break;

        case 'geometric':
          // Geometric patterns
          ctx.strokeStyle = accentColor1;
          ctx.lineWidth = 2;
          for (let x = 0; x < 256; x += 32) {
            for (let y = 0; y < 256; y += 32) {
              ctx.strokeRect(x, y, 16, 16);
              ctx.strokeRect(x + 8, y + 8, 16, 16);
            }
          }
          ctx.fillStyle = accentColor2;
          for (let x = 0; x < 256; x += 64) {
            for (let y = 0; y < 256; y += 64) {
              ctx.fillRect(x + 12, y + 12, 8, 8);
            }
          }
          break;

        case 'watercolor':
          // Watercolor effect
          const gradient = ctx.createRadialGradient(128, 128, 0, 128, 128, 128);
          gradient.addColorStop(0, accentColor1);
          gradient.addColorStop(0.5, accentColor2);
          gradient.addColorStop(1, baseColor);
          ctx.fillStyle = gradient;
          ctx.fillRect(0, 0, 256, 256);

          // Add splotches
          for (let i = 0; i < 15; i++) {
            const x = Math.random() * 256;
            const y = Math.random() * 256;
            const size = 20 + Math.random() * 30;
            const grad = ctx.createRadialGradient(x, y, 0, x, y, size);
            grad.addColorStop(0, accentColor1 + '80');
            grad.addColorStop(1, 'transparent');
            ctx.fillStyle = grad;
            ctx.beginPath();
            ctx.arc(x, y, size, 0, Math.PI * 2);
            ctx.fill();
          }
          break;

        default:
          // Simple color wash
          const simpleGrad = ctx.createLinearGradient(0, 0, 256, 256);
          simpleGrad.addColorStop(0, baseColor);
          simpleGrad.addColorStop(1, accentColor1);
          ctx.fillStyle = simpleGrad;
          ctx.fillRect(0, 0, 256, 256);
      }

      const texture = new THREE.CanvasTexture(canvas);
      texture.wrapS = THREE.RepeatWrapping;
      texture.wrapT = THREE.RepeatWrapping;
      texture.repeat.set(1, 1);
      return texture;
    };

   
    // Floating Wrapping Papers с глубиной, светом и "текстурой" бумаги
    const createFloatingWrappingPapers = () => {
      const papersGroup = new THREE.Group();
      wrappingPapersRef.current = papersGroup;

      const intensitySettings = {
        subtle: { count: 7, size: [1.2, 1.8], opacity: [0.65, 0.82], speed: [0.18, 0.34], zSpread: [1, 4] },
        medium: { count: 11, size: [1.4, 2.6], opacity: [0.7, 0.93], speed: [0.28, 0.6], zSpread: [1, 7] },
        dramatic: { count: 15, size: [1.8, 3.2], opacity: [0.77, 1.0], speed: [0.39, 0.85], zSpread: [1, 10] }
      };
      const settings = intensitySettings[currentIntensity];
      const paperTypes = ['floral', 'stripes', 'dots', 'geometric', 'watercolor'];
      const colorTypes = ['coral', 'sunshine', 'emerald', 'terra', 'navy', 'peach', 'lavender', 'golden'];

      for (let i = 0; i < settings.count; i++) {
        const paperShape = Math.random();
        let geometry: THREE.PlaneGeometry;

        if (paperShape < 0.25) {
          const size = settings.size[0] + Math.random() * (settings.size[1] - settings.size[0]);
          geometry = new THREE.PlaneGeometry(size, size, 24, 24);
        } else if (paperShape < 0.7) {
          const width = settings.size[0] + Math.random() * (settings.size[1] - settings.size[0]);
          const height = width * (0.7 + Math.random() * 0.7);
          geometry = new THREE.PlaneGeometry(width, height, 28, 24);
        } else {
          const width = settings.size[0] + Math.random() * (settings.size[1] - settings.size[0]);
          const height = width * (0.65 + Math.random() * 0.8);
          geometry = new THREE.PlaneGeometry(width, height, 28, 32);
          // Irregular edges
          const positions = geometry.attributes.position;
          for (let j = 0; j < positions.count; j++) {
            const x = positions.getX(j);
            const y = positions.getY(j);
            const distort = Math.sin(x * 2 + i) * Math.cos(y * 1.5 + i) * 0.07;
            positions.setZ(j, distort + (Math.random() - 0.5) * 0.03);
          }
        }

        // Extra "thickness" of paper edges
        const positions = geometry.attributes.position;
        for (let j = 0; j < positions.count; j++) {
          const x = positions.getX(j);
          const y = positions.getY(j);
          // Folds + "edge" highlight
          const fold1 = Math.sin(x * 4 + i * 0.8) * Math.cos(y * 3 + i * 1.1) * 0.045;
          const fold2 = Math.sin(x * 2.2 + i * 1.2) * Math.sin(y * 2 + i * 0.6) * 0.024;
          const wrink = (Math.random() - 0.5) * 0.015;
          const edgeHighlight = Math.abs(x) > 0.7 ? 0.017 : 0;
          positions.setZ(j, positions.getZ(j) + fold1 + fold2 + wrink + edgeHighlight);
        }
        geometry.computeVertexNormals();

        const paperType = paperTypes[Math.floor(Math.random() * paperTypes.length)];
        const colorType = colorTypes[Math.floor(Math.random() * colorTypes.length)];
        const texture = createColorfulPaperTexture(paperType, colorType);

        const opacity = settings.opacity[0] + Math.random() * (settings.opacity[1] - settings.opacity[0]);
        // CHANGED: добавил отражения и легкий “shine” по краям
        const material = new THREE.MeshPhysicalMaterial({
          map: texture,
          transparent: true,
          opacity,
          side: THREE.DoubleSide,
          depthWrite: false,
          roughness: 0.54,
          transmission: 0.18,
          reflectivity: 0.18,
          clearcoat: 0.28,
          clearcoatRoughness: 0.14,
          sheen: 0.23,
          sheenColor: new THREE.Color('#fff'),
          sheenRoughness: 0.38
        });

        const paper = new THREE.Mesh(geometry, material);

        // More layered Z-spread, for parallax
        const radius = 4 + Math.random() * 8;
        const theta = Math.random() * Math.PI * 2;
        const phi = (Math.random() - 0.5) * Math.PI * 0.55;

        paper.position.x = Math.sin(phi) * Math.cos(theta) * radius;
        paper.position.y = (Math.random() - 0.5) * 9;
        paper.position.z = (Math.random() - 0.5) * (settings.zSpread[1] - settings.zSpread[0]) + settings.zSpread[0];

        // Rotation и “вращение по ветру”
        paper.rotation.x = (Math.random() - 0.5) * Math.PI * 0.5;
        paper.rotation.y = Math.random() * Math.PI * 2;
        paper.rotation.z = (Math.random() - 0.5) * Math.PI * 0.38;

        // Animation properties
        const speed = settings.speed[0] + Math.random() * (settings.speed[1] - settings.speed[0]);
        paper.userData = {
          originalPosition: { ...paper.position },
          originalRotation: { ...paper.rotation },
          animationOffset: i * 0.5,
          floatSpeed: speed,
          orbitRadius: radius * 0.22,
          wavePhase: Math.random() * Math.PI * 2,
          rotationAxis: new THREE.Vector3(
            Math.random() - 0.5,
            0.2 + Math.random() * 0.3,
            Math.random() - 0.5
          ).normalize(),
          flutterIntensity: 0.53 + Math.random() * 0.5
        };

        papersGroup.add(paper);
      }

      return papersGroup;
    };

    // Create colorful paper particles
    const createColorfulPaperParticles = () => {
      const systems: THREE.Points[] = [];

      const intensitySettings = {
        subtle: { systemCount: 1, particleCount: 30, spread: 10 },
        medium: { systemCount: 2, particleCount: 50, spread: 14 },
        dramatic: { systemCount: 3, particleCount: 80, spread: 18 }
      };

      const settings = intensitySettings[currentIntensity];

      for (let s = 0; s < settings.systemCount; s++) {
        const geometry = new THREE.BufferGeometry();
        const positions = new Float32Array(settings.particleCount * 3);
        const colors = new Float32Array(settings.particleCount * 3);
        const velocities = new Float32Array(settings.particleCount * 3);
        const lifetimes = new Float32Array(settings.particleCount);

        // Bright colors for particles
        const particleColors = [
          new THREE.Color('#d95871'), // Coral
          new THREE.Color('#ede691'), // Sunshine
          new THREE.Color('#3bb39e'), // Emerald
          new THREE.Color('#d49e4c'), // Golden
          new THREE.Color('#b688a3'), // Lavender
          new THREE.Color('#d1a794'), // Peach
        ];

        for (let i = 0; i < settings.particleCount; i++) {
          const i3 = i * 3;

          // Random positions around scene
          positions[i3] = (Math.random() - 0.5) * settings.spread;
          positions[i3 + 1] = (Math.random() - 0.5) * settings.spread * 0.8;
          positions[i3 + 2] = (Math.random() - 0.5) * settings.spread;

          // Gentle floating velocities
          velocities[i3] = (Math.random() - 0.5) * 0.008;
          velocities[i3 + 1] = Math.random() * 0.003 + 0.001;
          velocities[i3 + 2] = (Math.random() - 0.5) * 0.008;

          // Random colorful particles
          const color = particleColors[Math.floor(Math.random() * particleColors.length)];
          colors[i3] = color.r;
          colors[i3 + 1] = color.g;
          colors[i3 + 2] = color.b;

          // Random lifetimes
          lifetimes[i] = Math.random() * 200 + 100;
        }

        geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
        geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));
        geometry.setAttribute('velocity', new THREE.BufferAttribute(velocities, 3));
        geometry.setAttribute('lifetime', new THREE.BufferAttribute(lifetimes, 1));

        const material = new THREE.PointsMaterial({
          size: 0.02 + s * 0.008,
          transparent: true,
          opacity: 0.7 - s * 0.1,
          blending: THREE.AdditiveBlending,
          depthWrite: false,
          vertexColors: true
        });

        const particles = new THREE.Points(geometry, material);
        particles.position.y = s * 3 - 2;

        systems.push(particles);
        scene.add(particles);
      }

      particleSystemsRef.current = systems;
      return systems;
    };

   // ADDED: Bokeh
    const bokeh = createBokeh();
    scene.add(bokeh);

    // Создание и добавление бумаг и частиц
    const wrappingPapers = createFloatingWrappingPapers();
    const paperParticles = createColorfulPaperParticles();
    scene.add(wrappingPapers);

    // Свет и реализм
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.72);
    scene.add(ambientLight);
    const spotLight1 = new THREE.SpotLight(0xfff6e3, 0.12, 28, Math.PI / 3, 0.55);
    spotLight1.position.set(-8, 12, 10);
    scene.add(spotLight1);
    const spotLight2 = new THREE.SpotLight(0xb7e3ff, 0.09, 18, Math.PI / 3, 0.7);
    spotLight2.position.set(7, 7, 7);
    scene.add(spotLight2);

    // Ещё три разноцветных directional light
    [
      { color: 0xffd700, position: [6, 9, 4] },
      { color: 0xff69b4, position: [-7, 5, -3] },
      { color: 0x36c4c6, position: [0, 6, 8] }
    ].forEach(light => {
      const dirLight = new THREE.DirectionalLight(light.color, 0.18);
      dirLight.position.set(...(light.position as [number, number, number]));
      scene.add(dirLight);
    });

    // Animation
    const animate = () => {
      if (!isAnimating) return;
      animationRef.current = requestAnimationFrame(animate);

      const time = Date.now() * 0.001;

      // Бумаги
      if (wrappingPapersRef.current) {
        wrappingPapersRef.current.children.forEach((paper, index) => {
          if (paper.userData) {
            const {
              originalPosition,
              animationOffset,
              floatSpeed,
              orbitRadius,
              wavePhase,
              flutterIntensity
            } = paper.userData;
            // Circular parallax
            const orbitTime = time * floatSpeed + animationOffset;
            paper.position.x = originalPosition.x + Math.cos(orbitTime) * orbitRadius * 0.47;
            paper.position.z = originalPosition.z + Math.sin(orbitTime) * orbitRadius * 0.4;
            paper.position.y = originalPosition.y + Math.sin(orbitTime * 0.65 + wavePhase) * 0.7;
            // Бумажная “дрожь”
            const flutter = Math.sin(time * 2.15 + animationOffset) * flutterIntensity * 0.022;
            paper.rotation.x = paper.userData.originalRotation.x + flutter;
            paper.rotation.z = paper.userData.originalRotation.z + flutter * 0.6;
            // Медленный разворот вокруг Y
            paper.rotation.y += floatSpeed * 0.006;
            // Волны бумаги
            const mesh = paper as THREE.Mesh;
            const geometry = mesh.geometry as THREE.PlaneGeometry;
            const positions = geometry.attributes.position;
            for (let i = 0; i < positions.count; i++) {
              const x = positions.getX(i);
              const y = positions.getY(i);
              // Deep paper waves
              const wave1 = Math.sin(x * 3.2 + time * 0.55 + index) * Math.cos(y * 2.7 + time * 0.37 + index) * 0.033;
              const wave2 = Math.sin(x * 1.8 + time * 0.68 + index * 2.1) * Math.sin(y * 1.65 + time * 0.38 + index) * 0.021;
              const fold = Math.sin(time + x * 2.1 + y + index) * 0.012;
              positions.setZ(i, wave1 + wave2 + fold);
            }
            positions.needsUpdate = true;
            geometry.computeVertexNormals();
          }
        });
      }

      // Частицы бумаги
      particleSystemsRef.current.forEach((particles) => {
        const geometry = particles.geometry;
        const positions = geometry.attributes.position.array as Float32Array;
        const velocities = geometry.attributes.velocity.array as Float32Array;
        const lifetimes = geometry.attributes.lifetime.array as Float32Array;
        for (let i = 0; i < positions.length; i += 3) {
          positions[i] += velocities[i];
          positions[i + 1] += velocities[i + 1];
          positions[i + 2] += velocities[i + 2];
          lifetimes[i / 3] -= 0.3;
          if (
            lifetimes[i / 3] <= 0 ||
            Math.abs(positions[i]) > 15 ||
            Math.abs(positions[i + 1]) > 10 ||
            Math.abs(positions[i + 2]) > 15
          ) {
            positions[i] = (Math.random() - 0.5) * 8;
            positions[i + 1] = -5 + Math.random() * 2;
            positions[i + 2] = (Math.random() - 0.5) * 8;
            velocities[i] = (Math.random() - 0.5) * 0.008;
            velocities[i + 1] = Math.random() * 0.003 + 0.001;
            velocities[i + 2] = (Math.random() - 0.5) * 0.008;
            lifetimes[i / 3] = Math.random() * 200 + 100;
          }
        }
        geometry.attributes.position.needsUpdate = true;
        geometry.attributes.lifetime.needsUpdate = true;
      });

      // ADDED: Animate bokeh
      bokeh.children.forEach((circle: THREE.Object3D, idx: number) => {
        circle.position.x += circle.userData.speed * circle.userData.dir;
        if (Math.abs(circle.position.x) > 14) {
          circle.position.x = -circle.position.x;
        }
      });

      renderer.render(scene, camera);
    };

    if (isAnimating) animate();

    // Resize
    const handleResize = () => {
      if (!camera || !renderer || !currentMount) return;
      camera.aspect = currentMount.clientWidth / currentMount.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(currentMount.clientWidth, currentMount.clientHeight);
    };
    window.addEventListener('resize', handleResize);

    // Cleanup
    return () => {
      if (animationRef.current) cancelAnimationFrame(animationRef.current);
      window.removeEventListener('resize', handleResize);
      if (currentMount && renderer.domElement) currentMount.removeChild(renderer.domElement);
      renderer.dispose();
    };
  }, [currentIntensity, isAnimating]);

  return (
    <div className="fixed inset-0 pointer-events-none z-10">
      <div ref={mountRef} className="absolute inset-0 w-full h-full" />
      {showControls && (
        <div className="absolute top-4 right-4 pointer-events-auto">
          <div className="bg-background/95 backdrop-blur-sm p-3 border border-border rounded-sm space-y-2">
            <div className="text-xs text-muted-foreground">Colorful Wrapping Papers</div>
            <div className="flex items-center gap-2">
              <span className="text-xs">Animation:</span>
              <button
                onClick={() => setIsAnimating(!isAnimating)}
                className={`w-2 h-2 rounded-full ${isAnimating ? 'bg-primary' : 'bg-muted'}`}
              />
            </div>
            <div className="space-y-1">
              <div className="text-xs text-muted-foreground">Intensity:</div>
              <div className="flex gap-1">
                {(['subtle', 'medium', 'dramatic'] as const).map((level) => (
                  <button
                    key={level}
                    onClick={() => setCurrentIntensity(level)}
                    className={`px-2 py-1 text-xs rounded-sm transition-colors ${
                      currentIntensity === level
                        ? 'bg-primary text-primary-foreground'
                        : 'bg-secondary text-secondary-foreground hover:bg-secondary/80'
                    }`}
                  >
                    {level.charAt(0).toUpperCase() + level.slice(1)}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default FloatingWrappingPapers;