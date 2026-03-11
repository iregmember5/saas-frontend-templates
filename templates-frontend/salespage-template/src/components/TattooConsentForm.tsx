import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { X } from "lucide-react";

interface TattooConsentFormProps {
  isOpen: boolean;
  onClose: () => void;
}

type YesNo = "" | "yes" | "no";

interface WaiverState {
  permanentChange: boolean;
  photoUse: boolean;
  noRefund: boolean;
  allergyDisclosure: boolean;
  aftercare: boolean;
  infectionRisk: boolean;
  indemnify: boolean;
  otherOne: boolean;
  confirmAccurate: boolean;
  otherTwo: boolean;
}

interface TattooFormState {
  firstName: string;
  lastName: string;
  age: string;
  birthDate: string;
  phone: string;
  email: string;
  streetAddress: string;
  streetAddress2: string;
  city: string;
  state: string;
  postalCode: string;
  pregnant: YesNo;
  heartCondition: YesNo;
  communicableDisease: YesNo;
  skinCondition: YesNo;
  skinConditionDetails: string;
  medicalHistory: string;
  otherWaiverOne: string;
  otherWaiverTwo: string;
  signatureName: string;
  signedDate: string;
}

const toSvgDataUri = (content: string) =>
  `data:image/svg+xml;utf8,${encodeURIComponent(
    `<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 1200 460'>${content}</svg>`,
  )}`;

const HERO_IMAGE = toSvgDataUri(`
  <defs>
    <linearGradient id='bg' x1='0' y1='0' x2='1' y2='1'>
      <stop offset='0%' stop-color='#242424'/>
      <stop offset='100%' stop-color='#6a6a6a'/>
    </linearGradient>
    <radialGradient id='glow' cx='50%' cy='45%' r='45%'>
      <stop offset='0%' stop-color='#999999' stop-opacity='0.65'/>
      <stop offset='100%' stop-color='#333333' stop-opacity='0'/>
    </radialGradient>
  </defs>
  <rect width='1200' height='460' fill='url(#bg)'/>
  <rect width='1200' height='460' fill='url(#glow)'/>
  <path d='M165 362 C228 303, 296 270, 388 258 C520 241, 638 274, 742 333' stroke='#bdbdbd' stroke-width='15' fill='none' opacity='0.55'/>
  <path d='M346 116 L462 233 L436 259 L321 141 Z' fill='#151515' opacity='0.85'/>
  <rect x='280' y='82' width='132' height='35' rx='16' fill='#3b3b3b'/>
  <circle cx='390' cy='128' r='26' fill='#545454'/>
  <rect x='454' y='203' width='120' height='22' rx='11' fill='#1f1f1f'/>
  <path d='M571 216 L761 278' stroke='#b2b2b2' stroke-width='8'/>
  <circle cx='767' cy='280' r='12' fill='#dfdfdf'/>
  <path d='M0 164 L1200 56 L1200 197 L0 304 Z' fill='#ffffff' opacity='0.10'/>
