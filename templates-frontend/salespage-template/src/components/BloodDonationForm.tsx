import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { X } from "lucide-react";

interface BloodDonationFormProps {
  isOpen: boolean;
  onClose: () => void;
}

type YesNo = "" | "yes" | "no";

interface BloodDonationState {
  bloodType: string;
  firstName: string;
  lastName: string;
  birthMonth: string;
  birthDay: string;
  birthYear: string;
  gender: "" | "male" | "female";
  phone: string;
  email: string;
  streetAddress: string;
  streetAddress2: string;
  city: string;
  state: string;
  postalCode: string;
  weight: string;
  hb: string;
  bp: string;
  temperature: string;
  lastDonationDate: string;
  donatedPreviously: YesNo;
}

interface BloodDonationChecks {
  recentTattoo: boolean;
  recentEarPiercing: boolean;
  diseases: string[];
  medications: string[];
  surgeryHistory: string[];
}

const BLOOD_TYPES = ["O Rh+", "A Rh+", "B Rh+", "AB Rh+", "O Rh-", "A Rh-", "B Rh-", "AB Rh-"];

const DISEASE_OPTIONS = [
  "Heart Disease",
  "Diabetes",
  "Sexually Transmitted Diseases",
  "Lung Disease",
  "Allergic Diseases",
  "Epilepsy",
  "Jaundice (last one year)",
  "Fainting spells",
  "Cancer/Malignant Disease",
  "Hepatitis B/C",
  "Typhoid (last one year)",
  "Tuberculosis",
  "Kidney Disease",
  "Abnormal Bleeding tendency",
  "Malaria (six months)",
];

const MEDICATION_OPTIONS = [
  "Antibiotics",
  "Aspirin",
  "Alcohol",
  "Steroids",
  "Vaccinations",
  "Dog bite Rabies vaccine (1 year)",
];

const SURGERY_OPTIONS = ["Major", "Minor", "Blood Transfusion"];

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

const getInitialState = (): BloodDonationState => ({
  bloodType: "",
  firstName: "",
  lastName: "",
  birthMonth: "",
  birthDay: "",
  birthYear: "",
  gender: "",
  phone: "",
  email: "",
  streetAddress: "",
  streetAddress2: "",
  city: "",
  state: "",
  postalCode: "",
  weight: "",
  hb: "",
  bp: "",
  temperature: "",
  lastDonationDate: "",
  donatedPreviously: "",
});

const getInitialChecks = (): BloodDonationChecks => ({
  recentTattoo: false,
  recentEarPiercing: false,
  diseases: [],
  medications: [],
  surgeryHistory: [],
});

const toSvgDataUri = (content: string) =>
  `data:image/svg+xml;utf8,${encodeURIComponent(
    `<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 520 220'>${content}</svg>`,
  )}`;

const BLOOD_BAG_IMAGE = toSvgDataUri(`
  <rect width='520' height='220' fill='#c63a2f'/>
  <path d='M115 22 H164 V63 C164 78 152 90 137 90 C123 90 111 78 111 63 Z' fill='#ffd8b6'/>
  <path d='M216 22 H266 V63 C266 78 254 90 239 90 C224 90 212 78 212 63 Z' fill='#ffd8b6'/>
  <rect x='140' y='90' width='98' height='104' rx='30' fill='#d9e5eb'/>
  <path d='M153 142 C178 120 205 120 227 142 C227 172 207 189 190 193 C173 189 153 172 153 142 Z' fill='#d7262e'/>
  <path d='M113 72 C101 88 95 106 95 125' stroke='#f2d1cb' stroke-width='5' fill='none'/>
  <path d='M94 126 C90 147 86 160 78 175' stroke='#f2d1cb' stroke-width='5' fill='none'/>
  <rect x='68' y='172' width='22' height='8' rx='4' fill='#f2d1cb'/>
  <circle cx='90' cy='126' r='4' fill='#f2d1cb'/>
