export default function Description({ data }: { data: string }) {
  return (
    <section className="mt-32 relative isolate overflow-hidden ">
      <div className="py-24 px-6 sm:px-6 sm:py-32 lg:px-8">
        <div className="mx-auto max-w-6xl text-center">
          <h2 className="text-8xl font-bold tracking-tight ">
            About
            <br />
          </h2>
          <p className="mx-auto mt-6  text-2xl leading-8 ">{data}</p>
        </div>
      </div>
    </section>
  );
}
