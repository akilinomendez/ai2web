export default function Info({ toggle }: { toggle: (value: boolean) => void }) {
  return (
    <div className="absolute inset-0 h-screen flex justify-center w-full items-center  mx-auto -mt-1 z-50   p-4 overflow-x-hidden overflow-y-auto md:inset-0 h-modal md:h-full">
      <div className="relative w-full h-full max-w-2xl md:h-auto">
        <div className="relative bg-black px-5 py-2  rounded-lg border-b-4 border-r-4  border-2   shadow-white  ">
          <div className="flex items-start justify-between p-4 border-b rounded-t ">
            <h3 className="text-xl font-semibold  text-white">How to Use</h3>
            <button
              type="button"
              className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white"
              onClick={() => toggle(false)}
            >
              <svg
                className="w-5 h-5"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fill-rule="evenodd"
                  d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                  clip-rule="evenodd"
                ></path>
              </svg>
              <span className="sr-only">Close modal</span>
            </button>
          </div>

          <div className="p-6 space-y-6">
            <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400">
              In this page you can generate diferect promt and images for design
              your site. when you click on the generate button you will redirect
              to Edit page, where you can edit the text and image.
            </p>
            <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400">
              Then you set gradient, font, and color in develop tool and clip to
              save. But apply all promot tu need click to confirm button in Edit
              page.
            </p>
            <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400">
              In Random Page you view all text and images that you generate and
              a example of how it will look in your site. You can click in
              Download to obtain the code zip file in Astro for you deploy.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
