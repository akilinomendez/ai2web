import { useState } from "react";
export default function EditText({
  description,
  value,
  customClass,
  input,
  onChange,
}: {
  description: string;
  value: string;
  input?: string;
  customClass?: string;
  onChange: (value: string) => void;
}) {
  const [custom, setCustom] = useState(false);

  const [promt, setPromt] = useState(input);
  const [model, setModel] = useState("command-xlarge-20221108");
  const [max_tokens, setMax_tokens] = useState(100);
  const [temperature, setTemperature] = useState(0.5);
  const [k, setK] = useState(0);
  const [p, setP] = useState(0);
  const [frequency_penalty, setFrequency_penalty] = useState(0);
  const [presence_penalty, setPresence_penalty] = useState(0);

  const promtChangeHandle = async () => {
    const response = await fetch("/api/ai/custom", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        promt: promt,
        model: model,
        max_tokens: max_tokens,
        temperature: temperature,
        k: k,
        p: p,
        frequency_penalty: frequency_penalty,
        presence_penalty: presence_penalty,
      }),
    });

    const data = await response.json();
    if (data.status === "Toxicity") {
      alert("The text is toxic");
    }

    onChange(data.text);
  };

  return (
    <div className="flex flex-col gap-4  w-full p-10  ">
      <div className="flex  w-full justify-between">
        <span className="text-2xl font-bold uppercase">{description}</span>

        <button
          type="button"
          className="w-4 flex align-middle text-white"
          onClick={() => setCustom(!custom)}
        >
          <svg
            fill="white"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden="true"
          >
            <path
              clipRule="evenodd"
              fillRule="evenodd"
              d="M7.84 1.804A1 1 0 018.82 1h2.36a1 1 0 01.98.804l.331 1.652a6.993 6.993 0 011.929 1.115l1.598-.54a1 1 0 011.186.447l1.18 2.044a1 1 0 01-.205 1.251l-1.267 1.113a7.047 7.047 0 010 2.228l1.267 1.113a1 1 0 01.206 1.25l-1.18 2.045a1 1 0 01-1.187.447l-1.598-.54a6.993 6.993 0 01-1.929 1.115l-.33 1.652a1 1 0 01-.98.804H8.82a1 1 0 01-.98-.804l-.331-1.652a6.993 6.993 0 01-1.929-1.115l-1.598.54a1 1 0 01-1.186-.447l-1.18-2.044a1 1 0 01.205-1.251l1.267-1.114a7.05 7.05 0 010-2.227L1.821 7.773a1 1 0 01-.206-1.25l1.18-2.045a1 1 0 011.187-.447l1.598.54A6.993 6.993 0 017.51 3.456l.33-1.652zM10 13a3 3 0 100-6 3 3 0 000 6z"
            ></path>
          </svg>
        </button>
      </div>
      <div className="h-full  p-4  flex bg-slate-900   drop-shadow-[5px_5px_0px_rgba(255,255,233,1)] border-solid text-center  ">
        <div className="w-full flex-wrap flex ">
          <textarea
            value={value}
            onChange={(e) => onChange(e.target.value)}
            placeholder="Write  here your Idea"
            className="w-full h-full resize-none text-center p-10 bg-transparent hover:border-none"
          />
        </div>
        {custom && (
          <aside
            className=" top-0 left-0 w-96 h-full relative"
            aria-label="Sidenav"
          >
            <div className="h-full flex flex-col">
              <button
                type="button"
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                onClick={promtChangeHandle}
              >
                Refresh
              </button>

              <div className="overflow-y-auto py-5 px-3 h-full bg-white border-r border-gray-200 dark:bg-gray-800 dark:border-gray-700">
                <ul className="space-y-2">
                  <label>Change Promt</label>
                  <li className="flex items-center p-2 text-base font-normal text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
                    <input
                      type="text"
                      className="w-full ml-4"
                      value={promt}
                      onChange={(e) => setPromt(e.target.value)}
                    />
                  </li>
                  <label>Model</label>
                  <li className="flex items-center p-2 text-base font-normal text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
                    <input
                      type="text"
                      className="w-full ml-4"
                      value={model}
                      onChange={(e) => setModel(e.target.value)}
                    />
                  </li>
                  <label>Max Tokens</label>
                  <li className="flex items-center p-2 text-base font-normal text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
                    <input
                      type="number"
                      className="w-full ml-4"
                      value={max_tokens}
                      onChange={(e) =>
                        setMax_tokens(parseFloat(e.target.value))
                      }
                    />
                  </li>
                  <label>Temperature</label>
                  <li className="flex items-center p-2 text-base font-normal text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
                    <input
                      type="number"
                      className="w-full ml-4"
                      value={temperature}
                      onChange={(e) =>
                        setTemperature(parseFloat(e.target.value))
                      }
                    />
                  </li>
                  <label>Set k</label>
                  <li className="flex items-center p-2 text-base font-normal text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
                    <input
                      type="number"
                      className="w-full ml-4"
                      value={k}
                      onChange={(e) => setK(parseFloat(e.target.value))}
                    />
                  </li>
                  <label>Set P</label>
                  <li className="flex items-center p-2 text-base font-normal text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
                    <input
                      type="number"
                      className="w-full ml-4"
                      value={p}
                      onChange={(e) => setP(parseFloat(e.target.value))}
                    />
                  </li>
                  <label>Frequency Penalty</label>
                  <li className="flex items-center p-2 text-base font-normal text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
                    <input
                      type="number"
                      className="w-full ml-4"
                      value={frequency_penalty}
                      onChange={(e) =>
                        setFrequency_penalty(parseFloat(e.target.value))
                      }
                    />
                  </li>

                  <label>Presence Penalty</label>
                  <li className="flex items-center p-2 text-base font-normal text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
                    <input
                      type="number"
                      className="w-full ml-4"
                      value={presence_penalty}
                      onChange={(e) =>
                        setPresence_penalty(parseFloat(e.target.value))
                      }
                    />
                  </li>
                </ul>
              </div>
            </div>
          </aside>
        )}
      </div>
    </div>
  );
}
