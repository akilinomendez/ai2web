import { createBrowserSupabaseClient } from "@supabase/auth-helpers-nextjs";
import React, { useEffect, useState } from "react";

interface IRandomContextProps {
  title: string;
  description: string;
  products: string[];
  gradient: string;
  font: string;
  fontColor: string;
  imagePath: string;
  setTitle: (title: string) => void;
  setDescription: (description: string) => void;
  setProducts: (products: string[]) => void;
  setGradient: (gradient: string) => void;
  setFont: (font: string) => void;
  setFontColor: (fontColor: string) => void;
  setImagePath: (imagePath: string) => void;
}

export const RandomContext = React.createContext<IRandomContextProps>({
  title: "",
  description: "",
  products: [],
  gradient: "",
  font: "",
  fontColor: "",
  imagePath: "",
  setTitle: () => {},
  setDescription: () => {},
  setProducts: () => {},
  setGradient: () => {},
  setFont: () => {},
  setFontColor: () => {},
  setImagePath: () => {},
});

export function RandomContextProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [title, setTitle] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [products, setProducts] = useState<string[]>([]);
  const [gradient, setGradient] = useState<string>("");
  const [font, setFont] = useState<string>("");
  const [fontColor, setFontColor] = useState<string>("");
  const [imagePath, setImagePath] = useState<string>("");

  const [supabase] = useState(() => createBrowserSupabaseClient());

  useEffect(() => {
    (async () => {
      const { data, error } = await supabase.from("promts").select();

      if (error) {
        return;
      }
      if (data.length === 0) return;
      setTitle(data[0].title);
      setDescription(data[0].description);
      setProducts(data[0].products);
      setGradient(data[0].gradient);
      setFont(data[0].font);
      setFontColor(data[0].fontColor);

      const iarr = data![0].image.split("/");
      const imagePath = iarr[2] + "/" + iarr[3];
      const image = await supabase.storage
        .from("images")
        .createSignedUrl(imagePath, 60);

      setImagePath(image.error ? "" : image.data?.signedUrl);
    })();
  }, []);

  return (
    <RandomContext.Provider
      value={{
        title,
        description,
        products,
        gradient,
        font,
        fontColor,
        imagePath,
        setGradient,
        setTitle,
        setDescription,
        setProducts,
        setFont,
        setFontColor,
        setImagePath,
      }}
    >
      {children}
    </RandomContext.Provider>
  );
}
