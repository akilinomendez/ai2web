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
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 1024 1024"
        className="absolute top-1/2 left-1/2 -z-10 h-[64rem] w-[64rem] -translate-x-1/2 [mask-image:radial-gradient(closest-side,white,transparent)]"
        aria-hidden="true"
      >
        <circle
          cx={512}
          cy={512}
          r={512}
          fill="url(#radial)"
          fillOpacity="0.7"
        />
        <defs>
          <radialGradient id="radial">
            <stop stopColor="#7775D6" />
            <stop offset={1} stopColor="#E935C1" />
          </radialGradient>
        </defs>
      </svg>
    </section>
  );
}
