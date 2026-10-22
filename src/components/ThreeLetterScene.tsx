import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { RoomEnvironment } from 'three/addons/environments/RoomEnvironment.js';
import { AuthorProfile } from '../types/portfolio';
import { ColorTheme } from '../types/theme';
import { RotateCw, Send, Compass, Eye, Maximize2, Sparkles, ChevronDown, ChevronUp } from 'lucide-react';

interface ThreeLetterSceneProps {
  profile: AuthorProfile;
  tone: string;
  theme: ColorTheme;
}

export const ThreeLetterScene: React.FC<ThreeLetterSceneProps> = ({ profile, tone, theme }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeView, setActiveView] = useState<'desk' | 'inspect' | 'airplane'>('desk');
  const [paperTheme, setPaperTheme] = useState<'cream' | 'dark' | 'parchment'>('cream');
  const [isLaunched, setIsLaunched] = useState(false);
  const [isDockCollapsed, setIsDockCollapsed] = useState(false);

  // References to communicate state into Three.js render loop without teardown
  const sceneStateRef = useRef({
    activeView: 'desk' as 'desk' | 'inspect' | 'airplane',
    targetCameraPos: new THREE.Vector3(0, 3.8, 4.8),
    targetLookAt: new THREE.Vector3(0, 0, 0),
    isLaunched: false,
    airplaneFlightTime: 0,
    paperTheme: 'cream' as 'cream' | 'dark' | 'parchment',
    isHovered: false,
    mouseX: 0,
    mouseY: 0,
  });

  useEffect(() => {
    sceneStateRef.current.activeView = activeView;
    sceneStateRef.current.paperTheme = paperTheme;
    sceneStateRef.current.isLaunched = isLaunched;

    if (activeView === 'desk') {
      sceneStateRef.current.targetCameraPos.set(0, 3.5, 4.5);
      sceneStateRef.current.targetLookAt.set(0, 0.1, 0);
    } else if (activeView === 'inspect') {
      sceneStateRef.current.targetCameraPos.set(0, 1.8, 1.9);
      sceneStateRef.current.targetLookAt.set(0, 0.15, -0.2);
    } else if (activeView === 'airplane') {
      sceneStateRef.current.targetCameraPos.set(0, 2.5, 5.0);
      sceneStateRef.current.targetLookAt.set(0, 0.8, 0);
    }
  }, [activeView, paperTheme, isLaunched]);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // Detect software WebGL as per Three.js skill guidelines
    const isSoftwareGl = (() => {
      const gl = document.createElement('canvas').getContext('webgl2');
      if (!gl) return true;
      const ext = gl.getExtension('WEBGL_debug_renderer_info');
      const param = ext ? ext.UNMASKED_RENDERER_WEBGL : gl.RENDERER;
      const gpu = String(gl.getParameter(param));
      gl.getExtension('WEBGL_lose_context')?.loseContext();
      return /SwiftShader|llvmpipe|softpipe|Software|Basic Render/i.test(gpu);
    })();

    // Setup Renderer
    const renderer = new THREE.WebGLRenderer({
      antialias: !isSoftwareGl,
      powerPreference: 'high-performance',
      alpha: true,
    });
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.15;
    renderer.setPixelRatio(isSoftwareGl ? 1 : Math.min(window.devicePixelRatio, 2));
    renderer.shadowMap.enabled = !isSoftwareGl;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    renderer.setSize(container.clientWidth, container.clientHeight);
    container.appendChild(renderer.domElement);

    // Scene & Camera
    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0xf5f5f4, 0.05);

    const camera = new THREE.PerspectiveCamera(
      42,
      container.clientWidth / container.clientHeight,
      0.1,
      50
    );
    camera.position.set(0, 3.5, 4.5);
    camera.lookAt(0, 0.1, 0);

    // Procedural Studio Environment Reflection
    const pmremGenerator = new THREE.PMREMGenerator(renderer);
    scene.environment = pmremGenerator.fromScene(new RoomEnvironment(), 0.04).texture;
    pmremGenerator.dispose();

    // Studio 3-Point Lighting Rig
    const ambientLight = new THREE.HemisphereLight(0xffffff, 0xe7e5e4, 0.65);
    scene.add(ambientLight);

    const keyLight = new THREE.DirectionalLight(0xfff8ee, 2.2);
    keyLight.position.set(3, 5, 4);
    keyLight.castShadow = !isSoftwareGl;
    if (!isSoftwareGl) {
      keyLight.shadow.mapSize.width = 1024;
      keyLight.shadow.mapSize.height = 1024;
      keyLight.shadow.bias = -0.0004;
      keyLight.shadow.normalBias = 0.02;
    }
    scene.add(keyLight);

    const rimLight = new THREE.DirectionalLight(0xdbeafe, 0.8);
    rimLight.position.set(-3, 3, -3);
    scene.add(rimLight);

    // --- PROCEDURAL TEXTURES ---
    const createLetterTexture = (theme: 'cream' | 'dark' | 'parchment') => {
      const canvas = document.createElement('canvas');
      canvas.width = 1024;
      canvas.height = 1440;
      const ctx = canvas.getContext('2d')!;

      // Background Paper
      if (theme === 'dark') {
        ctx.fillStyle = '#1c1917';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        ctx.fillStyle = '#d6d3d1';
      } else if (theme === 'parchment') {
        ctx.fillStyle = '#fbf7ee';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        ctx.fillStyle = '#292524';
      } else {
        ctx.fillStyle = '#fafaf9';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        ctx.fillStyle = '#1c1917';
      }

      // Border outline
      ctx.strokeStyle = theme === 'dark' ? '#292524' : '#e7e5e4';
      ctx.lineWidth = 14;
      ctx.strokeRect(40, 40, canvas.width - 80, canvas.height - 80);

      // Letterhead Header
      ctx.font = 'bold 36px "Plus Jakarta Sans", sans-serif';
      ctx.fillText(profile.company.toUpperCase(), 80, 130);

      ctx.font = '22px "JetBrains Mono", monospace';
      ctx.fillStyle = theme === 'dark' ? '#a8a29e' : '#78716c';
      ctx.fillText(`REF: RESIGNATION NOTICE · ${profile.submissionDate}`, 80, 180);

      // Dividing hairline
      ctx.fillStyle = theme === 'dark' ? '#292524' : '#e7e5e4';
      ctx.fillRect(80, 210, canvas.width - 160, 4);

      // Recipient Block
      ctx.fillStyle = theme === 'dark' ? '#f5f5f4' : '#1c1917';
      ctx.font = 'bold 28px "Plus Jakarta Sans", sans-serif';
      ctx.fillText(`To: ${profile.managerName}`, 80, 270);
      ctx.font = '22px "Plus Jakarta Sans", sans-serif';
      ctx.fillStyle = theme === 'dark' ? '#a8a29e' : '#78716c';
      ctx.fillText(`${profile.managerRole} — ${profile.company}`, 80, 305);

      // Subject
      ctx.fillStyle = theme === 'dark' ? '#fafaf9' : '#0c0a09';
      ctx.font = 'bold 30px "Plus Jakarta Sans", sans-serif';
      ctx.fillText(`Subject: Formal Notice of Resignation`, 80, 380);

      // Simulated letter text lines
      ctx.fillStyle = theme === 'dark' ? '#78716c' : '#a8a29e';
      const startY = 440;
      const lineHeight = 36;
      for (let i = 0; i < 18; i++) {
        const lineW = (i % 5 === 4) ? canvas.width - 420 : canvas.width - 160;
        ctx.fillRect(80, startY + i * lineHeight, lineW, 8);
      }

      // Digital Signature section
      ctx.fillStyle = theme === 'dark' ? '#e7e5e4' : '#1c1917';
      ctx.font = 'italic 52px "Cormorant Garamond", serif';
      ctx.fillText(profile.signatureText || profile.fullName, 80, 1220);

      ctx.font = 'bold 24px "Plus Jakarta Sans", sans-serif';
      ctx.fillText(profile.fullName, 80, 1270);
      ctx.font = '20px "JetBrains Mono", monospace';
      ctx.fillStyle = theme === 'dark' ? '#a8a29e' : '#78716c';
      ctx.fillText(`${profile.role} · Last Day: ${profile.lastWorkingDay}`, 80, 1305);

      const tex = new THREE.CanvasTexture(canvas);
      tex.colorSpace = THREE.SRGBColorSpace;
      tex.anisotropy = renderer.capabilities.getMaxAnisotropy();
      return tex;
    };

    let letterTexture = createLetterTexture('cream');

    // Desk Surface
    const deskGeo = new THREE.BoxGeometry(6, 0.15, 4.5);
    const deskMat = new THREE.MeshStandardMaterial({
      color: theme?.deskColor || 0xeeece8,
      roughness: 0.85,
      metalness: 0.05,
    });
    const desk = new THREE.Mesh(deskGeo, deskMat);
    desk.position.y = -0.075;
    desk.receiveShadow = !isSoftwareGl;
    scene.add(desk);

    // --- 3D RESIGNATION LETTER (Multi-part Model) ---
    const letterGroup = new THREE.Group();
    scene.add(letterGroup);

    // 1. Paper Base Mesh with Thickness
    const letterGeo = new THREE.BoxGeometry(1.6, 0.012, 2.2);
    const paperMat = new THREE.MeshStandardMaterial({
      map: letterTexture,
      roughness: 0.65,
      metalness: 0.05,
    });
    const letterMesh = new THREE.Mesh(letterGeo, paperMat);
    letterMesh.castShadow = !isSoftwareGl;
    letterMesh.receiveShadow = !isSoftwareGl;
    letterGroup.add(letterMesh);

    // 2. Brass Fountain Pen next to the letter (4 composite parts)
    const penGroup = new THREE.Group();
    penGroup.position.set(1.15, 0.03, 0.2);
    penGroup.rotation.y = 0.25;

    // Barrel
    const barrelGeo = new THREE.CylinderGeometry(0.024, 0.024, 1.4, 20);
    const barrelMat = new THREE.MeshStandardMaterial({
      color: 0x1c1917,
      roughness: 0.25,
      metalness: 0.85,
    });
    const barrel = new THREE.Mesh(barrelGeo, barrelMat);
    barrel.rotation.x = Math.PI / 2;
    barrel.castShadow = !isSoftwareGl;
    penGroup.add(barrel);

    // Brass Nib
    const nibGeo = new THREE.ConeGeometry(0.022, 0.16, 16);
    const brassMat = new THREE.MeshStandardMaterial({
      color: 0xd4af37,
      roughness: 0.15,
      metalness: 0.95,
    });
    const nib = new THREE.Mesh(nibGeo, brassMat);
    nib.position.z = -0.76;
    nib.rotation.x = -Math.PI / 2;
    nib.castShadow = !isSoftwareGl;
    penGroup.add(nib);

    // Brass Clip & Accent Rings
    const ringGeo = new THREE.TorusGeometry(0.025, 0.005, 12, 24);
    const ring = new THREE.Mesh(ringGeo, brassMat);
    ring.position.z = 0.45;
    penGroup.add(ring);

    letterGroup.add(penGroup);

    // 3. Wax Seal Stamp on the Letter (Crimson PBR Wax)
    const sealGroup = new THREE.Group();
    sealGroup.position.set(0.5, 0.02, 0.8);

    const sealBaseGeo = new THREE.CylinderGeometry(0.12, 0.13, 0.025, 24);
    const waxMat = new THREE.MeshStandardMaterial({
      color: theme?.sealColor || 0x991b1b, // dynamic theme wax seal color
      roughness: 0.35,
      metalness: 0.1,
    });
    const sealBase = new THREE.Mesh(sealBaseGeo, waxMat);
    sealBase.castShadow = !isSoftwareGl;
    sealGroup.add(sealBase);

    // Wax Crest Rim
    const sealRimGeo = new THREE.TorusGeometry(0.1, 0.015, 12, 24);
    const sealRim = new THREE.Mesh(sealRimGeo, waxMat);
    sealRim.rotation.x = Math.PI / 2;
    sealRim.position.y = 0.015;
    sealGroup.add(sealRim);

    letterGroup.add(sealGroup);

    // --- 4. 3D FOLDED PAPER AIRPLANE (For Departure Animation) ---
    const airplaneGroup = new THREE.Group();
    airplaneGroup.visible = false;
    scene.add(airplaneGroup);

    // Custom Folded Airplane Geometry using BufferGeometry
    const airplaneGeo = new THREE.BufferGeometry();
    // 3D paper airplane vertices: nose, wings, fuselage, tail
    const vertices = new Float32Array([
      // Left Wing
      0, 0, -0.9,     // nose
      -0.7, 0.12, 0.6, // left tip
      0, -0.15, 0.6,   // keel
      // Right Wing
      0, 0, -0.9,     // nose
      0, -0.15, 0.6,   // keel
      0.7, 0.12, 0.6,  // right tip
      // Center Top Fold Left
      0, 0, -0.9,
      -0.1, 0.1, 0.6,
      -0.7, 0.12, 0.6,
      // Center Top Fold Right
      0, 0, -0.9,
      0.7, 0.12, 0.6,
      0.1, 0.1, 0.6,
    ]);
    airplaneGeo.setAttribute('position', new THREE.BufferAttribute(vertices, 3));
    airplaneGeo.computeVertexNormals();

    const airplaneMat = new THREE.MeshStandardMaterial({
      color: 0xfafaf9,
      roughness: 0.45,
      metalness: 0.1,
      side: THREE.DoubleSide,
    });
    const airplaneMesh = new THREE.Mesh(airplaneGeo, airplaneMat);
    airplaneMesh.castShadow = !isSoftwareGl;
    airplaneGroup.add(airplaneMesh);

    // Soft Radial Contact Shadow Plane under Letter
    const shadowGeo = new THREE.PlaneGeometry(2.4, 2.8);
    const shadowMat = new THREE.MeshBasicMaterial({
      color: 0x000000,
      transparent: true,
      opacity: 0.18,
      depthWrite: false,
    });
    const contactShadow = new THREE.Mesh(shadowGeo, shadowMat);
    contactShadow.rotation.x = -Math.PI / 2;
    contactShadow.position.y = 0.002;
    scene.add(contactShadow);

    // Mouse Tracking for subtle organic parallax
    const handleMouseMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      const y = -(((e.clientY - rect.top) / rect.height) * 2 - 1);
      sceneStateRef.current.mouseX = x;
      sceneStateRef.current.mouseY = y;
    };
    container.addEventListener('mousemove', handleMouseMove);

    // Resize Handler
    const handleResize = () => {
      if (!container) return;
      const width = container.clientWidth;
      const height = container.clientHeight;
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
    };
    window.addEventListener('resize', handleResize);

    // Animation & Pacing Loop
    let animationFrameId = 0;
    const clock = new THREE.Clock();
    let currentLookAt = new THREE.Vector3(0, 0.1, 0);

    const tick = () => {
      const dt = clock.getDelta();
      const st = sceneStateRef.current;

      // Handle Smooth Camera Damping
      const targetPosWithMouse = st.targetCameraPos.clone();
      if (st.activeView === 'desk') {
        targetPosWithMouse.x += st.mouseX * 0.45;
        targetPosWithMouse.y += st.mouseY * 0.25;
      }
      camera.position.lerp(targetPosWithMouse, 4.5 * dt);

      currentLookAt.lerp(st.targetLookAt, 4.5 * dt);
      camera.lookAt(currentLookAt);

      // Airplane Flight Animation when in Airplane mode
      if (st.activeView === 'airplane' || st.isLaunched) {
        airplaneGroup.visible = true;
        letterGroup.visible = false;
        contactShadow.visible = false;

        st.airplaneFlightTime += dt * 1.5;
        const t = st.airplaneFlightTime;

        // Graceful curved flight path upwards toward the new horizon
        airplaneGroup.position.x = Math.sin(t) * 1.8;
        airplaneGroup.position.y = 0.8 + Math.sin(t * 2) * 0.4 + (t * 0.15) % 2.5;
        airplaneGroup.position.z = Math.cos(t) * 1.8;

        airplaneGroup.rotation.y = t + Math.PI / 2;
        airplaneGroup.rotation.z = Math.sin(t * 3) * 0.15;
        airplaneGroup.rotation.x = Math.cos(t * 2) * 0.1;
      } else {
        airplaneGroup.visible = false;
        letterGroup.visible = true;
        contactShadow.visible = true;

        // Subtle floating breathing motion on the letter
        letterGroup.position.y = Math.sin(clock.getElapsedTime() * 1.4) * 0.015;
        letterGroup.rotation.y = THREE.MathUtils.damp(
          letterGroup.rotation.y,
          st.mouseX * 0.12,
          5,
          dt
        );
        letterGroup.rotation.x = THREE.MathUtils.damp(
          letterGroup.rotation.x,
          -st.mouseY * 0.08,
          5,
          dt
        );
      }

      renderer.render(scene, camera);
      animationFrameId = requestAnimationFrame(tick);
    };

    tick();

    // Cleanup on unmount
    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
      container.removeEventListener('mousemove', handleMouseMove);
      renderer.dispose();
      deskGeo.dispose();
      deskMat.dispose();
      letterGeo.dispose();
      paperMat.dispose();
      letterTexture.dispose();
      barrelGeo.dispose();
      barrelMat.dispose();
      nibGeo.dispose();
      brassMat.dispose();
      sealBaseGeo.dispose();
      sealRimGeo.dispose();
      waxMat.dispose();
      airplaneGeo.dispose();
      airplaneMat.dispose();
      shadowGeo.dispose();
      shadowMat.dispose();
      if (renderer.domElement && container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
    };
  }, [profile, theme]);

  return (
    <div className="relative w-full h-[520px] sm:h-[580px] bg-stone-100/70 border border-stone-200 rounded-2xl overflow-hidden shadow-xs my-8 select-none">
      {/* 3D WebGL Canvas Container */}
      <div ref={containerRef} className="w-full h-full cursor-grab active:cursor-grabbing" />

      {/* Top Left Badge Indicator */}
      <div className="absolute top-4 left-4 z-20 pointer-events-none">
        <div className="flex items-center gap-2 px-3 py-1.5 bg-white/90 backdrop-blur-md border border-stone-200/80 rounded-lg shadow-xs text-xs font-mono-code text-stone-700">
          <Sparkles className="w-3.5 h-3.5 text-stone-500" />
          <span>INTERACTIVE 3D RESIGNATION ARTIFACT</span>
        </div>
      </div>

      {/* Top Right Quick Hint */}
      <div className="absolute top-4 right-4 z-20 pointer-events-none hidden sm:block">
        <div className="px-2.5 py-1 bg-stone-900/75 backdrop-blur-md text-white rounded-md text-[11px] font-mono-code">
          Move cursor to inspect in 3D space
        </div>
      </div>

      {/* Collapsible Unified Bottom Control Dock (Adheres strictly to Three.js Ergonomic Dock spec) */}
      <div className="absolute bottom-5 left-1/2 -translate-x-1/2 z-20 w-[92%] max-w-xl flex flex-col items-center">
        {/* Toggle Collapse/Expand Button */}
        <button
          onClick={() => setIsDockCollapsed(!isDockCollapsed)}
          className="mb-1.5 px-3 py-1 bg-white/90 hover:bg-white text-stone-700 hover:text-stone-950 text-[11px] font-medium rounded-full shadow-xs border border-stone-200 flex items-center gap-1 transition-all"
        >
          {isDockCollapsed ? (
            <>
              <ChevronUp className="w-3 h-3" />
              <span>Show 3D Viewport Controls</span>
            </>
          ) : (
            <>
              <ChevronDown className="w-3 h-3" />
              <span>Hide Dock</span>
            </>
          )}
        </button>

        {/* The Dock Card */}
        {!isDockCollapsed && (
          <div className="w-full bg-white/95 backdrop-blur-md border border-stone-200/90 rounded-2xl p-3 shadow-lg flex flex-wrap items-center justify-between gap-3 animate-in fade-in slide-in-from-bottom-2">
            {/* Camera View Mode Pills */}
            <div className="flex items-center p-1 bg-stone-100 rounded-xl">
              <button
                onClick={() => {
                  setActiveView('desk');
                  setIsLaunched(false);
                }}
                className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-colors whitespace-nowrap ${
                  activeView === 'desk' && !isLaunched
                    ? 'bg-white text-stone-900 shadow-xs'
                    : 'text-stone-600 hover:text-stone-900'
                }`}
              >
                Desk View
              </button>

              <button
                onClick={() => {
                  setActiveView('inspect');
                  setIsLaunched(false);
                }}
                className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-colors whitespace-nowrap ${
                  activeView === 'inspect' && !isLaunched
                    ? 'bg-white text-stone-900 shadow-xs'
                    : 'text-stone-600 hover:text-stone-900'
                }`}
              >
                Inspect Seal
              </button>

              <button
                onClick={() => {
                  setActiveView('airplane');
                  setIsLaunched(true);
                }}
                className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-colors flex items-center gap-1.5 whitespace-nowrap ${
                  isLaunched
                    ? 'bg-stone-900 text-white shadow-xs'
                    : 'text-stone-600 hover:text-stone-900'
                }`}
              >
                <Send className="w-3 h-3" />
                <span>Fold & Launch ✈️</span>
              </button>
            </div>

            {/* Quick Status / Reset */}
            <div className="flex items-center gap-2">
              {isLaunched && (
                <button
                  onClick={() => {
                    setIsLaunched(false);
                    setActiveView('desk');
                  }}
                  className="px-3 py-1.5 text-xs font-medium text-stone-700 bg-stone-100 hover:bg-stone-200 rounded-lg transition-colors flex items-center gap-1"
                >
                  <RotateCw className="w-3 h-3" />
                  <span>Unfold Letter</span>
                </button>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
