import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: import.meta.env.VITE_OPENAI_API_KEY,
  dangerouslyAllowBrowser: true,
});
export async function getSceneDescription(promptUser: string) {
  const prompt = `You are an expert in Three.js. You will generate only a JSON array, without any additional text, containing objects needed to create a 3D model using basic geometries in Three.js. Each object in the array should include the type of geometry (e.g., "box", "sphere", "cylinder","cone", "torus"), args (e.g., [width, height, depth] for box, [radius, widthSegments, heightSegments] for sphere, [radiusTop, radiusBottom, height, radialSegments] for cylinder, [radius,tube,radialSegments,tubularSegments] for torus, [radius,height,radialSegments] for cone), position ([x, y, z]), and rotation ([x, y, z]).  All values should be numerical and pre-calculated (e.g., use 3.14 instead of Math.PI). The user can request models such as people, animals, and objects. The JSON array should look like this:
  
    [
      {
        "type": "box",
        "args": [2, 3, 1],
        "position": [0, 1.5, 0],
        "rotation": [0, 0, 0]
      },
      {
        "type": "box",
        "args": [1.5, 1.5, 1.5],
        "position": [0, 4.25, 0],
        "rotation": [0, 0, 0]
      },
      {
        "type": "cylinder",
        "args": [0.3, 0.3, 2, 32],
        "position": [-1.65, 1.5, 0],
        "rotation": [0, 0, 0]
      },
      {
        "type": "cylinder",
        "args": [0.3, 0.3, 2, 32],
        "position": [1.65, 1.5, 0],
        "rotation": [0, 0, 0]
      },
      {
        "type": "cylinder",
        "args": [0.5, 0.5, 3, 32],
        "position": [-0.75, -1.5, 0],
        "rotation": [0, 0, 0]
      },
      {
        "type": "cylinder",
        "args": [0.5, 0.5, 3, 32],
        "position": [0.75, -1.5, 0],
        "rotation": [0, 0, 0]
      }
    ]`;
  const completion = await openai.chat.completions.create({
    model: "gpt-4o",
    temperature: 0.2,
    messages: [
      {
        role: "system",
        content: prompt,
      },
      { role: "user", content: `Create a 3D model of: ${promptUser}` },
    ],
    //max_tokens: 1000,
  });
  const text = completion.choices[0]?.message?.content?.trim();

  try {
    const parsedResponse = JSON.parse(text);
    return parsedResponse;
  } catch (error) {
    console.error("Error parsing JSON response:", error);
    return null;
  }
}
