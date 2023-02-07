import cohere from "cohere-ai";

const COHERE_API_KEY = process.env.COHERE_API_KEY || "";
cohere.init(COHERE_API_KEY);

export async function generateText({
  prompt,
  model,
  max_tokens,
  temperature,
  k,
  p,
  frequency_penalty,
  presence_penalty,
  stop_sequences,
  return_likelihoods,
}: {
  prompt: string;
  model: string;
  max_tokens: number;
  temperature: number;
  k: number;
  p: number;
  frequency_penalty: number;
  presence_penalty: number;
  stop_sequences: string[];
  return_likelihoods: any;
}) {
  const data = {
    model,
    prompt,
    max_tokens,
    temperature,
    k,
    p,
    frequency_penalty,
    presence_penalty,
    stop_sequences,
    return_likelihoods,
  };

  const response = await cohere.generate(data);

  return response.body.generations[0].text.trim();
}

export async function checkToxicity(text: string) {
  console.log("checkToxicity");
  try {
    const response = await cohere.classify({
      model: "1e2e11ba-1f2b-42a5-b4bc-1222927699a8-ft",
      inputs: [text],
      examples: [],
    });
    return response.body.classifications[0];
  } catch (error) {
    console.log(error);
    throw new Error("Error");
  }
}
