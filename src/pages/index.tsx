import Bot from "@/components/Bot";
import Info from "@/components/Info";
import Logo from "@/components/Logo";
import getUrl from '@/utils/getUrl';
import {
  createServerSupabaseClient,
  Session
} from "@supabase/auth-helpers-nextjs";
import { useSupabaseClient } from "@supabase/auth-helpers-react";
import { Auth, ThemeSupa } from "@supabase/auth-ui-react";
import {
  GetServerSidePropsContext,
  NextApiRequest,
  NextApiResponse,
  PreviewData
} from "next";
import Head from "next/head";

import { ParsedUrlQuery } from "querystring";
import { useState } from "react";

export async function getServerSideProps(
  context:
    | GetServerSidePropsContext<ParsedUrlQuery, PreviewData>
    | { req: NextApiRequest; res: NextApiResponse<any> }
) {
  // Create authenticated Supabase Client
  const supabase = createServerSupabaseClient(context);
  // Check if we have a session
  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (!session)
    return {
      props: {
        initialSession: null,
        user: null,
        data: [],
      },
    };

  const { data } = await supabase.from("promts").select();

  if (data) {
    if (data?.length != 0) {
      return {
        redirect: {
          destination: "/protected/edit",
          permanent: true,
        },
      };
    }
  }
  return {
    props: {
      initialSession: session,
      user: session.user,
      data: [],
    },
  };
}

export default function Home({
  data,
  initialSession,
}: {
  data: any;
  initialSession: Session;
}) {
  const supabase = useSupabaseClient();

  const [openInfo, setOpenInfo] = useState(true);

  return (
    <div className="h-screen flex flex-col justify-between">
      <Head>
        <title>Ai 2 Web</title>
        <meta name="description" content="Generate your website with a AI" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="flex flex-col  h-full text-center justify-center m-0">
        <div className="w-full justify-center flex h-full ">
          {!initialSession ? (
            <div className=" flex flex-col justify-center  ">
              <Logo />
              <div className=" flex flex-col justify-center">
                <Auth
                  redirectTo={getUrl()}
                  supabaseClient={supabase}
                  onlyThirdPartyProviders={true}
                  providers={["github"]}
                  appearance={{ theme: ThemeSupa }}
                  theme="dark"
                />
              </div>
            </div>
          ) : (
            <div className="flex justify-start flex-col ">
              {openInfo ? <Info toggle={setOpenInfo} /> : null}
              <div className="flex justify-end">
                <button
                  className="text-2xl font-bold text-gray-900 dark:text-white border m-2 p-3 "
                  onClick={() => {
                    setOpenInfo(!openInfo);
                  }}
                >
                  ?
                </button>
              </div>
              <div className=" gap-8 flex flex-col justify-center w-full p-20  h-full">
                <Logo />
                <>
                  <div className="border p-12">
                    <p>
                      To get started, write a message to the bot and it will
                      generate a website for you. 
                      <br />
                      The bot detects if you have added a toxic message and returns the error
                      <br />
                      Just write the idea you want to develop and the bot will
                      do the rest. For Example:
                    </p>
                    <blockquote className="text-lg italic font-semibold text-gray-900 dark:text-white">
                      <p>"Restaurant of Hamburger"</p>
                    </blockquote>
                    <blockquote className="text-lg italic font-semibold text-gray-900 dark:text-white">
                      <p>"Cat Care"</p>
                    </blockquote>
                    <blockquote className="text-lg italic font-semibold text-gray-900 dark:text-white">
                      <p>"Online Store of T-Shirts"</p>
                    </blockquote>
                    <blockquote className="text-lg italic font-semibold text-gray-900 dark:text-white">
                      <p>"Profile of a Developer"</p>
                    </blockquote>
                  </div>

                  <Bot />
                </>
              </div>
            </div>
          )}
        </div>
      </main>
      <footer className="flex flex-col  gap-4  p-10 justify-center items-center w-full h-24 border-t bottom-0">
        <p>
          This is a demo of the AI2Web service, create your own website in
          seconds. Is a project for present to @midudev Hackathon.
        </p>
        <p>
          * For run the demo you need wait to the model is trained beacause all
          trained models are paused after 24 hours of inactivity.
        </p>
      </footer>
    </div>
  );
}
