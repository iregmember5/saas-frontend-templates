import { useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { X } from "lucide-react";

type ProductId = "tshirt" | "sweatshirt" | "shoes";

interface ProductDefinition {
  id: ProductId;
  name: string;
  price: number;
  imageSrc: string;
  colorOptions: string[];
  sizeLabel: string;
  sizes: string[];
}

interface ProductState {
  selected: boolean;
  quantity: string;
  color: string;
  size: string;
}

interface OrderTemplateFormProps {
  isOpen: boolean;
  onClose: () => void;
}

interface CustomerState {
  firstName: string;
  lastName: string;
  email: string;
  contactNumber: string;
  streetAddress: string;
  streetAddress2: string;
  city: string;
  state: string;
  country: string;
  postalCode: string;
  shippingSameAsBilling: "" | "yes" | "no";
  sendGift: "" | "yes" | "no";
  specialInstructions: string;
  paymentMethod: "" | "card" | "paypal";
}

const toSvgDataUri = (content: string) =>
  `data:image/svg+xml;utf8,${encodeURIComponent(
    `<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 260 180'>${content}</svg>`,
  )}`;

const PRODUCT_IMAGES: Record<ProductId, string> = {
  tshirt: toSvgDataUri(`
    <defs>
      <linearGradient id='bg' x1='0' y1='0' x2='1' y2='1'>
        <stop offset='0%' stop-color='#f0fdf4'/>
        <stop offset='100%' stop-color='#dcfce7'/>
      </linearGradient>
    </defs>
    <rect width='260' height='180' fill='url(#bg)'/>
    <path d='M89 28 L66 45 L46 39 L33 67 L58 82 L70 73 L76 148 L184 148 L190 73 L202 82 L227 67 L214 39 L194 45 L171 28 Z' fill='#ffffff' stroke='#059669' stroke-width='4'/>
    <circle cx='130' cy='38' r='10' fill='none' stroke='#059669' stroke-width='4'/>
    <path d='M112 92 H148' stroke='#d1fae5' stroke-width='3'/>
    <path d='M112 102 H148' stroke='#d1fae5' stroke-width='3'/>
  `),
  sweatshirt: toSvgDataUri(`
    <defs>
      <linearGradient id='bg' x1='0' y1='0' x2='1' y2='1'>
        <stop offset='0%' stop-color='#ecfeff'/>
        <stop offset='100%' stop-color='#dbeafe'/>
      </linearGradient>
    </defs>
    <rect width='260' height='180' fill='url(#bg)'/>
    <path d='M83 34 L64 48 L46 43 L34 70 L57 84 L70 74 L78 148 L182 148 L190 74 L203 84 L226 70 L214 43 L196 48 L177 34 Z' fill='#ffffff' stroke='#0891b2' stroke-width='4'/>
    <ellipse cx='100' cy='82' rx='15' ry='10' fill='#34d399'/>
    <ellipse cx='120' cy='74' rx='18' ry='12' fill='#10b981'/>
    <ellipse cx='146' cy='92' rx='16' ry='11' fill='#34d399'/>
    <ellipse cx='164' cy='80' rx='13' ry='9' fill='#10b981'/>
  `),
  shoes: toSvgDataUri(`
    <defs>
      <linearGradient id='bg' x1='0' y1='0' x2='1' y2='1'>
        <stop offset='0%' stop-color='#f0f9ff'/>
        <stop offset='100%' stop-color='#cffafe'/>
      </linearGradient>
      <linearGradient id='shoe' x1='0' y1='0' x2='1' y2='1'>
        <stop offset='0%' stop-color='#14b8a6'/>
        <stop offset='100%' stop-color='#0891b2'/>
      </linearGradient>
    </defs>
    <rect width='260' height='180' fill='url(#bg)'/>
    <path d='M44 112 C73 111, 86 104, 101 86 L140 86 L164 100 C172 104, 184 108, 204 109 L225 111 L225 132 L44 132 Z' fill='url(#shoe)' stroke='#0f172a' stroke-width='3'/>
    <path d='M101 86 L126 86 L126 112 L90 112 Z' fill='#e2e8f0'/>
    <path d='M58 124 H204' stroke='#ffffff' stroke-width='3'/>
    <path d='M148 99 H174 M144 106 H170' stroke='#ecfeff' stroke-width='3'/>
  `),
};

const PRODUCT_DEFINITIONS: ProductDefinition[] = [
  {
    id: "tshirt",
    name: "T-Shirt",
    price: 1,
    imageSrc: PRODUCT_IMAGES.tshirt,
    colorOptions: ["Green", "White", "Black"],
    sizeLabel: "T-Shirt Size",
    sizes: ["XS", "S", "M", "L", "XL"],
  },
  {
    id: "sweatshirt",
    name: "Sweatshirt",
    price: 5,
    imageSrc: PRODUCT_IMAGES.sweatshirt,
    colorOptions: ["Green", "White", "Gray"],
    sizeLabel: "Sweatshirt Size",
    sizes: ["XS", "S", "M", "L", "XL"],
  },
  {
    id: "shoes",
    name: "Shoes",
    price: 10,
    imageSrc: PRODUCT_IMAGES.shoes,
    colorOptions: ["Teal", "White", "Black"],
    sizeLabel: "Shoe Size",
    sizes: ["6", "7", "8", "9", "10", "11", "12"],
  },
];

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

const getDefaultProducts = (): Record<ProductId, ProductState> => ({
  tshirt: {
    selected: false,
    quantity: "1",
    color: "Green",
    size: "XS",
  },
  sweatshirt: {
    selected: false,
    quantity: "1",
    color: "Green",
    size: "XS",
  },
  shoes: {
    selected: false,
    quantity: "1",
    color: "Teal",
    size: "8",
  },
});

const getDefaultCustomer = (): CustomerState => ({
  firstName: "",
  lastName: "",
  email: "",
  contactNumber: "",
  streetAddress: "",
  streetAddress2: "",
  city: "",
  state: "",
  country: "",
  postalCode: "",
  shippingSameAsBilling: "",
  sendGift: "",
  specialInstructions: "",
  paymentMethod: "",
});

const OrderTemplateForm = ({ isOpen, onClose }: OrderTemplateFormProps) => {
  const [products, setProducts] = useState<Record<ProductId, ProductState>>(
    getDefaultProducts(),
  );
  const [customer, setCustomer] = useState<CustomerState>(getDefaultCustomer());
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitted, setIsSubmitted] = useState(false);

  const totalPrice = useMemo(() => {
    return PRODUCT_DEFINITIONS.reduce((sum, product) => {
      const entry = products[product.id];
      if (!entry.selected) return sum;
      return sum + Number(entry.quantity) * product.price;
    }, 0);
  }, [products]);

  const resetForm = () => {
    setProducts(getDefaultProducts());
    setCustomer(getDefaultCustomer());
    setErrors({});
    setIsSubmitted(false);
  };

  const handleClose = () => {
    onClose();
    setTimeout(() => {
      resetForm();
    }, 120);
  };

  const handleCustomerChange = <K extends keyof CustomerState>(
    key: K,
    value: CustomerState[K],
  ) => {
    setCustomer((prev) => ({ ...prev, [key]: value }));
    setErrors((prev) => ({ ...prev, [key]: "" }));
  };

  const handleProductChange = <K extends keyof ProductState>(
    id: ProductId,
    key: K,
    value: ProductState[K],
  ) => {
    setProducts((prev) => ({
      ...prev,
      [id]: {
        ...prev[id],
        [key]: value,
      },
    }));
    setErrors((prev) => ({ ...prev, products: "", [`${id}-${String(key)}`]: "" }));
  };

  const validateForm = () => {
    const nextErrors: Record<string, string> = {};

    const selectedProducts = PRODUCT_DEFINITIONS.filter(
      (product) => products[product.id].selected,
    );
    if (selectedProducts.length === 0) {
      nextErrors.products = "Select at least one product.";
    }

    if (!customer.firstName.trim()) nextErrors.firstName = "First name is required.";
    if (!customer.lastName.trim()) nextErrors.lastName = "Last name is required.";
    if (!customer.email.trim()) {
      nextErrors.email = "Email is required.";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(customer.email.trim())) {
      nextErrors.email = "Enter a valid email address.";
    }
    if (!customer.contactNumber.trim()) {
      nextErrors.contactNumber = "Contact number is required.";
    }
    if (!customer.streetAddress.trim()) {
      nextErrors.streetAddress = "Street address is required.";
    }
    if (!customer.city.trim()) nextErrors.city = "City is required.";
    if (!customer.state.trim()) nextErrors.state = "State is required.";
    if (!customer.country.trim()) nextErrors.country = "Country is required.";
    if (!customer.postalCode.trim()) nextErrors.postalCode = "Postal code is required.";
    if (!customer.shippingSameAsBilling) {
      nextErrors.shippingSameAsBilling = "Please choose one option.";
    }
    if (!customer.sendGift) {
      nextErrors.sendGift = "Please choose one option.";
    }
    if (!customer.paymentMethod) {
      nextErrors.paymentMethod = "Select a payment method.";
    }

    PRODUCT_DEFINITIONS.forEach((product) => {
      if (!products[product.id].selected) return;
      if (!products[product.id].size) {
        nextErrors[`${product.id}-size`] = "Please select a size.";
      }
    });

    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!validateForm()) return;
    setIsSubmitted(true);
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
            className="w-full max-w-5xl mx-auto my-6 bg-[#f2f3fb] rounded-xl shadow-2xl border border-gray-300"
          >
            <div className="sticky top-0 z-10 bg-[#f2f3fb] border-b border-gray-200 p-4 sm:p-6 flex items-center justify-between">
              <div>
                <h2 className="text-2xl sm:text-4xl font-black text-gray-900">
                  Product Order Form
                </h2>
                <p className="text-sm text-gray-600 mt-1">
                  Fill all required fields before submitting your order.
                </p>
              </div>
              <button
                type="button"
                onClick={handleClose}
                className="p-2 rounded-full hover:bg-gray-200 transition-colors"
                aria-label="Close order form"
              >
                <X className="w-5 h-5 text-gray-700" />
              </button>
            </div>

            {isSubmitted ? (
              <div className="p-8 sm:p-12 text-center">
                <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-green-100 mb-4">
                  <span className="text-green-700 text-2xl">✓</span>
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-2">
                  Order submitted
                </h3>
                <p className="text-gray-600 mb-1">
                  Thank you, {customer.firstName}. Your template order has been recorded.
                </p>
                <p className="text-gray-700 font-semibold mb-6">
                  Total: ${totalPrice.toFixed(2)}
                </p>
                <div className="flex items-center justify-center gap-3">
                  <button
                    type="button"
                    onClick={resetForm}
                    className="px-5 py-2.5 rounded-md border border-gray-300 text-gray-700 hover:bg-gray-100 transition-colors"
                  >
                    New order
                  </button>
                  <button
                    type="button"
                    onClick={handleClose}
                    className="px-5 py-2.5 rounded-md bg-green-600 text-white hover:bg-green-700 transition-colors"
                  >
                    Close
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="p-4 sm:p-6 space-y-7">
                <section className="bg-white border border-gray-200 rounded-lg p-4 sm:p-5">
                  <h3 className="text-lg font-bold text-gray-900 mb-3">My Products</h3>
                  <div className="grid md:grid-cols-3 gap-4">
                    {PRODUCT_DEFINITIONS.map((product) => {
                      const selectedEntry = products[product.id];
                      return (
                        <div
                          key={product.id}
                          className={`border rounded-lg overflow-hidden transition-colors ${
                            selectedEntry.selected
                              ? "border-blue-500 bg-blue-50/30"
                              : "border-gray-200 bg-white"
                          }`}
                        >
                          <div className="p-3 border-b border-gray-100">
                            <label className="flex items-start gap-2 cursor-pointer">
                              <input
                                type="checkbox"
                                checked={selectedEntry.selected}
                                onChange={(event) =>
                                  handleProductChange(
                                    product.id,
                                    "selected",
                                    event.target.checked,
                                  )
                                }
                                className="mt-1"
                              />
                              <div className="flex-1">
                                <div className="h-24 rounded-md border border-gray-200 bg-white mb-3 overflow-hidden">
                                  <img
                                    src={product.imageSrc}
                                    alt={product.name}
                                    className="w-full h-full object-cover"
                                    loading="lazy"
                                  />
                                </div>
                                <p className="text-base font-semibold text-gray-900">
                                  {product.name}
                                </p>
                                <p className="text-blue-700 font-bold">
                                  ${product.price.toFixed(2)}
                                </p>
                              </div>
                            </label>
                          </div>

                          <div className="p-3 space-y-3">
                            <div className="grid grid-cols-2 gap-2">
                              <label className="text-xs text-gray-600">
                                Quantity
                                <select
                                  value={selectedEntry.quantity}
                                  onChange={(event) =>
                                    handleProductChange(
                                      product.id,
                                      "quantity",
                                      event.target.value,
                                    )
                                  }
                                  className="w-full mt-1 border border-gray-300 rounded px-2 py-1.5 text-sm"
                                >
                                  {Array.from({ length: 10 }).map((_, idx) => {
                                    const quantity = String(idx + 1);
                                    return (
                                      <option key={quantity} value={quantity}>
                                        {quantity}
                                      </option>
                                    );
                                  })}
                                </select>
                              </label>
                              <label className="text-xs text-gray-600">
                                Color
                                <select
                                  value={selectedEntry.color}
                                  onChange={(event) =>
                                    handleProductChange(
                                      product.id,
                                      "color",
                                      event.target.value,
                                    )
                                  }
                                  className="w-full mt-1 border border-gray-300 rounded px-2 py-1.5 text-sm"
                                >
                                  {product.colorOptions.map((colorOption) => (
                                    <option key={colorOption} value={colorOption}>
                                      {colorOption}
                                    </option>
                                  ))}
                                </select>
                              </label>
                            </div>

                            <label className="text-xs text-gray-600 block">
                              {product.sizeLabel}
                              <select
                                value={selectedEntry.size}
                                onChange={(event) =>
                                  handleProductChange(
                                    product.id,
                                    "size",
                                    event.target.value,
                                  )
                                }
                                className="w-full mt-1 border border-gray-300 rounded px-2 py-1.5 text-sm"
                              >
                                {product.sizes.map((sizeOption) => (
                                  <option key={sizeOption} value={sizeOption}>
                                    {sizeOption}
                                  </option>
                                ))}
                              </select>
                            </label>
                            {errors[`${product.id}-size`] && (
                              <p className="text-xs text-red-600">
                                {errors[`${product.id}-size`]}
                              </p>
                            )}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                  {errors.products && (
                    <p className="text-sm text-red-600 mt-3">{errors.products}</p>
                  )}
                </section>

                <section className="bg-white border border-gray-200 rounded-lg p-4 sm:p-5">
                  <div className="grid sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-sm font-medium text-gray-700">
                        First Name *
                      </label>
                      <input
                        type="text"
                        value={customer.firstName}
                        onChange={(event) =>
                          handleCustomerChange("firstName", event.target.value)
                        }
                        className="mt-1 w-full border border-gray-300 rounded-md px-3 py-2 text-sm"
                      />
                      {errors.firstName && (
                        <p className="text-xs text-red-600 mt-1">{errors.firstName}</p>
                      )}
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">
                        Last Name *
                      </label>
                      <input
                        type="text"
                        value={customer.lastName}
                        onChange={(event) =>
                          handleCustomerChange("lastName", event.target.value)
                        }
                        className="mt-1 w-full border border-gray-300 rounded-md px-3 py-2 text-sm"
                      />
                      {errors.lastName && (
                        <p className="text-xs text-red-600 mt-1">{errors.lastName}</p>
                      )}
                    </div>
                  </div>

                  <div className="grid sm:grid-cols-2 gap-3 mt-3">
                    <div>
                      <label className="block text-sm font-medium text-gray-700">
                        E-mail *
                      </label>
                      <input
                        type="email"
                        value={customer.email}
                        onChange={(event) =>
                          handleCustomerChange("email", event.target.value)
                        }
                        placeholder="name@example.com"
                        className="mt-1 w-full border border-gray-300 rounded-md px-3 py-2 text-sm"
                      />
                      {errors.email && (
                        <p className="text-xs text-red-600 mt-1">{errors.email}</p>
                      )}
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">
                        Contact Number *
                      </label>
                      <input
                        type="tel"
                        value={customer.contactNumber}
                        onChange={(event) =>
                          handleCustomerChange("contactNumber", event.target.value)
                        }
                        placeholder="(000) 000-0000"
                        className="mt-1 w-full border border-gray-300 rounded-md px-3 py-2 text-sm"
                      />
                      {errors.contactNumber && (
                        <p className="text-xs text-red-600 mt-1">
                          {errors.contactNumber}
                        </p>
                      )}
                    </div>
                  </div>
                </section>

                <section className="bg-white border border-gray-200 rounded-lg p-4 sm:p-5">
                  <h3 className="text-base font-bold text-gray-900 mb-3">Billing Address</h3>
                  <div className="space-y-3">
                    <div>
                      <label className="block text-sm font-medium text-gray-700">
                        Street Address *
                      </label>
                      <input
                        type="text"
                        value={customer.streetAddress}
                        onChange={(event) =>
                          handleCustomerChange("streetAddress", event.target.value)
                        }
                        className="mt-1 w-full border border-gray-300 rounded-md px-3 py-2 text-sm"
                      />
                      {errors.streetAddress && (
                        <p className="text-xs text-red-600 mt-1">
                          {errors.streetAddress}
                        </p>
                      )}
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">
                        Street Address Line 2
                      </label>
                      <input
                        type="text"
                        value={customer.streetAddress2}
                        onChange={(event) =>
                          handleCustomerChange("streetAddress2", event.target.value)
                        }
                        className="mt-1 w-full border border-gray-300 rounded-md px-3 py-2 text-sm"
                      />
                    </div>
                    <div className="grid sm:grid-cols-2 gap-3">
                      <div>
                        <label className="block text-sm font-medium text-gray-700">
                          City *
                        </label>
                        <input
                          type="text"
                          value={customer.city}
                          onChange={(event) =>
                            handleCustomerChange("city", event.target.value)
                          }
                          className="mt-1 w-full border border-gray-300 rounded-md px-3 py-2 text-sm"
                        />
                        {errors.city && (
                          <p className="text-xs text-red-600 mt-1">{errors.city}</p>
                        )}
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700">
                          State / Province *
                        </label>
                        <select
                          value={customer.state}
                          onChange={(event) =>
                            handleCustomerChange("state", event.target.value)
                          }
                          className="mt-1 w-full border border-gray-300 rounded-md px-3 py-2 text-sm"
                        >
                          <option value="">Please Select</option>
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
                    <div className="grid sm:grid-cols-2 gap-3">
                      <div>
                        <label className="block text-sm font-medium text-gray-700">
                          Country *
                        </label>
                        <input
                          type="text"
                          value={customer.country}
                          onChange={(event) =>
                            handleCustomerChange("country", event.target.value)
                          }
                          className="mt-1 w-full border border-gray-300 rounded-md px-3 py-2 text-sm"
                        />
                        {errors.country && (
                          <p className="text-xs text-red-600 mt-1">{errors.country}</p>
                        )}
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700">
                          Postal / Zip Code *
                        </label>
                        <input
                          type="text"
                          value={customer.postalCode}
                          onChange={(event) =>
                            handleCustomerChange("postalCode", event.target.value)
                          }
                          className="mt-1 w-full border border-gray-300 rounded-md px-3 py-2 text-sm"
                        />
                        {errors.postalCode && (
                          <p className="text-xs text-red-600 mt-1">
                            {errors.postalCode}
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                </section>

                <section className="bg-white border border-gray-200 rounded-lg p-4 sm:p-5">
                  <div className="grid sm:grid-cols-2 gap-6">
                    <fieldset>
                      <legend className="text-sm font-semibold text-gray-800 mb-2">
                        Is shipping address same as billing address? *
                      </legend>
                      <label className="flex items-center gap-2 text-sm text-gray-700">
                        <input
                          type="radio"
                          name="shippingSameAsBilling"
                          checked={customer.shippingSameAsBilling === "yes"}
                          onChange={() =>
                            handleCustomerChange("shippingSameAsBilling", "yes")
                          }
                        />
                        Yes
                      </label>
                      <label className="flex items-center gap-2 text-sm text-gray-700 mt-1">
                        <input
                          type="radio"
                          name="shippingSameAsBilling"
                          checked={customer.shippingSameAsBilling === "no"}
                          onChange={() =>
                            handleCustomerChange("shippingSameAsBilling", "no")
                          }
                        />
                        No
                      </label>
                      {errors.shippingSameAsBilling && (
                        <p className="text-xs text-red-600 mt-1">
                          {errors.shippingSameAsBilling}
                        </p>
                      )}
                    </fieldset>

                    <fieldset>
                      <legend className="text-sm font-semibold text-gray-800 mb-2">
                        Send Gift? *
                      </legend>
                      <label className="flex items-center gap-2 text-sm text-gray-700">
                        <input
                          type="radio"
                          name="sendGift"
                          checked={customer.sendGift === "yes"}
                          onChange={() => handleCustomerChange("sendGift", "yes")}
                        />
                        Yes
                      </label>
                      <label className="flex items-center gap-2 text-sm text-gray-700 mt-1">
                        <input
                          type="radio"
                          name="sendGift"
                          checked={customer.sendGift === "no"}
                          onChange={() => handleCustomerChange("sendGift", "no")}
                        />
                        No
                      </label>
                      {errors.sendGift && (
                        <p className="text-xs text-red-600 mt-1">{errors.sendGift}</p>
                      )}
                    </fieldset>
                  </div>

                  <div className="mt-4">
                    <label className="block text-sm font-medium text-gray-700">
                      Special Instructions
                    </label>
                    <textarea
                      value={customer.specialInstructions}
                      onChange={(event) =>
                        handleCustomerChange("specialInstructions", event.target.value)
                      }
                      rows={4}
                      className="mt-1 w-full border border-gray-300 rounded-md px-3 py-2 text-sm"
                    />
                  </div>
                </section>

                <section className="bg-[#f7d9d9] border border-[#f0b3b3] rounded-lg p-4">
                  <h3 className="text-sm font-bold text-gray-900 mb-3">Payment Methods *</h3>
                  <label className="flex items-center gap-2 text-sm text-gray-800">
                    <input
                      type="radio"
                      name="paymentMethod"
                      checked={customer.paymentMethod === "card"}
                      onChange={() => handleCustomerChange("paymentMethod", "card")}
                    />
                    Debit or Credit Card
                  </label>
                  <label className="flex items-center gap-2 text-sm text-gray-800 mt-2">
                    <input
                      type="radio"
                      name="paymentMethod"
                      checked={customer.paymentMethod === "paypal"}
                      onChange={() => handleCustomerChange("paymentMethod", "paypal")}
                    />
                    PayPal
                  </label>
                  {errors.paymentMethod && (
                    <p className="text-xs text-red-600 mt-2">{errors.paymentMethod}</p>
                  )}
                </section>

                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 border-t border-gray-200 pt-4">
                  <p className="text-sm font-semibold text-gray-800">
                    Estimated Total: ${totalPrice.toFixed(2)}
                  </p>
                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={resetForm}
                      className="px-4 py-2 rounded-md border border-gray-300 text-gray-700 hover:bg-gray-100 transition-colors"
                    >
                      Reset
                    </button>
                    <button
                      type="submit"
                      className="px-6 py-2 rounded-md bg-green-600 text-white font-semibold hover:bg-green-700 transition-colors"
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

export default OrderTemplateForm;
