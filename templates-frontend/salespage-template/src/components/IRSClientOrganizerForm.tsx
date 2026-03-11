import { useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Plus, X } from "lucide-react";

interface IRSClientOrganizerFormProps {
  isOpen: boolean;
  onClose: () => void;
}

interface HouseholdMember {
  firstName: string;
  lastName: string;
  dob: string;
  relationship: string;
  monthsLived: string;
  usCitizen: YesNo;
  residentUsCanadaMexico: YesNo;
  unmarriedAsDec31: "" | "single" | "married";
  fullTimeStudent: YesNo;
  disabled: YesNo;
  qualifiesAsChildRelative: YesNo;
  providedMoreThan50Support: YesNo;
  childIncomeOver4700: YesNo;
  taxpayerProvidedMoreThan50: YesNo;
  taxpayerPaidMoreThanHalfHome: YesNo;
}

interface PersonInfo {
  firstName: string;
  lastName: string;
  dob: string;
  contactNumber: string;
  isUsCitizen: "" | "yes" | "no";
}

interface OrganizerFormState {
  taxYear: string;
  taxpayer: PersonInfo;
  spouse: PersonInfo;
  taxpayerMI: string;
  spouseMI: string;
  filingStatus:
    | ""
    | "single"
    | "married_joint"
    | "married_separate"
    | "head_of_household"
    | "widow";
  address1: string;
  address2: string;
  city: string;
  state: string;
  zipCode: string;
  email: string;
  phone: string;
  occupationTaxpayer: string;
  occupationSpouse: string;
  aptNumber: string;
  taxpayerFullTimeStudent: YesNo;
  taxpayerDisabled: YesNo;
  taxpayerBlind: YesNo;
  spouseFullTimeStudent: YesNo;
  spouseDisabled: YesNo;
  spouseBlind: YesNo;
  dependentClaim: "" | "yes" | "no" | "unsure";
  identityPinVictim: YesNo;
  optionalIrsEmail: string;
  maritalStatus:
    | ""
    | "never_married"
    | "married"
    | "divorced"
    | "legally_separated"
    | "widowed";
  gotMarriedInTaxYear: YesNo;
  livedWithSpouseLastSixMonths: YesNo;
  finalDecreeDate: string;
  separateMaintenanceDecreeDate: string;
  spouseDeathYear: string;
  jobsLastYear: string;
  alimonyRecipientHasSsn: YesNo;
  retirementIraA: boolean;
  retirementRothIraB: boolean;
  retirement401kB: boolean;
  retirementOther: boolean;
  expenseMedicalDental: boolean;
  expenseTaxes: boolean;
  expenseMortgageInterest: boolean;
  expenseCharitableContributions: boolean;
  disallowedCreditTaxYear: string;
  estimatedTaxPaymentAmount: string;
  primaryConcern: string;
  additionalComments: string;
  taxpayerSignature: string;
  spouseSignature: string;
  signedDate: string;
  spouseSignedDate: string;
}

type YesNo = "" | "yes" | "no";
type TriAnswer = "" | "yes" | "no" | "unsure";

interface IncomeItemState {
  answer: TriAnswer;
}

interface ExpenseItemState {
  answer: TriAnswer;
}

interface LifeEventItemState {
  answer: TriAnswer;
}

interface TaxQuestion {
  id: string;
  label: string;
}

const INCOME_ITEMS: TaxQuestion[] = [
  { id: "q1_wages", label: "(B) Wages or Salary? (Form W-2)" },
  { id: "q2_tip_income", label: "(A) Tip Income?" },
  { id: "q3_scholarships", label: "(B) Scholarships? (Forms W-2, 1098-T)" },
  {
    id: "q4_interest_dividends",
    label:
      "(B) Interest/Dividends from: checking/savings accounts, bonds, CDs, brokerage? (Forms 1099-INT, 1099-DIV)",
  },
  { id: "q5_state_refund", label: "(B) Refund of state/local income taxes? (Form 1099-G)" },
  { id: "q6_alimony", label: "(B) Alimony income or separate maintenance payments?" },
  {
    id: "q7_self_employment",
    label:
      "(A) Self-Employment income? (Forms 1099-MISC, 1099-NEC, 1099-K, cash, digital assets, or other property or services)",
  },
  {
    id: "q8_unreported_work",
    label:
      "(A) Cash/check/digital assets, or other property or services for any work performed not reported on Forms W-2 or 1099?",
  },
  {
    id: "q9_sale_exchange",
    label:
      "(A) Income (or loss) from the sale or exchange of stocks, bonds, digital assets or real estate? (including your home) (Forms 1099-S, 1099-B)",
  },
  {
    id: "q10_disability",
    label:
      "(B) Disability income? (such as payments from insurance, or workers compensation) (Forms 1099-R, W-2)",
  },
  {
    id: "q11_retirement",
    label: "(A) Retirement income or payments from pensions, annuities, and or IRA? (Form 1099-R)",
  },
  { id: "q12_unemployment", label: "(B) Unemployment Compensation? (Form 1099-G)" },
  { id: "q13_ssa_rrb", label: "(B) Social Security or Railroad Retirement Benefits? (Forms SSA-1099, RRB-1099)" },
  { id: "q14_rental", label: "(M) Income (or loss) from rental property?" },
  {
    id: "q15_other_income",
    label:
      "(B) Other income? (gambling, lottery, prizes, awards, jury duty, digital assets, Sch K-1, royalties, foreign income, etc.)",
  },
];

const EXPENSE_ITEMS: TaxQuestion[] = [
  { id: "e1_alimony", label: "(B) Alimony or separate maintenance payments?" },
  {
    id: "e2_retirement_contrib",
    label: "Contributions or repayments to a retirement account?",
  },
  {
    id: "e3_education_expenses",
    label:
      "(B) College or post secondary educational expenses for yourself, spouse or dependents? (Form 1098-T)",
  },
  { id: "e4_any_of_following", label: "Any of the following?" },
  { id: "e5_childcare", label: "(B) Child or dependent care expenses such as daycare?" },
  {
    id: "e6_educator_supplies",
    label:
      "(B) For supplies used as an eligible educator such as a teacher, teacher's aide, counselor, etc.?",
  },
  {
    id: "e7_self_employment_expenses",
    label: "(A) Expenses related to self-employment income or any other income you received?",
  },
  { id: "e8_student_loan", label: "(B) Student loan interest? (Form 1098-E)" },
];

const LIFE_EVENT_ITEMS: TaxQuestion[] = [
  {
    id: "v1_hsa",
    label:
      "(A) Have a Health Savings Account? (Forms 5498-SA, 1099-SA, W-2 with code W in box 12)",
  },
  {
    id: "v2_cancelled_debt",
    label:
      "(A) Have credit card, student loan or mortgage debt cancelled/forgiven by a lender or have a home foreclosure? (Forms 1099-C, 1099-A)",
  },
  { id: "v3_adopt_child", label: "(A) Adopt a child?" },
  {
    id: "v4_disallowed_credits",
    label:
      "(B) Have Earned Income Credit, Child Tax Credit or American Opportunity Credit disallowed in a prior year?",
  },
  {
    id: "v5_energy_items",
    label:
      "(A) Purchase and install energy-efficient home items? (such as windows, furnace, insulation, etc.)",
  },
  {
    id: "v6_first_homebuyer_2008",
    label: "(A) Receive the First Time Homebuyers Credit in 2008?",
  },
  {
    id: "v7_estimated_tax",
    label:
      "(B) Make estimated tax payments or apply last year's refund to this year's tax? If so how much?",
  },
  {
    id: "v8_capital_loss_carryover",
    label:
      "(A) File a federal return last year containing a \"capital loss carryover\" on Form 1040 Schedule D?",
  },
  {
    id: "v9_marketplace",
    label:
      "(A) Have health coverage through the Marketplace (Exchange)? [Provide Form 1095-A]",
  },
];

const makeInitialIncomeState = (items: TaxQuestion[]) =>
  items.reduce<Record<string, IncomeItemState>>((acc, item) => {
    acc[item.id] = { answer: "" };
    return acc;
  }, {});

const makeInitialExpenseState = (items: TaxQuestion[]) =>
  items.reduce<Record<string, ExpenseItemState>>((acc, item) => {
    acc[item.id] = { answer: "" };
    return acc;
  }, {});

const makeInitialLifeEventState = (items: TaxQuestion[]) =>
  items.reduce<Record<string, LifeEventItemState>>((acc, item) => {
    acc[item.id] = { answer: "" };
    return acc;
  }, {});

