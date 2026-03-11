import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { X } from "lucide-react";

interface EventRegistrationFormProps {
  isOpen: boolean;
  onClose: () => void;
}

interface RegistrationState {
  firstName: string;
  lastName: string;
  streetAddress: string;
  streetAddress2: string;
  city: string;
  state: string;
  postalCode: string;
  email: string;
  phoneNumber: string;
  website: string;
}

const toSvgDataUri = (content: string) =>
  `data:image/svg+xml;utf8,${encodeURIComponent(
    `<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 520 840'>${content}</svg>`,
  )}`;

const EVENT_SIDE_IMAGE = toSvgDataUri(`
  <defs>
    <linearGradient id='bg' x1='0' y1='0' x2='0' y2='1'>
      <stop offset='0%' stop-color='#ece8e3'/>
      <stop offset='100%' stop-color='#d9d0c8'/>
    </linearGradient>
  </defs>
  <rect width='520' height='840' fill='url(#bg)'/>
  <rect x='0' y='540' width='520' height='300' fill='#cfc5bd'/>
  <circle cx='102' cy='160' r='38' fill='#2f3b47'/>
  <rect x='70' y='202' width='64' height='110' rx='22' fill='#465260'/>
  <circle cx='190' cy='140' r='40' fill='#9c6a67'/>
  <rect x='158' y='184' width='70' height='122' rx='24' fill='#f4f2ef'/>
  <circle cx='292' cy='150' r='42' fill='#3f454f'/>
  <rect x='255' y='194' width='76' height='122' rx='24' fill='#6f7884'/>
  <circle cx='172' cy='358' r='44' fill='#5e473d'/>
  <rect x='130' y='404' width='84' height='162' rx='24' fill='#f6f2ef'/>
  <circle cx='276' cy='408' r='45' fill='#2d3540'/>
  <rect x='232' y='454' width='92' height='175' rx='28' fill='#636d79'/>
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

const getInitialState = (): RegistrationState => ({
  firstName: "",
  lastName: "",
  streetAddress: "",
  streetAddress2: "",
  city: "",
  state: "",
  postalCode: "",
  email: "",
  phoneNumber: "",
  website: "",
});