`);

const US_STATES = [
  "Alabama",
  "Alaska",
  "Arizona",
  "Arkansas",
  "California",
  "Colorado",
  "Connecticut",
  "Delaware",
  "Florida",
  "Georgia",
  "Hawaii",
  "Idaho",
  "Illinois",
  "Indiana",
  "Iowa",
  "Kansas",
  "Kentucky",
  "Louisiana",
  "Maine",
  "Maryland",
  "Massachusetts",
  "Michigan",
  "Minnesota",
  "Mississippi",
  "Missouri",
  "Montana",
  "Nebraska",
  "Nevada",
  "New Hampshire",
  "New Jersey",
  "New Mexico",
  "New York",
  "North Carolina",
  "North Dakota",
  "Ohio",
  "Oklahoma",
  "Oregon",
  "Pennsylvania",
  "Rhode Island",
  "South Carolina",
  "South Dakota",
  "Tennessee",
  "Texas",
  "Utah",
  "Vermont",
  "Virginia",
  "Washington",
  "West Virginia",
  "Wisconsin",
  "Wyoming",
];

const getInitialFormState = (): TattooFormState => ({
  firstName: "",
  lastName: "",
  age: "",
  birthDate: "",
  phone: "",
  email: "",
  streetAddress: "",
  streetAddress2: "",
  city: "",
  state: "",
  postalCode: "",
  pregnant: "",
  heartCondition: "",
  communicableDisease: "",
  skinCondition: "",
  skinConditionDetails: "",
  medicalHistory: "",
  otherWaiverOne: "",
  otherWaiverTwo: "",
  signatureName: "",
  signedDate: "",
});

const getInitialWaiverState = (): WaiverState => ({
  permanentChange: false,
  photoUse: false,
  noRefund: false,
  allergyDisclosure: false,
  aftercare: false,
  infectionRisk: false,
  indemnify: false,
  otherOne: false,
  confirmAccurate: false,
  otherTwo: false,
});

const inputClass =
  "w-full border border-gray-300 rounded bg-[#f4f4f4] text-gray-800 px-3 py-2.5 text-sm";
const labelClass = "text-[11px] text-gray-200 mt-1";

const TattooConsentForm = ({ isOpen, onClose }: TattooConsentFormProps) => {
  const [formData, setFormData] = useState<TattooFormState>(getInitialFormState());
  const [waivers, setWaivers] = useState<WaiverState>(getInitialWaiverState());
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitted, setSubmitted] = useState(false);

  const handleFieldChange = <K extends keyof TattooFormState>(
    key: K,
    value: TattooFormState[K],
  ) => {
    setFormData((prev) => ({ ...prev, [key]: value }));
    setErrors((prev) => ({ ...prev, [key]: "" }));
  };

  const setWaiver = (key: keyof WaiverState, checked: boolean) => {
    setWaivers((prev) => ({ ...prev, [key]: checked }));
    setErrors((prev) => ({ ...prev, waiver: "" }));
  };

  const resetAll = () => {
    setFormData(getInitialFormState());
    setWaivers(getInitialWaiverState());
    setErrors({});
    setSubmitted(false);
  };

  const handleClose = () => {
    onClose();
    setTimeout(resetAll, 120);
  };

  const validate = () => {
    const nextErrors: Record<string, string> = {};
    if (!formData.firstName.trim()) nextErrors.firstName = "Required";
    if (!formData.lastName.trim()) nextErrors.lastName = "Required";
    if (!formData.age.trim()) nextErrors.age = "Required";
    if (!formData.birthDate.trim()) nextErrors.birthDate = "Required";
    if (!formData.phone.trim()) nextErrors.phone = "Required";
    if (!formData.email.trim()) {
      nextErrors.email = "Required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email.trim())) {
      nextErrors.email = "Invalid email";
    }
    if (!formData.streetAddress.trim()) nextErrors.streetAddress = "Required";
    if (!formData.city.trim()) nextErrors.city = "Required";
    if (!formData.state.trim()) nextErrors.state = "Required";
    if (!formData.postalCode.trim()) nextErrors.postalCode = "Required";
    if (!formData.pregnant) nextErrors.pregnant = "Required";
    if (!formData.heartCondition) nextErrors.heartCondition = "Required";
    if (!formData.communicableDisease) nextErrors.communicableDisease = "Required";
    if (!formData.skinCondition) nextErrors.skinCondition = "Required";
    if (formData.skinCondition === "yes" && !formData.skinConditionDetails.trim()) {
      nextErrors.skinConditionDetails = "Please provide details";
    }
    if (!formData.signatureName.trim()) nextErrors.signatureName = "Required";
    if (!formData.signedDate.trim()) nextErrors.signedDate = "Required";
    if (!waivers.confirmAccurate) {
      nextErrors.waiver = "You must confirm the information is accurate.";
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
          className="fixed inset-0 z-[10020] bg-[#3f3f3f] p-3 sm:p-5 overflow-y-auto"
        >
          <motion.div
            initial={{ scale: 0.98, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.98, opacity: 0 }}
            transition={{ duration: 0.18 }}
            onClick={(event) => event.stopPropagation()}
            className="w-full max-w-4xl mx-auto my-6 bg-[#8f8f8f] rounded-2xl shadow-2xl border border-gray-500 overflow-hidden"
          >
            <button
              type="button"
              onClick={handleClose}
              className="absolute top-4 right-4 z-20 p-2 rounded-full bg-black/30 hover:bg-black/45 transition-colors"
              aria-label="Close tattoo consent form"
            >
              <X className="w-5 h-5 text-white" />
            </button>

            {submitted ? (
              <div className="p-10 sm:p-14 text-center text-white">
                <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-white/20 mb-4">
                  <span className="text-white text-2xl">✓</span>
                </div>
                <h3 className="text-3xl font-bold mb-2">Consent Submitted</h3>
                <p className="text-gray-100">
                  Thank you, {formData.firstName}. Your tattoo consent form has been
                  submitted.
                </p>
                <button
                  type="button"
                  onClick={handleClose}
                  className="mt-6 px-8 py-2.5 rounded-md bg-[#0f172a] text-white hover:bg-[#111c37] transition-colors"
                >
                  Close
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="text-white">
                <div className="relative h-60">
                  <img
                    src={HERO_IMAGE}
                    alt="Tattoo machine background"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-black/35" />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <h2 className="text-4xl sm:text-5xl font-black tracking-tight">
                      Tattoo Consent Form
                    </h2>
                  </div>
                </div>

                <div className="p-6 sm:p-8 space-y-8">
                  <section>
                    <h3 className="text-2xl font-black mb-4">Client Information</h3>

                    <div className="grid sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-semibold mb-2">Name</label>
                        <input
                          type="text"
                          value={formData.firstName}
                          onChange={(event) =>
                            handleFieldChange("firstName", event.target.value)
                          }
                          className={inputClass}
                        />
                        <p className={labelClass}>First Name</p>
                        {errors.firstName && (
                          <p className="text-xs text-red-200 mt-1">{errors.firstName}</p>
                        )}
                      </div>
                      <div className="pt-7 sm:pt-0">
                        <label className="block text-sm font-semibold mb-2 opacity-0">
                          Last Name
                        </label>
                        <input
                          type="text"
                          value={formData.lastName}
                          onChange={(event) =>
                            handleFieldChange("lastName", event.target.value)
                          }
                          className={inputClass}
                        />
                        <p className={labelClass}>Last Name</p>
                        {errors.lastName && (
                          <p className="text-xs text-red-200 mt-1">{errors.lastName}</p>
                        )}
                      </div>
                    </div>

                    <div className="grid sm:grid-cols-2 gap-4 mt-4">
                      <div>
                        <label className="block text-sm font-semibold mb-2">Age</label>
                        <input
                          type="number"
                          value={formData.age}
                          onChange={(event) => handleFieldChange("age", event.target.value)}
                          className={inputClass}
                          placeholder="ex: 23"
                        />
                        {errors.age && (
                          <p className="text-xs text-red-200 mt-1">{errors.age}</p>
                        )}
                      </div>
                      <div>
                        <label className="block text-sm font-semibold mb-2">
                          Birth Date
                        </label>
                        <input
                          type="date"
                          value={formData.birthDate}
                          onChange={(event) =>
                            handleFieldChange("birthDate", event.target.value)
                          }
                          className={inputClass}
                        />
                        <p className={labelClass}>Date</p>
                        {errors.birthDate && (
                          <p className="text-xs text-red-200 mt-1">{errors.birthDate}</p>
                        )}
                      </div>
                    </div>

                    <div className="grid sm:grid-cols-2 gap-4 mt-4">
                      <div>
                        <label className="block text-sm font-semibold mb-2">
                          Phone Number
                        </label>
                        <input
                          type="tel"
                          value={formData.phone}
                          onChange={(event) => handleFieldChange("phone", event.target.value)}
                          className={inputClass}
                          placeholder="(000) 000-0000"
                        />
                        {errors.phone && (
                          <p className="text-xs text-red-200 mt-1">{errors.phone}</p>
                        )}
                      </div>
                      <div>
                        <label className="block text-sm font-semibold mb-2">Email</label>
                        <input
                          type="email"
                          value={formData.email}
                          onChange={(event) => handleFieldChange("email", event.target.value)}
                          className={inputClass}
                          placeholder="example@example.com"
                        />
                        {errors.email && (
                          <p className="text-xs text-red-200 mt-1">{errors.email}</p>
                        )}
                      </div>
                    </div>

                    <div className="mt-5">
                      <label className="block text-sm font-semibold mb-2">Address</label>
                      <input
                        type="text"
                        value={formData.streetAddress}
                        onChange={(event) =>
                          handleFieldChange("streetAddress", event.target.value)
                        }
                        className={inputClass}
                      />
                      <p className={labelClass}>Street Address</p>
                      {errors.streetAddress && (
                        <p className="text-xs text-red-200 mt-1">{errors.streetAddress}</p>
                      )}
                    </div>

                    <div className="mt-3">
                      <input
                        type="text"
                        value={formData.streetAddress2}
                        onChange={(event) =>
                          handleFieldChange("streetAddress2", event.target.value)
                        }
                        className={inputClass}
                      />
                      <p className={labelClass}>Street Address Line 2</p>
                    </div>

                    <div className="grid sm:grid-cols-2 gap-4 mt-4">
                      <div>
                        <input
                          type="text"
                          value={formData.city}
                          onChange={(event) => handleFieldChange("city", event.target.value)}
                          className={inputClass}
                        />
                        <p className={labelClass}>City</p>
                        {errors.city && (
                          <p className="text-xs text-red-200 mt-1">{errors.city}</p>
                        )}
                      </div>
                      <div>
                        <select
                          value={formData.state}
                          onChange={(event) => handleFieldChange("state", event.target.value)}
                          className={inputClass}
                        >
                          <option value="">Please Select</option>
                          {US_STATES.map((stateOption) => (
                            <option key={stateOption} value={stateOption}>
                              {stateOption}
                            </option>
                          ))}
                        </select>
                        <p className={labelClass}>State / Province</p>
                        {errors.state && (
                          <p className="text-xs text-red-200 mt-1">{errors.state}</p>
                        )}
                      </div>
                    </div>

                    <div className="mt-4">
                      <input
                        type="text"
                        value={formData.postalCode}
                        onChange={(event) =>
                          handleFieldChange("postalCode", event.target.value)
                        }
                        className={inputClass}
                      />
                      <p className={labelClass}>Postal / Zip Code</p>
                      {errors.postalCode && (
                        <p className="text-xs text-red-200 mt-1">{errors.postalCode}</p>
                      )}
                    </div>
                  </section>

                  <section>
                    <h3 className="text-2xl font-black mb-4">
                      Pre-Procedure Questionnaire
                    </h3>

                    <div className="grid sm:grid-cols-2 gap-6">
                      {[
                        {
                          key: "pregnant",
                          label: "Are you currently pregnant?",
                          value: formData.pregnant,
                        },
                        {
                          key: "heartCondition",
                          label: "Do you have any heart condition?",
                          value: formData.heartCondition,
                        },
                        {
                          key: "communicableDisease",
                          label: "Do you have a communicable disease?",
                          value: formData.communicableDisease,
                        },
                        {
                          key: "skinCondition",
                          label: "Do you have any skin conditions?",
                          value: formData.skinCondition,
                        },
                      ].map((question) => (
                        <fieldset key={question.key}>
                          <legend className="text-sm font-semibold mb-2">
                            {question.label}
                          </legend>
                          <label className="flex items-center gap-2 text-sm">
                            <input
                              type="radio"
                              name={question.key}
                              checked={question.value === "yes"}
                              onChange={() =>
                                handleFieldChange(
                                  question.key as keyof TattooFormState,
                                  "yes",
                                )
                              }
                            />
                            Yes
                          </label>
                          <label className="flex items-center gap-2 text-sm mt-1">
                            <input
                              type="radio"
                              name={question.key}
                              checked={question.value === "no"}
                              onChange={() =>
                                handleFieldChange(
                                  question.key as keyof TattooFormState,
                                  "no",
                                )
                              }
                            />
                            No
                          </label>
                          {errors[question.key] && (
                            <p className="text-xs text-red-200 mt-1">
                              {errors[question.key]}
                            </p>
                          )}
                        </fieldset>
                      ))}
                    </div>

                    <div className="mt-5">
                      <label className="block text-sm font-semibold mb-2">
                        Skin conditions (e.g. rashes, eczema, infection, psoriasis)
                      </label>
                      <textarea
                        value={formData.skinConditionDetails}
                        onChange={(event) =>
                          handleFieldChange("skinConditionDetails", event.target.value)
                        }
                        rows={4}
                        className={inputClass}
                      />
                      {errors.skinConditionDetails && (
                        <p className="text-xs text-red-200 mt-1">
                          {errors.skinConditionDetails}
                        </p>
                      )}
                    </div>

                    <div className="mt-5">
                      <label className="block text-sm font-semibold mb-2">
                        Please tell about your medical history
                      </label>
                      <textarea
                        value={formData.medicalHistory}
                        onChange={(event) =>
                          handleFieldChange("medicalHistory", event.target.value)
                        }
                        rows={5}
                        className={inputClass}
                      />
                    </div>
                  </section>

                  <section>
                    <h3 className="text-2xl font-black mb-4">Acknowledgment and Waiver</h3>

                    <div className="space-y-4 text-sm">
                      <label className="flex items-start gap-2">
                        <input
                          type="checkbox"
                          checked={waivers.permanentChange}
                          onChange={(event) =>
                            setWaiver("permanentChange", event.target.checked)
                          }
                          className="mt-1"
                        />
                        I understand that this procedure is a permanent change to my skin
                        and body.
                      </label>
                      <label className="flex items-start gap-2">
                        <input
                          type="checkbox"
                          checked={waivers.photoUse}
                          onChange={(event) => setWaiver("photoUse", event.target.checked)}
                          className="mt-1"
                        />
                        I allow my tattoo to be photographed and used for portfolio
                        showcase.
                      </label>
                      <label className="flex items-start gap-2">
                        <input
                          type="checkbox"
                          checked={waivers.noRefund}
                          onChange={(event) => setWaiver("noRefund", event.target.checked)}
                          className="mt-1"
                        />
                        I acknowledge that the Tattoo Shop does not offer refunds.
                      </label>
                      <label className="flex items-start gap-2">
                        <input
                          type="checkbox"
                          checked={waivers.allergyDisclosure}
                          onChange={(event) =>
                            setWaiver("allergyDisclosure", event.target.checked)
                          }
                          className="mt-1"
                        />
                        I acknowledge that I have disclosed all allergies relevant to this
                        tattoo procedure.
                      </label>
                      <label className="flex items-start gap-2">
                        <input
                          type="checkbox"
                          checked={waivers.aftercare}
                          onChange={(event) => setWaiver("aftercare", event.target.checked)}
                          className="mt-1"
                        />
                        I understand I need to take care of the tattoo by following the
                        instructions given to me by the Tattoo Shop.
                      </label>
                      <label className="flex items-start gap-2">
                        <input
                          type="checkbox"
                          checked={waivers.infectionRisk}
                          onChange={(event) =>
                            setWaiver("infectionRisk", event.target.checked)
                          }
                          className="mt-1"
                        />
                        I understand that I might get an infection if I do not follow
                        aftercare instructions.
                      </label>
                      <label className="flex items-start gap-2">
                        <input
                          type="checkbox"
                          checked={waivers.indemnify}
                          onChange={(event) => setWaiver("indemnify", event.target.checked)}
                          className="mt-1"
                        />
                        I indemnify and hold harmless the Tattoo Shop against claims,
                        damages, and liabilities.
                      </label>
                      <label className="flex items-start gap-2">
                        <input
                          type="checkbox"
                          checked={waivers.otherOne}
                          onChange={(event) => setWaiver("otherOne", event.target.checked)}
                          className="mt-1"
                        />
                        Other
                      </label>
                      {waivers.otherOne && (
                        <input
                          type="text"
                          value={formData.otherWaiverOne}
                          onChange={(event) =>
                            handleFieldChange("otherWaiverOne", event.target.value)
                          }
                          className={inputClass}
                          placeholder="Add other waiver detail"
                        />
                      )}
                      <label className="flex items-start gap-2">
                        <input
                          type="checkbox"
                          checked={waivers.confirmAccurate}
                          onChange={(event) =>
                            setWaiver("confirmAccurate", event.target.checked)
                          }
                          className="mt-1"
                        />
                        I confirm that the information I provided in this document is
                        accurate and true.
                      </label>
                      <label className="flex items-start gap-2">
                        <input
                          type="checkbox"
                          checked={waivers.otherTwo}
                          onChange={(event) => setWaiver("otherTwo", event.target.checked)}
                          className="mt-1"
                        />
                        Other
                      </label>
                      {waivers.otherTwo && (
                        <input
                          type="text"
                          value={formData.otherWaiverTwo}
                          onChange={(event) =>
                            handleFieldChange("otherWaiverTwo", event.target.value)
                          }
                          className={inputClass}
                          placeholder="Add other acknowledgment detail"
                        />
                      )}
                      {errors.waiver && (
                        <p className="text-xs text-red-200">{errors.waiver}</p>
                      )}
                    </div>
                  </section>

                  <section>
                    <div className="grid sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-semibold mb-2">
                          Client Signature
                        </label>
                        <div className="border border-gray-400 rounded bg-[#f4f4f4] h-24 flex items-center justify-center">
                          <input
                            type="text"
                            value={formData.signatureName}
                            onChange={(event) =>
                              handleFieldChange("signatureName", event.target.value)
                            }
                            className="bg-transparent text-gray-700 text-lg italic text-center outline-none w-full px-3"
                            placeholder="Sign Here"
                          />
                        </div>
                        {errors.signatureName && (
                          <p className="text-xs text-red-200 mt-1">
                            {errors.signatureName}
                          </p>
                        )}
                      </div>
                      <div>
                        <label className="block text-sm font-semibold mb-2">
                          Signed Date
                        </label>
                        <input
                          type="date"
                          value={formData.signedDate}
                          onChange={(event) =>
                            handleFieldChange("signedDate", event.target.value)
                          }
                          className={inputClass}
                        />
                        <p className={labelClass}>Date</p>
                        {errors.signedDate && (
                          <p className="text-xs text-red-200 mt-1">{errors.signedDate}</p>
                        )}
                      </div>
                    </div>
                  </section>

                  <div className="flex justify-center pt-2 pb-4">
                    <button
                      type="submit"
                      className="px-14 py-3 rounded-md bg-[#0b1022] text-white font-semibold hover:bg-[#121934] transition-colors"
                    >
                      Submit
                    </button>
                  </div>
                </div>
              </form>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default TattooConsentForm;
