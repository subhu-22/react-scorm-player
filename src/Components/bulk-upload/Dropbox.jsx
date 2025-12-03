import React, { useState } from "react";
import {
  ArrowRight,
  FileArchive,
  Package,
  Upload,
  X,
  Plus,
  Heart,
  Stethoscope,
  Hospital,
} from "lucide-react";

const tabs = [
  { id: 1, label: "Quick Upload", icon: Heart, badge: "Simple" },
  {
    id: 2,
    label: "Simulation Bulk Upload",
    icon: Stethoscope,
    badge: "Medical",
  },
  { id: 3, label: "Hospital Import", icon: Hospital, badge: "Advanced" },
];

const Dropbox = () => {
  const [activeTab, setActiveTab] = useState(1);
  const [files, setFiles] = useState([]);
  const [uploadedFiles, setUploadedFiles] = useState([]);

  const handleUpload = (e) => {
    const selected = Array.from(e.target.files || []);
    if (!selected.length) return;

    setFiles((prev) => [...prev, ...selected]);
    setUploadedFiles((prev) => [
      ...prev,
      ...selected.map((f) => ({
        name: f.name,
        size: (f.size / 1024 / 1024).toFixed(1),
      })),
    ]);
  };

  const removeFile = (index) => {
    setFiles((prev) => prev.filter((_, i) => i !== index));
  };

  return (
    <div>
      <div className="w-full  overflow-hidden">
        {/* Header */}

        {/* Tabs */}
        <div className="px-6 pt-4">
          <div className="relative flex gap-2 overflow-x-auto pb-1">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`group relative flex items-center gap-2 px-4 py-2 rounded-2xl text-sm font-medium transition-all ${
                    isActive
                      ? "bg-purple-600 text-white shadow-md shadow-purple-300/40"
                      : "bg-gray-50 text-gray-700 hover:bg-purple-50 hover:text-purple-700 border border-transparent hover:border-purple-200"
                  }`}
                >
                  <Icon
                    className={`w-4 h-4 transition-transform ${
                      isActive ? "scale-110" : "group-hover:scale-110"
                    }`}
                  />
                  <span>{tab.label}</span>
                  <span
                    className={`text-[10px] px-2 py-0.5 rounded-full border ${
                      isActive
                        ? "border-white/40 bg-white/15 text-white/90"
                        : "border-purple-200 bg-purple-50 text-purple-700"
                    }`}
                  >
                    {tab.badge}
                  </span>
                  {isActive && (
                    <span className="absolute inset-0 -z-10 rounded-2xl bg-purple-500/20 blur-md" />
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* Divider */}
        <div className="px-6 pt-3 mb-4">
          <div className="h-px w-full bg-purple-600/70 to-transparent" />
        </div>

        {/* Content */}
        <div className="px-6 pb-8 pt-6">
          <div>
            {/* TAB 1: Quick Upload */}
            {activeTab === 1 && (
              <div className="grid lg:grid-cols-[1.3fr,1fr] gap-8 items-center">
                <div>
                  <div className="border-2 border-dashed border-purple-200 rounded-2xl bg-purple-50/40 hover:bg-purple-50/80 transition-all p-10 flex flex-col items-center justify-center text-center">
                    <div className="w-16 h-16 rounded-full bg-white shadow-md flex items-center justify-center mb-4">
                      <Upload className="w-8 h-8 text-purple-600" />
                    </div>
                    <p className="text-base font-medium text-gray-800 mb-2">
                      Drag & drop your files here
                    </p>
                    <p className="text-sm text-gray-500 mb-5">
                      or click the button below to browse from your device.
                    </p>

                    <label className="cursor-pointer inline-flex items-center gap-2 px-6 py-3 bg-purple-600 hover:bg-purple-700 text-white text-sm font-semibold rounded-xl shadow-lg shadow-purple-400/40 transition-all hover:-translate-y-[1px]">
                      <Upload className="w-4 h-4" />
                      Select ZIP / SCORM Files
                      <input
                        type="file"
                        multiple
                        accept=".zip,.xlsx,.csv,.img,.png,.mp4"
                        className="hidden"
                        onChange={handleUpload}
                      />
                    </label>

                    <p className="text-[11px] text-gray-500 mt-4">
                      Tip: Group courses by category before uploading for easier
                      management later.
                    </p>
                  </div>
                </div>

                <div className="hidden lg:flex flex-col gap-3 text-sm text-gray-600">
                  <div className="p-4 rounded-2xl bg-purple-600 text-white shadow-lg">
                    <p className="text-xs uppercase tracking-wide text-white/70 mb-1">
                      Summary
                    </p>
                    <p className="text-sm">
                      <span className="font-semibold">
                        {files.length || "No"}
                      </span>{" "}
                      file{files.length === 1 ? "" : "s"} selected in this
                      session.
                    </p>
                    <p className="text-[11px] text-white/80 mt-1">
                      You’ll be able to configure course details before
                      publishing.
                    </p>
                  </div>

                  <div className="p-4 rounded-2xl border border-dashed border-gray-200 bg-gray-50">
                    <p className="text-xs font-semibold text-gray-500 mb-2">
                      Recommended before uploading
                    </p>
                    <ul className="space-y-1 text-xs text-gray-600">
                      <li>
                        • Ensure each ZIP contains a valid SCORM manifest.
                      </li>
                      <li>• Use clear course names in your file naming.</li>
                      <li>• Avoid special characters in ZIP file names.</li>
                    </ul>
                  </div>
                </div>
              </div>
            )}

            {/* TAB 2: LMS Bulk Upload */}
            {activeTab === 2 && (
              <div>
                <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-3 mb-5">
                  {files.length > 0 && (
                    <div className="text-xs px-3 py-1 rounded-full bg-purple-50 text-purple-700 border border-purple-200">
                      {files.length} file{files.length === 1 ? "" : "s"} in
                      queue
                    </div>
                  )}
                </div>

                <div className="border-2 border-dashed border-gray-300 rounded-2xl p-10 text-center hover:border-purple-400 hover:bg-purple-50/40 transition-colors mb-6">
                  <Upload className="w-14 h-14 mx-auto text-purple-400 mb-4" />
                  <label className="cursor-pointer text-purple-700 font-semibold hover:underline">
                    Click to upload more files
                    <input
                      type="file"
                      multiple
                      accept=".zip"
                      className="hidden"
                      onChange={handleUpload}
                    />
                  </label>
                  <span className="text-gray-600 text-sm">
                    {" "}
                    or drag & drop here
                  </span>
                  <p className="text-xs text-gray-400 mt-2">
                    We’ll validate file structure before importing into your
                    LMS.
                  </p>
                </div>

                {files.length > 0 ? (
                  <>
                    <div className="space-y-3 max-h-64 overflow-y-auto pr-1">
                      {files.map((file, i) => (
                        <div
                          key={i}
                          className="flex items-center gap-4 p-4 bg-gray-50 rounded-xl border border-gray-200 hover:border-purple-300 hover:bg-purple-50/60 transition-all"
                        >
                          <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center shadow-sm">
                            <FileArchive className="w-6 h-6 text-purple-600" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="font-medium text-sm text-gray-900 truncate">
                              {file.name}
                            </p>
                            <p className="text-xs text-gray-500">
                              {(file.size / 1024 / 1024).toFixed(1)} MB •
                              Pending validation
                            </p>
                          </div>
                          <button
                            onClick={() => removeFile(i)}
                            className="text-gray-400 hover:text-purple-500 transition"
                          >
                            <X className="w-5 h-5" />
                          </button>
                        </div>
                      ))}
                    </div>

                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mt-6">
                      <p className="text-xs text-gray-500">
                        You can still remove files before starting the upload.
                      </p>
                      <button className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-purple-600 hover:bg-purple-700 text-white text-sm font-semibold rounded-xl shadow-md shadow-purple-300/50 transition">
                        Upload {files.length} Course
                        {files.length > 1 ? "s" : ""} Now
                      </button>
                    </div>
                  </>
                ) : (
                  <p className="text-sm text-gray-500 text-center">
                    No files added yet. Use the area above to add your first
                    batch of SCORM packages.
                  </p>
                )}
              </div>
            )}

            {/* TAB 3: Enterprise Import */}
            {activeTab === 3 && (
              <div>
                {/* Stepper */}
                <div className="mb-8">
                  <div className="flex items-center justify-between max-w-xl mx-auto">
                    {[1, 2, 3].map((step) => (
                      <div key={step} className="flex items-center flex-1">
                        <div
                          className={`w-10 h-10 rounded-full flex items-center justify-center text-xs font-bold text-white shadow-md ${
                            step === 1
                              ? "bg-purple-600"
                              : step === 2
                              ? "bg-purple-300"
                              : "bg-gray-300"
                          }`}
                        >
                          {step === 1 ? <Upload className="w-5 h-5" /> : step}
                        </div>
                        {step < 3 && (
                          <div
                            className={`flex-1 h-1 mx-2 rounded-full ${
                              step === 1 ? "bg-purple-400" : "bg-gray-200"
                            }`}
                          />
                        )}
                      </div>
                    ))}
                  </div>
                  <p className="text-xs text-center text-gray-500 mt-3">
                    Step 1: Upload files • Step 2: Configure metadata • Step 3:
                    Publish courses
                  </p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 mb-8">
                  {uploadedFiles.map((f, i) => (
                    <div
                      key={i}
                      className="group relative bg-purple-5 rounded-2xl p-5 border border-purple-100 hover:border-purple-400 hover:shadow-md transition-all"
                    >
                      <div className="w-11 h-11 rounded-2xl bg-white shadow flex items-center justify-center mb-3">
                        <Package className="w-6 h-6 text-purple-600" />
                      </div>
                      <p className="font-semibold text-sm text-gray-900 truncate mb-1">
                        {f.name}
                      </p>
                      <p className="text-xs text-gray-600 mb-2">{f.size} MB</p>
                      <span className="inline-flex items-center text-[11px] px-2 py-0.5 rounded-full bg-white/80 border border-purple-100 text-purple-700">
                        Pending configuration
                      </span>

                      <button className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity">
                        <X className="w-4 h-4 text-purple-500 hover:scale-110 transition-transform" />
                      </button>
                    </div>
                  ))}

                  <label className="cursor-pointer border-2 border-dashed border-purple-300 rounded-2xl flex flex-col items-center justify-center p-8 hover:border-purple-500 hover:bg-purple-50/60 transition-all">
                    <Plus className="w-10 h-10 text-purple-500 mb-2" />
                    <span className="text-sm text-purple-700 font-medium">
                      Add More Files
                    </span>
                    <span className="text-[11px] text-gray-500 mt-1">
                      Append additional SCORM packages to this batch.
                    </span>
                    <input
                      type="file"
                      multiple
                      accept=".zip"
                      className="hidden"
                      onChange={handleUpload}
                    />
                  </label>
                </div>

                <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
                  <button className="px-6 py-3 text-sm font-medium border border-gray-300 rounded-xl text-gray-700 hover:bg-gray-50 transition">
                    Cancel & Clear Selection
                  </button>
                  <button className="inline-flex items-center justify-center gap-2 px-8 py-3 bg-purple-600 text-white text-sm font-semibold rounded-xl shadow-lg shadow-purple-400/40 hover:brightness-110 transition-all">
                    Next: Configure & Publish
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dropbox;
