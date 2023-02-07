import Develop from "@/components/Develop";
import EditText from "@/components/EditText";
import Logo from "@/components/Logo";
import { useRandomContext } from "@/contexts";
import { createServerSupabaseClient } from "@supabase/auth-helpers-nextjs";
import {
  GetServerSidePropsContext,
  NextApiRequest,
  NextApiResponse,
  PreviewData
} from "next";
import Head from "next/head";

import Image from "next/image";
import { useRouter } from "next/router";
import { ParsedUrlQuery } from "querystring";
import { useState } from 'react';
export async function getServerSideProps(
  context:
    | GetServerSidePropsContext<ParsedUrlQuery, PreviewData>
    | { req: NextApiRequest; res: NextApiResponse<any> }
) {
  const supabase = createServerSupabaseClient(context);

  const { data } = await supabase.from("promts").select().limit(1);

  const iarr = data![0].image.split("/");
  const imagePath = iarr[2] + "/" + iarr[3];
  const image = await supabase.storage
    .from("images")
    .createSignedUrl(imagePath, 60);

  return {
    props: {
      data: data ?? [],
      image: image.error ? "" : image.data?.signedUrl,
    },
  };
}

export default function Edit({ data, image }: { data: any; image: string }) {
  const {
    title,
    description,
    products,
    gradient,
    font,
    fontColor,
    imagePath,
    setDescription,
    setTitle,
    setProducts,
    setGradient,
    setFont,
    setFontColor,
    setImagePath,
  } = useRandomContext();
  const { push } = useRouter();
  const [loadingImage, setLoadingImage] = useState(false);
  const onConfirmHandle = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const response = await fetch("/api/ai/confirm", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ title, description, products, gradient, font }),
      });

      const data = await response.json();

      push("/protected/random");
    } catch (error) {}
  };

  const handleGenerateImage = async () => {
    try {
      setLoadingImage(true);
      const prompt = `${data[0].input_title}, 80mm portrait photography, hard rim lighting photography–beta –ar 2:3 –beta –upbeta`;
      const response = await fetch("/api/ai/text2image", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name: "title", prompt }),
      });

     if(response){
      setLoadingImage(false);
     }

    } catch (error) {}
  };

  return (
    <div>
      <Head>
        <title>Ai 2 Web</title>
        <meta name="description" content="Generate your website with a AI" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Develop />
      <main className="p-4 mx-auto max-w-7xl">
        <div className="w-full justify-center flex h-full ">
          <div className=" gap-8 flex flex-col justify-center w-full p-20  h-full">
            <Logo />
            <div className="flex gap-4"></div>

            <form
              onSubmit={onConfirmHandle}
              className="flex flex-col gap-3 justify-center    w-full"
            >
              <div className="flex gap-4 flex-col justify-between w-full ">
                <EditText
                  description="Edit Title"
                  value={title}
                  input={data[0].input_title}
                  onChange={setTitle}
                />
                <EditText
                  description="Edit Description"
                  value={description}
                  input={data[0].input_description}
                  onChange={setDescription}
                />
                <div className="flex flex-col w-full">
                  {products.length !== 0
                    ? products.map((product, index) => (
                        <EditText
                          customClass="w-full h-44 border-violet-200 bg-transparent border rounded-md text-center"
                          description={"Edit Product: " + (index + 1)}
                          key={index}
                          input={data[0].input_products}
                          value={product}
                          onChange={(e) => {
                            const newProducts = [...products];
                            newProducts[index] = e;
                            setProducts(newProducts);
                          }}
                        />
                      ))
                    : null}
                </div>
              </div>
              <div className="flex gap-4 flex-col items-center  ">
                <div className="flex w-96 justify-between">
                  <span className="text-2xl">Image Generate</span>

                  <span
                    className="  align-middle text-white cursor-pointer"
                    onClick={handleGenerateImage}
                  >
                   
                 
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="w-6 h-6"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182m0-4.991v4.99"
                      />
                    </svg>
                  </span>
                </div>

                {loadingImage ? (
                  <div className="flex justify-center items-center w-full h-96">
                    <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-white"></div>
                  </div>
                ) : (
                <Image
                  src={image}
                  alt={title}
                  width={300}
                  priority={true}
                  height={300}
                  className="justify-center flex"
                    />
                )}
              </div>
              <div className="flex w-full  items-center  flex-col gap-4 mt-10">
                <button
                  type="submit"
                  className="font-bold py-2 px-4 w-96  border-white  border rounded bg-transparent text-white hover:bg-white hover:text-black"
                >
                  Confirm
                </button>

                <button
                  type="button"
                  onClick={() => {
                    setTitle("");
                    setDescription("");
                    setProducts([]);
                    setGradient("");
                    setFont("");
                    setFontColor("");
                    setImagePath("");
                  }}
                  className="font-bold py-2 px-4 w-96  border-red-600  border rounded bg-transparent text-white hover:bg-red-600 hover:text-white"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      </main>
      <footer className="flex flex-col  gap-4  p-10 justify-center items-center w-full h-24 border-t bottom-0  ">
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