const getInitialFormState = (): OrganizerFormState => ({
  taxYear: String(new Date().getFullYear() - 1),
  taxpayer: {
    firstName: "",
    lastName: "",
    dob: "",
    contactNumber: "",
    isUsCitizen: "",
  },
  spouse: {
    firstName: "",
    lastName: "",
    dob: "",
    contactNumber: "",
    isUsCitizen: "",
  },
  taxpayerMI: "",
  spouseMI: "",
  filingStatus: "",
  address1: "",
  address2: "",
  city: "",
  state: "",
  zipCode: "",
  email: "",
  phone: "",
  occupationTaxpayer: "",
  occupationSpouse: "",
  aptNumber: "",
  taxpayerFullTimeStudent: "",
  taxpayerDisabled: "",
  taxpayerBlind: "",
  spouseFullTimeStudent: "",
  spouseDisabled: "",
  spouseBlind: "",
  dependentClaim: "",
  identityPinVictim: "",
  optionalIrsEmail: "",
  maritalStatus: "",
  gotMarriedInTaxYear: "",
  livedWithSpouseLastSixMonths: "",
  finalDecreeDate: "",
  separateMaintenanceDecreeDate: "",
  spouseDeathYear: "",
  jobsLastYear: "",
  alimonyRecipientHasSsn: "",
  retirementIraA: false,
  retirementRothIraB: false,
  retirement401kB: false,
  retirementOther: false,
  expenseMedicalDental: false,
  expenseTaxes: false,
  expenseMortgageInterest: false,
  expenseCharitableContributions: false,
  disallowedCreditTaxYear: "",
  estimatedTaxPaymentAmount: "",
  primaryConcern: "",
  additionalComments: "",
  taxpayerSignature: "",
  spouseSignature: "",
  signedDate: "",
  spouseSignedDate: "",
});

const years = Array.from({ length: 10 }).map((_, idx) =>
  String(new Date().getFullYear() - idx),
);

