import { generateImage } from "@/utils/imagegenerator";
import { createServerSupabaseClient } from "@supabase/auth-helpers-nextjs";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    if (req.method === "POST") {
      if (req.headers["content-type"] === "application/json") {
        const { name, prompt } = await req.body;

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

        const image = await generateImage(prompt);
        const { data, error } = await supabase.storage
          .from("images/" + session.user.id)
          .update(`${name}.png`, Buffer.from(image.base64, "base64"), {
            contentType: "image/png",
          });
        if (error) {
          throw error;
        }

        const r = await supabase
          .from("promts")
          .update({
            image: `/images/${session.user.id}/${data.path}`,
          })
          .eq("user_id", session.user.id);

        if (r.error) {
          throw r.error;
        }

        res.status(200).json({ r });
        if (error) {
          throw error;
        }
      }
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "Server error" });
  }
}