`);

const BloodDonationForm = ({ isOpen, onClose }: BloodDonationFormProps) => {
  const [formData, setFormData] = useState<BloodDonationState>(getInitialState());
  const [checks, setChecks] = useState<BloodDonationChecks>(getInitialChecks());
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitted, setSubmitted] = useState(false);

  const inputClass = "w-full border border-gray-300 rounded px-3 py-2.5 text-sm bg-white";

  const handleFieldChange = <K extends keyof BloodDonationState>(
    key: K,
    value: BloodDonationState[K],
  ) => {
    setFormData((prev) => ({ ...prev, [key]: value }));
    setErrors((prev) => ({ ...prev, [key]: "" }));
  };

  const toggleOption = (
    key: "diseases" | "medications" | "surgeryHistory",
    value: string,
  ) => {
    setChecks((prev) => {
      const exists = prev[key].includes(value);
      return {
        ...prev,
        [key]: exists ? prev[key].filter((v) => v !== value) : [...prev[key], value],
      };
    });
  };

  const resetAll = () => {
    setFormData(getInitialState());
    setChecks(getInitialChecks());
    setErrors({});
    setSubmitted(false);
  };

  const handleClose = () => {
    onClose();
    setTimeout(resetAll, 120);
  };

  const validate = () => {
    const nextErrors: Record<string, string> = {};
    if (!formData.bloodType) nextErrors.bloodType = "Select blood type.";
    if (!formData.firstName.trim()) nextErrors.firstName = "Required";
    if (!formData.lastName.trim()) nextErrors.lastName = "Required";
    if (!formData.birthMonth || !formData.birthDay || !formData.birthYear) {
      nextErrors.birthDate = "Complete birth date.";
    }
    if (!formData.gender) nextErrors.gender = "Select gender.";
    if (!formData.phone.trim()) nextErrors.phone = "Required";
    if (!formData.email.trim()) {
      nextErrors.email = "Required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email.trim())) {
      nextErrors.email = "Invalid e-mail.";
    }
    if (!formData.streetAddress.trim()) nextErrors.streetAddress = "Required";
    if (!formData.city.trim()) nextErrors.city = "Required";
    if (!formData.state.trim()) nextErrors.state = "Required";
    if (!formData.postalCode.trim()) nextErrors.postalCode = "Required";
    if (!formData.lastDonationDate.trim()) {
      nextErrors.lastDonationDate = "Select date.";
    }
    if (!formData.donatedPreviously) {
      nextErrors.donatedPreviously = "Select yes or no.";
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
          className="fixed inset-0 z-[10020] bg-[#cd6258] p-3 sm:p-5 overflow-y-auto"
        >
          <motion.div
            initial={{ scale: 0.98, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.98, opacity: 0 }}
            transition={{ duration: 0.18 }}
            onClick={(event) => event.stopPropagation()}
            className="relative w-full max-w-4xl mx-auto my-6 bg-[#f3f5f7] rounded shadow-2xl overflow-hidden border border-[#c94e43]"
          >
            <button
              type="button"
              onClick={handleClose}
              className="absolute top-4 right-4 z-20 p-2 rounded-full bg-black/20 hover:bg-black/30 transition-colors"
              aria-label="Close blood donation form"
            >
              <X className="w-5 h-5 text-white" />
            </button>

            {submitted ? (
              <div className="p-12 text-center">
                <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-red-100 mb-4">
                  <span className="text-red-700 text-2xl">✓</span>
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-2">
                  Blood Donation Form Submitted
                </h3>
                <p className="text-gray-600">
                  Thank you {formData.firstName}. Your donation details were received.
                </p>
                <button
                  type="button"
                  onClick={handleClose}
                  className="mt-6 px-8 py-2.5 rounded bg-black text-white hover:bg-gray-900 transition-colors"
                >
                  Close
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit}>
                <div className="bg-[#c63a2f] text-white grid md:grid-cols-[1fr_1.2fr] gap-4 p-6 sm:p-8">
                  <img
                    src={BLOOD_BAG_IMAGE}
                    alt="Blood donation bag"
                    className="w-full h-44 object-contain"
                  />
                  <div>
                    <h2 className="text-5xl font-black leading-tight">
                      Blood Donation
                      <br />
                      Form
                    </h2>
                    <p className="text-sm text-red-100 mt-3 leading-relaxed max-w-md">
                      Confidential - Please answer the following questions correctly.
                      This will help protect you and the patient who receives your
                      blood.
                    </p>
                  </div>
                </div>

                <div className="p-6 sm:p-8 space-y-7">
                  <section>
                    <h3 className="font-semibold text-gray-900 mb-3">
                      What is your blood type?
                    </h3>
                    <div className="grid sm:grid-cols-2 gap-3">
                      {BLOOD_TYPES.map((type) => (
                        <label key={type} className="flex items-center gap-2 text-sm text-gray-800">
                          <input
                            type="radio"
                            name="bloodType"
                            checked={formData.bloodType === type}
                            onChange={() => handleFieldChange("bloodType", type)}
                          />
                          {type}
                        </label>
                      ))}
                    </div>
                    {errors.bloodType && (
                      <p className="text-xs text-red-600 mt-2">{errors.bloodType}</p>
                    )}
                  </section>

                  <section>
                    <h3 className="font-semibold text-gray-900 mb-2">Full Name</h3>
                    <div className="grid sm:grid-cols-2 gap-3">
                      <div>
                        <input
                          type="text"
                          value={formData.firstName}
                          onChange={(event) => handleFieldChange("firstName", event.target.value)}
                          className={inputClass}
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
                          onChange={(event) => handleFieldChange("lastName", event.target.value)}
                          className={inputClass}
                        />
                        <p className="text-xs text-gray-500 mt-1">Last Name</p>
                        {errors.lastName && (
                          <p className="text-xs text-red-600 mt-1">{errors.lastName}</p>
                        )}
                      </div>
                    </div>
                  </section>

                  <section>
                    <h3 className="font-semibold text-gray-900 mb-2">Birth Date</h3>
                    <div className="grid sm:grid-cols-3 gap-3">
                      <select
                        value={formData.birthMonth}
                        onChange={(event) => handleFieldChange("birthMonth", event.target.value)}
                        className={inputClass}
                      >
                        <option value="">Please select a month</option>
                        {[
                          "January",
                          "February",
                          "March",
                          "April",
                          "May",
                          "June",
                          "July",
                          "August",
                          "September",
                          "October",
                          "November",
                          "December",
                        ].map((month) => (
                          <option key={month} value={month}>
                            {month}
                          </option>
                        ))}
                      </select>
                      <select
                        value={formData.birthDay}
                        onChange={(event) => handleFieldChange("birthDay", event.target.value)}
                        className={inputClass}
                      >
                        <option value="">Please select a day</option>
                        {Array.from({ length: 31 }).map((_, idx) => {
                          const day = String(idx + 1);
                          return (
                            <option key={day} value={day}>
                              {day}
                            </option>
                          );
                        })}
                      </select>
                      <select
                        value={formData.birthYear}
                        onChange={(event) => handleFieldChange("birthYear", event.target.value)}
                        className={inputClass}
                      >
                        <option value="">Please select a year</option>
                        {Array.from({ length: 90 }).map((_, idx) => {
                          const year = String(new Date().getFullYear() - idx);
                          return (
                            <option key={year} value={year}>
                              {year}
                            </option>
                          );
                        })}
                      </select>
                    </div>
                    {errors.birthDate && (
                      <p className="text-xs text-red-600 mt-1">{errors.birthDate}</p>
                    )}
                  </section>

                  <section className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <h3 className="font-semibold text-gray-900 mb-2">Gender</h3>
                      <div className="flex gap-4">
                        <label className="flex items-center gap-2 text-sm text-gray-800">
                          <input
                            type="radio"
                            name="gender"
                            checked={formData.gender === "male"}
                            onChange={() => handleFieldChange("gender", "male")}
                          />
                          Male
                        </label>
                        <label className="flex items-center gap-2 text-sm text-gray-800">
                          <input
                            type="radio"
                            name="gender"
                            checked={formData.gender === "female"}
                            onChange={() => handleFieldChange("gender", "female")}
                          />
                          Female
                        </label>
                      </div>
                      {errors.gender && (
                        <p className="text-xs text-red-600 mt-1">{errors.gender}</p>
                      )}
                    </div>
                    <div></div>
                  </section>

                  <section className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label className="font-semibold text-gray-900">Phone Number</label>
                      <input
                        type="tel"
                        value={formData.phone}
                        onChange={(event) => handleFieldChange("phone", event.target.value)}
                        className={`${inputClass} mt-2`}
                        placeholder="(___) ___-____"
                      />
                      <p className="text-xs text-gray-500 mt-1">
                        Please enter a valid phone number.
                      </p>
                      {errors.phone && (
                        <p className="text-xs text-red-600 mt-1">{errors.phone}</p>
                      )}
                    </div>
                    <div>
                      <label className="font-semibold text-gray-900">Email</label>
                      <input
                        type="email"
                        value={formData.email}
                        onChange={(event) => handleFieldChange("email", event.target.value)}
                        className={`${inputClass} mt-2`}
                        placeholder="example@example.com"
                      />
                      {errors.email && (
                        <p className="text-xs text-red-600 mt-1">{errors.email}</p>
                      )}
                    </div>
                  </section>

                  <section>
                    <h3 className="font-semibold text-gray-900">Address</h3>
                    <div className="space-y-3 mt-2">
                      <div>
                        <input
                          type="text"
                          value={formData.streetAddress}
                          onChange={(event) => handleFieldChange("streetAddress", event.target.value)}
                          className={inputClass}
                        />
                        <p className="text-xs text-gray-500 mt-1">Street Address</p>
                        {errors.streetAddress && (
                          <p className="text-xs text-red-600 mt-1">{errors.streetAddress}</p>
                        )}
                      </div>
                      <div>
                        <input
                          type="text"
                          value={formData.streetAddress2}
                          onChange={(event) => handleFieldChange("streetAddress2", event.target.value)}
                          className={inputClass}
                        />
                        <p className="text-xs text-gray-500 mt-1">Street Address Line 2</p>
                      </div>
                      <div className="grid sm:grid-cols-2 gap-3">
                        <div>
                          <input
                            type="text"
                            value={formData.city}
                            onChange={(event) => handleFieldChange("city", event.target.value)}
                            className={inputClass}
                          />
                          <p className="text-xs text-gray-500 mt-1">City</p>
                          {errors.city && (
                            <p className="text-xs text-red-600 mt-1">{errors.city}</p>
                          )}
                        </div>
                        <div>
                          <select
                            value={formData.state}
                            onChange={(event) => handleFieldChange("state", event.target.value)}
                            className={inputClass}
                          >
                            <option value="">State / Province</option>
                            {US_STATES.map((stateOption) => (
                              <option key={stateOption} value={stateOption}>
                                {stateOption}
                              </option>
                            ))}
                          </select>
                          {errors.state && (
                            <p className="text-xs text-red-600 mt-1">{errors.state}</p>
                          )}
                        </div>
                      </div>
                      <div>
                        <input
                          type="text"
                          value={formData.postalCode}
                          onChange={(event) => handleFieldChange("postalCode", event.target.value)}
                          className={inputClass}
                        />
                        <p className="text-xs text-gray-500 mt-1">Postal / Zip Code</p>
                        {errors.postalCode && (
                          <p className="text-xs text-red-600 mt-1">{errors.postalCode}</p>
                        )}
                      </div>
                    </div>
                  </section>

                  <section className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label className="font-semibold text-gray-900">Weight</label>
                      <input
                        type="text"
                        value={formData.weight}
                        onChange={(event) => handleFieldChange("weight", event.target.value)}
                        className={`${inputClass} mt-2`}
                      />
                    </div>
                    <div>
                      <label className="font-semibold text-gray-900">Hb</label>
                      <input
                        type="text"
                        value={formData.hb}
                        onChange={(event) => handleFieldChange("hb", event.target.value)}
                        className={`${inputClass} mt-2`}
                      />
                    </div>
                    <div>
                      <label className="font-semibold text-gray-900">BP</label>
                      <input
                        type="text"
                        value={formData.bp}
                        onChange={(event) => handleFieldChange("bp", event.target.value)}
                        className={`${inputClass} mt-2`}
                      />
                    </div>
                    <div>
                      <label className="font-semibold text-gray-900">Temparature</label>
                      <input
                        type="text"
                        value={formData.temperature}
                        onChange={(event) => handleFieldChange("temperature", event.target.value)}
                        className={`${inputClass} mt-2`}
                      />
                    </div>
                  </section>

                  <section className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label className="font-semibold text-gray-900">
                        What was the last time you donated blood?
                      </label>
                      <input
                        type="date"
                        value={formData.lastDonationDate}
                        onChange={(event) =>
                          handleFieldChange("lastDonationDate", event.target.value)
                        }
                        className={`${inputClass} mt-2`}
                      />
                      {errors.lastDonationDate && (
                        <p className="text-xs text-red-600 mt-1">{errors.lastDonationDate}</p>
                      )}
                    </div>
                    <div>
                      <label className="font-semibold text-gray-900">
                        Have you donated previously?
                      </label>
                      <div className="mt-2 space-y-1">
                        <label className="flex items-center gap-2 text-sm text-gray-800">
                          <input
                            type="radio"
                            name="donatedPreviously"
                            checked={formData.donatedPreviously === "yes"}
                            onChange={() => handleFieldChange("donatedPreviously", "yes")}
                          />
                          Yes
                        </label>
                        <label className="flex items-center gap-2 text-sm text-gray-800">
                          <input
                            type="radio"
                            name="donatedPreviously"
                            checked={formData.donatedPreviously === "no"}
                            onChange={() => handleFieldChange("donatedPreviously", "no")}
                          />
                          No
                        </label>
                      </div>
                      {errors.donatedPreviously && (
                        <p className="text-xs text-red-600 mt-1">
                          {errors.donatedPreviously}
                        </p>
                      )}
                    </div>
                  </section>

                  <section>
                    <h3 className="font-semibold text-gray-900 mb-2">
                      In the last six months have you had any of the following?
                    </h3>
                    <label className="flex items-center gap-2 text-sm text-gray-800">
                      <input
                        type="checkbox"
                        checked={checks.recentTattoo}
                        onChange={(event) =>
                          setChecks((prev) => ({ ...prev, recentTattoo: event.target.checked }))
                        }
                      />
                      Tattooing
                    </label>
                    <label className="flex items-center gap-2 text-sm text-gray-800 mt-1">
                      <input
                        type="checkbox"
                        checked={checks.recentEarPiercing}
                        onChange={(event) =>
                          setChecks((prev) => ({
                            ...prev,
                            recentEarPiercing: event.target.checked,
                          }))
                        }
                      />
                      Ear piercing
                    </label>
                  </section>

                  <section>
                    <h3 className="font-semibold text-gray-900 mb-2">
                      Do you suffer from or have suffered from any of the following diseases?
                    </h3>
                    <div className="grid sm:grid-cols-2 gap-x-6 gap-y-1">
                      {DISEASE_OPTIONS.map((item) => (
                        <label key={item} className="flex items-center gap-2 text-sm text-gray-800">
                          <input
                            type="checkbox"
                            checked={checks.diseases.includes(item)}
                            onChange={() => toggleOption("diseases", item)}
                          />
                          {item}
                        </label>
                      ))}
                    </div>
                  </section>

                  <section>
                    <h3 className="font-semibold text-gray-900 mb-2">
                      Are you taking or have you taken any of these in the past 72 hours?
                    </h3>
                    <div className="grid sm:grid-cols-2 gap-x-6 gap-y-1">
                      {MEDICATION_OPTIONS.map((item) => (
                        <label key={item} className="flex items-center gap-2 text-sm text-gray-800">
                          <input
                            type="checkbox"
                            checked={checks.medications.includes(item)}
                            onChange={() => toggleOption("medications", item)}
                          />
                          {item}
                        </label>
                      ))}
                    </div>
                  </section>

                  <section>
                    <h3 className="font-semibold text-gray-900 mb-2">
                      Is there any history of surgery or blood transfusion in the past six months?
                    </h3>
                    <div className="grid sm:grid-cols-2 gap-x-6 gap-y-1">
                      {SURGERY_OPTIONS.map((item) => (
                        <label key={item} className="flex items-center gap-2 text-sm text-gray-800">
                          <input
                            type="checkbox"
                            checked={checks.surgeryHistory.includes(item)}
                            onChange={() => toggleOption("surgeryHistory", item)}
                          />
                          {item}
                        </label>
                      ))}
                    </div>
                  </section>

                  <div className="pt-2 flex justify-center">
                    <button
                      type="submit"
                      className="px-16 py-3 rounded bg-black text-white hover:bg-gray-900 transition-colors"
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

export default BloodDonationForm;
