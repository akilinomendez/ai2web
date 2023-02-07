import Description from "@/components/Description";
import Develop from "@/components/Develop";
import Hero from "@/components/Hero";
import Products from "@/components/products";
import { useRandomContext } from "@/contexts";
import Head from "next/head";

export default function RandomWeb() {
  const {
    title,
    description,
    products,
    gradient,
    font,
    imagePath,
    setTitle,
    setDescription,
    setProducts,
    setGradient,
    setFont,
  } = useRandomContext();

  return (
    <>
      <Head>
        <title>{title}</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Develop />
      <main className={gradient + ` font-loader`}>
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:max-w-7xl lg:px-8">
          <div className="">
            <Hero data={title} image={imagePath} />
            <Description data={description} />
            <Products data={products} />
          </div>
        </div>
      </main>
    </>
  );
}
