import { checkToxicity, generateText } from "@/utils/generateText";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    if (req.method === "POST") {
      const {
        promt,
        model = "command-xlarge-20221108",
        max_tokens = 100,
        temperature = 0.7,
        k = 0,
        p = 0.75,
        frequency_penalty = 0,
        presence_penalty = 0,
        stop_sequences = [],
        return_likelihoods = "NONE",
      }: {
        promt: string;
        model: string;
        max_tokens: number;
        temperature: number;
        k: number;
        p: number;
        frequency_penalty: number;
        presence_penalty: number;
        stop_sequences: string[];
        return_likelihoods: any;
      } = JSON.parse(JSON.stringify(req.body));

      const t = await checkToxicity(promt);
      if (t.prediction === "Toxic") {
        res.status(200).json({ status: "Toxicity" });
      }

      const text = await generateText({
        prompt: promt,
        model: model,
        max_tokens: max_tokens,
        temperature: temperature,
        k: k,
        p: p,
        frequency_penalty: frequency_penalty,
        presence_penalty: presence_penalty,
        stop_sequences: stop_sequences,
        return_likelihoods: return_likelihoods,
      });

      res.status(200).json({ text, status: "OK" });
    } else {
      res.status(500).json({ message: "NOT VALID METHOD" });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "error" });
  }
}
