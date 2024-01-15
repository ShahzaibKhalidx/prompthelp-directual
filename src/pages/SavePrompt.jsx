import React, { useState } from "react";
import Directual from "directual-api";
import { useAuth } from "../auth";
import { Loader } from "../components/loader/loader";
import { Layout, Button, Input } from "antd";
import {
  FileTextTwoTone,
  FolderAddTwoTone,
  CopyTwoTone,
  SaveTwoTone,
} from "@ant-design/icons";
import Background from "../components/img/bg.png";

//api conncet
const api = new Directual({
  apiHost: "/",
});

const { Content, Sider } = Layout;

export default function SavePrompt() {
  // API-endpoint details
  const dataStructure = "prompt_folder"; // todo: write here sysname of your data structure
  const endpoint = "promptFolder"; // todo: write here Method name of your API-endpoint

  // Connect authentication context
  const auth = useAuth();

  // Hooks for handling state
  const [response, setResponse] = useState(); // API response
  const [status, setStatus] = useState(); // Request status
  const [badRequest, setBadRequest] = useState(); // API error message
  const [loading, setLoading] = useState(false); // Loader
  const [showForm, setShowForm] = useState(true); // Show/hide the form
  const [formPayload, setFormPayload] = useState({ user_id: auth.user }); // Data to send
  const [textpadVisible, setTextpadVisible] = useState(false); // Textpad visibility

  // Reset the form
  const resetForm = () => {
    setResponse();
    setStatus();
    setBadRequest();
    setShowForm(true);
    setFormPayload({ user_id: auth.user });
    setTextpadVisible(false);
  };

  // POST-request
  const SavePrompt = async (e) => {
    e.preventDefault();
    setStatus("loading");
    setLoading(true);
    setShowForm(false);

    try {
      const response = await api
        .structure(dataStructure)
        .setData(endpoint, formPayload, { sessionID: auth.sessionID });

      console.log("API response:", response);
      setResponse(response.result);
      setStatus("success");
    } catch (error) {
      console.error("API request failed:", error);
      setStatus("error");

      if (error.response) {
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
        console.error("Error response:", error.response);
        setBadRequest({
          httpCode: error.response.status,
          msg: error.response.data.msg,
        });
      } else if (error.request) {
        // The request was made but no response was received
        console.error("Error request:", error.request);
        setBadRequest({
          httpCode: "Network Error",
          msg: "No response received from the server",
        });
      } else {
        // Something happened in setting up the request that triggered an Error
        console.error("Error message:", error.message);
        setBadRequest({
          httpCode: "Request Error",
          msg: error.message,
        });
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      style={{
        backgroundImage: `url(${Background})`,
        backgroundSize: "cover", // Cover the entire area
        backgroundRepeat: "no-repeat", // Don't repeat the image
        backgroundPosition: "center", // Center the image
        backdropFilter: "blur(100%)",
      }}
    >
      <Layout className="h-150" style={{ backgroundColor: "transparent" }}>
        <Sider
          width={366}
          className="Sider shadow-lg  rounded-2xl overflow-auto sm:h-10 w-10"
          style={{
            height: "80vh",
            // backgroundColor: "transparent", // Set Sider background to transparent
            backgroundColor: "#FAFAFA",
            marginLeft: "10vh",
            marginTop: "2vh",
            marginBottom: "2vh",
            borderRadius: "10px",
          }}
        >
          <div className="flex overflow-auto">
            {/* Folder button */}
            <div className="p-5 flex gap-5">
              <Button
                style={{ backgroundColor: "#12BF80", color: "white" }}
                className="border-none text-base font-bold w-36"
                onClick={""}
              >
                + New Folder
              </Button>

              {/* New Document button */}

              <Button
                style={{ backgroundColor: "#12BF80", color: "white" }}
                className="border-none text-base font-bold w-36 "
                onClick={""}
              >
                + New Prompt
              </Button>
            </div>
          </div>
        </Sider>

        <Layout style={{ backgroundColor: "transparent" }}>
          <Content
            className="w-100 h-100 overflow-auto sm: w-50 h-100"
            style={{ backgroundColor: "transparent" }}
          >
            <div className="content">
              {loading && <Loader />}
              {showForm && (
                <form>
                  <Input.TextArea
                    className="form-control shadow-xl rounded-2xl h-44 w-22 border-none p-16 font-mono text-xl text-gray-900 bg-white"
                    style={{ height: "55vh", width: "95%" }}
                    rows={10}
                    value={""}
                    // onChange={(e) => setTextpadData(e.target.value)}
                    placeholder="Write Prompt..."
                    size="large"
                  />

                  {/* Button */}

                  <div
                    className="flex justify-center mt-5 bg-white rounded-2xl h-48 gap-5  "
                    style={{ width: "95%" }}
                  >
                    <div className="flex gap-5 p-16">
                      <Button
                        // type="primary"
                        // className="ml-5 mb-5 mt-5 w-40 flex shadow-lg  items-center rounded-xl bg-indigo-200 text-blue-800 border-0 hover:bg-gray-300 hover:text-white"
                        style={{ backgroundColor: "#12BF80", color: "white" }}
                        className="border-none text-base font-bold w-36"
                        onClick={""}
                        size="large"
                      >
                        <SaveTwoTone /> Save
                      </Button>
                      <Button
                        // type="primary"
                        // className="ml-5 mb-5 mt-5 w-40 shadow-lg flex items-center rounded-xl bg-indigo-200 text-blue-800 border-0 hover:bg-gray-300 hover:text-white"
                        style={{ backgroundColor: "#12BF80", color: "white" }}
                        className="border-none text-base font-bold w-36"
                        onClick={""}
                        size="large"
                      >
                        <CopyTwoTone />
                        Copy
                      </Button>
                    </div>
                  </div>
                </form>
              )}
              {response && (
                <div>
                  <b>Submitted successfully</b>
                  <p>
                    Response: <code>{JSON.stringify(response)}</code>
                  </p>
                  {status && (
                    <p>
                      Status: <code>{JSON.stringify(status)}</code>
                    </p>
                  )}
                </div>
              )}
            </div>
            {textpadVisible && (
              <div className="textpad">
                <textarea
                  className="form-control"
                  placeholder="Write something..."
                  rows="10"
                ></textarea>
              </div>
            )}
          </Content>
        </Layout>
      </Layout>
    </div>
  );
}
