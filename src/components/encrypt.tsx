import React, { useCallback, useState } from "react";
import { GoEye, GoEyeClosed, GoCopy } from "react-icons/go";
import CryptoJS from "crypto-js";
import toast from "react-hot-toast";

interface Form {
  password: string | null;
  text: string | null;
}

const Encrypt = () => {
  const [form, setForm] = useState<Form>({ password: null, text: null });
  const [encrypted, setEncrypted] = useState<string | null>(null);
  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  const submitHandler = useCallback(
    (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();

      if (!form.password || !form.text) {
        toast.error("Missing password or text.");
        return;
      }

      const encrypted = CryptoJS.AES.encrypt(
        form.text,
        form.password
      ).toString();

      if (!encrypted) {
        toast.error(
          "Encryption failed. Please check your password and encrypted text."
        );
        return;
      }

      setEncrypted(encrypted);
      setIsSuccessModalOpen(true);
      setForm({ password: null, text: null });
    },
    [form]
  );

  return (
    <>
      {isSuccessModalOpen && (
        <div className="fixed left-0 top-0 flex justify-center items-center bg-black/50 w-screen h-screen p-2">
          <div className="bg-white relative p-4 rounded-xl flex flex-col justify-between gap-5 w-1/2 min-w-[300px] max-sm:min-w-0 max-sm:w-full">
            <div className="w-full flex flex-col gap-2">
              <label className="text-sm font-medium text-gray-700">
                Encrypted Text:
              </label>
              <div className="flex items-start gap-2">
                <textarea
                  className="w-full p-2 border rounded resize-none"
                  value={encrypted || ""}
                  readOnly
                  rows={4}
                />
                <button
                  onClick={() => {
                    toast.success("Encrypted text copied!", {
                      id: "encryptedCopied",
                    });
                    navigator.clipboard.writeText(encrypted || "");
                  }}
                  className="p-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                >
                  <GoCopy className="text-xl" />
                </button>
              </div>
            </div>

            <button
              onClick={() => setIsSuccessModalOpen(false)}
              className="w-full p-2 bg-gray-300 hover:bg-gray-400 rounded"
            >
              Close
            </button>
          </div>
        </div>
      )}

      <div className="w-full mx-auto p-4">
        <h2 className="text-2xl font-bold mb-4">Encrypt Text</h2>
        <form onSubmit={submitHandler} className="flex flex-col gap-4">
          <div className="flex items-center gap-2">
            <input
              className="w-full p-2 border rounded"
              placeholder="Enter password"
              type={isPasswordVisible ? "text" : "password"}
              onChange={(e) =>
                setForm((prev) => ({ ...prev, password: e.target.value }))
              }
              value={form.password || ""}
            />
            <button
              type="button"
              className="p-2 bg-transparent group"
              onClick={() => setIsPasswordVisible((prev) => !prev)}
            >
              {isPasswordVisible ? (
                <GoEyeClosed className="text-gray-400 group-hover:text-blue-600 transition text-xl" />
              ) : (
                <GoEye className="text-gray-400 group-hover:text-blue-600 transition text-xl" />
              )}
            </button>
          </div>

          <textarea
            className="w-full p-2 border rounded"
            placeholder="Enter text to encrypt"
            onChange={(e) =>
              setForm((prev) => ({ ...prev, text: e.target.value }))
            }
            rows={8}
            value={form.text || ""}
          />

          <button
            disabled={
              (form.password?.length ?? 0) <= 0 || (form.text?.length ?? 0) <= 0
            }
            type="submit"
            className="w-full p-2 bg-green-600 hover:bg-green-700 disabled:bg-gray-300 text-white rounded transition"
          >
            Encrypt
          </button>
        </form>
      </div>
    </>
  );
};

export default Encrypt;
