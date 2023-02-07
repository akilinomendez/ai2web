export default function Card({ data }: { data: string }) {
  return (
    <figure className="p-4 max-w-screen-md mx-auto h-96 w-80 text-center border block border-gray-200 rounded-lg shadow box-border overflow-hidden">
      <svg
        aria-hidden="true"
        className="w-12 h-12 mx-auto mb-3"
        viewBox="0 0 24 27"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M14.017 18L14.017 10.609C14.017 4.905 17.748 1.039 23 0L23.995 2.151C21.563 3.068 20 5.789 20 8H24V18H14.017ZM0 18V10.609C0 4.905 3.748 1.038 9 0L9.996 2.151C7.563 3.068 6 5.789 6 8H9.983L9.983 18L0 18Z"
          fill="currentColor"
        ></path>
      </svg>
      <blockquote>
        <p className="text-2xl italic font-medium overflow-hidden h-48">
          {data}
        </p>
      </blockquote>
    </figure>
  );
}
