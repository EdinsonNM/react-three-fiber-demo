import { useEffect, useRef } from "react";
import * as handPoseDetection from "@tensorflow-models/hand-pose-detection";
import "@tensorflow/tfjs-backend-webgl";

interface HandGestureRecognitionProps {
  onGestureDetected: (hand: any) => void;
}

const HandGestureRecognition: React.FC<HandGestureRecognitionProps> = ({
  onGestureDetected,
}) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const detectorRef = useRef<any>(null);

  useEffect(() => {
    const setupDetector = async () => {
      const model = handPoseDetection.SupportedModels.MediaPipeHands;
      const detectorConfig = {
        runtime: "mediapipe",
        modelType: "full",
        solutionPath: "https://cdn.jsdelivr.net/npm/@mediapipe/hands",
      };
      detectorRef.current = await handPoseDetection.createDetector(
        model,
        detectorConfig
      );

      const video = videoRef.current!;
      video.addEventListener("loadeddata", async () => {
        await detectorRef.current.estimateHands(video).then((hands: any) => {
          if (hands.length > 0) {
            onGestureDetected(hands[0]);
          }
        });
      });
    };

    const startVideo = async () => {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      videoRef.current!.srcObject = stream;
      videoRef.current!.play();
    };

    setupDetector();
    startVideo();
  }, [onGestureDetected]);

  return (
    <div>
      <video ref={videoRef} style={{ display: "none" }} />
      <canvas ref={canvasRef} style={{ width: "100%", height: "100%" }} />
    </div>
  );
};

export default HandGestureRecognition;
