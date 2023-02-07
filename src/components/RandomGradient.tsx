import classNameGenerator from "@/utils/classgenerator";
import { RandomGradient } from "@/utils/gradient";

export default function RandomGradientComponent({
  value,
  customClass,
  onChange,
}: {
  value: string;
  customClass?: string;
  onChange: (value: string) => void;
}) {
  function classing() {
    if (customClass) {
      return customClass;
    }
    return "";
  }
  return (
    <div className="flex gap-2  w-full ">
      <div className="flex flex-col">
        <span className="text-white font-bold">Gradient</span>

        <div className="flex  gap-1">
          <div
            className={classNameGenerator(
              "w-32 h-10 flex flex-col justify-center border boder-white ",
              value,
              classing()
            )}
          ></div>

          <div className=" flex  flex-col justify-center">
            <button
              type="button"
              onClick={() => {
                onChange(RandomGradient());
              }}
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
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
