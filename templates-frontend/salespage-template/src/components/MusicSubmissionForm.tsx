import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { X } from "lucide-react";

interface MusicSubmissionFormProps {
  isOpen: boolean;
  onClose: () => void;
}

interface MusicSubmissionState {
  email: string;
  stageName: string;
  bio: string;
  socialLinks: string;
  pictures: File[];
  musicFiles: File[];
}

const toSvgDataUri = (content: string) =>
  `data:image/svg+xml;utf8,${encodeURIComponent(
    `<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 1800 1280'>${content}</svg>`,
  )}`;

const BACKGROUND_IMAGE = toSvgDataUri(`
  <defs>
    <linearGradient id='g' x1='0' y1='0' x2='0' y2='1'>
      <stop offset='0%' stop-color='#c5c8c7'/>
      <stop offset='100%' stop-color='#90969a'/>
    </linearGradient>
  </defs>
  <rect width='1800' height='1280' fill='url(#g)'/>
  <g fill='#1f2730' opacity='0.96'>
    <rect x='30' y='790' width='215' height='92' rx='8' transform='rotate(18 30 790)'/>
    <rect x='220' y='700' width='240' height='96' rx='8' transform='rotate(-22 220 700)'/>
    <rect x='390' y='900' width='220' height='92' rx='8' transform='rotate(16 390 900)'/>
    <rect x='600' y='740' width='270' height='106' rx='8' transform='rotate(-10 600 740)'/>
    <rect x='840' y='850' width='250' height='100' rx='8' transform='rotate(14 840 850)'/>
    <rect x='1080' y='760' width='245' height='95' rx='8' transform='rotate(-18 1080 760)'/>
    <rect x='1270' y='905' width='250' height='100' rx='8' transform='rotate(12 1270 905)'/>
    <rect x='1500' y='770' width='250' height='94' rx='8' transform='rotate(-11 1500 770)'/>
    <rect x='95' y='1015' width='250' height='92' rx='8' transform='rotate(-8 95 1015)'/>
    <rect x='395' y='1070' width='230' height='92' rx='8' transform='rotate(12 395 1070)'/>
    <rect x='705' y='990' width='290' height='108' rx='8' transform='rotate(-14 705 990)'/>
    <rect x='1030' y='1085' width='245' height='98' rx='8' transform='rotate(9 1030 1085)'/>
    <rect x='1330' y='1010' width='270' height='100' rx='8' transform='rotate(-12 1330 1010)'/>
    <rect x='1540' y='1085' width='220' height='90' rx='8' transform='rotate(8 1540 1085)'/>
  </g>
