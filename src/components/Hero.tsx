import Image from "next/image";
export default function Hero({ data, image }: { data: string; image: string }) {
  return (
    <section className="w-full h-screen flex justify-center items-center overflow-hidden relative bg-black ">
      {image ? (
        <Image
          src={image}
          alt={data}
          className="opacity-60 object-cover"
          fill={true}
        />
      ) : null}
      <div className="flex flex-col justify-center items-center px-3">
        <h1 className=" text-center text-3xl md:text-5xl font-bold drop-shadow-lg">
          {" "}
          {data}
        </h1>
      </div>
    </section>
  );
}
