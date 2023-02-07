import { useRandomContext } from "@/contexts";
import { useSupabaseClient } from "@supabase/auth-helpers-react";
import { saveAs } from 'file-saver';
import { useRouter } from "next/router";
import FontColor from "./FontColor";
import RandomFontComponent from "./RandomFont";
import RandomGradientComponent from "./RandomGradient";

export default function Develop() {
  const {
    title,
    description,
    products,
    gradient,
    font,
    fontColor,
    setGradient,
    setTitle,
    setDescription,
    setProducts,
    setFont,
    setFontColor,
  } = useRandomContext();
  const supabase = useSupabaseClient();
  const { push, pathname } = useRouter();
  const handlesave = async () => {
    try {
      const response = await fetch("/api/ai/confirm", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title,
          description,
          products,
          gradient,
          font,
          fontColor,
        }),
      });

      const data = await response.json();
    } catch (error) {}
  };

  const goToEdit = () => {
    push("/protected/edit");
  };

  const goToRandom = () => {
    push("/protected/random");
  };

  const signOut = async () => {
    try {
      await supabase.auth.signOut();

      push("/");
    } catch (error) {}
  };

  //TODO: Fix this function Peding to testing
  const handleDownload = async () => {
    try {
      //Dowload Zip file from server
      const response = await fetch("/api/ai/download");

      const blob = new Blob([(await response.blob())], { type: "application/zip" });
      saveAs(blob, "astro.zip");
    } catch (error) {}
  };

  return (
    <nav className=" bg-gray-800  ">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-20 items-center justify-between">
          <div className="flex-shrink-0">
            <button
              className="bg-white rounded-md p-2 text-black  font-bold  hover:bg-slate-500"
              onClick={() => signOut()}
            >
              SignOut
            </button>
          </div>
          <div className=" flex justify-center w-full">
            <div className="flex space-x-4">
              <RandomGradientComponent
                value={gradient}
                onChange={setGradient}
                customClass=" "
              />
              <RandomFontComponent
                value={font}
                onChange={setFont}
                customClass="flex justify-center w-full"
              />
              <FontColor value={fontColor} onChange={setFontColor} />
            </div>
          </div>
          <div className=" sm:ml-6 sm:block">
            <div className="flex items-center gap-4">
              {pathname != "/protected/edit" ? (
                <button
                  className="bg-white rounded-md p-2 text-black  font-bold hover:bg-slate-500"
                  onClick={goToEdit}
                >
                  Edit
                </button>
              ) : (
                <button
                  className="bg-white rounded-md p-2 text-black  font-bold hover:bg-slate-500"
                  onClick={goToRandom}
                >
                  Preview
                </button>
              )}

              <div className="flex space-x-4 w-full justify-center">
                <button
                  className="bg-white rounded-md p-2 text-black  font-bold hover:bg-slate-500"
                  onClick={handlesave}
                >
                  Save
                </button>
              </div>
              {pathname == "/protected/random" ? (
                <div className="flex space-x-4 w-full justify-center">
                  <button
                    className="bg-white rounded-md p-2 text-black  font-bold hover:bg-slate-500"
                    onClick={handleDownload}
                  >
                    Download
                  </button>
                </div>
              ) : null}
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}
