interface GenerationResponse {
  artifacts: Array<{
    base64: string;
    seed: number;
    finishReason: string;
  }>;
}

export async function generateImage(prompt: string) {
  try {
    const engineId = "stable-diffusion-512-v2-0";
    const apiHost =
      process.env.API_HOST_STABLE_DIFFUSION ?? "https://api.stability.ai";
    const apiKey = process.env.STABILITY_API_KEY;
    if (!apiKey) throw new Error("Missing Stability API key.");
    const response = await fetch(
      `${apiHost}/v1beta/generation/${engineId}/text-to-image`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: `Bearer ${apiKey}`,
        },
        body: JSON.stringify({
          text_prompts: [
            {
              text: prompt,
            },
          ],
          cfg_scale: 7,
          clip_guidance_preset: "FAST_BLUE",
          height: 512,
          width: 1024,
          samples: 1,
          steps: 50,
        }),
      }
    );

    if (!response.ok) {
      throw new Error(`Non-200 response: ${await response.text()}`);
    }

    const responseJSON = (await response.json()) as GenerationResponse;

    const image = responseJSON.artifacts[0];

    return image;
  } catch (error) {
    console.log(error);
    throw new Error("Error generating image");
  }
}
