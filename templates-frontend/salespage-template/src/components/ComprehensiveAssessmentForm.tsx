import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { X } from "lucide-react";

interface ComprehensiveAssessmentFormProps {
  isOpen: boolean;
  onClose: () => void;
}

const toSvgDataUri = (content: string) =>
  `data:image/svg+xml;utf8,${encodeURIComponent(
    `<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 920 260'>${content}</svg>`,
  )}`;

const HEADER_IMAGE = toSvgDataUri(`
  <defs>
    <linearGradient id='g' x1='0' y1='0' x2='1' y2='1'>
      <stop offset='0%' stop-color='#eaf2fb'/>
      <stop offset='100%' stop-color='#dbe9f7'/>
    </linearGradient>
  </defs>
  <rect width='920' height='260' fill='url(#g)'/>
  <circle cx='170' cy='96' r='46' fill='#f6d4bf'/>
  <rect x='123' y='145' width='95' height='86' rx='28' fill='#9bc1e6'/>
  <circle cx='302' cy='98' r='44' fill='#f4c6b2'/>
  <rect x='258' y='142' width='92' height='88' rx='26' fill='#5b8cbc'/>
  <rect x='382' y='92' width='150' height='14' rx='7' fill='#9ab4cd'/>
  <rect x='382' y='120' width='198' height='12' rx='6' fill='#b6c9dc'/>
  <rect x='382' y='145' width='170' height='12' rx='6' fill='#b6c9dc'/>
