// Pending to be tested and debugged when the function is ready

import { createServerSupabaseClient } from "@supabase/auth-helpers-nextjs";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const supabase = createServerSupabaseClient({ req, res });
    // Check if we have a session
    const {
      data: { session },
    } = await supabase.auth.getSession();

    const zip = supabase.functions.invoke("git2Zip", {
      body: { uuid: session?.user.id },
    });
    res.setHeader("Content-Type", "application/zip");
    res.setHeader("Content-Disposition", "attachment; filename=download.zip");
    res.status(200).send(zip);
  } catch (error) {
    console.log(error);
  }
}
