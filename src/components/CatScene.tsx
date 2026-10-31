import { useEffect, useRef, useState } from "react";
import { ACESFilmicToneMapping, AnimationMixer, Box3, BufferGeometry, Color, DirectionalLight, Float32BufferAttribute, Group, HemisphereLight, LineBasicMaterial, LineSegments, Mesh, MeshStandardMaterial, OrthographicCamera, PCFShadowMap, PlaneGeometry, Scene, ShadowMaterial, SkinnedMesh, SphereGeometry, SRGBColorSpace, Vector3, WebGLRenderer, type AnimationAction, type Material, type Object3D } from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import { clone } from "three/examples/jsm/utils/SkeletonUtils.js";
import { catRoamPose } from "../lib/catPath";

type Cat = { root: Group; mixer: AnimationMixer; walk: AnimationAction; idle: AnimationAction; x: number; y: number; angle: number; phase: number; scale: number; resting: boolean };
const clamp = (n: number, min: number, max: number) => Math.max(min, Math.min(max, n));

export function CatScene() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [failed, setFailed] = useState(false);
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const context = canvas.getContext("webgl2", { alpha: true, antialias: true, powerPreference: "low-power" });
    if (!context) { setFailed(true); return; }
    const renderer = new WebGLRenderer({ canvas, context, alpha: true, antialias: true, powerPreference: "low-power" });
    renderer.setClearColor(0x000000, 0); renderer.outputColorSpace = SRGBColorSpace; renderer.toneMapping = ACESFilmicToneMapping; renderer.toneMappingExposure = .8;
    renderer.shadowMap.enabled = true; renderer.shadowMap.type = PCFShadowMap;
    const scene = new Scene(), camera = new OrthographicCamera(-10, 10, 7, -7, .1, 100);
    camera.position.set(0, 18, 14); camera.lookAt(0, 0, 0);
    scene.add(new HemisphereLight(0xe5efff, 0x62513d, 2.5));
    const sun = new DirectionalLight(0xffe4c1, 3.3); sun.position.set(-6, 12, 8); sun.castShadow = true;
    sun.shadow.mapSize.set(1024, 1024); sun.shadow.camera.left = -24; sun.shadow.camera.right = 24; sun.shadow.camera.top = 18; sun.shadow.camera.bottom = -18; sun.shadow.normalBias = .035; sun.shadow.bias = -.0001;
    scene.add(sun);
    const rim = new DirectionalLight(0xc0d9ff, 1.7); rim.position.set(5, 6, -6); scene.add(rim);
    const ground = new Mesh(new PlaneGeometry(150, 150), new ShadowMaterial({ opacity: .25 })); ground.rotation.x = -Math.PI / 2; ground.receiveShadow = true; scene.add(ground);
    const footer = canvas.closest("footer")!;
    let width = 0, height = 0, pixels = 50, frame = 0, last = 0, elapsed = 0, visible = false, disposed = false;
    let pointerX = 0, pointerY = 0, interested = false, interestUntil = 0;
    const cats: Cat[] = [], resources: Object3D[] = [];
    const render = (dt: number) => {
      elapsed += dt;
      const sinElevation = 18 / Math.hypot(18, 14);
      const follow = interested || elapsed < interestUntil;
      cats.forEach((cat, i) => {
        const pose = catRoamPose(elapsed * .72 + cat.phase, width, height);
        let tx = pose.x, ty = pose.y;
        if (follow) { tx = pointerX + (i - 1) * 95; ty = pointerY + 48 + Math.sin(i * 2.2) * 42; }
        tx = clamp(tx, 125 * cat.scale, width - 125 * cat.scale); ty = clamp(ty, 135 * cat.scale, height - 85 * cat.scale);
        const dx = tx - cat.x, dy = ty - cat.y, distance = Math.hypot(dx, dy);
        const speed = Math.min(follow ? 58 : 42, distance * 1.7);
        const move = Math.min(distance, speed * dt);
        if (distance > .1) { cat.x += dx / distance * move; cat.y += dy / distance * move; }
        const resting = speed < 5;
        if (resting !== cat.resting) {
          cat.resting = resting;
          (resting ? cat.idle : cat.walk).reset().fadeIn(.4).play();
          (resting ? cat.walk : cat.idle).fadeOut(.4);
        }
        if (!resting) {
          const vx = dx, vz = dy / sinElevation;
          const targetAngle = Math.atan2(-vz, vx);
          const delta = Math.atan2(Math.sin(targetAngle - cat.angle), Math.cos(targetAngle - cat.angle));
          cat.angle += delta * Math.min(1, dt * 3.8);
        }
        cat.root.rotation.y = cat.angle;
        cat.root.position.set((cat.x - width / 2) / pixels, .015, (cat.y + 18 - height / 2) / pixels / sinElevation);
        cat.walk.timeScale = clamp(speed / 35, .45, 1.6);
        cat.mixer.update(dt);
      });
      renderer.render(scene, camera);
    };
    const tick = (now: number) => {
      frame = 0;
      if (!visible || document.hidden || disposed) return;
      if (now - last >= 1000 / 30) { const dt = Math.min(.08, (now - last) / 1000); last = now; render(dt); }
      frame = requestAnimationFrame(tick);
    };
    const sync = () => { cancelAnimationFrame(frame); frame = 0; last = performance.now(); if (cats.length) render(0); if (visible && !document.hidden && !disposed) frame = requestAnimationFrame(tick); };
    const sizeScene = (nextWidth: number, nextHeight: number) => {
      const oldW = width || nextWidth, oldH = height || nextHeight;
      width = nextWidth; height = nextHeight; pixels = width < 600 ? 38 : 50;
      renderer.setPixelRatio(Math.min(1.5, window.devicePixelRatio || 1)); renderer.setSize(width, height, false);
      camera.left = -width / pixels / 2; camera.right = width / pixels / 2; camera.top = height / pixels / 2; camera.bottom = -height / pixels / 2; camera.updateProjectionMatrix();
      cats.forEach(cat => { cat.x = cat.x / oldW * width; cat.y = cat.y / oldH * height; }); sync();
    };
    // Establish projection before a cached model can complete its first load.
    const initialBox = canvas.getBoundingClientRect();
    sizeScene(initialBox.width, initialBox.height);
    const resize = new ResizeObserver(entries => sizeScene(entries[0].contentRect.width, entries[0].contentRect.height)); resize.observe(canvas);
    const observer = new IntersectionObserver(entries => { visible = entries[0].isIntersecting; sync(); }, { rootMargin: "80px" }); observer.observe(canvas);
    const movePointer = (event: PointerEvent) => {
      if ((event.target as Element).closest("a,button,.contact-content")) { interested = false; return; }
      const rect = footer.getBoundingClientRect(); pointerX = event.clientX - rect.left; pointerY = event.clientY - rect.top;
      if (event.pointerType === "mouse") interested = true; else interestUntil = elapsed + 3;
    };
    const leavePointer = () => { interested = false; };
    footer.addEventListener("pointermove", movePointer, { passive: true }); footer.addEventListener("pointerdown", movePointer, { passive: true }); footer.addEventListener("pointerleave", leavePointer);
    document.addEventListener("visibilitychange", sync);
    const lostContext = (event: Event) => { event.preventDefault(); setFailed(true); cancelAnimationFrame(frame); disposed = true; };
    canvas.addEventListener("webglcontextlost", lostContext);
    new GLTFLoader().load("/cats/cat.glb", gltf => {
      if (disposed) return;
      const source = gltf.scene; resources.push(source); source.updateMatrixWorld(true);
      const box = new Box3().setFromObject(source), size = box.getSize(new Vector3()), center = box.getCenter(new Vector3());
      const factor = 3.6 / size.x;
      source.traverse(node => {
        if (!(node instanceof Mesh)) return;
        const originals = Array.isArray(node.material) ? node.material : [node.material];
        const converted = originals.map(material => new MeshStandardMaterial({ name: material.name, color: material.name === "Pink" ? 0xc38b85 : material.name === "White" ? 0xf0e6d5 : 0xffffff, vertexColors: material.name === "Grey", roughness: .9, metalness: .015 }));
        node.material = Array.isArray(node.material) ? converted : converted[0];
        node.frustumCulled = false;
        node.castShadow = true; node.receiveShadow = true;
        // Broad chest colouring follows Kiko's cream bib without repainting the source photograph.
        const position = node.geometry.getAttribute("position");
        const colors: number[] = []; const point = new Vector3(); const coat = new Color(0xce9251), bib = new Color(0xf5e9d5);
        for (let i = 0; i < position.count; i++) {
          point.fromBufferAttribute(position, i).applyMatrix4(node.matrixWorld);
          const nx = (point.x - box.min.x) / size.x, ny = (point.y - box.min.y) / size.y;
          const color = nx > .64 && nx < .84 && ny > .2 && ny < .51 ? bib : coat;
          colors.push(color.r, color.g, color.b);
        }
        node.geometry.setAttribute("color", new Float32BufferAttribute(colors, 3));
      });
      // Small facial features follow the animated head bone, rather than a
      // screen-space sticker. The cobby proportions and cream bib echo Kiko.
      const head = source.getObjectByName("Bone003");
      if (head) {
        const local = (x: number, y: number, z: number) => head.worldToLocal(new Vector3(x, y, z));
        const eyeGeometry = new SphereGeometry(.055, 8, 6), eyeMaterial = new MeshStandardMaterial({ color: 0x49392d, roughness: .9 });
        for (const side of [-1, 1]) {
          const eye = new Mesh(eyeGeometry, eyeMaterial); eye.position.copy(local(279, 285, side * 31)); head.add(eye);
        }
        const points: Vector3[] = [];
        for (const side of [-1, 1]) for (let i = -1; i <= 1; i++) {
          points.push(local(308, 258 + i * 3, side * 23), local(316 - Math.abs(i) * 7, 258 + i * 11, side * 74));
        }
        const whiskers = new LineSegments(new BufferGeometry().setFromPoints(points), new LineBasicMaterial({ color: 0xf6ead5, transparent: true, opacity: .72 })); head.add(whiskers);
      }
      const count = width < 600 ? 2 : 3;
      for (let i = 0; i < count; i++) {
        const model = clone(source); const root = new Group();
        const scale = i === 0 ? 1.07 : .83;
        model.scale.set(factor * scale * .88, factor * scale, factor * scale * 1.28); model.position.set(-center.x * factor * scale * .88, -box.min.y * factor * scale, -center.z * factor * scale * 1.28);
        root.add(model); scene.add(root);
        const mixer = new AnimationMixer(model);
        const walking = gltf.animations.find(a => /Walking/i.test(a.name))!, idleClip = gltf.animations.find(a => /Idle/i.test(a.name))!;
        const walk = mixer.clipAction(walking), idle = mixer.clipAction(idleClip); walk.play();
        const phase = catRoamPose(0, width, height).cycle * i / count;
        const p = catRoamPose(phase, width, height);
        cats.push({ root, mixer, walk, idle, x: p.x, y: p.y, angle: 0, phase, scale, resting: false });
      }
      canvas.dataset.ready = "true"; sync();
    }, undefined, () => { if (!disposed) setFailed(true); });
    return () => {
      disposed = true; cancelAnimationFrame(frame); resize.disconnect(); observer.disconnect();
      footer.removeEventListener("pointermove", movePointer); footer.removeEventListener("pointerdown", movePointer); footer.removeEventListener("pointerleave", leavePointer); document.removeEventListener("visibilitychange", sync); canvas.removeEventListener("webglcontextlost", lostContext);
      cats.forEach(cat => { cat.mixer.stopAllAction(); cat.mixer.uncacheRoot(cat.mixer.getRoot()); cat.root.traverse(node => { if (node instanceof SkinnedMesh) node.skeleton.dispose(); }); });
      const materials = new Set<Material>(), geometries = new Set<import("three").BufferGeometry>();
      [...resources, scene].forEach(root => root.traverse(node => { if (node instanceof Mesh || node instanceof LineSegments) { geometries.add(node.geometry); (Array.isArray(node.material) ? node.material : [node.material]).forEach(m => materials.add(m)); } }));
      materials.forEach(m => m.dispose()); geometries.forEach(g => g.dispose()); renderer.dispose();
    };
  }, []);
  return <><canvas ref={canvasRef} className="contact-cat" aria-hidden="true" style={failed ? { display: "none" } : undefined} />{failed && <img className="contact-cat-poster" src="/cats/kiko-poster.webp" alt="" />}</>;
}