const IRSClientOrganizerForm = ({ isOpen, onClose }: IRSClientOrganizerFormProps) => {
  const [formData, setFormData] = useState<OrganizerFormState>(getInitialFormState());
  const [householdMembers, setHouseholdMembers] = useState<HouseholdMember[]>([
    {
      firstName: "",
      lastName: "",
      dob: "",
      relationship: "",
      monthsLived: "",
      usCitizen: "",
      residentUsCanadaMexico: "",
      unmarriedAsDec31: "",
      fullTimeStudent: "",
      disabled: "",
      qualifiesAsChildRelative: "",
      providedMoreThan50Support: "",
      childIncomeOver4700: "",
      taxpayerProvidedMoreThan50: "",
      taxpayerPaidMoreThanHalfHome: "",
    },
  ]);
  const [incomeItems, setIncomeItems] = useState<Record<string, IncomeItemState>>(
    makeInitialIncomeState(INCOME_ITEMS),
  );
  const [expenseItems, setExpenseItems] = useState<Record<string, ExpenseItemState>>(
    makeInitialExpenseState(EXPENSE_ITEMS),
  );
  const [lifeEventItems, setLifeEventItems] = useState<
    Record<string, LifeEventItemState>
  >(makeInitialLifeEventState(LIFE_EVENT_ITEMS));
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitted, setSubmitted] = useState(false);

  const selectedCount = useMemo(() => {
    const incomeSelected = Object.values(incomeItems).filter(
      (entry) => entry.answer !== "",
    ).length;
    const expenseSelected = Object.values(expenseItems).filter(
      (entry) => entry.answer !== "",
    ).length;
    const eventSelected = Object.values(lifeEventItems).filter(
      (entry) => entry.answer !== "",
    ).length;
    return incomeSelected + expenseSelected + eventSelected;
  }, [expenseItems, incomeItems, lifeEventItems]);

  const setTaxpayer = (key: keyof PersonInfo, value: PersonInfo[keyof PersonInfo]) => {
    setFormData((prev) => ({
      ...prev,
      taxpayer: {
        ...prev.taxpayer,
        [key]: value,
      },
    }));
    setErrors((prev) => ({ ...prev, [`taxpayer.${String(key)}`]: "" }));
  };

  const setSpouse = (key: keyof PersonInfo, value: PersonInfo[keyof PersonInfo]) => {
    setFormData((prev) => ({
      ...prev,
      spouse: {
        ...prev.spouse,
        [key]: value,
      },
    }));
    setErrors((prev) => ({ ...prev, [`spouse.${String(key)}`]: "" }));
  };

  const setField = (key: keyof OrganizerFormState, value: OrganizerFormState[keyof OrganizerFormState]) => {
    setFormData((prev) => ({ ...prev, [key]: value }));
    setErrors((prev) => ({ ...prev, [String(key)]: "" }));
  };

  const setIncomeAnswer = (id: string, value: TriAnswer) => {
    setIncomeItems((prev) => ({
      ...prev,
      [id]: {
        ...prev[id],
        answer: value,
      },
    }));
  };

  const setExpenseAnswer = (id: string, value: TriAnswer) => {
    setExpenseItems((prev) => ({
      ...prev,
      [id]: {
        ...prev[id],
        answer: value,
      },
    }));
  };

  const setLifeEventAnswer = (id: string, value: TriAnswer) => {
    setLifeEventItems((prev) => ({
      ...prev,
      [id]: {
        ...prev[id],
        answer: value,
      },
    }));
  };

  const updateMember = (index: number, key: keyof HouseholdMember, value: string) => {
    setHouseholdMembers((prev) =>
      prev.map((member, i) => (i === index ? { ...member, [key]: value } : member)),
    );
  };

  const addMember = () => {
    setHouseholdMembers((prev) => [
      ...prev,
      {
        firstName: "",
        lastName: "",
        dob: "",
        relationship: "",
        monthsLived: "",
        usCitizen: "",
        residentUsCanadaMexico: "",
        unmarriedAsDec31: "",
        fullTimeStudent: "",
        disabled: "",
        qualifiesAsChildRelative: "",
        providedMoreThan50Support: "",
        childIncomeOver4700: "",
        taxpayerProvidedMoreThan50: "",
        taxpayerPaidMoreThanHalfHome: "",
      },
    ]);
  };

  const resetAll = () => {
    setFormData(getInitialFormState());
    setHouseholdMembers([
      {
        firstName: "",
        lastName: "",
        dob: "",
        relationship: "",
        monthsLived: "",
        usCitizen: "",
        residentUsCanadaMexico: "",
        unmarriedAsDec31: "",
        fullTimeStudent: "",
        disabled: "",
        qualifiesAsChildRelative: "",
        providedMoreThan50Support: "",
        childIncomeOver4700: "",
        taxpayerProvidedMoreThan50: "",
        taxpayerPaidMoreThanHalfHome: "",
      },
    ]);
    setIncomeItems(makeInitialIncomeState(INCOME_ITEMS));
    setExpenseItems(makeInitialExpenseState(EXPENSE_ITEMS));
    setLifeEventItems(makeInitialLifeEventState(LIFE_EVENT_ITEMS));
    setErrors({});
    setSubmitted(false);
  };

  const handleClose = () => {
    onClose();
    setTimeout(resetAll, 120);
  };

  const validate = () => {
    const nextErrors: Record<string, string> = {};

    if (!formData.taxYear) nextErrors.taxYear = "Required";
    if (!formData.taxpayer.firstName.trim()) {
      nextErrors["taxpayer.firstName"] = "Required";
    }
    if (!formData.taxpayer.lastName.trim()) {
      nextErrors["taxpayer.lastName"] = "Required";
    }
    if (!formData.taxpayer.dob.trim()) nextErrors["taxpayer.dob"] = "Required";
    if (!formData.taxpayer.contactNumber.trim()) {
      nextErrors["taxpayer.contactNumber"] = "Required";
    }
    if (!formData.filingStatus) nextErrors.filingStatus = "Required";
    if (!formData.address1.trim()) nextErrors.address1 = "Required";
    if (!formData.city.trim()) nextErrors.city = "Required";
    if (!formData.state.trim()) nextErrors.state = "Required";
    if (!formData.zipCode.trim()) nextErrors.zipCode = "Required";
    if (!formData.email.trim()) {
      nextErrors.email = "Required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email.trim())) {
      nextErrors.email = "Invalid email";
    }
    if (!formData.phone.trim()) nextErrors.phone = "Required";
    if (selectedCount === 0) {
      nextErrors.selections = "Select at least one item in Parts III–V.";
    }

    if (!formData.taxpayerSignature.trim()) {
      nextErrors.taxpayerSignature = "Required";
    }
    if (!formData.signedDate.trim()) nextErrors.signedDate = "Required";

    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!validate()) return;
    setSubmitted(true);
  };

  const renderIncomeSection = () => (
    <section className="bg-white border border-gray-300 rounded p-4">
      <h3 className="text-sm sm:text-base font-bold text-[#1f2937] border-b border-gray-300 pb-2">
        Part III - Income - Last Year, Did You (or Your Spouse) Receive
      </h3>
      <div className="overflow-x-auto mt-2">
        <table className="w-full min-w-[900px] text-sm">
          <thead>
            <tr className="text-left">
              <th className="w-10 p-1">Yes</th>
              <th className="w-10 p-1">No</th>
              <th className="w-14 p-1">Unsure</th>
              <th className="p-1"> </th>
            </tr>
          </thead>
          <tbody>
            {INCOME_ITEMS.map((item, index) => (
              <tr key={item.id} className="align-top">
                <td className="p-1">
                  <input
                    type="checkbox"
                    checked={incomeItems[item.id].answer === "yes"}
                    onChange={(e) =>
                      setIncomeAnswer(item.id, e.target.checked ? "yes" : "")
                    }
                  />
                </td>
                <td className="p-1">
                  <input
                    type="checkbox"
                    checked={incomeItems[item.id].answer === "no"}
                    onChange={(e) =>
                      setIncomeAnswer(item.id, e.target.checked ? "no" : "")
                    }
                  />
                </td>
                <td className="p-1">
                  <input
                    type="checkbox"
                    checked={incomeItems[item.id].answer === "unsure"}
                    onChange={(e) =>
                      setIncomeAnswer(item.id, e.target.checked ? "unsure" : "")
                    }
                  />
                </td>
                <td className="p-1">
                  <span className="font-semibold mr-1">{index + 1}.</span>
                  {item.label}
                  {item.id === "q1_wages" && (
                    <span className="ml-2">
                      If yes, how many jobs did you have last year?
                      <input
                        className="ml-2 border border-gray-300 rounded px-2 py-1 w-28"
                        value={formData.jobsLastYear}
                        onChange={(e) => setField("jobsLastYear", e.target.value)}
                        placeholder="Jobs"
                      />
                    </span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="flex justify-end mt-3">
        <button
          type="button"
          className="text-xs bg-[#0b5ea8] text-white px-8 py-2 rounded"
        >
          Save
        </button>
      </div>
    </section>
  );

  const renderExpenseSection = () => (
    <section className="bg-white border border-gray-300 rounded p-4">
      <h3 className="text-sm sm:text-base font-bold text-[#1f2937] border-b border-gray-300 pb-2">
        Part IV - Expenses - Last Year, Did You (or Your Spouse) Pay
      </h3>
      <div className="overflow-x-auto mt-2">
        <table className="w-full min-w-[900px] text-sm">
          <thead>
            <tr className="text-left">
              <th className="w-10 p-1">Yes</th>
              <th className="w-10 p-1">No</th>
              <th className="w-14 p-1">Unsure</th>
              <th className="p-1"> </th>
            </tr>
          </thead>
          <tbody>
            {EXPENSE_ITEMS.map((item, index) => (
              <tr key={item.id} className="align-top">
                <td className="p-1">
                  <input
                    type="checkbox"
                    checked={expenseItems[item.id].answer === "yes"}
                    onChange={(e) =>
                      setExpenseAnswer(item.id, e.target.checked ? "yes" : "")
                    }
                  />
                </td>
                <td className="p-1">
                  <input
                    type="checkbox"
                    checked={expenseItems[item.id].answer === "no"}
                    onChange={(e) =>
                      setExpenseAnswer(item.id, e.target.checked ? "no" : "")
                    }
                  />
                </td>
                <td className="p-1">
                  <input
                    type="checkbox"
                    checked={expenseItems[item.id].answer === "unsure"}
                    onChange={(e) =>
                      setExpenseAnswer(item.id, e.target.checked ? "unsure" : "")
                    }
                  />
                </td>
                <td className="p-1">
                  <span className="font-semibold mr-1">{index + 1}.</span>
                  {item.label}

                  {item.id === "e1_alimony" && (
                    <div className="mt-1 ml-4">
                      If yes, do you have the recipient&apos;s SSN?
                      <label className="ml-3 inline-flex items-center gap-1">
                        <input
                          type="checkbox"
                          checked={formData.alimonyRecipientHasSsn === "yes"}
                          onChange={() => setField("alimonyRecipientHasSsn", "yes")}
                        />
                        Yes
                      </label>
                      <label className="ml-3 inline-flex items-center gap-1">
                        <input
                          type="checkbox"
                          checked={formData.alimonyRecipientHasSsn === "no"}
                          onChange={() => setField("alimonyRecipientHasSsn", "no")}
                        />
                        No
                      </label>
                    </div>
                  )}

                  {item.id === "e2_retirement_contrib" && (
                    <div className="mt-1 ml-4 flex flex-wrap gap-4">
                      <label className="inline-flex items-center gap-1">
                        <input
                          type="checkbox"
                          checked={formData.retirementIraA}
                          onChange={(e) => setField("retirementIraA", e.target.checked)}
                        />
                        IRA(A)
                      </label>
                      <label className="inline-flex items-center gap-1">
                        <input
                          type="checkbox"
                          checked={formData.retirementRothIraB}
                          onChange={(e) =>
                            setField("retirementRothIraB", e.target.checked)
                          }
                        />
                        Roth IRA (B)
                      </label>
                      <label className="inline-flex items-center gap-1">
                        <input
                          type="checkbox"
                          checked={formData.retirement401kB}
                          onChange={(e) => setField("retirement401kB", e.target.checked)}
                        />
                        401K (B)
                      </label>
                      <label className="inline-flex items-center gap-1">
                        <input
                          type="checkbox"
                          checked={formData.retirementOther}
                          onChange={(e) => setField("retirementOther", e.target.checked)}
                        />
                        Other
                      </label>
                    </div>
                  )}

                  {item.id === "e4_any_of_following" && (
                    <div className="mt-1 ml-4 flex flex-wrap gap-x-4 gap-y-1">
                      <label className="inline-flex items-center gap-1">
                        <input
                          type="checkbox"
                          checked={formData.expenseMedicalDental}
                          onChange={(e) =>
                            setField("expenseMedicalDental", e.target.checked)
                          }
                        />
                        (A) Medical &amp; Dental (including insurance premiums)
                      </label>
                      <label className="inline-flex items-center gap-1">
                        <input
                          type="checkbox"
                          checked={formData.expenseTaxes}
                          onChange={(e) => setField("expenseTaxes", e.target.checked)}
                        />
                        (A) Taxes (State, Real Estate, Personal Property, Sales)
                      </label>
                      <label className="inline-flex items-center gap-1">
                        <input
                          type="checkbox"
                          checked={formData.expenseMortgageInterest}
                          onChange={(e) =>
                            setField("expenseMortgageInterest", e.target.checked)
                          }
                        />
                        (A) Mortgage Interest (Form 1098)
                      </label>
                      <label className="inline-flex items-center gap-1">
                        <input
                          type="checkbox"
                          checked={formData.expenseCharitableContributions}
                          onChange={(e) =>
                            setField(
                              "expenseCharitableContributions",
                              e.target.checked,
                            )
                          }
                        />
                        (B) Charitable Contributions
                      </label>
                    </div>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="flex justify-end mt-3">
        <button
          type="button"
          className="text-xs bg-[#0b5ea8] text-white px-8 py-2 rounded"
        >
          Save
        </button>
      </div>
    </section>
  );

  const renderLifeEventsSection = () => (
    <section className="bg-white border border-gray-300 rounded p-4">
      <h3 className="text-sm sm:text-base font-bold text-[#1f2937] border-b border-gray-300 pb-2">
        Part V - Life Events - Last Year, Did You (or Your Spouse)
      </h3>
      <div className="overflow-x-auto mt-2">
        <table className="w-full min-w-[900px] text-sm">
          <thead>
            <tr className="text-left">
              <th className="w-10 p-1">Yes</th>
              <th className="w-10 p-1">No</th>
              <th className="w-14 p-1">Unsure</th>
              <th className="p-1"> </th>
            </tr>
          </thead>
          <tbody>
            {LIFE_EVENT_ITEMS.map((item, index) => (
              <tr key={item.id} className="align-top">
                <td className="p-1">
                  <input
                    type="checkbox"
                    checked={lifeEventItems[item.id].answer === "yes"}
                    onChange={(e) =>
                      setLifeEventAnswer(item.id, e.target.checked ? "yes" : "")
                    }
                  />
                </td>
                <td className="p-1">
                  <input
                    type="checkbox"
                    checked={lifeEventItems[item.id].answer === "no"}
                    onChange={(e) =>
                      setLifeEventAnswer(item.id, e.target.checked ? "no" : "")
                    }
                  />
                </td>
                <td className="p-1">
                  <input
                    type="checkbox"
                    checked={lifeEventItems[item.id].answer === "unsure"}
                    onChange={(e) =>
                      setLifeEventAnswer(item.id, e.target.checked ? "unsure" : "")
                    }
                  />
                </td>
                <td className="p-1">
                  <span className="font-semibold mr-1">{index + 1}.</span>
                  {item.label}
                  {item.id === "v4_disallowed_credits" && (
                    <span className="ml-2">
                      If yes, for which tax year?
                      <input
                        className="ml-2 border border-gray-300 rounded px-2 py-1 w-24"
                        value={formData.disallowedCreditTaxYear}
                        onChange={(e) =>
                          setField("disallowedCreditTaxYear", e.target.value)
                        }
                        placeholder="Year"
                      />
                    </span>
                  )}
                  {item.id === "v7_estimated_tax" && (
                    <span className="ml-2">
                      <input
                        className="ml-2 border border-gray-300 rounded px-2 py-1 w-24"
                        value={formData.estimatedTaxPaymentAmount}
                        onChange={(e) =>
                          setField("estimatedTaxPaymentAmount", e.target.value)
                        }
                        placeholder="Amount"
                      />
                    </span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="flex justify-end mt-3">
        <button
          type="button"
          className="text-xs bg-[#0b5ea8] text-white px-8 py-2 rounded"
        >
          Save
        </button>
      </div>
    </section>
  );

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={handleClose}
          className="fixed inset-0 z-[10020] bg-[#e5e7eb] p-3 sm:p-6 overflow-y-auto"
        >
          <motion.div
            initial={{ scale: 0.98, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.98, opacity: 0 }}
            transition={{ duration: 0.18 }}
            onClick={(event) => event.stopPropagation()}
            className="relative max-w-6xl mx-auto bg-white border border-gray-300 shadow-2xl"
          >
            <button
              type="button"
              onClick={handleClose}
              className="absolute top-3 right-3 z-20 p-2 rounded-full bg-white/95 hover:bg-white border border-gray-200"
              aria-label="Close IRS organizer form"
            >
              <X className="w-5 h-5 text-gray-700" />
            </button>

            <div className="bg-[#0b5ea8] text-white px-4 py-3 flex items-center justify-between">
              <span className="text-lg font-semibold">IRS</span>
              <span className="text-xs sm:text-sm text-center">
                13614-C Client Organizer Intake / Interview Form
              </span>
              <span className="text-lg opacity-0">IRS</span>
            </div>

            {submitted ? (
              <div className="p-12 text-center">
                <div className="inline-flex h-14 w-14 items-center justify-center rounded-full bg-green-100 text-green-700 text-2xl mb-4">
                  ✓
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-2">Form Submitted</h3>
                <p className="text-gray-600">
                  Thank you {formData.taxpayer.firstName}, your organizer form was
                  submitted successfully.
                </p>
                <button
                  type="button"
                  onClick={handleClose}
                  className="mt-6 px-8 py-2.5 rounded bg-[#0b5ea8] text-white hover:bg-[#0b4d8b] transition-colors"
                >
                  Close
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="p-4 sm:p-6 space-y-5">
                <section className="bg-gray-50 border border-gray-300 rounded p-4">
                  <p className="text-sm font-semibold text-gray-900 mb-2">You will need:</p>
                  <div className="grid md:grid-cols-2 gap-4">
                    <ul className="list-disc pl-5 space-y-1.5 text-sm text-gray-800">
                      <li>Tax Information such as Forms W-2, 1099, 1098, 1095.</li>
                      <li>
                        Social Security cards or ITIN letters for all persons on your tax
                        return.
                      </li>
                      <li>
                        Picture ID (such as valid driver&apos;s license) for you and your
                        spouse.
                      </li>
                    </ul>
                    <ul className="list-disc pl-5 space-y-1.5 text-sm text-gray-800">
                      <li>Please complete part I-V of this form.</li>
                      <li>
                        You are responsible for the information on your return. Please
                        provide complete and accurate information.
                      </li>
                      <li>
                        If you have questions, please ask the IRS-certified volunteer
                        preparer.
                      </li>
                    </ul>
                  </div>
                </section>

                <section className="bg-white border border-gray-300 rounded p-4 space-y-4 text-sm">
                  <div className="flex items-center justify-between gap-3">
                    <h3 className="text-sm sm:text-base font-bold text-[#1f2937]">
                      Part I - Your Personal Information{" "}
                      <span className="font-normal text-xs">
                        (if you are filing a joint return, enter your names in the same
                        order as last year&apos;s return)
                      </span>
                    </h3>
                    <label className="text-xs text-gray-700">
                      Tax Year
                      <select
                        className="ml-2 border border-gray-300 rounded px-2 py-1"
                        value={formData.taxYear}
                        onChange={(e) => setField("taxYear", e.target.value)}
                      >
                        {years.map((year) => (
                          <option key={year} value={year}>
                            {year}
                          </option>
                        ))}
                      </select>
                    </label>
                  </div>

                  <div className="grid lg:grid-cols-12 gap-2 items-end border border-gray-200 p-2 rounded">
                    <label className="lg:col-span-3 text-xs font-medium text-gray-700">
                      1. Your First Name
                      <input
                        className="w-full mt-1 border border-gray-300 rounded px-2 py-1.5"
                        value={formData.taxpayer.firstName}
                        onChange={(e) => setTaxpayer("firstName", e.target.value)}
                        placeholder="Your First Name"
                      />
                      {errors["taxpayer.firstName"] && (
                        <p className="text-xs text-red-600 mt-1">
                          {errors["taxpayer.firstName"]}
                        </p>
                      )}
                    </label>
                    <label className="lg:col-span-1 text-xs font-medium text-gray-700">
                      M.I
                      <input
                        className="w-full mt-1 border border-gray-300 rounded px-2 py-1.5"
                        value={formData.taxpayerMI}
                        onChange={(e) => setField("taxpayerMI", e.target.value)}
                        placeholder="M.I"
                      />
                    </label>
                    <label className="lg:col-span-2 text-xs font-medium text-gray-700">
                      Last Name
                      <input
                        className="w-full mt-1 border border-gray-300 rounded px-2 py-1.5"
                        value={formData.taxpayer.lastName}
                        onChange={(e) => setTaxpayer("lastName", e.target.value)}
                        placeholder="Last Name"
                      />
                      {errors["taxpayer.lastName"] && (
                        <p className="text-xs text-red-600 mt-1">
                          {errors["taxpayer.lastName"]}
                        </p>
                      )}
                    </label>
                    <label className="lg:col-span-2 text-xs font-medium text-gray-700">
                      Your Date of Birth
                      <input
                        type="date"
                        className="w-full mt-1 border border-gray-300 rounded px-2 py-1.5"
                        value={formData.taxpayer.dob}
                        onChange={(e) => setTaxpayer("dob", e.target.value)}
                      />
                      {errors["taxpayer.dob"] && (
                        <p className="text-xs text-red-600 mt-1">
                          {errors["taxpayer.dob"]}
                        </p>
                      )}
                    </label>
                    <label className="lg:col-span-2 text-xs font-medium text-gray-700">
                      Best Contact Number
                      <input
                        className="w-full mt-1 border border-gray-300 rounded px-2 py-1.5"
                        value={formData.taxpayer.contactNumber}
                        onChange={(e) => setTaxpayer("contactNumber", e.target.value)}
                        placeholder="Best Contact Number"
                      />
                      {errors["taxpayer.contactNumber"] && (
                        <p className="text-xs text-red-600 mt-1">
                          {errors["taxpayer.contactNumber"]}
                        </p>
                      )}
                    </label>
                    <div className="lg:col-span-2 text-xs font-medium text-gray-700">
                      Are you a U.S. citizen?
                      <div className="mt-1 flex gap-3">
                        <label className="flex items-center gap-1">
                          <input
                            type="radio"
                            name="taxpayerCitizen"
                            checked={formData.taxpayer.isUsCitizen === "yes"}
                            onChange={() => setTaxpayer("isUsCitizen", "yes")}
                          />
                          Yes
                        </label>
                        <label className="flex items-center gap-1">
                          <input
                            type="radio"
                            name="taxpayerCitizen"
                            checked={formData.taxpayer.isUsCitizen === "no"}
                            onChange={() => setTaxpayer("isUsCitizen", "no")}
                          />
                          No
                        </label>
                      </div>
                    </div>
                  </div>

                  <div className="grid lg:grid-cols-12 gap-2 items-end border border-gray-200 p-2 rounded">
                    <label className="lg:col-span-3 text-xs font-medium text-gray-700">
                      2. Your spouse&apos;s First Name
                      <input
                        className="w-full mt-1 border border-gray-300 rounded px-2 py-1.5"
                        value={formData.spouse.firstName}
                        onChange={(e) => setSpouse("firstName", e.target.value)}
                        placeholder="Your spouse's First Name"
                      />
                    </label>
                    <label className="lg:col-span-1 text-xs font-medium text-gray-700">
                      M.I
                      <input
                        className="w-full mt-1 border border-gray-300 rounded px-2 py-1.5"
                        value={formData.spouseMI}
                        onChange={(e) => setField("spouseMI", e.target.value)}
                        placeholder="M.I"
                      />
                    </label>
                    <label className="lg:col-span-2 text-xs font-medium text-gray-700">
                      Last Name
                      <input
                        className="w-full mt-1 border border-gray-300 rounded px-2 py-1.5"
                        value={formData.spouse.lastName}
                        onChange={(e) => setSpouse("lastName", e.target.value)}
                        placeholder="Last Name"
                      />
                    </label>
                    <label className="lg:col-span-2 text-xs font-medium text-gray-700">
                      Your spouse&apos;s Date of Birth
                      <input
                        type="date"
                        className="w-full mt-1 border border-gray-300 rounded px-2 py-1.5"
                        value={formData.spouse.dob}
                        onChange={(e) => setSpouse("dob", e.target.value)}
                      />
                    </label>
                    <label className="lg:col-span-2 text-xs font-medium text-gray-700">
                      Best Contact Number
                      <input
                        className="w-full mt-1 border border-gray-300 rounded px-2 py-1.5"
                        value={formData.spouse.contactNumber}
                        onChange={(e) => setSpouse("contactNumber", e.target.value)}
                        placeholder="Best Contact Number"
                      />
                    </label>
                    <div className="lg:col-span-2 text-xs font-medium text-gray-700">
                      Is your spouse a U.S. citizen?
                      <div className="mt-1 flex gap-3">
                        <label className="flex items-center gap-1">
                          <input
                            type="radio"
                            name="spouseCitizen"
                            checked={formData.spouse.isUsCitizen === "yes"}
                            onChange={() => setSpouse("isUsCitizen", "yes")}
                          />
                          Yes
                        </label>
                        <label className="flex items-center gap-1">
                          <input
                            type="radio"
                            name="spouseCitizen"
                            checked={formData.spouse.isUsCitizen === "no"}
                            onChange={() => setSpouse("isUsCitizen", "no")}
                          />
                          No
                        </label>
                      </div>
                    </div>
                  </div>

                  <div className="border border-gray-200 p-2 rounded space-y-2">
                    <p className="text-xs font-medium text-gray-700">3. Mailing Address</p>
                    <div className="grid lg:grid-cols-12 gap-2">
                      <input
                        className="lg:col-span-5 border border-gray-300 rounded px-2 py-1.5"
                        value={formData.address1}
                        onChange={(e) => setField("address1", e.target.value)}
                        placeholder="Mailing Address"
                      />
                      <input
                        className="lg:col-span-1 border border-gray-300 rounded px-2 py-1.5"
                        value={formData.aptNumber}
                        onChange={(e) => setField("aptNumber", e.target.value)}
                        placeholder="Apt #"
                      />
                      <input
                        className="lg:col-span-3 border border-gray-300 rounded px-2 py-1.5"
                        value={formData.city}
                        onChange={(e) => setField("city", e.target.value)}
                        placeholder="City"
                      />
                      <input
                        className="lg:col-span-2 border border-gray-300 rounded px-2 py-1.5"
                        value={formData.state}
                        onChange={(e) => setField("state", e.target.value)}
                        placeholder="State"
                      />
                      <input
                        className="lg:col-span-1 border border-gray-300 rounded px-2 py-1.5"
                        value={formData.zipCode}
                        onChange={(e) => setField("zipCode", e.target.value)}
                        placeholder="ZIP"
                      />
                    </div>
                    {(errors.address1 || errors.city || errors.state || errors.zipCode) && (
                      <p className="text-xs text-red-600">
                        Complete mailing address fields.
                      </p>
                    )}
                  </div>

                  <div className="border border-gray-200 p-2 rounded space-y-3">
                    <div className="grid lg:grid-cols-12 gap-2 items-start">
                      <label className="lg:col-span-3 text-xs font-medium text-gray-700">
                        4. Your Job Title
                        <input
                          className="w-full mt-1 border border-gray-300 rounded px-2 py-1.5"
                          value={formData.occupationTaxpayer}
                          onChange={(e) =>
                            setField("occupationTaxpayer", e.target.value)
                          }
                          placeholder="Your Job Title"
                        />
                      </label>
                      <div className="lg:col-span-9 text-xs font-medium text-gray-700">
                        5. Last year, were you:
                        <div className="grid sm:grid-cols-3 gap-3 mt-1">
                          <div>
                            a. Full-time student
                            <div className="flex gap-3 mt-1">
                              <label className="flex items-center gap-1">
                                <input
                                  type="radio"
                                  name="taxpayerStudent"
                                  checked={formData.taxpayerFullTimeStudent === "yes"}
                                  onChange={() =>
                                    setField("taxpayerFullTimeStudent", "yes")
                                  }
                                />
                                Yes
                              </label>
                              <label className="flex items-center gap-1">
                                <input
                                  type="radio"
                                  name="taxpayerStudent"
                                  checked={formData.taxpayerFullTimeStudent === "no"}
                                  onChange={() =>
                                    setField("taxpayerFullTimeStudent", "no")
                                  }
                                />
                                No
                              </label>
                            </div>
                          </div>
                          <div>
                            b. Totally and Permanently disabled
                            <div className="flex gap-3 mt-1">
                              <label className="flex items-center gap-1">
                                <input
                                  type="radio"
                                  name="taxpayerDisabled"
                                  checked={formData.taxpayerDisabled === "yes"}
                                  onChange={() => setField("taxpayerDisabled", "yes")}
                                />
                                Yes
                              </label>
                              <label className="flex items-center gap-1">
                                <input
                                  type="radio"
                                  name="taxpayerDisabled"
                                  checked={formData.taxpayerDisabled === "no"}
                                  onChange={() => setField("taxpayerDisabled", "no")}
                                />
                                No
                              </label>
                            </div>
                          </div>
                          <div>
                            c. Legally Blind
                            <div className="flex gap-3 mt-1">
                              <label className="flex items-center gap-1">
                                <input
                                  type="radio"
                                  name="taxpayerBlind"
                                  checked={formData.taxpayerBlind === "yes"}
                                  onChange={() => setField("taxpayerBlind", "yes")}
                                />
                                Yes
                              </label>
                              <label className="flex items-center gap-1">
                                <input
                                  type="radio"
                                  name="taxpayerBlind"
                                  checked={formData.taxpayerBlind === "no"}
                                  onChange={() => setField("taxpayerBlind", "no")}
                                />
                                No
                              </label>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="grid lg:grid-cols-12 gap-2 items-start">
                      <label className="lg:col-span-3 text-xs font-medium text-gray-700">
                        6. Your spouse&apos;s Job Title
                        <input
                          className="w-full mt-1 border border-gray-300 rounded px-2 py-1.5"
                          value={formData.occupationSpouse}
                          onChange={(e) => setField("occupationSpouse", e.target.value)}
                          placeholder="Your spouse's Job Title"
                        />
                      </label>
                      <div className="lg:col-span-9 text-xs font-medium text-gray-700">
                        7. Last year, was your spouse:
                        <div className="grid sm:grid-cols-3 gap-3 mt-1">
                          <div>
                            a. Full-time student
                            <div className="flex gap-3 mt-1">
                              <label className="flex items-center gap-1">
                                <input
                                  type="radio"
                                  name="spouseStudent"
                                  checked={formData.spouseFullTimeStudent === "yes"}
                                  onChange={() =>
                                    setField("spouseFullTimeStudent", "yes")
                                  }
                                />
                                Yes
                              </label>
                              <label className="flex items-center gap-1">
                                <input
                                  type="radio"
                                  name="spouseStudent"
                                  checked={formData.spouseFullTimeStudent === "no"}
                                  onChange={() =>
                                    setField("spouseFullTimeStudent", "no")
                                  }
                                />
                                No
                              </label>
                            </div>
                          </div>
                          <div>
                            b. Totally and Permanently disabled
                            <div className="flex gap-3 mt-1">
                              <label className="flex items-center gap-1">
                                <input
                                  type="radio"
                                  name="spouseDisabled"
                                  checked={formData.spouseDisabled === "yes"}
                                  onChange={() => setField("spouseDisabled", "yes")}
                                />
                                Yes
                              </label>
                              <label className="flex items-center gap-1">
                                <input
                                  type="radio"
                                  name="spouseDisabled"
                                  checked={formData.spouseDisabled === "no"}
                                  onChange={() => setField("spouseDisabled", "no")}
                                />
                                No
                              </label>
                            </div>
                          </div>
                          <div>
                            c. Legally Blind
                            <div className="flex gap-3 mt-1">
                              <label className="flex items-center gap-1">
                                <input
                                  type="radio"
                                  name="spouseBlind"
                                  checked={formData.spouseBlind === "yes"}
                                  onChange={() => setField("spouseBlind", "yes")}
                                />
                                Yes
                              </label>
                              <label className="flex items-center gap-1">
                                <input
                                  type="radio"
                                  name="spouseBlind"
                                  checked={formData.spouseBlind === "no"}
                                  onChange={() => setField("spouseBlind", "no")}
                                />
                                No
                              </label>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="grid md:grid-cols-2 gap-3 pt-1">
                      <div className="text-xs font-medium text-gray-700">
                        8. Can anyone claim you or your spouse as a dependent?
                        <div className="mt-1 flex gap-4">
                          <label className="flex items-center gap-1">
                            <input
                              type="radio"
                              name="dependentClaim"
                              checked={formData.dependentClaim === "yes"}
                              onChange={() => setField("dependentClaim", "yes")}
                            />
                            Yes
                          </label>
                          <label className="flex items-center gap-1">
                            <input
                              type="radio"
                              name="dependentClaim"
                              checked={formData.dependentClaim === "no"}
                              onChange={() => setField("dependentClaim", "no")}
                            />
                            No
                          </label>
                          <label className="flex items-center gap-1">
                            <input
                              type="radio"
                              name="dependentClaim"
                              checked={formData.dependentClaim === "unsure"}
                              onChange={() => setField("dependentClaim", "unsure")}
                            />
                            Unsure
                          </label>
                        </div>
                      </div>
                      <div className="text-xs font-medium text-gray-700">
                        9. Have you or your spouse been issued an Identity Protection PIN?
                        <div className="mt-1 flex gap-4">
                          <label className="flex items-center gap-1">
                            <input
                              type="radio"
                              name="identityPin"
                              checked={formData.identityPinVictim === "yes"}
                              onChange={() => setField("identityPinVictim", "yes")}
                            />
                            Yes
                          </label>
                          <label className="flex items-center gap-1">
                            <input
                              type="radio"
                              name="identityPin"
                              checked={formData.identityPinVictim === "no"}
                              onChange={() => setField("identityPinVictim", "no")}
                            />
                            No
                          </label>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="border border-gray-200 p-2 rounded flex flex-col sm:flex-row sm:items-center gap-2">
                    <label className="text-xs font-medium text-gray-700 flex-1">
                      10. Provide an email address (optional) (this email address will not
                      be used for contacts from the Internal Revenue Service)
                      <input
                        className="w-full mt-1 border border-gray-300 rounded px-2 py-1.5"
                        value={formData.optionalIrsEmail}
                        onChange={(e) => setField("optionalIrsEmail", e.target.value)}
                        placeholder="Provide an email address (optional)"
                      />
                    </label>
                    <button
                      type="button"
                      className="self-end sm:self-auto bg-[#9ca3af] text-white px-8 py-2 rounded text-xs"
                    >
                      Save
                    </button>
                  </div>
                </section>

                <section className="bg-white border border-gray-300 rounded p-4 space-y-3">
                  <h3 className="text-sm sm:text-base font-bold text-[#1f2937]">
                    PART II - Marital Status and Household Information
                  </h3>
                  <div className="border border-gray-200 rounded p-3 space-y-3 text-sm">
                    <div className="grid lg:grid-cols-12 gap-3">
                      <div className="lg:col-span-4 space-y-2">
                        <p className="font-medium text-gray-800">
                          1. As of December 31, {formData.taxYear}, what was your marital
                          status?
                        </p>
                        {[
                          ["never_married", "Never Married"],
                          ["married", "Married"],
                          ["divorced", "Divorced"],
                          ["legally_separated", "Legally Separated"],
                          ["widowed", "Widowed"],
                        ].map(([value, label]) => (
                          <label key={value} className="flex items-center gap-2">
                            <input
                              type="radio"
                              name="maritalStatus"
                              checked={formData.maritalStatus === value}
                              onChange={() =>
                                setField(
                                  "maritalStatus",
                                  value as OrganizerFormState["maritalStatus"],
                                )
                              }
                            />
                            {label}
                          </label>
                        ))}
                      </div>
                      <div className="lg:col-span-8 space-y-3">
                        <p className="text-gray-700">
                          (This includes registered domestic partnerships, civil unions,
                          or other formal relationships under state law)
                        </p>
                        <div>
                          <p className="font-medium text-gray-800">
                            a. If Yes, did you get married in {formData.taxYear}?
                          </p>
                          <div className="mt-1 flex gap-4">
                            <label className="flex items-center gap-1">
                              <input
                                type="radio"
                                name="gotMarriedInTaxYear"
                                checked={formData.gotMarriedInTaxYear === "yes"}
                                onChange={() => setField("gotMarriedInTaxYear", "yes")}
                              />
                              Yes
                            </label>
                            <label className="flex items-center gap-1">
                              <input
                                type="radio"
                                name="gotMarriedInTaxYear"
                                checked={formData.gotMarriedInTaxYear === "no"}
                                onChange={() => setField("gotMarriedInTaxYear", "no")}
                              />
                              No
                            </label>
                          </div>
                        </div>
                        <div>
                          <p className="font-medium text-gray-800">
                            b. Did you live with your spouse during any part of the last
                            six months of {formData.taxYear}?
                          </p>
                          <div className="mt-1 flex gap-4">
                            <label className="flex items-center gap-1">
                              <input
                                type="radio"
                                name="livedWithSpouseLastSixMonths"
                                checked={formData.livedWithSpouseLastSixMonths === "yes"}
                                onChange={() =>
                                  setField("livedWithSpouseLastSixMonths", "yes")
                                }
                              />
                              Yes
                            </label>
                            <label className="flex items-center gap-1">
                              <input
                                type="radio"
                                name="livedWithSpouseLastSixMonths"
                                checked={formData.livedWithSpouseLastSixMonths === "no"}
                                onChange={() =>
                                  setField("livedWithSpouseLastSixMonths", "no")
                                }
                              />
                              No
                            </label>
                          </div>
                        </div>
                        <div className="grid sm:grid-cols-3 gap-2">
                          <input
                            className="border border-gray-300 rounded px-2 py-1.5"
                            value={formData.finalDecreeDate}
                            onChange={(e) => setField("finalDecreeDate", e.target.value)}
                            placeholder="Date of final decree"
                          />
                          <input
                            className="border border-gray-300 rounded px-2 py-1.5"
                            value={formData.separateMaintenanceDecreeDate}
                            onChange={(e) =>
                              setField("separateMaintenanceDecreeDate", e.target.value)
                            }
                            placeholder="Date of separate maintenance decree"
                          />
                          <input
                            className="border border-gray-300 rounded px-2 py-1.5"
                            value={formData.spouseDeathYear}
                            onChange={(e) => setField("spouseDeathYear", e.target.value)}
                            placeholder="Year of spouse's death"
                          />
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="border-t border-gray-300 pt-3 text-sm space-y-2">
                    <p className="font-medium text-gray-800">2. List the names below of:</p>
                    <ul className="list-disc pl-5 text-gray-700 space-y-1">
                      <li>everyone who lived with you last year (other than your spouse)</li>
                      <li>
                        anyone you supported but did not live with you last year
                      </li>
                    </ul>
                  </div>

                  <div className="overflow-x-auto border border-gray-200 rounded">
                    <table className="w-full min-w-[1800px] text-xs">
                      <thead className="bg-[#f8fafc]">
                        <tr>
                          <th className="text-left p-2 border-r">
                            Name (first, last) Do not enter your name or spouse&apos;s
                            name below
                          </th>
                          <th className="text-left p-2 border-r">Date of Birth (mm/dd/yy)</th>
                          <th className="text-left p-2 border-r">
                            Relationship to you (for example: son, daughter, parent, none,
                            etc)
                          </th>
                          <th className="text-left p-2 border-r">
                            Number of months lived in your home last year
                          </th>
                          <th className="text-left p-2 border-r">US Citizen (yes/no)</th>
                          <th className="text-left p-2 border-r">
                            Resident of US, Canada, or Mexico last year (yes/no)
                          </th>
                          <th className="text-left p-2 border-r">
                            Single or Married as of December 31 last year (S/M)
                          </th>
                          <th className="text-left p-2 border-r">
                            Full-time Student last year (yes/no)
                          </th>
                          <th className="text-left p-2 border-r">
                            Totally and Permanently Disabled (yes/no)
                          </th>
                          <th className="text-left p-2 border-r bg-[#f5e6e8] font-semibold" colSpan={5}>
                            To be completed by a Tax Pro
                          </th>
                        </tr>
                        <tr className="bg-[#f5e6e8]">
                          <th className="p-1 border-r" colSpan={9}></th>
                          <th className="text-left p-1 border-r">
                            Is this person a qualifying child/relative of any other person?
                            (yes/no)
                          </th>
                          <th className="text-left p-1 border-r">
                            Did this person provide more than 50% of own support? (yes/no)
                          </th>
                          <th className="text-left p-1 border-r">
                            Did this person have less than $4,700 of income? (yes/no/n/a)
                          </th>
                          <th className="text-left p-1 border-r">
                            Did the taxpayer(s) provide more than 50% of support for this
                            person? (yes/no/n/a)
                          </th>
                          <th className="text-left p-1">
                            Did the taxpayer(s) pay more than half the cost of maintaining a
                            home for this person? (yes/no)
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {householdMembers.map((member, index) => (
                          <tr key={index} className="border-t">
                            <td className="p-1 border-r">
                              <div className="grid grid-cols-2 gap-1">
                                <input
                                  className="w-full border border-gray-300 rounded px-2 py-1"
                                  value={member.firstName}
                                  onChange={(e) =>
                                    updateMember(index, "firstName", e.target.value)
                                  }
                                  placeholder="First"
                                />
                                <input
                                  className="w-full border border-gray-300 rounded px-2 py-1"
                                  value={member.lastName}
                                  onChange={(e) =>
                                    updateMember(index, "lastName", e.target.value)
                                  }
                                  placeholder="Last"
                                />
                              </div>
                            </td>
                            <td className="p-1 border-r">
                              <input
                                type="date"
                                className="w-full border border-gray-300 rounded px-2 py-1"
                                value={member.dob}
                                onChange={(e) => updateMember(index, "dob", e.target.value)}
                              />
                            </td>
                            <td className="p-1 border-r">
                              <input
                                className="w-full border border-gray-300 rounded px-2 py-1"
                                value={member.relationship}
                                onChange={(e) =>
                                  updateMember(index, "relationship", e.target.value)
                                }
                                placeholder="e.g. son, daughter"
                              />
                            </td>
                            <td className="p-1 border-r">
                              <input
                                className="w-full border border-gray-300 rounded px-2 py-1"
                                value={member.monthsLived}
                                onChange={(e) =>
                                  updateMember(index, "monthsLived", e.target.value)
                                }
                                placeholder="0-12"
                              />
                            </td>
                            <td className="p-1 border-r">
                              <div className="flex gap-2">
                                <label className="flex items-center gap-1">
                                  <input
                                    type="radio"
                                    name={`usCitizen-${index}`}
                                    checked={member.usCitizen === "yes"}
                                    onChange={() =>
                                      updateMember(index, "usCitizen", "yes")
                                    }
                                  />
                                  Y
                                </label>
                                <label className="flex items-center gap-1">
                                  <input
                                    type="radio"
                                    name={`usCitizen-${index}`}
                                    checked={member.usCitizen === "no"}
                                    onChange={() => updateMember(index, "usCitizen", "no")}
                                  />
                                  N
                                </label>
                              </div>
                            </td>
                            <td className="p-1 border-r">
                              <div className="flex gap-2">
                                <label className="flex items-center gap-1">
                                  <input
                                    type="radio"
                                    name={`resident-${index}`}
                                    checked={member.residentUsCanadaMexico === "yes"}
                                    onChange={() =>
                                      updateMember(index, "residentUsCanadaMexico", "yes")
                                    }
                                  />
                                  Y
                                </label>
                                <label className="flex items-center gap-1">
                                  <input
                                    type="radio"
                                    name={`resident-${index}`}
                                    checked={member.residentUsCanadaMexico === "no"}
                                    onChange={() =>
                                      updateMember(index, "residentUsCanadaMexico", "no")
                                    }
                                  />
                                  N
                                </label>
                              </div>
                            </td>
                            <td className="p-1 border-r">
                              <select
                                className="w-full border border-gray-300 rounded px-2 py-1"
                                value={member.unmarriedAsDec31}
                                onChange={(e) =>
                                  updateMember(
                                    index,
                                    "unmarriedAsDec31",
                                    e.target.value as HouseholdMember["unmarriedAsDec31"],
                                  )
                                }
                              >
                                <option value="">S/M</option>
                                <option value="single">Single</option>
                                <option value="married">Married</option>
                              </select>
                            </td>
                            <td className="p-1 border-r">
                              <div className="flex gap-2">
                                <label className="flex items-center gap-1">
                                  <input
                                    type="radio"
                                    name={`student-${index}`}
                                    checked={member.fullTimeStudent === "yes"}
                                    onChange={() =>
                                      updateMember(index, "fullTimeStudent", "yes")
                                    }
                                  />
                                  Y
                                </label>
                                <label className="flex items-center gap-1">
                                  <input
                                    type="radio"
                                    name={`student-${index}`}
                                    checked={member.fullTimeStudent === "no"}
                                    onChange={() =>
                                      updateMember(index, "fullTimeStudent", "no")
                                    }
                                  />
                                  N
                                </label>
                              </div>
                            </td>
                            <td className="p-1 border-r">
                              <div className="flex gap-2">
                                <label className="flex items-center gap-1">
                                  <input
                                    type="radio"
                                    name={`disabled-${index}`}
                                    checked={member.disabled === "yes"}
                                    onChange={() =>
                                      updateMember(index, "disabled", "yes")
                                    }
                                  />
                                  Y
                                </label>
                                <label className="flex items-center gap-1">
                                  <input
                                    type="radio"
                                    name={`disabled-${index}`}
                                    checked={member.disabled === "no"}
                                    onChange={() =>
                                      updateMember(index, "disabled", "no")
                                    }
                                  />
                                  N
                                </label>
                              </div>
                            </td>
                            {[
                              ["qualifiesAsChildRelative", member.qualifiesAsChildRelative],
                              ["providedMoreThan50Support", member.providedMoreThan50Support],
                              ["childIncomeOver4700", member.childIncomeOver4700],
                              [
                                "taxpayerProvidedMoreThan50",
                                member.taxpayerProvidedMoreThan50,
                              ],
                              [
                                "taxpayerPaidMoreThanHalfHome",
                                member.taxpayerPaidMoreThanHalfHome,
                              ],
                            ].map(([key, value]) => (
                              <td key={key} className="p-1 border-r last:border-r-0 bg-[#fdf5f6]">
                                <div className="flex gap-2">
                                  <label className="flex items-center gap-1">
                                    <input
                                      type="radio"
                                      name={`${key}-${index}`}
                                      checked={value === "yes"}
                                      onChange={() =>
                                        updateMember(
                                          index,
                                          key as keyof HouseholdMember,
                                          "yes",
                                        )
                                      }
                                    />
                                    Y
                                  </label>
                                  <label className="flex items-center gap-1">
                                    <input
                                      type="radio"
                                      name={`${key}-${index}`}
                                      checked={value === "no"}
                                      onChange={() =>
                                        updateMember(
                                          index,
                                          key as keyof HouseholdMember,
                                          "no",
                                        )
                                      }
                                    />
                                    N
                                  </label>
                                </div>
                              </td>
                            ))}
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                  <button
                    type="button"
                    onClick={addMember}
                    className="inline-flex items-center gap-2 text-[#0b5ea8] text-sm font-semibold"
                  >
                    <Plus className="w-4 h-4" />
                    Add Member
                  </button>
                  <div className="flex justify-end">
                    <button
                      type="button"
                      className="bg-[#9ca3af] text-white px-8 py-2 rounded text-sm"
                    >
                      Save
                    </button>
                  </div>
                </section>

                {renderIncomeSection()}
                {renderExpenseSection()}
                {renderLifeEventsSection()}

                <section className="bg-white border border-gray-300 rounded p-2 sm:p-3 text-xs sm:text-sm">
                  <h3 className="font-bold text-[#1f2937] border-b border-gray-300 pb-1">
                    Additional Information and Questions Related to the Preparation of
                    Your Return
                  </h3>
                  <div className="space-y-3 pt-2">
                    <div className="grid lg:grid-cols-12 gap-2 items-center">
                      <p className="lg:col-span-6">
                        1. Would you like to receive written communications from the IRS in
                        a language other than English?
                      </p>
                      <div className="lg:col-span-2 flex gap-4">
                        <label><input type="checkbox" className="mr-1" />Yes</label>
                        <label><input type="checkbox" className="mr-1" />No</label>
                      </div>
                      <label className="lg:col-span-4">
                        If yes, which language?
                        <input className="ml-2 border border-gray-300 rounded px-2 py-1 w-24" placeholder="Language" />
                      </label>
                    </div>

                    <div className="grid lg:grid-cols-12 gap-2 items-center">
                      <p className="lg:col-span-9">
                        2. Presidential Election Campaign Fund (if you check a box, your tax
                        or refund will not change)
                      </p>
                      <div className="lg:col-span-3 flex flex-wrap gap-3">
                        <label><input type="checkbox" className="mr-1" />You</label>
                        <label><input type="checkbox" className="mr-1" />Spouse</label>
                      </div>
                    </div>

                    <div className="space-y-1">
                      <p>3. If you are due a refund, would you:</p>
                      <div className="grid md:grid-cols-3 gap-2">
                        <div>
                          <p>a. Direct deposit</p>
                          <label className="mr-3"><input type="checkbox" className="mr-1" />Yes</label>
                          <label><input type="checkbox" className="mr-1" />No</label>
                        </div>
                        <div>
                          <p>b. To purchase U.S. Savings Bonds</p>
                          <label className="mr-3"><input type="checkbox" className="mr-1" />Yes</label>
                          <label><input type="checkbox" className="mr-1" />No</label>
                        </div>
                        <div>
                          <p>c. To split your refund between different accounts</p>
                          <label className="mr-3"><input type="checkbox" className="mr-1" />Yes</label>
                          <label><input type="checkbox" className="mr-1" />No</label>
                        </div>
                      </div>
                    </div>

                    <p>4. If you have a balance due, would you like to make a payment directly from your bank account?
                      <label className="ml-3 mr-3"><input type="checkbox" className="mr-1" />Yes</label>
                      <label><input type="checkbox" className="mr-1" />No</label>
                    </p>
                    <p>5. Did you live in an area that was declared a Federal disaster area?
                      <label className="ml-3 mr-3"><input type="checkbox" className="mr-1" />Yes</label>
                      <label><input type="checkbox" className="mr-1" />No</label>
                      <span className="ml-6">If yes, where?</span>
                      <input className="ml-2 border border-gray-300 rounded px-2 py-1 w-24" placeholder="Name" />
                    </p>
                    <p>6. Did you, or your spouse if filing jointly, receive a letter from the IRS?
                      <label className="ml-3 mr-3"><input type="checkbox" className="mr-1" />Yes</label>
                      <label><input type="checkbox" className="mr-1" />No</label>
                    </p>
                    <p>7. Would you like information on how to vote and/or how to register to vote?
                      <label className="ml-3 mr-3"><input type="checkbox" className="mr-1" />Yes</label>
                      <label><input type="checkbox" className="mr-1" />No</label>
                    </p>
                  </div>
                  <div className="flex justify-end mt-2">
                    <button type="button" className="text-xs bg-[#0b5ea8] text-white px-8 py-2 rounded">Save</button>
                  </div>
                </section>

                <section className="bg-white border border-gray-300 rounded p-2 sm:p-3 text-xs sm:text-sm">
                  <p className="font-bold text-[#1f2937]">
                    Your answers will be used only for statistical purposes. These
                    questions are optional. Feel free to skip or opt out.
                  </p>
                  <div className="space-y-3 mt-2">
                    <p>8. Would you say you can carry on a conversation in English, both understanding &amp; speaking?
                      <label className="ml-3"><input type="checkbox" className="mr-1" />Very Well</label>
                      <label className="ml-3"><input type="checkbox" className="mr-1" />Well</label>
                      <label className="ml-3"><input type="checkbox" className="mr-1" />Not Well</label>
                      <label className="ml-3"><input type="checkbox" className="mr-1" />Not at all</label>
                      <label className="ml-3"><input type="checkbox" className="mr-1" />Prefer not to answer</label>
                    </p>
                    <p>9. Would you say you can read a newspaper or book in English?
                      <label className="ml-3"><input type="checkbox" className="mr-1" />Very Well</label>
                      <label className="ml-3"><input type="checkbox" className="mr-1" />Well</label>
                      <label className="ml-3"><input type="checkbox" className="mr-1" />Not Well</label>
                      <label className="ml-3"><input type="checkbox" className="mr-1" />Not at all</label>
                      <label className="ml-3"><input type="checkbox" className="mr-1" />Prefer not to answer</label>
                    </p>
                    <p>10. Do you or any member of your household have a disability?
                      <label className="ml-3"><input type="checkbox" className="mr-1" />Yes</label>
                      <label className="ml-3"><input type="checkbox" className="mr-1" />No</label>
                      <label className="ml-3"><input type="checkbox" className="mr-1" />Prefer not to answer</label>
                    </p>
                    <p>11. Are you or your spouse a Veteran from the U.S. Armed Forces?
                      <label className="ml-3"><input type="checkbox" className="mr-1" />Yes</label>
                      <label className="ml-3"><input type="checkbox" className="mr-1" />No</label>
                      <label className="ml-3"><input type="checkbox" className="mr-1" />Prefer not to answer</label>
                    </p>
                    <p>12. Your race?
                      <label className="ml-3"><input type="checkbox" className="mr-1" />American Indian or Alaska Native</label>
                      <label className="ml-3"><input type="checkbox" className="mr-1" />Asian</label>
                      <label className="ml-3"><input type="checkbox" className="mr-1" />Black or African American</label>
                      <label className="ml-3"><input type="checkbox" className="mr-1" />Native Hawaiian or other Pacific Islander</label>
                      <label className="ml-3"><input type="checkbox" className="mr-1" />White</label>
                      <label className="ml-3"><input type="checkbox" className="mr-1" />Prefer not to answer</label>
                    </p>
                    <p>13. Your spouse&apos;s race?
                      <label className="ml-3"><input type="checkbox" className="mr-1" />American Indian or Alaska Native</label>
                      <label className="ml-3"><input type="checkbox" className="mr-1" />Asian</label>
                      <label className="ml-3"><input type="checkbox" className="mr-1" />Black or African American</label>
                      <label className="ml-3"><input type="checkbox" className="mr-1" />Native Hawaiian or other Pacific Islander</label>
                      <label className="ml-3"><input type="checkbox" className="mr-1" />White</label>
                      <label className="ml-3"><input type="checkbox" className="mr-1" />Prefer not to answer</label>
                      <label className="ml-3"><input type="checkbox" className="mr-1" />No spouse</label>
                    </p>
                    <p>14. Your ethnicity?
                      <label className="ml-3"><input type="checkbox" className="mr-1" />Hispanic or Latino</label>
                      <label className="ml-3"><input type="checkbox" className="mr-1" />Not Hispanic or Latino</label>
                      <label className="ml-3"><input type="checkbox" className="mr-1" />Prefer not to answer</label>
                    </p>
                    <p>15. Your spouse&apos;s ethnicity?
                      <label className="ml-3"><input type="checkbox" className="mr-1" />Hispanic or Latino</label>
                      <label className="ml-3"><input type="checkbox" className="mr-1" />Not Hispanic or Latino</label>
                      <label className="ml-3"><input type="checkbox" className="mr-1" />Prefer not to answer</label>
                      <label className="ml-3"><input type="checkbox" className="mr-1" />No spouse</label>
                    </p>
                  </div>
                  <div className="flex justify-end mt-2">
                    <button type="button" className="text-xs bg-[#0b5ea8] text-white px-8 py-2 rounded">Save</button>
                  </div>
                </section>

                <section className="bg-white border border-gray-300 rounded p-3 sm:p-4 text-xs sm:text-sm text-gray-800 space-y-3">
                  <h3 className="font-bold text-gray-900">Federal Disclosure:</h3>
                  <p>
                    Federal law requires this consent form be provided to you. Unless
                    authorized by law, we cannot disclose your tax return information to
                    third parties for purposes other than the preparation and filing of
                    your tax return without your consent.
                  </p>
                  <p>
                    If you consent to the disclosure of your tax return information,
                    Federal law may not protect your tax return information from further
                    use or distribution.
                  </p>
                  <p>
                    You are not required to complete this form to engage the tax return
                    preparation services. If we obtain your signature on this form, by
                    conditioning your tax return preparation services on your consent,
                    your consent will not be valid.
                  </p>
                  <p>
                    If you agree to the disclosure of your tax return information, your
                    consent is valid for the amount of time that you specify. If you do
                    not specify the duration of your consent, your consent is valid for
                    one year from the date of signature.
                  </p>

                  <h4 className="font-bold text-gray-900 pt-2">Terms:</h4>
                  <p>
                    Global Carry Forward of data allows Clicflo.com (software provider)
                    to make your tax return information available to participating tax
                    professionals or volunteer sites when you choose to prepare a return.
                    This lets you visit any tax professional or volunteer site and have
                    your return populated with your current year data.
                  </p>
                  <p>
                    The tax return information disclosed may include demographic and
                    personally identifiable information about you, your tax return, your
                    sources of income, filing status, occupation, and credits/deductions.
                    It may also include dependent names, SSNs, dates of birth, and
                    relationship details as needed on the return.
                  </p>
                  <p>
                    You do not need to provide consent for the current preparer to
                    prepare this year&apos;s return. Global Carry Forward assists you if
                    you visit a different professional/volunteer next year.
                  </p>

                  <p>
                    <span className="font-bold">Limitation on the Duration of Consent:</span>{" "}
                    I/we, the taxpayer, do not wish to limit the duration of consent
                    earlier than presented above. If I/we wish to limit the duration
                    earlier, I/we will deny consent.
                  </p>
                  <p>
                    <span className="font-bold">Limitation on the Scope of Disclosure:</span>{" "}
                    I/we, the taxpayer, do not wish to limit the scope of disclosure
                    further than presented above. If I/we wish to limit scope further,
                    I/we will deny consent.
                  </p>

                  <div className="pt-1">
                    <p className="font-bold text-gray-900">Consent:</p>
                    <p>I/we, the taxpayer, have read the above information.</p>
                    <p>
                      I/we hereby consent to the disclosure of tax return information
                      described above and allow the tax return preparer to enter a PIN in
                      the tax software to verify consent.
                    </p>
                  </div>

                  <div className="border-t border-gray-300 pt-2 space-y-2">
                    <div className="grid sm:grid-cols-2 gap-3 items-end">
                      <div>
                        <label className="text-xs text-gray-700 block mb-1">
                          Primary taxpayer printed name and signature
                        </label>
                        <div className="flex items-center gap-2">
                          <div className="h-10 w-16 border border-red-500 bg-white" />
                          <input
                            className="flex-1 border border-gray-300 rounded px-3 py-2"
                            value={formData.taxpayerSignature}
                            onChange={(e) =>
                              setField("taxpayerSignature", e.target.value)
                            }
                            placeholder="Click here for sign"
                          />
                        </div>
                        {errors.taxpayerSignature && (
                          <p className="text-xs text-red-600 mt-1">
                            {errors.taxpayerSignature}
                          </p>
                        )}
                      </div>
                      <div>
                        <label className="text-xs text-gray-700 block mb-1">Date</label>
                        <input
                          className="w-full border border-gray-300 rounded px-3 py-2"
                          value={formData.signedDate}
                          onChange={(e) => setField("signedDate", e.target.value)}
                          placeholder="Type here..."
                        />
                        {errors.signedDate && (
                          <p className="text-xs text-red-600 mt-1">{errors.signedDate}</p>
                        )}
                      </div>
                    </div>

                    <div className="grid sm:grid-cols-2 gap-3 items-end">
                      <div>
                        <label className="text-xs text-gray-700 block mb-1">
                          Secondary taxpayer printed name and signature
                        </label>
                        <div className="flex items-center gap-2">
                          <div className="h-10 w-16 border border-red-500 bg-white" />
                          <input
                            className="flex-1 border border-gray-300 rounded px-3 py-2"
                            value={formData.spouseSignature}
                            onChange={(e) => setField("spouseSignature", e.target.value)}
                            placeholder="Click here for sign"
                          />
                        </div>
                      </div>
                      <div>
                        <label className="text-xs text-gray-700 block mb-1">Date</label>
                        <input
                          className="w-full border border-gray-300 rounded px-3 py-2"
                          value={formData.spouseSignedDate}
                          onChange={(e) => setField("spouseSignedDate", e.target.value)}
                          placeholder="Type here..."
                        />
                      </div>
                    </div>
                  </div>

                  <p className="text-[11px] text-gray-700 border-t border-gray-200 pt-2">
                    If you believe your tax return information has been disclosed or used
                    improperly, you may contact TIGTA at 1-800-366-4484.
                  </p>
                </section>

                <div className="pb-2 flex justify-end">
                  <button
                    type="submit"
                    className="px-8 py-2.5 rounded bg-[#4b5563] text-white hover:bg-[#374151] transition-colors"
                  >
                    Submit
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

export default IRSClientOrganizerForm;
