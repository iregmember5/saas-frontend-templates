import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { X } from "lucide-react";

interface NewsletterSubscriptionFormProps {
  isOpen: boolean;
  onClose: () => void;
}

interface NewsletterFormState {
  plan: "" | "monthly" | "sixMonths" | "annual";
  paymentMethod: "" | "card" | "paypal" | "check";
  firstName: string;
  middleName: string;
  lastName: string;
  email: string;
  phone: string;
  streetAddress: string;
  streetAddress2: string;
  city: string;
  state: string;
  postalCode: string;
}

const toSvgDataUri = (content: string) =>
  `data:image/svg+xml;utf8,${encodeURIComponent(
    `<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 1200 440'>${content}</svg>`,
  )}`;

const HEADER_IMAGE = toSvgDataUri(`
  <defs>
    <linearGradient id='bg' x1='0' y1='0' x2='1' y2='1'>
      <stop offset='0%' stop-color='#ebebef'/>
      <stop offset='100%' stop-color='#ffffff'/>
    </linearGradient>
  </defs>
  <rect width='1200' height='440' fill='url(#bg)'/>
  <polygon points='0,40 620,0 780,290 220,340' fill='#d9d9df' opacity='0.7'/>
  <rect x='120' y='90' width='390' height='230' fill='#cbccd4' opacity='0.75'/>
  <line x1='140' y1='118' x2='480' y2='118' stroke='#b8bac4' stroke-width='8'/>
  <line x1='140' y1='146' x2='480' y2='146' stroke='#b8bac4' stroke-width='8'/>
  <line x1='140' y1='174' x2='480' y2='174' stroke='#b8bac4' stroke-width='8'/>
  <rect x='160' y='190' width='150' height='108' fill='#babdc9'/>
  <circle cx='565' cy='188' r='75' fill='#d7d8de'/>
  <circle cx='565' cy='188' r='57' fill='#858998'/>
  <circle cx='565' cy='188' r='48' fill='#f2f2f5'/>
  <path d='M620 270 C690 250, 708 300, 738 352' stroke='#d8d7dc' stroke-width='20' fill='none' stroke-linecap='round'/>
  <rect x='0' y='300' width='800' height='140' fill='#ffffff' opacity='0.55'/>
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

const getInitialState = (): NewsletterFormState => ({
  plan: "",
  paymentMethod: "",
  firstName: "",
  middleName: "",
  lastName: "",
  email: "",
  phone: "",
  streetAddress: "",
  streetAddress2: "",
  city: "",
  state: "",
  postalCode: "",
});

const inputClass = "w-full border border-gray-300 rounded px-3 py-2.5 text-sm bg-white";
const helperClass = "text-xs text-gray-500 mt-1";

