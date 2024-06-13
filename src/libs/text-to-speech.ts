export function generateSpeech(message: string) {
  return fetch(
    "https://api.elevenlabs.io/v1/text-to-speech/7WFXhuump5DolGbeZtN3",
    {
      method: "POST",
      headers: {
        Accept: "audio/mpeg",
        "Content-Type": "application/json",
        "xi-api-key": import.meta.env.VITE_ELEVEN_API_KEY as string,
      },
      body: JSON.stringify({
        text: message,
        model_id: "eleven_monolingual_v1",
        voice_settings: {
          stability: 0.5,
          similarity_boost: 0.5,
        },
      }),
    }
  ).then((response) => response.blob());
}

export async function generateAndPlaySpeech(blob: Blob) {
  try {
    const audioContext = new AudioContext();
    const arrayBuffer = await blob.arrayBuffer(); // Convertir blob a ArrayBuffer
    const audioBuffer = await audioContext.decodeAudioData(arrayBuffer); // Decodificar el audio

    const source = audioContext.createBufferSource();
    source.buffer = audioBuffer;
    source.connect(audioContext.destination); // Conectar a la salida de audio
    source.start(); // Iniciar la reproducción
  } catch (error) {
    console.error("Error:", error);
  }
}
