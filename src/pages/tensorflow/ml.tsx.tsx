import { useEffect, useMemo, useRef, useState } from "react";
import {
  HandLandmarker,
  FilesetResolver,
  HandLandmarkerResult,
  DrawingUtils,
} from "@mediapipe/tasks-vision";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { OrbitControls, useGLTF } from "@react-three/drei";

import { Vector3 } from "three";
import { Physics, RigidBody } from "@react-three/rapier";
import "./ml.css";
const createHandLandmarker = async () => {
  const vision = await FilesetResolver.forVisionTasks(
    "https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision@0.10.0/wasm"
  );
  const handLandmarker = await HandLandmarker.createFromOptions(vision, {
    baseOptions: {
      modelAssetPath: `https://storage.googleapis.com/mediapipe-models/hand_landmarker/hand_landmarker/float16/1/hand_landmarker.task`,
      delegate: "GPU",
    },
    runningMode: "VIDEO",
    numHands: 2,
  });
  return handLandmarker;
};

let lastVideoTime = -1;
let results: HandLandmarkerResult;

const fingerJoints = {
  indexFingerTip: [7, 8],
  thumbBase: [1, 2],
  thumbMid: [2, 3],
  thumbTip: [3, 4],
  palmSegment1: null,
  middleFingerBase: [9, 10],
  middleFingerMid: [10, 11],
  middleFingerTip: [11, 12],
  palmSegment2: null,
  ringFingerBase: [13, 14],
  ringFingerMid: [14, 15],
  ringFingerTip: [15, 16],
  palmSegment3: null,
  pinkyFingerBase: [17, 18],
  pinkyFingerMid: [18, 19],
  pinkyFingerTip: [19, 20],
  palmSegment4: null,
};

type HandModelProps = {
  landmarks: any;
  hand: "left" | "right";
};
const HandModel = ({ landmarks, hand = "left" }: HandModelProps) => {
  const { camera } = useThree();
  const groupRef = useRef();
  const { scene, nodes } = useGLTF(`/models/hands/hand-${hand}.gltf`);
  const index = hand === "left" ? 0 : 1;
  const [visible, setVisible] = useState(true);
  console.log(scene.children);
  useFrame(() => {
    const nodes = scene.children;
    console.log(landmarks);
    if (landmarks && landmarks.length <= index) return;
    landmarks[index].forEach((landmark: any, index: number) => {
      const factor = 16;
      const x = -(landmark.x * 2 - 1) * factor; // Convertir de [0,1] a [-1,1]
      const y = (1 - landmark.y * 2) * factor; // Invertir y convertir de [0,1] a [-1,1]
      const z = -landmark.z; // La dirección de la cámara puede necesitar invertir z
      const vector = new Vector3(x, y, z);
      vector.unproject(camera);
      nodes[index].position.set(vector.x, vector.y, vector.z);
    });
  });
  return (
    <RigidBody colliders="trimesh" type="kinematicPosition">
      <group
        ref={groupRef}
        scale={[0.3, 0.3, 0.3]}
        position={[0, 1, 0]}
        visible={visible}
      >
        <primitive object={scene.clone()} />;
      </group>
    </RigidBody>
  );
};

const HandRenderer = ({ landmarks }) => {
  return (
    <Canvas className="w-full h-full">
      <Physics>
        <directionalLight />
        <ambientLight />
        <pointLight position={[10, 10, 10]} />
        <HandModel landmarks={landmarks} hand="left" />
        <HandModel landmarks={landmarks} hand="right" />
        <OrbitControls makeDefault />
        <axesHelper />
        <gridHelper />
      </Physics>
    </Canvas>
  );
};

function TensorflowApp() {
  const requestRef = useRef<number | null>(null);
  const handLandmarker = useRef<HandLandmarker | null>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const previousTimeRef = useRef(null);
  const [landmarks, setLandmarks] = useState<any>(null);
  const draw = (ctx: CanvasRenderingContext2D) => {
    const video = videoRef.current!;
    const canvas = canvasRef.current!;

    canvas.style.width = `${video.videoWidth}px`;
    canvas.style.height = `${video.videoHeight}px`;
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    let startTimeMs = performance.now();
    if (lastVideoTime !== video.currentTime) {
      lastVideoTime = video.currentTime;
      results = handLandmarker.current!.detectForVideo(video, startTimeMs);
      setLandmarks(results.landmarks!);
    }
    const drawingUtils = new DrawingUtils(ctx!);

    ctx.save();
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    if (results.landmarks) {
      for (const landmarks of results.landmarks) {
        drawingUtils.drawConnectors(
          landmarks,
          HandLandmarker.HAND_CONNECTIONS,
          {
            color: "#00FF00",
            lineWidth: 5,
          }
        );
        drawingUtils.drawLandmarks(landmarks, {
          color: "#FF0000",
          lineWidth: 2,
        });
      }
    }

    ctx.restore();
  };

  const predictWebcam = (time) => {
    previousTimeRef.current = time;
    const canvas = canvasRef.current;
    const context = canvas!.getContext("2d");
    draw(context!); // Pasamos el tiempo como frameCount
    requestRef.current = requestAnimationFrame(predictWebcam);
  };
  const init = async () => {
    const video = videoRef.current!;
    const canvas = canvasRef.current!;
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    handLandmarker.current = await createHandLandmarker();
    const devices = await navigator.mediaDevices.enumerateDevices();
    devices.forEach((device) => {
      if (device.kind === "videoinput") {
        console.log(device.label);
      }
    });
    navigator.mediaDevices
      .getUserMedia({
        video: {
          deviceId:
            "4d90169bcd9ac57b933c182c9e7c857de01213f398aa883f7d70ce4f3dc5d2c0",
        },
      })
      .then((stream) => {
        videoRef.current!.srcObject = stream;
        videoRef.current!.addEventListener("loadeddata", () => {
          requestRef.current = requestAnimationFrame(predictWebcam);
        });
      });
  };
  useEffect(() => {
    init();
    return () => cancelAnimationFrame(requestRef.current!);
  }, []); // Ejecuta solo una vez al montar el componente
  return (
    <div className="w-full h-full">
      <div className="fixed top-0 w-full h-full">
        <HandRenderer landmarks={landmarks} />
      </div>
      <div className="fixed w-full h-full" style={{ pointerEvents: "none" }}>
        <video ref={videoRef} autoPlay playsInline className="abslute top-0" />
        <canvas
          ref={canvasRef}
          className="absolute w-full h-full top-0 output_canvas"
        />
      </div>
    </div>
  );
}
export default TensorflowApp;
