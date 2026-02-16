// "use client";

// import React, { useEffect, useRef } from "react";
// import * as THREE from "three";
// import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";

// export default function ThreeScene() {
//   const mountRef = useRef(null);

//   useEffect(() => {
//     const scene = new THREE.Scene();
//     const camera = new THREE.PerspectiveCamera(
//       45,
//       window.innerWidth / window.innerHeight,
//       0.1,
//       1000
//     );
//     camera.position.set(0, 0, 50);

//     const renderer = new THREE.WebGLRenderer({ antialias: true });
//     renderer.setSize(window.innerWidth, window.innerHeight);
//     mountRef.current.appendChild(renderer.domElement);

//     const controls = new OrbitControls(camera, renderer.domElement);

//     // Parameters
//     const params = {
//       crownA: 5,
//       headA: 10,
//       headHeight: 15,
//       brimA: 20,
//       brimOffset: 5,
//     };

//     const crownSegments = 10;
//     const headSegments = 20;
//     const brimSegments = 10;

//     // Points and curves
//     const point0 = new THREE.Vector2(0, 0);
//     const point1 = new THREE.Vector2(params.crownA, 0);
//     const point2 = new THREE.Vector2(params.headA, -params.headHeight);
//     const point3 = new THREE.Vector2(params.brimA, -1 * (params.headHeight + params.brimOffset));

//     const curve0 = new THREE.LineCurve(point0, point1);
//     const curve1 = new THREE.LineCurve(point1, point2);
//     const curve2 = new THREE.LineCurve(point2, point3);

//     const points = [];
//     points.push(
//       ...curve0.getPoints(crownSegments).slice(0, -1),
//       ...curve1.getPoints(headSegments).slice(0, -1),
//       ...curve2.getPoints(brimSegments)
//     );

//     // Create lathe geometry
//     const latheGeometry = new THREE.LatheGeometry(points, 30);
//     const latheMaterial = new THREE.MeshStandardMaterial({
//       color: 0x0077ff,
//       side: THREE.DoubleSide,
//       wireframe: false,
//     });
//     const latheMesh = new THREE.Mesh(latheGeometry, latheMaterial);
//     scene.add(latheMesh);

//     // Lighting
//     const light = new THREE.DirectionalLight(0xffffff, 1);
//     light.position.set(10, 10, 10);
//     scene.add(light);

//     const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
//     scene.add(ambientLight);

//     // Animation loop
//     const animate = () => {
//       requestAnimationFrame(animate);
//       controls.update();
//       renderer.render(scene, camera);
//     };
//     animate();

//     // Handle window resize
//     const handleResize = () => {
//       camera.aspect = window.innerWidth / window.innerHeight;
//       camera.updateProjectionMatrix();
//       renderer.setSize(window.innerWidth, window.innerHeight);
//     };
//     window.addEventListener("resize", handleResize);

//     return () => {
//       window.removeEventListener("resize", handleResize);
//       mountRef.current.removeChild(renderer.domElement);
//     };
//   }, []);

//   return <div ref={mountRef} />;
// }