`);

const ADL_ROWS = [
  "Bathing",
  "Dressing",
  "Toileting",
  "Transferring",
  "Continence",
  "Feeding",
];

const IADL_ROWS = [
  "Telephone use",
  "Shopping",
  "Food preparation",
  "Housekeeping",
  "Laundry",
  "Transportation",
  "Medication management",
  "Finances",
];

const RISK_ROWS = [
  "Fall risk",
  "Pressure ulcer risk",
  "Malnutrition risk",
  "Dehydration risk",
  "Medication error risk",
  "Wandering risk",
];

const MENTAL_ROWS = [
  "Orientation",
  "Memory",
  "Attention",
  "Judgment",
  "Mood stability",
  "Sleep quality",
];

const MEDICAL_CONDITIONS = [
  "Hypertension",
  "Diabetes",
  "Heart Disease",
  "Stroke History",
  "COPD / Asthma",
  "Kidney Disease",
  "Arthritis",
  "Dementia",
  "Depression",
  "Vision Impairment",
  "Hearing Impairment",
  "Cancer History",
];

const YEARS = Array.from({ length: 90 }).map((_, idx) =>
  String(new Date().getFullYear() - idx),
);

const MONTHS = [
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
];

const DAYS = Array.from({ length: 31 }).map((_, idx) => String(idx + 1));

const makeInitialMatrix = (rows: string[]) =>
  rows.reduce<Record<string, string>>((acc, row) => {
    acc[row] = "";
    return acc;
  }, {});

const ComprehensiveAssessmentForm = ({
  isOpen,
  onClose,
}: ComprehensiveAssessmentFormProps) => {
  const [fields, setFields] = useState<Record<string, string>>({
    firstName: "",
    lastName: "",
    dobMonth: "",
    dobDay: "",
    dobYear: "",
    age: "",
    gender: "",
    phone: "",
    email: "",
    address1: "",
    address2: "",
    city: "",
    state: "",
    zip: "",
    emergencyName: "",
    emergencyPhone: "",
    emergencyRelation: "",
    physicianName: "",
    physicianPhone: "",
    allergies: "",
    currentMedications: "",
    hospitalizationHistory: "",
    socialHistory: "",
    primaryConcern: "",
    additionalNotes: "",
    signature: "",
    signedDate: "",
  });

  const [adls, setAdls] = useState<Record<string, string>>(makeInitialMatrix(ADL_ROWS));
  const [iadls, setIadls] = useState<Record<string, string>>(makeInitialMatrix(IADL_ROWS));
  const [risks, setRisks] = useState<Record<string, string>>(makeInitialMatrix(RISK_ROWS));
  const [mental, setMental] = useState<Record<string, string>>(
    makeInitialMatrix(MENTAL_ROWS),
  );
  const [conditions, setConditions] = useState<Record<string, boolean>>(
    MEDICAL_CONDITIONS.reduce<Record<string, boolean>>((acc, key) => {
      acc[key] = false;
      return acc;
    }, {}),
  );
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitted, setSubmitted] = useState(false);

  const setField = (key: string, value: string) => {
    setFields((prev) => ({ ...prev, [key]: value }));
    setErrors((prev) => ({ ...prev, [key]: "" }));
  };

  const setMatrixValue = (
    section: "adls" | "iadls" | "risks" | "mental",
    row: string,
    value: string,
  ) => {
    const setter =
      section === "adls"
        ? setAdls
        : section === "iadls"
          ? setIadls
          : section === "risks"
            ? setRisks
            : setMental;
    setter((prev) => ({ ...prev, [row]: value }));
    setErrors((prev) => ({ ...prev, [`${section}-${row}`]: "" }));
  };

  const resetAll = () => {
    setFields({
      firstName: "",
      lastName: "",
      dobMonth: "",
      dobDay: "",
      dobYear: "",
      age: "",
      gender: "",
      phone: "",
      email: "",
      address1: "",
      address2: "",
      city: "",
      state: "",
      zip: "",
      emergencyName: "",
      emergencyPhone: "",
      emergencyRelation: "",
      physicianName: "",
      physicianPhone: "",
      allergies: "",
      currentMedications: "",
      hospitalizationHistory: "",
      socialHistory: "",
      primaryConcern: "",
      additionalNotes: "",
      signature: "",
      signedDate: "",
    });
    setAdls(makeInitialMatrix(ADL_ROWS));
    setIadls(makeInitialMatrix(IADL_ROWS));
    setRisks(makeInitialMatrix(RISK_ROWS));
    setMental(makeInitialMatrix(MENTAL_ROWS));
    setConditions(
      MEDICAL_CONDITIONS.reduce<Record<string, boolean>>((acc, key) => {
        acc[key] = false;
        return acc;
      }, {}),
    );
    setErrors({});
    setSubmitted(false);
  };

  const closeAndReset = () => {
    onClose();
    setTimeout(resetAll, 120);
  };

  const validate = () => {
    const next: Record<string, string> = {};
    if (!fields.firstName.trim()) next.firstName = "Required";
    if (!fields.lastName.trim()) next.lastName = "Required";
    if (!fields.dobMonth || !fields.dobDay || !fields.dobYear) {
      next.dob = "Complete date of birth";
    }
    if (!fields.phone.trim()) next.phone = "Required";
    if (!fields.email.trim()) {
      next.email = "Required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(fields.email)) {
      next.email = "Invalid email";
    }
    if (!fields.address1.trim()) next.address1 = "Required";
    if (!fields.city.trim()) next.city = "Required";
    if (!fields.state.trim()) next.state = "Required";
    if (!fields.zip.trim()) next.zip = "Required";
    if (!fields.primaryConcern.trim()) next.primaryConcern = "Required";
    if (!fields.signature.trim()) next.signature = "Required";
    if (!fields.signedDate.trim()) next.signedDate = "Required";

    ADL_ROWS.forEach((row) => {
      if (!adls[row]) next[`adls-${row}`] = "Select one";
    });
    IADL_ROWS.forEach((row) => {
      if (!iadls[row]) next[`iadls-${row}`] = "Select one";
    });
    RISK_ROWS.forEach((row) => {
      if (!risks[row]) next[`risks-${row}`] = "Select one";
    });
    MENTAL_ROWS.forEach((row) => {
      if (!mental[row]) next[`mental-${row}`] = "Select one";
    });

    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!validate()) return;
    setSubmitted(true);
  };

  const inputClass = "w-full border border-gray-300 rounded px-3 py-2 text-sm bg-white";

  const renderMatrix = (
    title: string,
    rows: string[],
    section: "adls" | "iadls" | "risks" | "mental",
    values: Record<string, string>,
  ) => (
    <section className="space-y-2">
      <h3 className="text-sm font-bold text-gray-900">{title}</h3>
      <div className="overflow-x-auto border border-gray-300 rounded">
        <table className="min-w-full text-sm">
          <thead className="bg-[#eef3fb]">
            <tr>
              <th className="text-left p-2 font-semibold text-gray-800">Item</th>
              <th className="p-2 font-semibold text-gray-800">Independent</th>
              <th className="p-2 font-semibold text-gray-800">Needs Help</th>
              <th className="p-2 font-semibold text-gray-800">Dependent</th>
              <th className="p-2 font-semibold text-gray-800">N/A</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((row) => (
              <tr key={row} className="border-t border-gray-200">
                <td className="p-2 text-gray-800">{row}</td>
                {["independent", "needs_help", "dependent", "na"].map((option) => (
                  <td key={option} className="p-2 text-center">
                    <input
                      type="radio"
                      name={`${section}-${row}`}
                      checked={values[row] === option}
                      onChange={() => setMatrixValue(section, row, option)}
                    />
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {rows.some((row) => errors[`${section}-${row}`]) && (
        <p className="text-xs text-red-600">Please complete all rows in this section.</p>
      )}
    </section>
  );

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={closeAndReset}
          className="fixed inset-0 z-[10020] bg-[#8fb0d8] p-3 sm:p-6 overflow-y-auto"
        >
          <motion.div
            initial={{ scale: 0.98, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.98, opacity: 0 }}
            transition={{ duration: 0.18 }}
            onClick={(event) => event.stopPropagation()}
            className="relative max-w-4xl mx-auto bg-white border border-[#b8c7de] rounded shadow-2xl"
          >
            <button
              type="button"
              onClick={closeAndReset}
              className="absolute top-3 right-3 z-20 p-2 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors"
              aria-label="Close comprehensive assessment form"
            >
              <X className="w-5 h-5 text-gray-700" />
            </button>

            {submitted ? (
              <div className="p-12 text-center">
                <div className="inline-flex h-14 w-14 items-center justify-center rounded-full bg-blue-100 text-blue-700 text-2xl mb-4">
                  ✓
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-2">Form Submitted</h3>
                <p className="text-gray-600 mb-6">
                  Thank you {fields.firstName}, your comprehensive assessment form has
                  been submitted.
                </p>
                <button
                  type="button"
                  onClick={closeAndReset}
                  className="px-8 py-2.5 rounded bg-black text-white hover:bg-gray-900 transition-colors"
                >
                  Close
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit}>
                <div className="grid md:grid-cols-[1fr_1.05fr] border-b border-gray-200">
                  <img
                    src={HEADER_IMAGE}
                    alt="Assessment header"
                    className="w-full h-48 object-cover"
                  />
                  <div className="p-6 bg-[#ecf3fc]">
                    <h2 className="text-3xl font-black text-gray-900 leading-tight">
                      Comprehensive Assessment Form
                    </h2>
                    <p className="text-sm text-gray-600 mt-2">
                      Please complete all required sections to ensure accurate care
                      planning and risk review.
                    </p>
                  </div>
                </div>

                <div className="p-6 sm:p-8 space-y-8">
                  <section className="space-y-4">
                    <h3 className="text-sm font-bold text-gray-900">
                      PATIENT INFORMATION
                    </h3>
                    <div className="grid sm:grid-cols-2 gap-3">
                      <div>
                        <input
                          className={inputClass}
                          value={fields.firstName}
                          onChange={(e) => setField("firstName", e.target.value)}
                          placeholder="First Name"
                        />
                        {errors.firstName && (
                          <p className="text-xs text-red-600 mt-1">{errors.firstName}</p>
                        )}
                      </div>
                      <div>
                        <input
                          className={inputClass}
                          value={fields.lastName}
                          onChange={(e) => setField("lastName", e.target.value)}
                          placeholder="Last Name"
                        />
                        {errors.lastName && (
                          <p className="text-xs text-red-600 mt-1">{errors.lastName}</p>
                        )}
                      </div>
                    </div>
                    <div className="grid sm:grid-cols-4 gap-3">
                      <select
                        className={inputClass}
                        value={fields.dobMonth}
                        onChange={(e) => setField("dobMonth", e.target.value)}
                      >
                        <option value="">Month</option>
                        {MONTHS.map((month) => (
                          <option key={month} value={month}>
                            {month}
                          </option>
                        ))}
                      </select>
                      <select
                        className={inputClass}
                        value={fields.dobDay}
                        onChange={(e) => setField("dobDay", e.target.value)}
                      >
                        <option value="">Day</option>
                        {DAYS.map((day) => (
                          <option key={day} value={day}>
                            {day}
                          </option>
                        ))}
                      </select>
                      <select
                        className={inputClass}
                        value={fields.dobYear}
                        onChange={(e) => setField("dobYear", e.target.value)}
                      >
                        <option value="">Year</option>
                        {YEARS.map((year) => (
                          <option key={year} value={year}>
                            {year}
                          </option>
                        ))}
                      </select>
                      <input
                        className={inputClass}
                        value={fields.age}
                        onChange={(e) => setField("age", e.target.value)}
                        placeholder="Age"
                      />
                    </div>
                    {errors.dob && <p className="text-xs text-red-600">{errors.dob}</p>}
                    <div className="grid sm:grid-cols-2 gap-3">
                      <div>
                        <div className="border border-gray-300 rounded px-3 py-2 text-sm bg-white flex items-center gap-4">
                          <label className="flex items-center gap-2">
                            <input
                              type="radio"
                              checked={fields.gender === "male"}
                              onChange={() => setField("gender", "male")}
                            />
                            Male
                          </label>
                          <label className="flex items-center gap-2">
                            <input
                              type="radio"
                              checked={fields.gender === "female"}
                              onChange={() => setField("gender", "female")}
                            />
                            Female
                          </label>
                        </div>
                        {errors.gender && (
                          <p className="text-xs text-red-600 mt-1">{errors.gender}</p>
                        )}
                      </div>
                      <input
                        className={inputClass}
                        value={fields.phone}
                        onChange={(e) => setField("phone", e.target.value)}
                        placeholder="Phone Number"
                      />
                    </div>
                    {errors.phone && <p className="text-xs text-red-600">{errors.phone}</p>}
                    <div>
                      <input
                        className={inputClass}
                        value={fields.email}
                        onChange={(e) => setField("email", e.target.value)}
                        placeholder="Email"
                      />
                      {errors.email && (
                        <p className="text-xs text-red-600 mt-1">{errors.email}</p>
                      )}
                    </div>
                    <div>
                      <input
                        className={inputClass}
                        value={fields.address1}
                        onChange={(e) => setField("address1", e.target.value)}
                        placeholder="Street Address"
                      />
                      {errors.address1 && (
                        <p className="text-xs text-red-600 mt-1">{errors.address1}</p>
                      )}
                    </div>
                    <input
                      className={inputClass}
                      value={fields.address2}
                      onChange={(e) => setField("address2", e.target.value)}
                      placeholder="Street Address Line 2"
                    />
                    <div className="grid sm:grid-cols-3 gap-3">
                      <div>
                        <input
                          className={inputClass}
                          value={fields.city}
                          onChange={(e) => setField("city", e.target.value)}
                          placeholder="City"
                        />
                        {errors.city && (
                          <p className="text-xs text-red-600 mt-1">{errors.city}</p>
                        )}
                      </div>
                      <div>
                        <input
                          className={inputClass}
                          value={fields.state}
                          onChange={(e) => setField("state", e.target.value)}
                          placeholder="State / Province"
                        />
                        {errors.state && (
                          <p className="text-xs text-red-600 mt-1">{errors.state}</p>
                        )}
                      </div>
                      <div>
                        <input
                          className={inputClass}
                          value={fields.zip}
                          onChange={(e) => setField("zip", e.target.value)}
                          placeholder="Postal / Zip Code"
                        />
                        {errors.zip && (
                          <p className="text-xs text-red-600 mt-1">{errors.zip}</p>
                        )}
                      </div>
                    </div>
                  </section>

                  <section className="space-y-3">
                    <h3 className="text-sm font-bold text-gray-900">EMERGENCY CONTACT</h3>
                    <div className="grid sm:grid-cols-3 gap-3">
                      <input
                        className={inputClass}
                        value={fields.emergencyName}
                        onChange={(e) => setField("emergencyName", e.target.value)}
                        placeholder="Contact Name"
                      />
                      <input
                        className={inputClass}
                        value={fields.emergencyPhone}
                        onChange={(e) => setField("emergencyPhone", e.target.value)}
                        placeholder="Contact Phone"
                      />
                      <input
                        className={inputClass}
                        value={fields.emergencyRelation}
                        onChange={(e) => setField("emergencyRelation", e.target.value)}
                        placeholder="Relationship"
                      />
                    </div>
                    <div className="grid sm:grid-cols-2 gap-3">
                      <input
                        className={inputClass}
                        value={fields.physicianName}
                        onChange={(e) => setField("physicianName", e.target.value)}
                        placeholder="Primary Physician Name"
                      />
                      <input
                        className={inputClass}
                        value={fields.physicianPhone}
                        onChange={(e) => setField("physicianPhone", e.target.value)}
                        placeholder="Primary Physician Phone"
                      />
                    </div>
                  </section>

                  {renderMatrix("Activities of Daily Living (ADL)", ADL_ROWS, "adls", adls)}
                  {renderMatrix(
                    "Instrumental Activities of Daily Living (IADL)",
                    IADL_ROWS,
                    "iadls",
                    iadls,
                  )}
                  {renderMatrix("Risk Screening", RISK_ROWS, "risks", risks)}
                  {renderMatrix(
                    "Mental / Cognitive Observation",
                    MENTAL_ROWS,
                    "mental",
                    mental,
                  )}

                  <section className="space-y-3">
                    <h3 className="text-sm font-bold text-gray-900">
                      MEDICAL HISTORY & CONDITIONS
                    </h3>
                    <div className="grid sm:grid-cols-2 gap-x-6 gap-y-2 border border-gray-300 rounded p-3">
                      {MEDICAL_CONDITIONS.map((condition) => (
                        <label
                          key={condition}
                          className="flex items-center gap-2 text-sm text-gray-800"
                        >
                          <input
                            type="checkbox"
                            checked={conditions[condition]}
                            onChange={(e) =>
                              setConditions((prev) => ({
                                ...prev,
                                [condition]: e.target.checked,
                              }))
                            }
                          />
                          {condition}
                        </label>
                      ))}
                    </div>
                    <textarea
                      className={inputClass}
                      rows={3}
                      value={fields.allergies}
                      onChange={(e) => setField("allergies", e.target.value)}
                      placeholder="Allergies"
                    />
                    <textarea
                      className={inputClass}
                      rows={4}
                      value={fields.currentMedications}
                      onChange={(e) => setField("currentMedications", e.target.value)}
                      placeholder="Current Medications"
                    />
                    <textarea
                      className={inputClass}
                      rows={3}
                      value={fields.hospitalizationHistory}
                      onChange={(e) => setField("hospitalizationHistory", e.target.value)}
                      placeholder="Recent hospitalization or surgery history"
                    />
                  </section>

                  <section className="space-y-3">
                    <h3 className="text-sm font-bold text-gray-900">SOCIAL / BEHAVIORAL</h3>
                    <textarea
                      className={inputClass}
                      rows={3}
                      value={fields.socialHistory}
                      onChange={(e) => setField("socialHistory", e.target.value)}
                      placeholder="Social history, support system, living conditions"
                    />
                    <textarea
                      className={inputClass}
                      rows={3}
                      value={fields.primaryConcern}
                      onChange={(e) => setField("primaryConcern", e.target.value)}
                      placeholder="Primary concern / reason for assessment"
                    />
                    {errors.primaryConcern && (
                      <p className="text-xs text-red-600">{errors.primaryConcern}</p>
                    )}
                    <textarea
                      className={inputClass}
                      rows={4}
                      value={fields.additionalNotes}
                      onChange={(e) => setField("additionalNotes", e.target.value)}
                      placeholder="Additional notes"
                    />
                  </section>

                  <section className="space-y-3">
                    <h3 className="text-sm font-bold text-gray-900">CONSENT & SIGNATURE</h3>
                    <div className="grid sm:grid-cols-2 gap-3">
                      <div>
                        <input
                          className={inputClass}
                          value={fields.signature}
                          onChange={(e) => setField("signature", e.target.value)}
                          placeholder="Patient Signature (type full name)"
                        />
                        {errors.signature && (
                          <p className="text-xs text-red-600 mt-1">{errors.signature}</p>
                        )}
                      </div>
                      <div>
                        <input
                          type="date"
                          className={inputClass}
                          value={fields.signedDate}
                          onChange={(e) => setField("signedDate", e.target.value)}
                        />
                        {errors.signedDate && (
                          <p className="text-xs text-red-600 mt-1">{errors.signedDate}</p>
                        )}
                      </div>
                    </div>
                  </section>

                  <div className="pt-2 flex justify-center">
                    <button
                      type="submit"
                      className="px-12 py-3 rounded bg-black text-white hover:bg-gray-900 transition-colors"
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

export default ComprehensiveAssessmentForm;