const NewsletterSubscriptionForm = ({
  isOpen,
  onClose,
}: NewsletterSubscriptionFormProps) => {
  const [formData, setFormData] = useState<NewsletterFormState>(getInitialState());
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [showSuccess, setShowSuccess] = useState(false);

  const handleFieldChange = <K extends keyof NewsletterFormState>(
    key: K,
    value: NewsletterFormState[K],
  ) => {
    setFormData((prev) => ({ ...prev, [key]: value }));
    setErrors((prev) => ({ ...prev, [key]: "" }));
  };

  const resetAll = () => {
    setFormData(getInitialState());
    setErrors({});
    setShowSuccess(false);
  };

  const handleClose = () => {
    onClose();
    setTimeout(resetAll, 120);
  };

  const validate = () => {
    const nextErrors: Record<string, string> = {};
    if (!formData.plan) nextErrors.plan = "Please select one subscription plan.";
    if (!formData.paymentMethod) {
      nextErrors.paymentMethod = "Please choose a payment method.";
    }
    if (!formData.firstName.trim()) nextErrors.firstName = "Required";
    if (!formData.lastName.trim()) nextErrors.lastName = "Required";
    if (!formData.email.trim()) {
      nextErrors.email = "Required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email.trim())) {
      nextErrors.email = "Invalid email";
    }
    if (!formData.phone.trim()) nextErrors.phone = "Required";
    if (!formData.streetAddress.trim()) nextErrors.streetAddress = "Required";
    if (!formData.city.trim()) nextErrors.city = "Required";
    if (!formData.state.trim()) nextErrors.state = "Required";
    if (!formData.postalCode.trim()) nextErrors.postalCode = "Required";
    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!validate()) return;
    setShowSuccess(true);
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={handleClose}
          className="fixed inset-0 z-[10020] bg-[#4d516d] p-3 sm:p-5 overflow-y-auto"
        >
          <motion.div
            initial={{ scale: 0.98, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.98, opacity: 0 }}
            transition={{ duration: 0.18 }}
            onClick={(event) => event.stopPropagation()}
            className="w-full max-w-4xl mx-auto my-6 bg-[#f2f2f5] rounded overflow-hidden shadow-2xl border border-gray-300"
          >
            <button
              type="button"
              onClick={handleClose}
              className="absolute top-4 right-4 z-20 p-2 rounded-full bg-white/90 hover:bg-white transition-colors"
              aria-label="Close newsletter form"
            >
              <X className="w-5 h-5 text-gray-700" />
            </button>

            {showSuccess ? (
              <div className="p-12 text-center">
                <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-green-100 mb-4">
                  <span className="text-green-700 text-2xl">✓</span>
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-2">
                  Subscription submitted
                </h3>
                <p className="text-gray-600">
                  Thanks {formData.firstName}, your newsletter subscription form was
                  submitted.
                </p>
                <button
                  type="button"
                  onClick={handleClose}
                  className="mt-6 px-8 py-2.5 rounded bg-black text-white hover:bg-gray-800 transition-colors"
                >
                  Close
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit}>
                <div className="grid md:grid-cols-[1.35fr_1fr] min-h-[260px] bg-white">
                  <div>
                    <img
                      src={HEADER_IMAGE}
                      alt="Newsletter header"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="p-6 sm:p-8 flex flex-col justify-center text-center md:text-left">
                    <h2 className="text-5xl font-black text-[#1f2937] leading-tight">
                      Newsletter
                      <br />
                      Subscription
                      <br />
                      Form
                    </h2>
                    <p className="text-xl text-[#1f2937] mt-3">uninterrupted news source</p>
                  </div>
                </div>

                <div className="p-6 sm:p-8 space-y-8">
                  <section>
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">
                      Sign me up for ... <span className="text-red-600">*</span>
                    </h3>

                    {[
                      {
                        id: "monthly",
                        title: "Monthly Subscription",
                        desc: "$9.99 for the first month then, $19.99 for each month",
                      },
                      {
                        id: "sixMonths",
                        title: "6-months",
                        desc: "$5.99 for the first payment then, $49.99 for each six months",
                      },
                      {
                        id: "annual",
                        title: "Annual",
                        desc: "$69.99 for the first year then, $89.99 for each year",
                      },
                    ].map((plan) => (
                      <label
                        key={plan.id}
                        className="flex items-start gap-3 py-4 border-t border-gray-200 first:border-t-0 cursor-pointer"
                      >
                        <input
                          type="radio"
                          name="plan"
                          checked={formData.plan === plan.id}
                          onChange={() =>
                            handleFieldChange(
                              "plan",
                              plan.id as NewsletterFormState["plan"],
                            )
                          }
                          className="mt-1"
                        />
                        <div>
                          <p className="font-semibold text-gray-900">{plan.title}</p>
                          <p className="text-sm text-gray-600">{plan.desc}</p>
                        </div>
                      </label>
                    ))}
                    {errors.plan && (
                      <p className="text-xs text-red-600 mt-2">{errors.plan}</p>
                    )}
                  </section>

                  <section className="space-y-2">
                    <h3 className="text-lg font-semibold text-gray-900">Payment Method</h3>
                    <label className="flex items-center gap-2 text-sm text-gray-800">
                      <input
                        type="radio"
                        name="paymentMethod"
                        checked={formData.paymentMethod === "card"}
                        onChange={() => handleFieldChange("paymentMethod", "card")}
                      />
                      Debit or Credit Card
                    </label>
                    <label className="flex items-center gap-2 text-sm text-gray-800">
                      <input
                        type="radio"
                        name="paymentMethod"
                        checked={formData.paymentMethod === "paypal"}
                        onChange={() => handleFieldChange("paymentMethod", "paypal")}
                      />
                      Paypal
                    </label>
                    <label className="flex items-center gap-2 text-sm text-gray-800">
                      <input
                        type="radio"
                        name="paymentMethod"
                        checked={formData.paymentMethod === "check"}
                        onChange={() => handleFieldChange("paymentMethod", "check")}
                      />
                      Check / Postal Order (Please make payable to Newsletter Company Name)
                    </label>
                    {errors.paymentMethod && (
                      <p className="text-xs text-red-600 mt-2">{errors.paymentMethod}</p>
                    )}
                  </section>

                  <section>
                    <h3 className="text-lg font-semibold text-gray-900">
                      Full Name <span className="text-red-600">*</span>
                    </h3>
                    <div className="grid sm:grid-cols-3 gap-3 mt-2">
                      <div>
                        <input
                          type="text"
                          value={formData.firstName}
                          onChange={(event) =>
                            handleFieldChange("firstName", event.target.value)
                          }
                          className={inputClass}
                        />
                        <p className={helperClass}>First Name</p>
                        {errors.firstName && (
                          <p className="text-xs text-red-600 mt-1">{errors.firstName}</p>
                        )}
                      </div>
                      <div>
                        <input
                          type="text"
                          value={formData.middleName}
                          onChange={(event) =>
                            handleFieldChange("middleName", event.target.value)
                          }
                          className={inputClass}
                        />
                        <p className={helperClass}>Middle Name</p>
                      </div>
                      <div>
                        <input
                          type="text"
                          value={formData.lastName}
                          onChange={(event) =>
                            handleFieldChange("lastName", event.target.value)
                          }
                          className={inputClass}
                        />
                        <p className={helperClass}>Last Name</p>
                        {errors.lastName && (
                          <p className="text-xs text-red-600 mt-1">{errors.lastName}</p>
                        )}
                      </div>
                    </div>
                  </section>

                  <section>
                    <h3 className="text-lg font-semibold text-gray-900">E-mail</h3>
                    <input
                      type="email"
                      value={formData.email}
                      onChange={(event) => handleFieldChange("email", event.target.value)}
                      className={`${inputClass} mt-2 max-w-md`}
                      placeholder="ex: myname@example.com"
                    />
                    <p className={helperClass}>example@example.com</p>
                    {errors.email && (
                      <p className="text-xs text-red-600 mt-1">{errors.email}</p>
                    )}
                  </section>

                  <section>
                    <h3 className="text-lg font-semibold text-gray-900">Phone Number</h3>
                    <input
                      type="tel"
                      value={formData.phone}
                      onChange={(event) => handleFieldChange("phone", event.target.value)}
                      className={`${inputClass} mt-2 max-w-md`}
                      placeholder="(000) 000-0000"
                    />
                    {errors.phone && (
                      <p className="text-xs text-red-600 mt-1">{errors.phone}</p>
                    )}
                  </section>

                  <section>
                    <h3 className="text-lg font-semibold text-gray-900">
                      Address <span className="text-red-600">*</span>
                    </h3>
                    <div className="space-y-3 mt-2">
                      <div>
                        <input
                          type="text"
                          value={formData.streetAddress}
                          onChange={(event) =>
                            handleFieldChange("streetAddress", event.target.value)
                          }
                          className={inputClass}
                        />
                        <p className={helperClass}>Street Address</p>
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
                            handleFieldChange("streetAddress2", event.target.value)
                          }
                          className={inputClass}
                        />
                        <p className={helperClass}>Street Address Line 2</p>
                      </div>
                      <div className="grid sm:grid-cols-2 gap-3">
                        <div>
                          <input
                            type="text"
                            value={formData.city}
                            onChange={(event) => handleFieldChange("city", event.target.value)}
                            className={inputClass}
                          />
                          <p className={helperClass}>City</p>
                          {errors.city && (
                            <p className="text-xs text-red-600 mt-1">{errors.city}</p>
                          )}
                        </div>
                        <div>
                          <select
                            value={formData.state}
                            onChange={(event) =>
                              handleFieldChange("state", event.target.value)
                            }
                            className={inputClass}
                          >
                            <option value="">Please Select</option>
                            {US_STATES.map((stateOption) => (
                              <option key={stateOption} value={stateOption}>
                                {stateOption}
                              </option>
                            ))}
                          </select>
                          <p className={helperClass}>State / Province</p>
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
                            handleFieldChange("postalCode", event.target.value)
                          }
                          className={inputClass}
                        />
                        <p className={helperClass}>Postal / Zip Code</p>
                        {errors.postalCode && (
                          <p className="text-xs text-red-600 mt-1">{errors.postalCode}</p>
                        )}
                      </div>
                    </div>
                  </section>

                  <section className="text-center py-4">
                    <h4 className="font-bold text-xl text-gray-900">COMPANY NAME</h4>
                    <p className="text-sm text-gray-700 mt-1">
                      123 Maple Street Anytown, PA 17101
                    </p>
                    <p className="text-sm text-gray-700">
                      info@example.com &nbsp; - &nbsp; www.example.com
                    </p>
                    <p className="text-sm text-gray-700">(123) 1234567</p>
                  </section>
                </div>

                <div className="border-t border-gray-300 bg-white p-6 flex justify-center gap-3">
                  <button
                    type="button"
                    onClick={handlePrint}
                    className="px-6 py-3 border border-gray-400 rounded bg-white text-gray-900 hover:bg-gray-100 transition-colors"
                  >
                    Print Form
                  </button>
                  <button
                    type="submit"
                    className="px-8 py-3 rounded bg-black text-white hover:bg-gray-800 transition-colors"
                  >
                    Submit Form
                  </button>
                </div>
              </form>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default NewsletterSubscriptionForm;
