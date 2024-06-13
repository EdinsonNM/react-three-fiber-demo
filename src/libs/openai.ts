import OpenAI from "openai";
type Message = { role: string; content: string };
const openai = new OpenAI({
  apiKey: import.meta.env.VITE_OPENAI_API_KEY,
  dangerouslyAllowBrowser: true,
});
class OpenAi {
  conversation: Message[] = [];

  constructor(private systemPrompt: string) {
    this.conversation.push({ role: "system", content: this.systemPrompt });
  }

  async getConversation(
    promptUser: string,
    hasMemory: boolean = false
  ): Promise<string> {
    if (hasMemory) {
      this.conversation.push({ role: "user", content: promptUser });
    } else {
      this.conversation = [{ role: "system", content: this.systemPrompt }];
      this.conversation.push({ role: "user", content: promptUser });
    }
    const completion = await openai.chat.completions.create({
      model: "gpt-4o",
      temperature: 0.2,
      messages: this.conversation as any,
      //max_tokens: 1000,
    });
    const text: string = completion.choices[0]?.message?.content?.trim() ?? "";

    return text;
  }
}
export default OpenAi;
