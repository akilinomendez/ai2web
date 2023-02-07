import { checkToxicity, generateText } from "@/utils/generateText";
import { generateImage } from "@/utils/imagegenerator";
import { createServerSupabaseClient } from "@supabase/auth-helpers-nextjs";
import { NextApiRequest, NextApiResponse } from "next";
//TODO - add cohere api key here

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    if (req.method === "POST") {
      const supabase = await createServerSupabaseClient({ req, res });
      const {
        data: { session },
      } = await supabase.auth.getSession();

      if (!session)
        return res.status(401).json({
          error: "not_authenticated",
          description:
            "The user does not have an active session or is not authenticated",
        });

      const { text } = JSON.parse(JSON.stringify(req.body));
      const t = await checkToxicity(text);
      if (t.prediction === "Toxic") {
        res.status(200).json({ status: "Toxicity" });
      }
      console.log("Toxicity Ok");

      const titlepromt = `Write 1 titles for a blog ideas for the keywords \"${text}\"`;

      const dpromt = `Generate an intro paragraph of \"${text}\" . The post should be enthusiastic and speak.`;

      const ppromt = `Write a 3 creative for diferent product  description  for  \"${text}\"`;
      const imagepromt = `${text}, 80mm portrait photography, hard rim lighting photography–beta –ar 2:3 –beta –upbeta`;

      const array = await Promise.all([
        generateText({
          prompt: titlepromt,
          model: "command-xlarge-20221108",
          max_tokens: 100,
          temperature: 0.7,
          k: 0,
          p: 0.75,
          frequency_penalty: 0,
          presence_penalty: 0,
          stop_sequences: [],
          return_likelihoods: "NONE",
        }),
        generateText({
          prompt: dpromt,
          model: "command-xlarge-20221108",
          max_tokens: 200,
          temperature: 0.7,
          k: 0,
          p: 0.75,
          frequency_penalty: 0,
          presence_penalty: 0,
          stop_sequences: [],
          return_likelihoods: "NONE",
        }),
        generateText({
          prompt: ppromt,
          model: "command-xlarge-20221108",
          max_tokens: 200,
          temperature: 0.7,
          k: 0,
          p: 0.75,
          frequency_penalty: 0,
          presence_penalty: 0,
          stop_sequences: [],
          return_likelihoods: "NONE",
        }),
        generateImage(imagepromt),
      ]);
      const [temptitle, d, p, image] = array;
      console.log("all generating");

      const arrayProducts =
        p.split("\n").length > 1
          ? p
              .split("\n")
              .map((item) => item.replace(/^[0-9]+\./, "").trim())
              .filter((item) => item.length > 0)
          : [p];

      const { data, error } = await supabase.storage
        .from("images/" + session.user.id)
        .upload(`title.png`, Buffer.from(image.base64, "base64"), {
          contentType: "image/png",
        });

      const title = temptitle.includes("1.")
        ? temptitle.split("\n")[0].split("1.")[1]
        : temptitle;

      if (error) {
        throw error;
      }
      console.log("upload image");

      const r = await supabase
        .from("promts")
        .upsert({
          created_at: new Date(),
          title: title,
          description: d,
          products: arrayProducts,
          keywords: "",
          gradient: "",
          font: "",
          fontColor: "",
          user_id: session.user.id,
          input_title: titlepromt,
          input_description: dpromt,
          input_products: ppromt,
          input_image: imagepromt,
          image: "/images/" + session.user.id + "/" + data.path,
        })
        .eq("user_id", session.user.id);

      res.status(200).json({
        title,
        description: d,
        products: arrayProducts,
        status: "OK",
        image: data.path,
      });
    } else {
      res.status(500).json({ message: "NOT VALID METHOD" });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "error" });
  }
}
