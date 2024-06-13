import { useEffect, useRef, useState } from "react";
import { getAction } from "./openai-generator";
import { Html, OrbitControls, useAnimations, useGLTF } from "@react-three/drei";
import { Canvas, useFrame } from "@react-three/fiber";
import {
  generateAndPlaySpeech,
  generateSpeech,
} from "../../libs/text-to-speech";
const SpeechRecognitionComponent = ({ onTranscript }) => {
  const [listening, setListening] = useState(false);
  const [transcript, setTranscript] = useState("");

  const handleVoiceCommand = () => {
    const recognition = new (window.SpeechRecognition ||
      window.webkitSpeechRecognition)();
    recognition.lang = "es-PE";
    recognition.interimResults = false;
    recognition.maxAlternatives = 1;

    recognition.onstart = () => {
      setListening(true);
    };

    recognition.onresult = (event) => {
      const speechResult = event.results[0][0].transcript;
      setTranscript(speechResult);
      onTranscript(speechResult); // Llama a la función de callback con el texto transcrito
    };

    recognition.onerror = (event) => {
      console.error("Speech recognition error", event.error);
      setListening(false);
    };

    recognition.onend = () => {
      setListening(false);
    };

    recognition.start();
  };

  return (
    <>
      <button
        id="listeningButton"
        className={`${
          listening ? "bg-red-500" : "bg-green-500"
        } hover:bg-green-600 text-white font-bold py-4 px-4 rounded-full `}
        onClick={handleVoiceCommand}
        disabled={listening}
      >
        <span id="buttonText">
          {listening ? "Listening..." : "Start Listening"}
        </span>
      </button>
      <div className="mt-3">{transcript}</div>
    </>
  );
};

type PropsModel = {
  action: string;
  message: string;
  movement: string;
  speed: number;
};
function AnimationAIContent({
  action = "Idle",
  message = "",
  movement = "",
  speed = 1,
}: PropsModel) {
  const meshRef = useRef();
  const model = useGLTF("models/character2.glb");
  const { actions } = useAnimations(model.animations, meshRef);
  // Estado inicial de posición, rotación y movimiento

  const [velocity, setVelocity] = useState({ x: 0, y: 0, z: 0 });
  const [maxRotation, setMaxRotation] = useState(0);
  const [rotation, setRotation] = useState(0);
  const [direction, setDirection] = useState(0);
  useEffect(() => {
    const newVelocity = { x: 0, y: 0, z: 0 };

    switch (movement) {
      case "MoveForward":
        newVelocity.z = speed;
        break;
      case "TurnAround":
        newVelocity.z = -speed;
        setMaxRotation(Math.PI);
        setRotation(0);
        setDirection(1);
        break;
      case "TurnLeft":
        newVelocity.x = -speed;
        setMaxRotation(Math.PI / 2);
        setRotation(0);
        setDirection(1);
        break;
      case "TurnRight":
        newVelocity.x = speed;
        setMaxRotation(Math.PI / 2);
        setRotation(0);
        setDirection(-1);
        break;
    }

    setVelocity(newVelocity);
  }, [movement, speed]); // Dependencia de speed

  useFrame((state, delta) => {
    if (meshRef.current) {
      //meshRef.current.position.x += velocity.x * delta;
      //meshRef.current.position.z += velocity.z * delta;
    }
    if (Math.abs(rotation) < maxRotation) {
      meshRef.current.rotation.y += 0.1 * direction;
      setRotation(rotation + 0.1 * direction);
    } else {
      setVelocity({ x: 0, y: 0, z: 0 });
      setRotation(0);
      setDirection(0);
    }
  });

  useEffect(() => {
    if (actions) {
      actions["CharacterArmature|" + action]?.reset().fadeIn(0.5).play();
    }
    if (["TurnLeft", "TurnRIght", "TurnAround"].includes(movement)) {
      actions["CharacterArmature|Walk"]?.reset().fadeIn(0.5).play();
    }
    return () => actions["CharacterArmature|" + action]?.fadeOut(0.5);
  }, [actions, action, movement]);

  return (
    <>
      {" "}
      <OrbitControls />
      <group ref={meshRef}>
        <primitive object={model.scene} />
        <Html
          className="w-[310px] lg:w-[800px] sm:w-[400px] md:w-[500px]"
          center
          position={[0, 3.5, 0]}
        >
          <div className="absolute bottom-full mb-2 flex flex-col items-center max-w-[800px] text-2xl md:text-3xl text-yellow-400 w-full text-center">
            <div className="relative bg-gray-900 text-yellow-500 rounded py-2 px-3">
              {message || "..."}
              <div className="absolute left-1/2 transform -translate-x-1/2 top-full h-0 w-0 border-x-[20px] border-x-transparent border-t-[20px] border-t-gray-900"></div>
            </div>
          </div>
        </Html>
      </group>
    </>
  );
}

function AnimationAI() {
  const [action, setAction] = useState({});
  const handleTranscript = (transcript) => {
    setAction({});
    // Aquí puedes enviar el texto transcrito a OpenAI u otro servicio
    console.log("Transcription:", transcript);
    // Llama a tu función para manejar la interpretación de OpenAI
    getAction(transcript).then((action) => {
      console.log("Action:", action);
      setAction(action);

      generateSpeech(action.message).then((blob) => {
        generateAndPlaySpeech(blob);
      });
      /*const synth = window.speechSynthesis;
      const utterThis = new SpeechSynthesisUtterance(action.message);
      utterThis.lang = "es-MEX";
      utterThis.pitch = 1;
      synth.speak(utterThis);*/
    });
  };

  return (
    <>
      <Canvas
        gl={{ alpha: true }}
        style={{ background: "transparent" }}
        camera={{ fov: 45, position: [0, 2, 10] }}
      >
        <ambientLight />
        <directionalLight position={[10, 10, 25]} intensity={1} />
        <directionalLight position={[-10, 10, 25]} intensity={1} />
        <directionalLight position={[-10, 10, -25]} intensity={1} />
        <AnimationAIContent {...action} />
      </Canvas>
      <div className="fixed bottom-0 left-0 w-full pb-28 flex flex-col justify-center items-center">
        <SpeechRecognitionComponent onTranscript={handleTranscript} />
      </div>
    </>
  );
}
export default AnimationAI;
