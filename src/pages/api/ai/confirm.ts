import { createServerSupabaseClient } from "@supabase/auth-helpers-nextjs";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    if (req.method === "POST") {
      if (req.headers["content-type"] === "application/json") {
        const body = await req.body;
        const type = body.type;

        // Create authenticated Supabase Client
        const supabase = createServerSupabaseClient({ req, res });
        // Check if we have a session
        const {
          data: { session },
        } = await supabase.auth.getSession();

        if (!session)
          return res.status(401).json({
            error: "not_authenticated",
            description:
              "The user does not have an active session or is not authenticated",
          });

        const { data, error } = await supabase
          .from("promts")
          .upsert({
            created_at: new Date(),
            title: body.title!,
            description: body.description!,
            products: body.products!,
            keywords: body.keywords!,
            gradient: body.gradient!,
            font: body.font!,
            fontColor: body.fontColor!,
            user_id: session.user.id,
          })
          .select()
          .limit(1);

        if (error) return res.status(500).json({ error: "Server error" });
        return res.status(200).json({ data: data });
      }
    }
  } catch (error) {
    return res.status(500).json({ error: "Server error" });
  }
}
