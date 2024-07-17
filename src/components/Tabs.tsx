import React, { useState } from "react";

const Tabs: React.FC = () => {
  const [activeTab, setActiveTab] = useState("Generate Letter");
  const [letter, setLetter] = useState("");
  const [formValues, setFormValues] = useState({
    senderName: "",
    senderAddress: "",
    receiverName: "",
    receiverAddress: "",
    letterSubject: "",
  });
  const [formErrors, setFormErrors] = useState({
    senderName: "",
    senderAddress: "",
    receiverName: "",
    receiverAddress: "",
    letterSubject: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
    setFormErrors({ ...formErrors, [name]: "" });
  };

  const validateForm = () => {
    let errors = { senderName: "", senderAddress: "", receiverName: "", receiverAddress: "", letterSubject: "" };
    let isValid = true;

    if (!formValues.senderName) {
      errors.senderName = "Sender Name is required";
      isValid = false;
    }
    if (!formValues.senderAddress) {
      errors.senderAddress = "Sender Address is required";
      isValid = false;
    }
    if (!formValues.receiverName) {
      errors.receiverName = "Receiver Name is required";
      isValid = false;
    }
    if (!formValues.receiverAddress) {
      errors.receiverAddress = "Receiver Address is required";
      isValid = false;
    }
    if (!formValues.letterSubject) {
      errors.letterSubject = "Letter Subject is required";
      isValid = false;
    }

    setFormErrors(errors);
    return isValid;
  };

  const handleGenerateLetter = () => {
    if (validateForm()) {
      setLetter("Generated letter content goes here...");
    }
  };

  const handleSendLetter = () => {
    alert("Letter sent!");
  };

  return (
    <div className="container mx-auto mt-4 flex-grow">
      <div className="flex justify-center space-x-4 border-b-2 border-secondary">
        <button
          onClick={() => setActiveTab("Generate Letter")}
          className={`px-4 py-2 font-semibold transition-colors duration-300 ${activeTab === "Generate Letter"
              ? "border-b-4 border-primary text-primary"
              : "text-secondary"
            }`}
        >
          Generate Letter
        </button>
        <button
          onClick={() => setActiveTab("Sent Letter")}
          className={`px-4 py-2 font-semibold transition-colors duration-300 ${activeTab === "Sent Letter"
              ? "border-b-4 border-primary text-primary"
              : "text-secondary"
            }`}
        >
          Sent Letter
        </button>
      </div>
      <div className="mt-4 p-4 bg-white rounded shadow-md h-full">
        {activeTab === "Generate Letter" && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 h-full">
            <div className="flex flex-col h-full">
              <h2 className="text-lg font-semibold mb-4">Letter Form</h2>
              <form className="space-y-4 flex-grow">
                <div>
                  <label className="block mb-1 font-medium">Sender Name</label>
                  <input
                    type="text"
                    name="senderName"
                    value={formValues.senderName}
                    onChange={handleChange}
                    className="w-full p-2 border border-gray-300 rounded"
                  />
                  {formErrors.senderName && <p className="text-red-500 text-sm">{formErrors.senderName}</p>}
                </div>
                <div>
                  <label className="block mb-1 font-medium">Sender Address</label>
                  <input
                    type="text"
                    name="senderAddress"
                    value={formValues.senderAddress}
                    onChange={handleChange}
                    className="w-full p-2 border border-gray-300 rounded"
                  />
                  {formErrors.senderAddress && <p className="text-red-500 text-sm">{formErrors.senderAddress}</p>}
                </div>
                <div>
                  <label className="block mb-1 font-medium">Receiver Name</label>
                  <input
                    type="text"
                    name="receiverName"
                    value={formValues.receiverName}
                    onChange={handleChange}
                    className="w-full p-2 border border-gray-300 rounded"
                  />
                  {formErrors.receiverName && <p className="text-red-500 text-sm">{formErrors.receiverName}</p>}
                </div>
                <div>
                  <label className="block mb-1 font-medium">Receiver Address</label>
                  <input
                    type="text"
                    name="receiverAddress"
                    value={formValues.receiverAddress}
                    onChange={handleChange}
                    className="w-full p-2 border border-gray-300 rounded"
                  />
                  {formErrors.receiverAddress && <p className="text-red-500 text-sm">{formErrors.receiverAddress}</p>}
                </div>
                <div>
                  <label className="block mb-1 font-medium">Letter Subject</label>
                  <input
                    type="text"
                    name="letterSubject"
                    value={formValues.letterSubject}
                    onChange={handleChange}
                    className="w-full p-2 border border-gray-300 rounded"
                  />
                  {formErrors.letterSubject && <p className="text-red-500 text-sm">{formErrors.letterSubject}</p>}
                </div>
                <div>
                  <button
                    type="button"
                    className="w-full py-2 bg-primary text-white rounded hover:bg-primary-dark transition-colors duration-300"
                    onClick={handleGenerateLetter}
                  >
                    Generate Letter
                  </button>
                </div>
              </form>
            </div>
            <div className="flex flex-col h-full">
              <h2 className="text-lg font-semibold mb-4">Generated Letter</h2>
              <textarea
                className="flex-grow p-2 border border-gray-300 rounded"
                value={letter}
                onChange={(e) => setLetter(e.target.value)}
              />
              <button
                type="button"
                className="w-full mt-4 py-2 bg-accent text-white rounded hover:bg-accent-dark transition-colors duration-300"
                onClick={handleSendLetter}
              >
                Send Letter
              </button>
            </div>
          </div>
        )}
        {activeTab === "Sent Letter" && <div>Sent Letter Content</div>}
      </div>
    </div>
  );
};

export default Tabs;
