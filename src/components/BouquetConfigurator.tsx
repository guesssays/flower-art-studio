'use client';

import { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';

interface FlowerType {
  id: string;
  name: string;
  color: string;
  price: number;
  season: string;
  description: string;
}

interface BouquetConfig {
  flowers: FlowerType[];
  size: 'small' | 'medium' | 'large';
  style: 'romantic' | 'modern' | 'rustic' | 'luxury';
  wrapStyle: 'paper' | 'ribbon' | 'natural' | 'elegant';
}

interface Props {
  config: BouquetConfig;
}

const BouquetConfigurator = ({ config }: Props) => {
  const mountRef = useRef<HTMLDivElement>(null);
  const sceneRef = useRef<THREE.Scene | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const animationRef = useRef<number>();
  const bouquetGroupRef = useRef<THREE.Group>();
  const cameraRef = useRef<THREE.PerspectiveCamera>();
  const [isDragging, setIsDragging] = useState(false);
  const [isAutoRotate, setIsAutoRotate] = useState(true);
  const [zoom, setZoom] = useState(1.5);
  const mouseRef = useRef({ x: 0, y: 0 });
  const rotationRef = useRef({ x: 0, y: 0 });
  const touchRef = useRef({ startX: 0, startY: 0, distance: 0 });

  useEffect(() => {
    const currentMount = mountRef.current;
    if (!currentMount) return;

    // Создание сцены
    const scene = new THREE.Scene();
    sceneRef.current = scene;
    scene.background = new THREE.Color(0xe6e6e4);

    const camera = new THREE.PerspectiveCamera(
      50,
      currentMount.clientWidth / currentMount.clientHeight,
      0.1,
      1000
    );
    cameraRef.current = camera;

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
    renderer.toneMappingExposure = 1.1;
    rendererRef.current = renderer;
    currentMount.appendChild(renderer.domElement);

    // Группа для букета
    const bouquetGroup = new THREE.Group();
    bouquetGroupRef.current = bouquetGroup;
    scene.add(bouquetGroup);

    // Создание цветка
    const createEnhancedFlower = (flowerType: FlowerType, position: THREE.Vector3, rotation: number) => {
      const group = new THREE.Group();

      // Перевод цвета в нейтральные оттенки
      const neutralizeColor = (hexColor: string) => {
        const colorMappings: { [key: string]: number } = {
          '#e6e6e4': 0xe6e6e4,
          '#dcd9d1': 0xdcd9d1,
          '#cac8c5': 0xcac8c5,
          '#b3b2af': 0xb3b2af,
          '#939393': 0x939393,
          '#d7d7d8': 0xd7d7d8,
          '#bcbcbe': 0xbcbcbe,
        };
        return colorMappings[hexColor] || 0xd7d7d8;
      };
      const neutralColor = neutralizeColor(flowerType.color);

      // Стебель
      const stemGeometry = new THREE.CylinderGeometry(0.015, 0.025, 1.0, 8);
      const stemMaterial = new THREE.MeshLambertMaterial({ color: 0x939393 });
      const stem = new THREE.Mesh(stemGeometry, stemMaterial);
      stem.position.y = 0.5;
      stem.castShadow = true;
      stem.receiveShadow = true;
      group.add(stem);

      // Разные типы цветов
      if (flowerType.name.toLowerCase().includes('rose')) {
        // Роза с несколькими слоями лепестков
        for (let layer = 0; layer < 4; layer++) {
          const petalCount = 6 + layer * 2;
          for (let i = 0; i < petalCount; i++) {
            const petalGeometry = new THREE.SphereGeometry(0.06 - layer * 0.008, 10, 8);
            const petalMaterial = new THREE.MeshLambertMaterial({
              color: new THREE.Color(neutralColor).multiplyScalar(0.8 + layer * 0.05),
              transparent: true,
              opacity: 0.95 - layer * 0.05
            });
            const petal = new THREE.Mesh(petalGeometry, petalMaterial);

            const angle = (i / petalCount) * Math.PI * 2;
            const radius = 0.05 + layer * 0.02;
            petal.position.x = Math.cos(angle) * radius;
            petal.position.z = Math.sin(angle) * radius;
            petal.position.y = 1.0 - layer * 0.015;
            petal.scale.setScalar(0.8 + Math.random() * 0.3);
            petal.castShadow = true;
            group.add(petal);
          }
        }
      } else if (flowerType.name.toLowerCase().includes('orchid')) {
        // Орхидея
        const orchidGeometry = new THREE.ConeGeometry(0.08, 0.12, 8);
        const orchidMaterial = new THREE.MeshLambertMaterial({
          color: neutralColor,
          transparent: true,
          opacity: 0.95
        });
        const orchid = new THREE.Mesh(orchidGeometry, orchidMaterial);
        orchid.position.y = 1.0;
        orchid.rotation.x = Math.PI;
        orchid.castShadow = true;
        group.add(orchid);

        for (let i = 0; i < 5; i++) {
          const petalGeometry = new THREE.BoxGeometry(0.12, 0.02, 0.06);
          const petal = new THREE.Mesh(petalGeometry, orchidMaterial);
          const angle = (i / 5) * Math.PI * 2;
          petal.position.x = Math.cos(angle) * 0.06;
          petal.position.z = Math.sin(angle) * 0.06;
          petal.position.y = 0.95;
          petal.rotation.y = angle;
          petal.rotation.x = Math.sin(angle) * 0.2;
          petal.castShadow = true;
          group.add(petal);
        }
      } else if (flowerType.name.toLowerCase().includes('baby')) {
        // Гипсофила
        for (let cluster = 0; cluster < 3; cluster++) {
          for (let i = 0; i < 5; i++) {
            const smallGeometry = new THREE.SphereGeometry(0.012, 6, 4);
            const smallMaterial = new THREE.MeshLambertMaterial({
              color: neutralColor,
              transparent: true,
              opacity: 0.9
            });
            const small = new THREE.Mesh(smallGeometry, smallMaterial);
            small.position.x = (Math.random() - 0.5) * 0.08 + cluster * 0.03;
            small.position.z = (Math.random() - 0.5) * 0.08;
            small.position.y = 0.9 + Math.random() * 0.15 + cluster * 0.05;
            small.castShadow = true;
            group.add(small);
          }
        }
      } else if (flowerType.name.toLowerCase().includes('eucalyptus')) {
        // Эвкалипт
        for (let i = 0; i < 3; i++) {
          const leafGeometry = new THREE.BoxGeometry(0.06, 0.02, 0.12);
          const leafMaterial = new THREE.MeshLambertMaterial({
            color: neutralColor,
            transparent: true,
            opacity: 0.9
          });
          const leaf = new THREE.Mesh(leafGeometry, leafMaterial);
          leaf.position.y = 0.7 + i * 0.15;
          leaf.position.x = (Math.random() - 0.5) * 0.08;
          leaf.rotation.y = Math.random() * Math.PI;
          leaf.rotation.z = (Math.random() - 0.5) * 0.3;
          leaf.castShadow = true;
          group.add(leaf);
        }
      } else {
        // Универсальный цветок
        const flowerGeometry = new THREE.SphereGeometry(0.06, 12, 8);
        const flowerMaterial = new THREE.MeshLambertMaterial({
          color: neutralColor,
          transparent: true,
          opacity: 0.95
        });
        const flower = new THREE.Mesh(flowerGeometry, flowerMaterial);
        flower.position.y = 1.0;
        flower.castShadow = true;
        group.add(flower);

        for (let i = 0; i < 6; i++) {
          const petalGeometry = new THREE.BoxGeometry(0.03, 0.06, 0.008);
          const petal = new THREE.Mesh(petalGeometry, flowerMaterial);
          const angle = (i / 6) * Math.PI * 2;
          petal.position.x = Math.cos(angle) * 0.07;
          petal.position.z = Math.sin(angle) * 0.07;
          petal.position.y = 1.0;
          petal.rotation.y = angle;
          petal.rotation.x = Math.sin(angle * 2) * 0.15;
          petal.castShadow = true;
          group.add(petal);
        }
      }

      // Лист
      const leafGeometry = new THREE.BoxGeometry(0.06, 0.025, 0.1);
      const leafMaterial = new THREE.MeshLambertMaterial({
        color: 0x939393,
        transparent: true,
        opacity: 0.9
      });
      const leaf = new THREE.Mesh(leafGeometry, leafMaterial);
      leaf.position.y = 0.6 + Math.random() * 0.3;
      leaf.position.x = (Math.random() - 0.5) * 0.1;
      leaf.rotation.y = Math.random() * Math.PI;
      leaf.rotation.z = (Math.random() - 0.5) * 0.3;
      leaf.castShadow = true;
      group.add(leaf);

      group.position.copy(position);
      group.rotation.y = rotation;

      group.userData = {
        originalPosition: { ...position },
        swaySpeed: 0.5 + Math.random() * 0.3,
        swayAmount: 0.015 + Math.random() * 0.02
      };

      return group;
    };

    // Обёртка
    const createEnhancedWrapping = () => {
      const wrapGroup = new THREE.Group();
      const wrapColors = {
        paper: 0xe6e6e4,
        ribbon: 0xbcbcbe,
        natural: 0xdcd9d1,
        elegant: 0xb3b2af
      };
      const wrapColor = wrapColors[config.wrapStyle];

      if (config.wrapStyle === 'ribbon') {
        const ribbonGeometry = new THREE.CylinderGeometry(0.22, 0.22, 0.04, 16);
        const ribbonMaterial = new THREE.MeshLambertMaterial({ color: wrapColor });
        const ribbon = new THREE.Mesh(ribbonGeometry, ribbonMaterial);
        ribbon.position.y = 0.2;
        ribbon.castShadow = true;
        ribbon.receiveShadow = true;
        wrapGroup.add(ribbon);

        const bowGeometry = new THREE.BoxGeometry(0.1, 0.05, 0.04);
        const bow = new THREE.Mesh(bowGeometry, ribbonMaterial);
        bow.position.y = 0.28;
        bow.position.x = 0.18;
        bow.castShadow = true;
        wrapGroup.add(bow);
      } else {
        const wrapGeometry = new THREE.CylinderGeometry(0.2, 0.24, 0.5, 12);
        const wrapMaterial = new THREE.MeshLambertMaterial({
          color: wrapColor,
          transparent: true,
          opacity: 0.85
        });
        const wrap = new THREE.Mesh(wrapGeometry, wrapMaterial);
        wrap.position.y = 0.25;
        wrap.castShadow = true;
        wrap.receiveShadow = true;
        wrapGroup.add(wrap);
      }
      return wrapGroup;
    };

    // Обновление букета по config
    const updateBouquet = () => {
      bouquetGroup.clear();
      if (config.flowers.length === 0) {
        const placeholderGeometry = new THREE.BoxGeometry(0.08, 0.08, 0.08);
        const placeholderMaterial = new THREE.MeshLambertMaterial({
          color: 0xbcbcbe,
          transparent: true,
          opacity: 0.4,
          wireframe: true
        });
        const placeholder = new THREE.Mesh(placeholderGeometry, placeholderMaterial);
        placeholder.position.y = 0.5;
        bouquetGroup.add(placeholder);
        return;
      }
      const sizeMultipliers = { small: 0.7, medium: 1.0, large: 1.4 };
      const sizeMultiplier = sizeMultipliers[config.size];

      const getEnhancedArrangementPattern = (index: number, total: number) => {
        const baseRadius = 0.1 * sizeMultiplier;
        switch (config.style) {
          case 'romantic': {
            const spiralAngle = (index / total) * Math.PI * 2 * 2;
            const spiralRadius = baseRadius * (1 + Math.sin(spiralAngle * 0.5) * 0.3);
            return {
              x: Math.cos(spiralAngle) * spiralRadius,
              z: Math.sin(spiralAngle) * spiralRadius,
              rotation: spiralAngle
            };
          }
          case 'modern': {
            const gridSize = Math.ceil(Math.sqrt(total));
            const row = Math.floor(index / gridSize);
            const col = index % gridSize;
            return {
              x: (col - gridSize / 2) * baseRadius * 0.8,
              z: (row - gridSize / 2) * baseRadius * 0.8,
              rotation: (row + col) * 0.5
            };
          }
          case 'rustic': {
            const rustRadius = baseRadius * (0.8 + Math.random() * 0.8);
            const rustAngle = Math.random() * Math.PI * 2;
            return {
              x: Math.cos(rustAngle) * rustRadius,
              z: Math.sin(rustAngle) * rustRadius,
              rotation: Math.random() * Math.PI
            };
          }
          case 'luxury': {
            const tier = Math.floor(index / 3);
            const posInTier = index % 3;
            const tierRadius = baseRadius * (0.4 + tier * 0.4);
            const tierAngle = (posInTier / 3) * Math.PI * 2 + tier * 0.5;
            return {
              x: Math.cos(tierAngle) * tierRadius,
              z: Math.sin(tierAngle) * tierRadius,
              rotation: tierAngle
            };
          }
          default:
            return { x: 0, z: 0, rotation: 0 };
        }
      };

      config.flowers.forEach((flower, index) => {
        const pattern = getEnhancedArrangementPattern(index, config.flowers.length);
        const position = new THREE.Vector3(pattern.x, 0, pattern.z);
        const flowerMesh = createEnhancedFlower(flower, position, pattern.rotation);
        flowerMesh.scale.setScalar(sizeMultiplier);
        bouquetGroup.add(flowerMesh);
      });

      const wrapping = createEnhancedWrapping();
      wrapping.scale.setScalar(sizeMultiplier);
      bouquetGroup.add(wrapping);
    };

    updateBouquet();

    // Основание
    const groundGeometry = new THREE.CircleGeometry(2, 32);
    const groundMaterial = new THREE.MeshLambertMaterial({
      color: 0xd7d7d8,
      transparent: true,
      opacity: 0.6
    });
    const ground = new THREE.Mesh(groundGeometry, groundMaterial);
    ground.rotation.x = -Math.PI / 2;
    ground.position.y = -0.5;
    ground.receiveShadow = true;
    scene.add(ground);

    // Свет
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.7);
    scene.add(ambientLight);

    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
    directionalLight.position.set(4, 6, 3);
    directionalLight.castShadow = true;
    directionalLight.shadow.mapSize.width = 1024;
    directionalLight.shadow.mapSize.height = 1024;
    directionalLight.shadow.camera.near = 0.5;
    directionalLight.shadow.camera.far = 15;
    directionalLight.shadow.camera.left = -3;
    directionalLight.shadow.camera.right = 3;
    directionalLight.shadow.camera.top = 3;
    directionalLight.shadow.camera.bottom = -3;
    scene.add(directionalLight);

    const fillLight = new THREE.DirectionalLight(0xffffff, 0.3);
    fillLight.position.set(-2, 4, -2);
    scene.add(fillLight);

    camera.position.set(0.6, 1.2, zoom);
    camera.lookAt(0, 0.5, 0);

    // Управление мышью и тачем
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
      rotationRef.current.y += deltaX * 0.01;
      rotationRef.current.x += deltaY * 0.01;
      rotationRef.current.x = Math.max(-Math.PI / 2, Math.min(Math.PI / 2, rotationRef.current.x));
      bouquetGroupRef.current.rotation.y = rotationRef.current.y;
      bouquetGroupRef.current.rotation.x = rotationRef.current.x;
      mouseRef.current.x = event.clientX;
      mouseRef.current.y = event.clientY;
    };
    const handleMouseUp = () => {
      setIsDragging(false);
      setTimeout(() => {
        if (!isDragging) setIsAutoRotate(true);
      }, 2000);
    };
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
        rotationRef.current.y += deltaX * 0.008;
        rotationRef.current.x += deltaY * 0.008;
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
        const zoomDelta = (distance - touchRef.current.distance) * 0.005;
        const newZoom = Math.max(0.8, Math.min(3, zoom - zoomDelta));
        setZoom(newZoom);
        camera.position.z = newZoom;
        touchRef.current.distance = distance;
      }
    };
    const handleTouchEnd = () => {
      setIsDragging(false);
      setTimeout(() => {
        if (!isDragging) setIsAutoRotate(true);
      }, 2000);
    };
    const handleWheel = (event: WheelEvent) => {
      event.preventDefault();
      const zoomDelta = event.deltaY * 0.001;
      const newZoom = Math.max(0.8, Math.min(3, zoom + zoomDelta));
      setZoom(newZoom);
      camera.position.z = newZoom;
    };

    currentMount.addEventListener('mousedown', handleMouseDown);
    currentMount.addEventListener('touchstart', handleTouchStart);
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('touchmove', handleTouchMove, { passive: false });
    window.addEventListener('mouseup', handleMouseUp);
    window.addEventListener('touchend', handleTouchEnd);
    currentMount.addEventListener('wheel', handleWheel);

    const animate = () => {
      animationRef.current = requestAnimationFrame(animate);
      const time = Date.now() * 0.001;
      if (isAutoRotate && bouquetGroupRef.current) {
        bouquetGroupRef.current.rotation.y = time * 0.2;
        rotationRef.current.y = time * 0.2;
      }
      if (bouquetGroupRef.current) {
        bouquetGroupRef.current.children.forEach((child) => {
          if (child.userData && child.userData.originalPosition) {
            const { originalPosition, swaySpeed, swayAmount } = child.userData;
            child.position.x = originalPosition.x + Math.sin(time * swaySpeed) * swayAmount;
            child.position.z = originalPosition.z + Math.cos(time * swaySpeed * 0.8) * swayAmount;
          }
        });
      }
      camera.position.y = 1.2 + Math.sin(time * 0.4) * 0.05;
      renderer.render(scene, camera);
    };
    animate();

    const handleResize = () => {
      if (!camera || !renderer || !currentMount) return;
      camera.aspect = currentMount.clientWidth / currentMount.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(currentMount.clientWidth, currentMount.clientHeight);
    };
    window.addEventListener('resize', handleResize);

    return () => {
      if (animationRef.current) cancelAnimationFrame(animationRef.current);
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
  }, [config, isDragging, isAutoRotate, zoom]);

  const resetView = () => {
    if (bouquetGroupRef.current && cameraRef.current) {
      rotationRef.current = { x: 0, y: 0 };
      bouquetGroupRef.current.rotation.set(0, 0, 0);
      setZoom(1.5);
      cameraRef.current.position.z = 1.5;
      setIsAutoRotate(true);
    }
  };

  return (
    <div className="relative w-full h-full bg-card">
      <div ref={mountRef} className="absolute inset-0 w-full h-full cursor-grab active:cursor-grabbing" />

      {/* Информационное окно для пустого букета */}
      {config.flowers.length === 0 ? (
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center bg-background/95 backdrop-blur-sm p-6 border border-border rounded-sm">
            <h3 className="font-serif text-lg mb-2 text-foreground">
              Начните создание
            </h3>
            <p className="text-sm text-muted-foreground">
              Выберите цветы, чтобы увидеть ваш букет
            </p>
          </div>
        </div>
      ) : (
        <>
          {/* Оверлей управления */}
          <div className="absolute top-4 left-4 bg-background/90 backdrop-blur-sm p-2 border border-border rounded-sm">
            <div className="text-xs text-muted-foreground space-y-1">
              <div>🖱️ Тяните для вращения</div>
              <div>🔄 Колесо мыши — зум</div>
              <div>📱 Сведение/разведение — масштаб</div>
              <div className="flex items-center gap-1">
                <span>Авто:</span>
                <div className={`w-1.5 h-1.5 rounded-full ${isAutoRotate ? 'bg-primary' : 'bg-muted'}`} />
              </div>
            </div>
          </div>

          {/* Панель инструментов */}
          <div className="absolute bottom-4 right-4 flex flex-col gap-2">
            <div className="flex flex-col gap-1">
              <button
                onClick={() => {
                  const newZoom = Math.max(0.8, zoom - 0.2);
                  setZoom(newZoom);
                  if (cameraRef.current) {
                    cameraRef.current.position.z = newZoom;
                  }
                }}
                className="w-8 h-8 bg-background/90 backdrop-blur-sm border border-border rounded text-foreground hover:bg-secondary transition-colors text-xs flex items-center justify-center"
                title="Отдалить"
              >
                −
              </button>
              <button
                onClick={() => {
                  const newZoom = Math.min(3, zoom + 0.2);
                  setZoom(newZoom);
                  if (cameraRef.current) {
                    cameraRef.current.position.z = newZoom;
                  }
                }}
                className="w-8 h-8 bg-background/90 backdrop-blur-sm border border-border rounded text-foreground hover:bg-secondary transition-colors text-xs flex items-center justify-center"
                title="Приблизить"
              >
                +
              </button>
            </div>
            <button
              onClick={resetView}
              className="px-3 py-2 bg-primary text-primary-foreground hover:bg-primary/90 transition-colors rounded text-xs"
              title="Сбросить вид"
            >
              ↻ Сброс
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default BouquetConfigurator;