const EventRegistrationForm = ({ isOpen, onClose }: EventRegistrationFormProps) => {
  const [formData, setFormData] = useState<RegistrationState>(getInitialState());
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [showSuccess, setShowSuccess] = useState(false);

  const handleChange = <K extends keyof RegistrationState>(
    key: K,
    value: RegistrationState[K],
  ) => {
    setFormData((prev) => ({ ...prev, [key]: value }));
    setErrors((prev) => ({ ...prev, [key]: "" }));
  };

  const handleClose = () => {
    onClose();
    setTimeout(() => {
      setFormData(getInitialState());
      setErrors({});
      setShowSuccess(false);
    }, 120);
  };

  const validate = () => {
    const nextErrors: Record<string, string> = {};

    if (!formData.firstName.trim()) nextErrors.firstName = "First name is required.";
    if (!formData.lastName.trim()) nextErrors.lastName = "Last name is required.";
    if (!formData.streetAddress.trim()) {
      nextErrors.streetAddress = "Street address is required.";
    }
    if (!formData.city.trim()) nextErrors.city = "City is required.";
    if (!formData.state.trim()) nextErrors.state = "State is required.";
    if (!formData.postalCode.trim()) nextErrors.postalCode = "Postal code is required.";
    if (!formData.email.trim()) {
      nextErrors.email = "Email is required.";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email.trim())) {
      nextErrors.email = "Enter a valid email address.";
    }
    if (!formData.phoneNumber.trim()) {
      nextErrors.phoneNumber = "Phone number is required.";
    }

    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!validate()) return;
    setShowSuccess(true);
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
            initial={{ scale: 0.97, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.97, opacity: 0 }}
            transition={{ duration: 0.18 }}
            onClick={(event) => event.stopPropagation()}
            className="w-full max-w-5xl mx-auto my-6 bg-[#f5f5f8] rounded-xl shadow-2xl border border-gray-300 overflow-hidden"
          >
            <button
              type="button"
              onClick={handleClose}
              className="absolute top-4 right-4 z-20 p-2 rounded-full bg-white/90 hover:bg-white transition-colors"
              aria-label="Close event registration form"
            >
              <X className="w-5 h-5 text-gray-700" />
            </button>

            {showSuccess ? (
              <div className="p-10 sm:p-14 text-center">
                <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-blue-100 mb-4">
                  <span className="text-blue-700 text-2xl">✓</span>
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-2">
                  Registration complete
                </h3>
                <p className="text-gray-600">
                  Thank you, {formData.firstName}. You are now registered for the event.
                </p>
                <button
                  type="button"
                  onClick={handleClose}
                  className="mt-6 px-6 py-2.5 rounded-md bg-blue-600 text-white hover:bg-blue-700 transition-colors"
                >
                  Close
                </button>
              </div>
            ) : (
              <div className="grid md:grid-cols-[250px_1fr] min-h-[740px]">
                <div className="bg-[#d8cec6]">
                  <img
                    src={EVENT_SIDE_IMAGE}
                    alt="People networking at an event"
                    className="w-full h-full object-cover"
                  />
                </div>

                <form onSubmit={handleSubmit} className="p-6 sm:p-10">
                  <h2 className="text-4xl font-black text-[#233249] leading-tight">
                    Event Registration
                  </h2>
                  <p className="text-[#233249] mt-1 text-base">
                    Be Part of the Story - Register Today!
                  </p>

                  <div className="h-px bg-gray-300 my-8" />

                  <h3 className="text-2xl font-black text-[#233249] tracking-wide">
                    CONTACT INFORMATION
                  </h3>

                  <div className="mt-6 space-y-5">
                    <div>
                      <label className="text-lg font-semibold text-[#233249]">Name</label>
                      <div className="grid sm:grid-cols-2 gap-3 mt-2">
                        <div>
                          <input
                            type="text"
                            value={formData.firstName}
                            onChange={(event) =>
                              handleChange("firstName", event.target.value)
                            }
                            className="w-full rounded border border-gray-300 px-3 py-2.5 bg-white/80"
                          />
                          <p className="text-xs text-gray-500 mt-1">First Name</p>
                          {errors.firstName && (
                            <p className="text-xs text-red-600 mt-1">{errors.firstName}</p>
                          )}
                        </div>
                        <div>
                          <input
                            type="text"
                            value={formData.lastName}
                            onChange={(event) =>
                              handleChange("lastName", event.target.value)
                            }
                            className="w-full rounded border border-gray-300 px-3 py-2.5 bg-white/80"
                          />
                          <p className="text-xs text-gray-500 mt-1">Last Name</p>
                          {errors.lastName && (
                            <p className="text-xs text-red-600 mt-1">{errors.lastName}</p>
                          )}
                        </div>
                      </div>
                    </div>

                    <div>
                      <label className="text-lg font-semibold text-[#233249]">
                        Address
                      </label>
                      <div className="space-y-3 mt-2">
                        <div>
                          <input
                            type="text"
                            value={formData.streetAddress}
                            onChange={(event) =>
                              handleChange("streetAddress", event.target.value)
                            }
                            className="w-full rounded border border-gray-300 px-3 py-2.5 bg-white/80"
                          />
                          <p className="text-xs text-gray-500 mt-1">Street Address</p>
                          {errors.streetAddress && (
                            <p className="text-xs text-red-600 mt-1">
                              {errors.streetAddress}
                            </p>
                          )}
                        </div>
                        <div>
                          <input
                            type="text"
                            value={formData.streetAddress2}
                            onChange={(event) =>
                              handleChange("streetAddress2", event.target.value)
                            }
                            className="w-full rounded border border-gray-300 px-3 py-2.5 bg-white/80"
                          />
                          <p className="text-xs text-gray-500 mt-1">Street Address Line 2</p>
                        </div>
                        <div className="grid sm:grid-cols-2 gap-3">
                          <div>
                            <input
                              type="text"
                              value={formData.city}
                              onChange={(event) => handleChange("city", event.target.value)}
                              className="w-full rounded border border-gray-300 px-3 py-2.5 bg-white/80"
                            />
                            <p className="text-xs text-gray-500 mt-1">City</p>
                            {errors.city && (
                              <p className="text-xs text-red-600 mt-1">{errors.city}</p>
                            )}
                          </div>
                          <div>
                            <select
                              value={formData.state}
                              onChange={(event) => handleChange("state", event.target.value)}
                              className="w-full rounded border border-gray-300 px-3 py-2.5 bg-white/80"
                            >
                              <option value="">Please Select</option>
                              {US_STATES.map((stateOption) => (
                                <option key={stateOption} value={stateOption}>
                                  {stateOption}
                                </option>
                              ))}
                            </select>
                            <p className="text-xs text-gray-500 mt-1">State / Province</p>
                            {errors.state && (
                              <p className="text-xs text-red-600 mt-1">{errors.state}</p>
                            )}
                          </div>
                        </div>
                        <div>
                          <input
                            type="text"
                            value={formData.postalCode}
                            onChange={(event) =>
                              handleChange("postalCode", event.target.value)
                            }
                            className="w-full rounded border border-gray-300 px-3 py-2.5 bg-white/80"
                          />
                          <p className="text-xs text-gray-500 mt-1">Postal / Zip Code</p>
                          {errors.postalCode && (
                            <p className="text-xs text-red-600 mt-1">{errors.postalCode}</p>
                          )}
                        </div>
                      </div>
                    </div>

                    <div className="grid sm:grid-cols-2 gap-3">
                      <div>
                        <label className="text-lg font-semibold text-[#233249]">Email</label>
                        <input
                          type="email"
                          value={formData.email}
                          onChange={(event) => handleChange("email", event.target.value)}
                          className="w-full mt-2 rounded border border-gray-300 px-3 py-2.5 bg-white/80"
                          placeholder="example@example.com"
                        />
                        {errors.email && (
                          <p className="text-xs text-red-600 mt-1">{errors.email}</p>
                        )}
                      </div>
                      <div>
                        <label className="text-lg font-semibold text-[#233249]">
                          Phone Number
                        </label>
                        <input
                          type="tel"
                          value={formData.phoneNumber}
                          onChange={(event) =>
                            handleChange("phoneNumber", event.target.value)
                          }
                          className="w-full mt-2 rounded border border-gray-300 px-3 py-2.5 bg-white/80"
                          placeholder="(000) 000-0000"
                        />
                        {errors.phoneNumber && (
                          <p className="text-xs text-red-600 mt-1">{errors.phoneNumber}</p>
                        )}
                      </div>
                    </div>

                    <div className="max-w-sm">
                      <label className="text-lg font-semibold text-[#233249]">Website</label>
                      <input
                        type="url"
                        value={formData.website}
                        onChange={(event) => handleChange("website", event.target.value)}
                        className="w-full mt-2 rounded border border-gray-300 px-3 py-2.5 bg-white/80"
                      />
                    </div>
                  </div>

                  <div className="border-t border-gray-300 mt-8 pt-6 flex justify-end">
                    <button
                      type="submit"
                      className="px-12 py-3 rounded-md bg-blue-600 text-white font-medium hover:bg-blue-700 transition-colors"
                    >
                      Next
                    </button>
                  </div>
                </form>
              </div>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default EventRegistrationForm;
