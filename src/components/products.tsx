import Card from "./Card";

export default function Products({ data }: { data: string[] }) {
  return (
    <div className="mt-10 w-full col-span-2 justify-center justify-self-center text-center px-4">
      <div className="m-0 flex justify-between p-4">
        <div className="text-center">
          <h1 className="font-extrabold text-8xl w-full p-4">Products</h1>
          <h2 className="mt-20 font-semibold text-2xl w-full text-justify">
            {data.map((item, index) => (
              <div key={index}>{item}</div>
            ))}
          </h2>

          <div className="flex gap-4 flex-wrap mt-44">
            {data.map((item, index) => (
              <Card key={index} data={item} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