`);

const getInitialState = (): MusicSubmissionState => ({
  email: "",
  stageName: "",
  bio: "",
  socialLinks: "",
  pictures: [],
  musicFiles: [],
});

const MusicSubmissionForm = ({ isOpen, onClose }: MusicSubmissionFormProps) => {
  const [formData, setFormData] = useState<MusicSubmissionState>(getInitialState());
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitted, setSubmitted] = useState(false);

  const handleChange = <K extends keyof MusicSubmissionState>(
    key: K,
    value: MusicSubmissionState[K],
  ) => {
    setFormData((prev) => ({ ...prev, [key]: value }));
    setErrors((prev) => ({ ...prev, [key]: "" }));
  };

  const resetAll = () => {
    setFormData(getInitialState());
    setErrors({});
    setSubmitted(false);
  };

  const handleClose = () => {
    onClose();
    setTimeout(resetAll, 120);
  };

  const validate = () => {
    const nextErrors: Record<string, string> = {};
    if (!formData.email.trim()) {
      nextErrors.email = "E-mail is required.";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email.trim())) {
      nextErrors.email = "Please enter a valid e-mail.";
    }
    if (!formData.stageName.trim()) nextErrors.stageName = "Stage name is required.";
    if (!formData.bio.trim()) nextErrors.bio = "Bio is required.";
    if (!formData.socialLinks.trim()) {
      nextErrors.socialLinks = "Social links are required.";
    }
    if (formData.pictures.length < 3) {
      nextErrors.pictures = "Upload at least three pictures.";
    }
    if (formData.musicFiles.length < 2) {
      nextErrors.musicFiles = "Upload at least two tracks.";
    }
    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!validate()) return;
    setSubmitted(true);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={handleClose}
          className="fixed inset-0 z-[10020] bg-black/70 p-3 sm:p-5 overflow-y-auto"
        >
          <motion.div
            initial={{ scale: 0.98, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.98, opacity: 0 }}
            transition={{ duration: 0.18 }}
            onClick={(event) => event.stopPropagation()}
            className="relative w-full max-w-6xl mx-auto my-6 rounded-2xl overflow-hidden shadow-2xl min-h-[900px]"
          >
            <img
              src={BACKGROUND_IMAGE}
              alt="Music submission background"
              className="absolute inset-0 w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-black/25" />

            <button
              type="button"
              onClick={handleClose}
              className="absolute top-4 right-4 z-30 p-2 rounded-full bg-black/30 hover:bg-black/45 transition-colors"
              aria-label="Close music submission form"
            >
              <X className="w-5 h-5 text-white" />
            </button>

            <div className="relative z-20 px-4 py-8 sm:py-10 flex flex-col items-center">
              <h2 className="text-6xl sm:text-7xl font-thin text-black tracking-wide">
                INDIE<span className="font-black">GRIND</span>
                <span className="font-black text-red-600">+</span>
              </h2>

              <div className="w-full max-w-2xl mt-8 bg-[#8f1417]/72 border border-[#b35f62] rounded-3xl backdrop-blur-sm">
                {submitted ? (
                  <div className="p-10 text-center text-white">
                    <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-white/20 mb-4">
                      <span className="text-2xl">✓</span>
                    </div>
                    <h3 className="text-3xl font-black mb-2">Submission Received</h3>
                    <p className="text-red-100">
                      Thanks {formData.stageName}, your music press kit has been
                      submitted.
                    </p>
                    <button
                      type="button"
                      onClick={handleClose}
                      className="mt-6 px-8 py-2.5 rounded-full bg-black text-white hover:bg-gray-900 transition-colors"
                    >
                      Close
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit}>
                    <div className="px-6 sm:px-8 py-7 text-center border-b border-[#b35f62]">
                      <h3 className="text-5xl font-black text-white tracking-wide">
                        SUBMIT YOUR MUSIC
                      </h3>
                      <p className="text-red-100 text-base mt-3 leading-relaxed">
                        This is also considered a press kit. It&apos;s an industry
                        standard when submitting your music to major publications.
                      </p>
                    </div>

                    <div className="px-6 sm:px-8 py-6 space-y-5 text-white">
                      <div className="grid sm:grid-cols-[170px_1fr] gap-3 items-start">
                        <label className="text-[28px] font-semibold sm:pt-2">E-mail *</label>
                        <div>
                          <input
                            type="email"
                            value={formData.email}
                            onChange={(event) => handleChange("email", event.target.value)}
                            className="w-full bg-transparent border border-white px-3 py-2.5 rounded text-white"
                          />
                          {errors.email && (
                            <p className="text-xs text-red-100 mt-1">{errors.email}</p>
                          )}
                        </div>
                      </div>

                      <div className="grid sm:grid-cols-[170px_1fr] gap-3 items-start">
                        <label className="text-[28px] font-semibold sm:pt-2">
                          Stage Name *
                        </label>
                        <div>
                          <input
                            type="text"
                            value={formData.stageName}
                            onChange={(event) =>
                              handleChange("stageName", event.target.value)
                            }
                            className="w-full bg-transparent border border-white px-3 py-2.5 rounded text-white"
                          />
                          {errors.stageName && (
                            <p className="text-xs text-red-100 mt-1">{errors.stageName}</p>
                          )}
                        </div>
                      </div>

                      <div className="grid sm:grid-cols-[170px_1fr] gap-3 items-start">
                        <label className="text-[28px] font-semibold sm:pt-2">Enter Bio *</label>
                        <div>
                          <textarea
                            rows={4}
                            value={formData.bio}
                            onChange={(event) => handleChange("bio", event.target.value)}
                            className="w-full bg-transparent border border-white px-3 py-2.5 rounded text-white"
                          />
                          <p className="text-xs text-red-100 mt-1">
                            This is needed in every press kit.
                          </p>
                          {errors.bio && (
                            <p className="text-xs text-red-100 mt-1">{errors.bio}</p>
                          )}
                        </div>
                      </div>

                      <div className="grid sm:grid-cols-[170px_1fr] gap-3 items-start">
                        <label className="text-[28px] font-semibold sm:pt-2">
                          Enter Social Media Links *
                        </label>
                        <div>
                          <textarea
                            rows={4}
                            value={formData.socialLinks}
                            onChange={(event) =>
                              handleChange("socialLinks", event.target.value)
                            }
                            className="w-full bg-transparent border border-white px-3 py-2.5 rounded text-white"
                          />
                          <p className="text-xs text-red-100 mt-1">
                            This is needed in every press kit.
                          </p>
                          {errors.socialLinks && (
                            <p className="text-xs text-red-100 mt-1">
                              {errors.socialLinks}
                            </p>
                          )}
                        </div>
                      </div>

                      <div className="grid sm:grid-cols-[170px_1fr] gap-3 items-start">
                        <label className="text-[28px] font-semibold sm:pt-2">
                          Upload Pictures *
                        </label>
                        <div>
                          <label className="inline-block">
                            <span className="inline-flex items-center justify-center px-12 py-2.5 rounded-full bg-black text-white cursor-pointer hover:bg-gray-900 transition-colors">
                              Upload
                            </span>
                            <input
                              type="file"
                              accept="image/*"
                              multiple
                              className="hidden"
                              onChange={(event) =>
                                handleChange(
                                  "pictures",
                                  Array.from(event.target.files || []),
                                )
                              }
                            />
                          </label>
                          <p className="text-xs text-red-100 mt-1">
                            At least three is needed in every press kit.
                          </p>
                          {formData.pictures.length > 0 && (
                            <p className="text-xs text-white/90 mt-1">
                              {formData.pictures.length} file(s) selected
                            </p>
                          )}
                          {errors.pictures && (
                            <p className="text-xs text-red-100 mt-1">{errors.pictures}</p>
                          )}
                        </div>
                      </div>

                      <div className="grid sm:grid-cols-[170px_1fr] gap-3 items-start">
                        <label className="text-[28px] font-semibold sm:pt-2">
                          Upload Music *
                        </label>
                        <div>
                          <label className="inline-block">
                            <span className="inline-flex items-center justify-center px-12 py-2.5 rounded-full bg-black text-white cursor-pointer hover:bg-gray-900 transition-colors">
                              Upload
                            </span>
                            <input
                              type="file"
                              accept="audio/*"
                              multiple
                              className="hidden"
                              onChange={(event) =>
                                handleChange(
                                  "musicFiles",
                                  Array.from(event.target.files || []),
                                )
                              }
                            />
                          </label>
                          <p className="text-xs text-red-100 mt-1">
                            At least two tracks are needed in every press kit.
                          </p>
                          {formData.musicFiles.length > 0 && (
                            <p className="text-xs text-white/90 mt-1">
                              {formData.musicFiles.length} track(s) selected
                            </p>
                          )}
                          {errors.musicFiles && (
                            <p className="text-xs text-red-100 mt-1">
                              {errors.musicFiles}
                            </p>
                          )}
                        </div>
                      </div>

                      <div className="flex justify-center pt-3">
                        <button
                          type="submit"
                          className="px-16 py-3 rounded-full bg-black text-white text-2xl font-semibold hover:bg-gray-900 transition-colors"
                        >
                          Submit
                        </button>
                      </div>
                    </div>
                  </form>
                )}
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default MusicSubmissionForm;
