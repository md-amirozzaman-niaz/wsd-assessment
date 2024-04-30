import "./App.css";
import { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  const [data, setData] = useState("");
  const [processingData, setProcessingData] = useState([]);
  const [pending, setPending] = useState(false);
  const [token, setToken] = useState(localStorage.getItem("token"));
  const urlParams = new URLSearchParams(window.location.search);
  const loginURL =
    "http://localhost:3001/api/v1/sso/layout?redirectUrl=http://localhost:3000/";

  // Get the value of a specific parameter
  const accessToken = urlParams.get("accessToken");

  if (accessToken) {
    localStorage.setItem("token", accessToken);
    window.location = "/";
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    setPending(true);
    if (token === "null") {
      setPending(false);
      toast.warn("Please log in");
      return;
    }
    if (data === "") {
      setPending(false);
      toast.warn("Empty string submitted");
      return;
    }

    const postData = {
      text: data,
    };

    try {
      const response = await fetch("http://localhost:4000/api/text", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(postData),
      });
      if (response.ok) {
        let output = await response.json().then((d) => d.output);
        setProcessingData((prevData) => [
          { analysis: output, text: data },
          ...prevData,
        ]);
        setData("");
        setPending(false);
      } else {
        let output = await response.json().then((d) => d.message);
        setPending(false);
        if (output === "TokenExpiredError") {
          localStorage.setItem("token", null);
          window.location = loginURL;
        }
        toast.error(output);
      }
    } catch (err) {
      setPending(false);
      console.log(err);
      toast.error("Something went Wrong");
    }
  };
  const clear = () => {
    setData("");
    setProcessingData([]);
  };
  return (
    <>
      <ToastContainer />
      <nav className="bg-gray-800 p-2">
        <div className="flex justify-between items-center">
          <div className="flex-1">
            <span href="#" className="text-white text-lg font-semibold">
              TEXT Analyzer
            </span>
          </div>

          <div>
            {token && token !== "null" && (
              <button
                onClick={() => {
                  localStorage.setItem("token", null);
                  window.location = "/";
                }}
                className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600"
              >
                Logout
              </button>
            )}

            {token === "null" && (
              <button
                onClick={() => {
                  localStorage.setItem("token", null);
                  window.location = loginURL;
                }}
                className="bg-gray-600 text-white px-4 py-2 rounded-md hover:bg-gray-600"
              >
                Login
              </button>
            )}
          </div>
        </div>
      </nav>
      <div className="flex h-screen gap-4 p-2">
        <div className="w-1/3 bg-white p-4 rounded-md shadow-md">
          <h2 className="text-xl font-semibold mb-4">Submit Feedback</h2>
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label
                for="feedback"
                className="block text-gray-700 font-semibold mb-2"
              >
                Feedback
              </label>
              <textarea
                id="feedback"
                value={data}
                onChange={(e) => setData(e.target.value)}
                name="feedback"
                rows="5"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
              ></textarea>
            </div>
            <button
              type="submit"
              className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 focus:outline-none focus:bg-blue-600 disabled:"
              disabled={pending}
            >
              {pending ? "Analyzing..." : "Submit"}
            </button>
            {processingData.length > 0 && (
              <button
                onClick={clear}
                type="button"
                className="bg-gray-500 ml-2 text-white px-4 py-2 rounded-md hover:bg-gray-600 focus:outline-none focus:bg-gray-600 disabled:"
              >
                Clear
              </button>
            )}
          </form>
        </div>
        <div className="w-2/3 bg-white p-4 rounded-md shadow-md overflow-hidden">
          <h2 className="text-xl font-semibold mb-4">Analytics of Feedback</h2>
          {processingData.length > 0 && (
            <div className="scrollable p-4 my-2 bg-gray-100">
              {processingData.map((el, index) => (
                <div key={index} className="mt-4">
                  <span className="font-semibold">Last Text {index + 1}</span>
                  <pre className="p-4 bg-gray-50 rounded-md text-container mt-2">
                    {el.text}
                  </pre>
                  <pre className="p-4 mt-1 bg-white rounded-md">
                    <code>{JSON.stringify(el.analysis, null, 2)}</code>
                  </pre>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default App;
