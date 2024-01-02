import React, { useState } from "react";
import Directual from "directual-api";
import { useAuth } from "../auth";
import { Loader } from "../components/loader/loader";
import { Layout, Button, Input, Modal, message, Radio } from "antd";
import {
  FileTextTwoTone,
  FolderAddTwoTone,
  CopyTwoTone,
  SaveTwoTone,
} from "@ant-design/icons";

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

  // State for folders, documents, and textpad
  const [documents, setDocuments] = useState([]); // Stores all documents
  const [folders, setFolders] = useState([]);
  const [currentDocId, setCurrentDocId] = useState(null); // ID of the currently selected document
  const [textpadData, setTextpadData] = useState(""); // Data in the textpad

  // State for modals and input fields
  const [isFolderModalVisible, setIsFolderModalVisible] = useState(false);
  const [isNewDocModalVisible, setIsNewDocModalVisible] = useState(false);
  const [isEditFolderModalVisible, setIsEditFolderModalVisible] =
    useState(false);
  const [isEditDocModalVisible, setIsEditDocModalVisible] = useState(false);
  const [newFolderName, setNewFolderName] = useState("");
  const [newDocTitle, setNewDocTitle] = useState("");
  const [editFolderName, setEditFolderName] = useState("");
  const [editDocTitle, setEditDocTitle] = useState("");
  const [selectedFolderId, setSelectedFolderId] = useState(null);
  const [editingFolderId, setEditingFolderId] = useState(null);
  const [editingDocId, setEditingDocId] = useState(null);

  // Add new state for folder selection modal visibility
  const [isFolderSelectionVisible, setIsFolderSelectionVisible] =
    useState(false);

  // Function to copy text from the textpad
  const copyText = () => {
    navigator.clipboard.writeText(textpadData).then(
      () => {
        message.success("Prompt copied to clipboard", 3);
      },
      (err) => {
        console.error("Could not copy text: ", err);
        message.error("Failed to copy text", 3);
      }
    );
  };

  // Function to display document count text
  const documentCountText = (numDocuments) => {
    return numDocuments === 1 ? `${numDocuments} ` : `${numDocuments} `;
  };

  // Function to show the modal for new folder creation
  const showNewFolderModal = () => {
    setIsFolderModalVisible(true);
  };
  // Function to handle new folder creation
  const handleCreateFolder = () => {
    setFolders([
      ...folders,
      { id: Date.now(), name: newFolderName, documents: [], isOpen: false },
    ]);
    setIsFolderModalVisible(false);
    setNewFolderName("");
  };

  const toggleFolder = (folderId) => {
    setFolders(
      folders.map((folder) =>
        folder.id === folderId ? { ...folder, isOpen: !folder.isOpen } : folder
      )
    );
  };

  // Function to show the modal for new document creation
  const showNewDocModal = (folderId) => {
    setSelectedFolderId(folderId);
    setIsNewDocModalVisible(true);
    setIsFolderSelectionVisible(true);
  };

  // Function to handle new document creation
  const handleCreateDocument = () => {
    const newDocument = { id: Date.now(), title: newDocTitle, content: "" };
    setFolders(
      folders.map((folder) =>
        folder.id === selectedFolderId
          ? { ...folder, documents: [...folder.documents, newDocument] }
          : folder
      )
    );
    setIsNewDocModalVisible(false);
    setIsNewDocModalVisible(false);
    setNewDocTitle("");
  };

  // Function to show the modal for editing folder name
  const showEditFolderModal = (folderId, currentName) => {
    setEditingFolderId(folderId);
    setEditFolderName(currentName);
    setIsEditFolderModalVisible(true);
  };

  // Function to handle editing folder name
  const handleEditFolderName = () => {
    setFolders(
      folders.map((folder) =>
        folder.id === editingFolderId
          ? { ...folder, name: editFolderName }
          : folder
      )
    );
    setIsEditFolderModalVisible(false);
    setEditFolderName("");
  };

  // Function to show the modal for editing document title
  const showEditDocModal = (docId, currentTitle) => {
    setEditingDocId(docId);
    setEditDocTitle(currentTitle);
    setIsEditDocModalVisible(true);
  };

  // Function to handle editing document title
  const handleEditDocumentTitle = () => {
    setFolders(
      folders.map((folder) => ({
        ...folder,
        documents: folder.documents.map((doc) =>
          doc.id === editingDocId ? { ...doc, title: editDocTitle } : doc
        ),
      }))
    );
    setIsEditDocModalVisible(false);
    setEditDocTitle("");
  };

  // Function to select a document to view or edit
  const selectDocument = (docId) => {
    const selectedFolder = folders.find((folder) =>
      folder.documents.some((doc) => doc.id === docId)
    );
    const selectedDoc = selectedFolder.documents.find(
      (doc) => doc.id === docId
    );
    setCurrentDocId(docId);
    setTextpadData(selectedDoc ? selectedDoc.content : "");
  };

  // Function to save the current document
  const saveDocument = () => {
    setFolders(
      folders.map((folder) => ({
        ...folder,
        documents: folder.documents.map((doc) =>
          doc.id === currentDocId ? { ...doc, content: textpadData } : doc
        ),
      }))
    );
  };

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

  const deleteFolder = (folderId) => {
    const updatedFolders = folders.filter((folder) => folder.id !== folderId);
    setFolders(updatedFolders);
  }; // <-- Add this function for deleting folders

  // Function to delete a document
  const deleteDocument = (folderId, docId) => {
    setFolders(
      folders.map((folder) =>
        folder.id === folderId
          ? {
              ...folder,
              documents: folder.documents.filter((doc) => doc.id !== docId),
            }
          : folder
      )
    );
  };
  return (
    <Layout className="h-150">
      <Sider
        width={350}
        className="Sider shadow-lg overflow-auto sm:h-10 w-10"
        style={{
          height: "80vh",
          backgroundColor: "#ffffff",
          marginLeft: "10vh",
          marginTop: "2vh",
          marginBottom: "2vh",
          borderRadius: "10px",
        }}
      >
        <div className="flex overflow-auto">
          {/* Folder button */}
          <Button
            className="ml-5 mb-5 mt-5 flex items-center rounded-xl bg-indigo-100 text-blue-800 border-0 hover:bg-gray-300 hover:text-white"
            onClick={showNewFolderModal}
          >
            <FolderAddTwoTone className="mr-2 text-white" />
            New Folder
          </Button>

          {/* New Document button */}

          <Button
            className="ml-5 mb-5 mt-5 flex items-center rounded-xl bg-indigo-100 text-blue-800 border-0 hover:bg-gray-300 hover:text-white"
            onClick={() => showNewDocModal()}
          >
            <FileTextTwoTone className="mr-2 text-white" /> New Prompt
          </Button>
        </div>

        {/* Modal for folder selection */}
        <Modal
          title="Select Folder for New Document"
          visible={isFolderSelectionVisible}
          onOk={() => {
            setIsNewDocModalVisible(true); // Assuming this opens a new document modal
            setIsFolderSelectionVisible(false); // This will close the folder selection modal
          }}
          onCancel={() => setIsFolderSelectionVisible(false)}
        >
          {folders.map((folder) => (
            <Radio.Group
              onChange={(e) => setSelectedFolderId(e.target.value)}
              value={selectedFolderId}
              key={folder.id}
            >
              <Radio value={folder.id}>{folder.name}</Radio>
            </Radio.Group>
          ))}
        </Modal>

        {/* Modal for new folder creation */}
        <Modal
          title="New Folder"
          visible={isFolderModalVisible}
          onOk={handleCreateFolder}
          onCancel={() => setIsFolderModalVisible(false)}
        >
          <Input
            value={newFolderName}
            onChange={(e) => setNewFolderName(e.target.value)}
            placeholder="Folder Name"
          />
        </Modal>

        {/* Modal for new document creation */}
        <Modal
          title="New Document"
          visible={isNewDocModalVisible}
          onOk={handleCreateDocument}
          onCancel={() => setIsNewDocModalVisible(false)}
        >
          <Input
            value={newDocTitle}
            onChange={(e) => setNewDocTitle(e.target.value)}
            placeholder="Document Title"
          />
        </Modal>

        {/* Modal for editing folder name */}
        <Modal
          title="Edit Folder Name"
          visible={isEditFolderModalVisible}
          onOk={handleEditFolderName}
          onCancel={() => setIsEditFolderModalVisible(false)}
        >
          <Input
            value={editFolderName}
            onChange={(e) => setEditFolderName(e.target.value)}
            placeholder="New Folder Name"
          />
        </Modal>

        {/* Modal for editing document title */}
        <Modal
          title="Edit Document Title"
          visible={isEditDocModalVisible}
          onOk={handleEditDocumentTitle}
          onCancel={() => setIsEditDocModalVisible(false)}
        >
          <Input
            value={editDocTitle}
            onChange={(e) => setEditDocTitle(e.target.value)}
            placeholder="New Document Title"
          />
        </Modal>

        {/* Display folders and documents */}
        {folders.map((folder) => (
          <div key={folder.id} className=" shadow-2xl m-4">
            <div className="bg-blue-600 rounded-xl p-2 ">
              <b className="text-white">
                {" "}
                <FolderAddTwoTone /> {folder.name} (
                {documentCountText(folder.documents.length)})
              </b>
              <div className="flex items-end justify-end ">
                <Button
                  className="border-0"
                  onClick={() => showEditFolderModal(folder.id, folder.name)}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    height="16"
                    width="16"
                    viewBox="0 0 512 512"
                  >
                    <path d="M471.6 21.7c-21.9-21.9-57.3-21.9-79.2 0L362.3 51.7l97.9 97.9 30.1-30.1c21.9-21.9 21.9-57.3 0-79.2L471.6 21.7zm-299.2 220c-6.1 6.1-10.8 13.6-13.5 21.9l-29.6 88.8c-2.9 8.6-.6 18.1 5.8 24.6s15.9 8.7 24.6 5.8l88.8-29.6c8.2-2.7 15.7-7.4 21.9-13.5L437.7 172.3 339.7 74.3 172.4 241.7zM96 64C43 64 0 107 0 160V416c0 53 43 96 96 96H352c53 0 96-43 96-96V320c0-17.7-14.3-32-32-32s-32 14.3-32 32v96c0 17.7-14.3 32-32 32H96c-17.7 0-32-14.3-32-32V160c0-17.7 14.3-32 32-32h96c17.7 0 32-14.3 32-32s-14.3-32-32-32H96z" />
                  </svg>
                </Button>

                {/* Delete Button for Folder */}
                <Button
                  className="border-0"
                  onClick={() => deleteFolder(folder.id)}
                >
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

              {/* folder show a creted Document Button */}
              {/* <Button
                type="primary"
                className="border-0"
                onClick={() => showNewDocModal(folder.id)}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  height="16"
                  width="12"
                  viewBox="0 0 384 512"
                >
                  <path d="M0 64C0 28.7 28.7 0 64 0H224V128c0 17.7 14.3 32 32 32H384V448c0 35.3-28.7 64-64 64H64c-35.3 0-64-28.7-64-64V64zm384 64H256V0L384 128z" />
                </svg>
              </Button> */}
            </div>

            {/* Document */}
            {folder.documents.map((doc) => (
              <div
                key={doc.id}
                className="bg-slate-50 flex justify-end items-end p-2"
              >
                <div
                  style={{ cursor: "pointer" }}
                  onClick={() => selectDocument(doc.id)}
                >
                  <div className="pr-40 mb-2">
                    {doc.title || `Document ${doc.id}`}
                  </div>
                </div>

                <div className="">
                  <Button
                    className="border-0"
                    onClick={() => showEditDocModal(doc.id, doc.title)}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      height="16"
                      width="16"
                      viewBox="0 0 512 512"
                    >
                      <path d="M471.6 21.7c-21.9-21.9-57.3-21.9-79.2 0L362.3 51.7l97.9 97.9 30.1-30.1c21.9-21.9 21.9-57.3 0-79.2L471.6 21.7zm-299.2 220c-6.1 6.1-10.8 13.6-13.5 21.9l-29.6 88.8c-2.9 8.6-.6 18.1 5.8 24.6s15.9 8.7 24.6 5.8l88.8-29.6c8.2-2.7 15.7-7.4 21.9-13.5L437.7 172.3 339.7 74.3 172.4 241.7zM96 64C43 64 0 107 0 160V416c0 53 43 96 96 96H352c53 0 96-43 96-96V320c0-17.7-14.3-32-32-32s-32 14.3-32 32v96c0 17.7-14.3 32-32 32H96c-17.7 0-32-14.3-32-32V160c0-17.7 14.3-32 32-32h96c17.7 0 32-14.3 32-32s-14.3-32-32-32H96z" />
                    </svg>
                  </Button>

                  {/* Delete Button for Document */}
                  <Button
                    className="border-0"
                    onClick={() => deleteDocument(folder.id, doc.id)}
                  >
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
              </div>
            ))}
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
                  className="form-control shadow-xl border-0 mt-10 "
                  style={{ height: "60vh" }}
                  rows={10}
                  value={textpadData}
                  onChange={(e) => setTextpadData(e.target.value)}
                  placeholder="Write something..."
                  size="large"
                />

                <div className="flex justify-center mt-4">
                  <Button
                    type="primary"
                    className="ml-5 mb-5 mt-5 w-40 flex shadow-lg  items-center rounded-xl bg-indigo-200 text-blue-800 border-0 hover:bg-gray-300 hover:text-white"
                    onClick={saveDocument}
                    size="large"
                  >
                    <SaveTwoTone /> Save
                  </Button>
                  <Button
                    type="primary"
                    className="ml-5 mb-5 mt-5 w-40 shadow-lg flex items-center rounded-xl bg-indigo-200 text-blue-800 border-0 hover:bg-gray-300 hover:text-white"
                    onClick={copyText}
                    size="large"
                  >
                    <CopyTwoTone />
                    Copy
                  </Button>
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
            )} */}
            {/* Submit Button */}
        {/* {!showForm && !loading && (
              <button onClick={resetForm}>Submit again</button>
            )}  */}
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
