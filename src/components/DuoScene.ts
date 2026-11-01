import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { RoomEnvironment } from 'three/examples/jsm/environments/RoomEnvironment.js';

type Uniforms = { blur: { value: number }; light: { value: number }; rightLight: { value: number }; leftOnly: { value: number }; texel: { value: THREE.Vector2 } };
const clamp = (v: number) => Math.max(0,Math.min(1,v));
const ease = (a: number,b: number,v: number) => { const t=clamp((v-a)/(b-a)); return t*t*(3-2*t); };
function screenMaterial(texture: THREE.Texture, leftOnly: number) {
  const uniforms: Uniforms = { blur:{value:0},light:{value:1},rightLight:{value:1},leftOnly:{value:leftOnly},texel:{value:new THREE.Vector2(1/(texture.image as HTMLImageElement).width,1/(texture.image as HTMLImageElement).height)} };
  const material = new THREE.MeshBasicMaterial({map:texture,toneMapped:false});
  material.onBeforeCompile = shader => {
    shader.uniforms.uBlur=uniforms.blur; shader.uniforms.uScreenLight=uniforms.light; shader.uniforms.uRightLight=uniforms.rightLight; shader.uniforms.uLeftOnly=uniforms.leftOnly;shader.uniforms.uTexel=uniforms.texel;
    shader.fragmentShader='uniform float uBlur; uniform float uScreenLight; uniform float uRightLight; uniform float uLeftOnly; uniform vec2 uTexel;\n'+shader.fragmentShader;
    shader.fragmentShader=shader.fragmentShader.replace('#include <map_fragment>',`
      float angled = mix(1.0, 1.0-smoothstep(.46,.54,vMapUv.x),uLeftOnly);
      vec2 d = uTexel*uBlur*angled;
      vec4 c = texture2D(map,vMapUv)*.28;
      c += texture2D(map,vMapUv+vec2(d.x,0.0))*.12;
      c += texture2D(map,vMapUv-vec2(d.x,0.0))*.12;
      c += texture2D(map,vMapUv+vec2(0.0,d.y))*.12;
      c += texture2D(map,vMapUv-vec2(0.0,d.y))*.12;
      c += texture2D(map,vMapUv+d)*.06;
      c += texture2D(map,vMapUv-d)*.06;
      c += texture2D(map,vMapUv+vec2(d.x,-d.y))*.06;
      c += texture2D(map,vMapUv+vec2(-d.x,d.y))*.06;
      diffuseColor *= c;
      diffuseColor.rgb *= mix(uRightLight,uScreenLight,angled);
    `);
  };
  return {material,uniforms};
}

