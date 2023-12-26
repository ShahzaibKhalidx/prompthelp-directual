import React, { useState } from "react";
import Directual from "directual-api";
import { useAuth } from "../auth";
import { Loader } from "../components/loader/loader";
import { Layout, Button, Menu, Dropdown, Input } from "antd";
import { DownCircleOutlined } from "@ant-design/icons";

const { Content, Sider } = Layout;

export default function SavePrompt() {
  // API-endpoint details
  const dataStructure = "save_prompt"; // todo: write here sysname of your data structure
  const endpoint = "postPrompt"; // todo: write here Method name of your API-endpoint

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

  // Document
  const [documents, setDocuments] = useState([]); // Stores all documents
  const [currentDocId, setCurrentDocId] = useState(null); // ID of the currently selected document
  const [textpadData, setTextpadData] = useState(""); // Data in the textpad

  // Dropdown menu
  const [selectedOption, setSelectedOption] = useState(null);

  const handleMenuClick = (e) => {
    setSelectedOption(e.key);
    console.log(`Selected Option: ${e.key}`);
  };

  const performActionBasedOnSelection = () => {
    switch (selectedOption) {
      case "chatgpt":
        // Logic for ChatGPT Option 1
        console.log("Performing ChatGPT Option 1 Action");
        break;
      case "midjourney":
        // Logic for Midjourney Option 1
        console.log("Performing Midjourney Option 1 Action");
        break;
      default:
        console.log("No option selected or action defined for this option");
    }
  };

  const onDocumentButtonClick = () => {
    console.log("Document button clicked with option: ", selectedOption);
    performActionBasedOnSelection();
  };

  const dropdownMenu = (
    <Menu onClick={handleMenuClick}>
      <Menu.ItemGroup title="ChatGPT Options">
        <Menu.Item key="chatgpt-option1">ChatGPT</Menu.Item>
    
      </Menu.ItemGroup>
      <Menu.ItemGroup title="Midjourney Options">
        <Menu.Item key="midjourney-option1">Midjourney</Menu.Item>
       
      </Menu.ItemGroup>
    </Menu>
  );

  // Reset the form
  const resetForm = () => {
    setResponse();
    setStatus();
    setBadRequest();
    setShowForm(true);
    setFormPayload({ user_id: auth.user });
    setTextpadVisible(false);
  };

  // // POST-request
  // const SavePrompt = (e) => {
  //   e.preventDefault();
  //   setStatus('loading');
  //   setLoading(true);
  //   setShowForm(false);

  //   const api = new Directual({
  //     apiHost:
  //       "https://api.directual.com/good/api/v5/data/save_prompt/postPrompt?appID=9c302275-48ba-47d0-9022-e21cae0a4370&sessionID=876081",
  //   });
  //   api
  //     .structure(dataStructure)
  //    .setData(endpoint, formPayload, { sessionID: auth.sessionID })
  //     .then((response) => {
  //       console.log(response);
  //       setResponse(response.result);
  //       setStatus(response.status);
  //       setLoading(false);
  //     })
  //     .catch((e) => {
  //       setLoading(false);
  //       console.log(e.response);
  //       setBadRequest({
  //         httpCode: e.response.status,
  //         msg: e.response.data.msg,
  //       });
  //     });
  // };

  // // POST-request
  // const SavePrompt = (e) => {
  //   e.preventDefault();
  //   setStatus("loading");
  //   setLoading(true);
  //   setShowForm(false);

  //   const api = new Directual({
  //     apiHost:
  //       "https://api.directual.com/good/api/v5/data/save_prompt/postPrompt?appID=9c302275-48ba-47d0-9022-e21cae0a4370&sessionID=876081",
  //   });

  //   api
  //     .structure(dataStructure)
  //     .setData(endpoint, formPayload, { sessionID: auth.sessionID })
  //     .then((response) => {
  //       console.log(response);
  //       setResponse(response.result);
  //       setStatus("success"); // Updated here
  //       setLoading(false);
  //     })
  //     .catch((e) => {
  //       console.error(e.response);
  //       setLoading(false);
  //       setStatus("error"); // Updated here
  //       if (e.response) {
  //         // Check if response exists
  //         setBadRequest({
  //           httpCode: e.response.status,
  //           msg: e.response.data.msg,
  //         });
  //       } else {
  //         setBadRequest({
  //           httpCode: "Network Error",
  //           msg: "Unable to reach the server",
  //         });
  //       }
  //     });
  // };

  // POST-request
  const SavePrompt = async (e) => {
    e.preventDefault();
    setStatus("loading");
    setLoading(true);
    setShowForm(false);

    const api = new Directual({
      apiHost:
        "https://api.directual.com/good/api/v5/data/save_prompt/postPrompt?appID=9c302275-48ba-47d0-9022-e21cae0a4370&sessionID=876081",
    });

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

  // Create a new document
  const createDocument = () => {
    const newDocument = {
      id: Date.now(),
      content: "",
    };
    setDocuments([...documents, newDocument]);
    setCurrentDocId(newDocument.id);
    setTextpadData("");
  };

  // Save the current document
  const saveDocument = () => {
    const updatedDocuments = documents.map((doc) =>
      doc.id === currentDocId ? { ...doc, content: textpadData } : doc
    );
    setDocuments(updatedDocuments);
    createDocument(); // Optionally create a new document after saving
  };

  // Select a document to view or edit
  const selectDocument = (docId) => {
    const selectedDoc = documents.find((doc) => doc.id === docId);
    setCurrentDocId(docId);
    setTextpadData(selectedDoc ? selectedDoc.content : "");
  };

  // Function to delete a document
  const deleteDocument = (docId) => {
    const updatedDocuments = documents.filter((doc) => doc.id !== docId);
    setDocuments(updatedDocuments);
  };

  return (
    <Layout className="h-150">
      <Sider
        width={200}
        className="site-layout-background bg-secondary overflow-auto  sm:h-40"
        style={{ height: "80vh" }}
      >
        <Button
          type="primary"
          className="my-2 ms-2 bg-cyan-700"
          onClick={createDocument}
        >
          + Document
        </Button>

        {/* DroupDown */}
        <Dropdown overlay={dropdownMenu}>
          <Button
           type="primary"
           className="my-2 ms-2 rounded-lg lg:my-2 lg:ms-2"
           onClick={createDocument}>
         <DownCircleOutlined
         className="" />
          </Button>
        </Dropdown>

        {documents.map((doc) => (
          <div key={doc.id} className="bg-cyan-700 d-flex align-items-center">
            <div onClick={() => selectDocument(doc.id)}>Document {doc.id}</div>
            <Button className="border-0" onClick={() => deleteDocument(doc.id)}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                height="16"
                width="14"
                viewBox="0 0 448 512"
              >
                <path d="M135.2 17.7L128 32H32C14.3 32 0 46.3 0 64S14.3 96 32 96H416c17.7 0 32-14.3 32-32s-14.3-32-32-32H320l-7.2-14.3C307.4 6.8 296.3 0 284.2 0H163.8c-12.1 0-23.2 6.8-28.6 17.7zM416 128H32L53.2 467c1.6 25.3 22.6 45 47.9 45H346.9c25.3 0 46.3-19.7 47.9-45L416 128z" />
              </svg>
            </Button>
          </div>
        ))}
      </Sider>

      <Layout>
        <Content className="w-100 h-100 overflow-auto sm: w-50 h-100">
          <div className="content">
            {loading && <Loader />}
            {showForm && (
              <form>
                <Input.TextArea
                  className="form-control"
                  style={{ height: "60vh" }}
                  rows={10}
                  value={textpadData}
                  onChange={(e) => setTextpadData(e.target.value)}
                  placeholder="Write something..."
                />

                <Button
                  type="primary"
                  className="my-2 bg-cyan-700"
                  onClick={SavePrompt}
                >
                  Save
                </Button>
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

            {/* Bad Request S */}
            {/* {badRequest && ( 
              <div className="error">
                <b>{badRequest.httpCode} error</b>
                {badRequest.httpCode === "400" && (
                  <p>API-endpoint is not configured properly.</p>
                )}
                {badRequest.httpCode === "403" && (
                  <p>You have to be logged in to submit this form.</p>
                )}
                <p>
                  <code>{badRequest.msg}</code>
                </p>
              </div>
            )}*/}
            {!showForm && !loading && (
              <button onClick={resetForm}>Submit again</button>
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
  );
}