export async function createDuoScene(host: HTMLDivElement) {
  const [gltf,inner,outer] = await Promise.all([
    new GLTFLoader().loadAsync('/work/duo/iphone-duo.gltf'),
    new THREE.TextureLoader().loadAsync('/work/livin-duo-preview.webp'),
    new THREE.TextureLoader().loadAsync('/work/livin-mobile-preview.webp')
  ]);
  for(const tex of [inner,outer]){tex.colorSpace=THREE.SRGBColorSpace;tex.flipY=false;tex.anisotropy=4;}
  const renderer=new THREE.WebGLRenderer({antialias:true,alpha:true,powerPreference:'low-power'});
  renderer.setPixelRatio(Math.min(devicePixelRatio,2));
  renderer.outputColorSpace=THREE.SRGBColorSpace;renderer.toneMapping=THREE.ACESFilmicToneMapping;renderer.toneMappingExposure=1.15;
  renderer.setClearColor(0,0);host.appendChild(renderer.domElement);
  const scene=new THREE.Scene();const pmrem=new THREE.PMREMGenerator(renderer);const room=new RoomEnvironment();const environment=pmrem.fromScene(room,.025);scene.environment=environment.texture;room.dispose();pmrem.dispose();
  scene.add(new THREE.HemisphereLight(0xffffff,0x222830,2));
  const key=new THREE.DirectionalLight(0xffffff,3);key.position.set(-8,15,-10);scene.add(key);
  const rim=new THREE.DirectionalLight(0xcbd9ec,2);rim.position.set(10,2,7);scene.add(rim);
  const root=new THREE.Group();root.add(gltf.scene);scene.add(root);
  const camera=new THREE.PerspectiveCamera(32,1,.01,200);camera.up.set(0,0,-1);
  const innerScreen=screenMaterial(inner,1),outerScreen=screenMaterial(outer,0);
  const screens: THREE.SkinnedMesh[]=[];const oldMaterials=new Set<THREE.Material>();
  gltf.scene.traverse(object=>{
    if(!(object instanceof THREE.Mesh))return;
    const materials=Array.isArray(object.material)?object.material:[object.material];materials.forEach(m=>oldMaterials.add(m));
    const material=materials[0];
    if(material.name==='screenTextureOuterDisplay_usd_shd_lts'){object.material=outerScreen.material;screens.push(object as THREE.SkinnedMesh);}
    if(material.name==='pkUBCyCvYJYVzTr'){
      // Lift the display just above the original glass underlay so their
      // coplanar surfaces cannot form a dark raster seam when opened flat.
      object.geometry=object.geometry.clone();
      const position=object.geometry.getAttribute('position'),normal=object.geometry.getAttribute('normal');
      for(let i=0;i<position.count;i++)position.setXYZ(i,position.getX(i)+normal.getX(i)*.045,position.getY(i)+normal.getY(i)*.045,position.getZ(i)+normal.getZ(i)*.045);
      position.needsUpdate=true;object.material=innerScreen.material;screens.push(object as THREE.SkinnedMesh);
    }
  });
  const mixer=new THREE.AnimationMixer(gltf.scene);const clip=gltf.animations.find(c=>c.name==='Slider');if(!clip)throw new Error('Fold animation unavailable');
  const action=mixer.clipAction(clip);action.play();action.paused=true;
  const box=new THREE.Box3(),part=new THREE.Box3(),center=new THREE.Vector3(),size=new THREE.Vector3();
  let lastWidth=0,lastHeight=0,lastProgress=-1,disposed=false;
  const render=(progress:number)=>{
    if(disposed)return;
    const width=host.clientWidth,height=host.clientHeight;if(!width||!height)return;
    const resized=width!==lastWidth||height!==lastHeight;
    if(!resized&&progress===lastProgress)return;
    if(resized)renderer.setSize(width,height,false);
    lastWidth=width;lastHeight=height;lastProgress=progress;
    action.time=progress*clip.duration;mixer.update(0);root.position.set(0,0,0);scene.updateMatrixWorld(true);
    box.makeEmpty();for(const screen of screens){screen.computeBoundingBox();part.copy(screen.boundingBox!).applyMatrix4(screen.matrixWorld);box.union(part);}
    box.getCenter(center);box.getSize(size);root.position.copy(center).multiplyScalar(-1);scene.updateMatrixWorld(true);
    camera.aspect=width/height;const tangent=Math.tan(THREE.MathUtils.degToRad(camera.fov/2));
    const distance=Math.max((size.z+1.1)/(2*tangent),(size.x+1.1)/(2*tangent*camera.aspect))*1.08;
    camera.position.set(0,size.y/2+distance,0);camera.lookAt(0,0,0);camera.updateProjectionMatrix();
    outerScreen.uniforms.blur.value=ease(.03,.27,progress)*14;
    innerScreen.uniforms.blur.value=(1-ease(.48,.98,progress))*14;
    innerScreen.uniforms.light.value=.45+ease(.45,.95,progress)*.55;
    innerScreen.uniforms.rightLight.value=.28+ease(.4,.72,progress)*.72;
    renderer.render(scene,camera);host.dataset.ready='true';host.dataset.pose=progress.toFixed(3);
  };
  return {render,dispose(){disposed=true;mixer.stopAllAction();mixer.uncacheRoot(gltf.scene);gltf.scene.traverse(object=>{if(object instanceof THREE.Mesh)object.geometry.dispose();});oldMaterials.forEach(m=>m.dispose());innerScreen.material.dispose();outerScreen.material.dispose();inner.dispose();outer.dispose();environment.dispose();renderer.dispose();renderer.forceContextLoss();renderer.domElement.remove();}};
}
