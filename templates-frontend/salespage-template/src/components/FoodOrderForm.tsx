import { useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronDown, ChevronUp, Search, X } from "lucide-react";

interface FoodOrderFormProps {
  isOpen: boolean;
  onClose: () => void;
}

type Category =
  | "Appetizers"
  | "Soups"
  | "Salads"
  | "Sandwiches"
  | "Burgers"
  | "Pastas"
  | "Sides"
  | "Drinks"
  | "Desserts";

interface MenuItem {
  id: string;
  name: string;
  description: string;
  price: number;
  category: Category;
  imageSrc: string;
}

interface CustomerState {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  pickup: "" | "yes" | "no";
  streetAddress: string;
  streetAddress2: string;
  city: string;
  state: string;
  postalCode: string;
  comments: string;
  paymentMethod: "" | "card" | "paypal";
}

const toSvgDataUri = (content: string, viewBox = "0 0 400 260") =>
  `data:image/svg+xml;utf8,${encodeURIComponent(
    `<svg xmlns='http://www.w3.org/2000/svg' viewBox='${viewBox}'>${content}</svg>`,
  )}`;

const heroImage = toSvgDataUri(
  `
  <defs>
    <linearGradient id='g' x1='0' y1='0' x2='1' y2='1'>
      <stop offset='0%' stop-color='#fff2e6'/>
      <stop offset='100%' stop-color='#ffd9bf'/>
    </linearGradient>
  </defs>
  <rect width='400' height='260' fill='url(#g)'/>
  <circle cx='290' cy='88' r='46' fill='#f6d3c0'/>
  <rect x='248' y='130' width='92' height='86' rx='26' fill='#ff5f7a'/>
  <circle cx='302' cy='83' r='7' fill='#1f2937'/>
  <circle cx='326' cy='83' r='7' fill='#1f2937'/>
  <path d='M296 105 C308 120, 322 120, 334 105' stroke='#1f2937' stroke-width='4' fill='none'/>
  <circle cx='134' cy='70' r='50' fill='#ffffff' stroke='#f59e0b' stroke-width='4'/>
  <circle cx='134' cy='70' r='40' fill='#f5f3e6'/>
  <circle cx='120' cy='58' r='6' fill='#ef4444'/>
  <circle cx='146' cy='58' r='6' fill='#22c55e'/>
  <circle cx='129' cy='78' r='6' fill='#eab308'/>
  <circle cx='150' cy='82' r='6' fill='#ef4444'/>
  <rect x='72' y='138' width='180' height='18' rx='9' fill='#fed7aa'/>
`,
);

const makeFoodImage = (label: string, c1: string, c2: string) =>
  toSvgDataUri(
    `
  <defs>
    <linearGradient id='g' x1='0' y1='0' x2='1' y2='1'>
      <stop offset='0%' stop-color='${c1}'/>
      <stop offset='100%' stop-color='${c2}'/>
    </linearGradient>
  </defs>
  <rect width='400' height='260' fill='url(#g)'/>
  <rect x='30' y='24' width='340' height='212' rx='18' fill='rgba(255,255,255,0.2)'/>
  <circle cx='200' cy='130' r='70' fill='rgba(255,255,255,0.45)'/>
  <rect x='92' y='106' width='216' height='48' rx='8' fill='rgba(0,0,0,0.28)'/>
  <text x='200' y='138' text-anchor='middle' fill='white' font-size='28' font-family='Arial, sans-serif' font-weight='700'>${label}</text>
`,
  );

const MENU_ITEMS: MenuItem[] = [
  {
    id: "app-1",
    category: "Appetizers",
    name: "Crispy Onion Rings",
    description: "Golden fried onion rings with house dip.",
    price: 8,
    imageSrc: makeFoodImage("Onion Rings", "#f59e0b", "#f97316"),
  },
  {
    id: "app-2",
    category: "Appetizers",
    name: "Thai Spring Rolls",
    description: "Crunchy vegetable spring rolls.",
    price: 9,
    imageSrc: makeFoodImage("Spring Rolls", "#facc15", "#f59e0b"),
  },
  {
    id: "app-3",
    category: "Appetizers",
    name: "Ancho Chili Chicken",
    description: "Spiced chicken bites with herbs.",
    price: 10,
    imageSrc: makeFoodImage("Chili Chicken", "#fb7185", "#ef4444"),
  },
  {
    id: "soup-1",
    category: "Soups",
    name: "Cream of Wild Mushroom",
    description: "Slow-cooked creamy mushroom soup.",
    price: 6,
    imageSrc: makeFoodImage("Wild Mushroom", "#a3a3a3", "#737373"),
  },
  {
    id: "soup-2",
    category: "Soups",
    name: "Tangy Chicken Noodle",
    description: "Classic noodle soup with chicken.",
    price: 7,
    imageSrc: makeFoodImage("Chicken Noodle", "#f59e0b", "#ca8a04"),
  },
  {
    id: "salad-1",
    category: "Salads",
    name: "Classic Caesar Salad",
    description: "Romaine, parmesan, croutons, garlic dressing.",
    price: 7,
    imageSrc: makeFoodImage("Caesar Salad", "#65a30d", "#4d7c0f"),
  },
  {
    id: "salad-2",
    category: "Salads",
    name: "Cranberry Pecan Blue",
    description: "Crisp greens with cranberry and pecan.",
    price: 9,
    imageSrc: makeFoodImage("Pecan Blue", "#16a34a", "#15803d"),
  },
  {
    id: "salad-3",
    category: "Salads",
    name: "Spinach Salad",
    description: "Spinach, orange slices and vinaigrette.",
    price: 8,
    imageSrc: makeFoodImage("Spinach", "#22c55e", "#16a34a"),
  },
  {
    id: "sand-1",
    category: "Sandwiches",
    name: "House Roasted Turkey Club",
    description: "Turkey, bacon, lettuce and aioli.",
    price: 11,
    imageSrc: makeFoodImage("Turkey Club", "#c084fc", "#a855f7"),
  },
  {
    id: "sand-2",
    category: "Sandwiches",
    name: "Hot Italian Grinder",
    description: "Salami, pepperoni and provolone.",
    price: 12,
    imageSrc: makeFoodImage("Italian Grinder", "#f43f5e", "#e11d48"),
  },
  {
    id: "sand-3",
    category: "Sandwiches",
    name: "The BLT-A",
    description: "Bacon, lettuce, tomato and avocado.",
    price: 10,
    imageSrc: makeFoodImage("BLT-A", "#fb923c", "#f97316"),
  },
  {
    id: "burger-1",
    category: "Burgers",
    name: "Classic Hamburger",
    description: "House burger with lettuce and tomato.",
    price: 11,
    imageSrc: makeFoodImage("Hamburger", "#854d0e", "#a16207"),
  },
  {
    id: "burger-2",
    category: "Burgers",
    name: "Classic Cheeseburger",
    description: "Juicy beef patty with melted cheese.",
    price: 12,
    imageSrc: makeFoodImage("Cheeseburger", "#f59e0b", "#d97706"),
  },
  {
    id: "burger-3",
    category: "Burgers",
    name: "The Works Burger",
    description: "Loaded burger with house sauce.",
    price: 13,
    imageSrc: makeFoodImage("Works Burger", "#eab308", "#ca8a04"),
  },
  {
    id: "pasta-1",
    category: "Pastas",
    name: "Box Battered Fish & Chips",
    description: "Crispy fish fillet and chips.",
    price: 14,
    imageSrc: makeFoodImage("Fish Chips", "#14b8a6", "#0f766e"),
  },
  {
    id: "pasta-2",
    category: "Pastas",
    name: "Barbequed Short Rib",
    description: "Tender short rib with smoky glaze.",
    price: 18,
    imageSrc: makeFoodImage("Short Rib", "#fb7185", "#f43f5e"),
  },
  {
    id: "pasta-3",
    category: "Pastas",
    name: "Herb Crusted Atlantic Salmon",
    description: "Pan-seared salmon with herbs.",
    price: 18,
    imageSrc: makeFoodImage("Salmon", "#06b6d4", "#0891b2"),
  },
  {
    id: "side-1",
    category: "Sides",
    name: "French Fries",
    description: "Golden and crispy cut fries.",
    price: 3,
    imageSrc: makeFoodImage("Fries", "#fbbf24", "#f59e0b"),
  },
  {
    id: "side-2",
    category: "Sides",
    name: "Corn on the Cob",
    description: "Butter brushed sweet corn.",
    price: 3,
    imageSrc: makeFoodImage("Corn", "#fde047", "#eab308"),
  },
  {
    id: "side-3",
    category: "Sides",
    name: "Baked Beans",
    description: "Slow baked beans with herbs.",
    price: 4,
    imageSrc: makeFoodImage("Beans", "#fb923c", "#ea580c"),
  },
  {
    id: "drink-1",
    category: "Drinks",
    name: "Our Homemade Lemonade",
    description: "Fresh squeezed lemonade.",
    price: 3,
    imageSrc: makeFoodImage("Lemonade", "#fef08a", "#facc15"),
  },
  {
    id: "drink-2",
    category: "Drinks",
    name: "Our House Iced Tea",
    description: "Chilled black tea with citrus.",
    price: 3,
    imageSrc: makeFoodImage("Iced Tea", "#f59e0b", "#b45309"),
  },
  {
    id: "dessert-1",
    category: "Desserts",
    name: "Dutch Apple Pie",
    description: "Warm pie with cinnamon glaze.",
    price: 5,
    imageSrc: makeFoodImage("Apple Pie", "#fb7185", "#e11d48"),
  },
  {
    id: "dessert-2",
    category: "Desserts",
    name: "German Chocolate Cake",
    description: "Layered chocolate cake slice.",
    price: 6,
    imageSrc: makeFoodImage("Choco Cake", "#7c3aed", "#5b21b6"),
  },
  {
    id: "dessert-3",
    category: "Desserts",
    name: "Key Lime Pie",
    description: "Tart lime pie with whipped cream.",
    price: 6,
    imageSrc: makeFoodImage("Key Lime", "#84cc16", "#65a30d"),
  },
];

const CATEGORIES: Category[] = [
  "Appetizers",
  "Soups",
  "Salads",
  "Sandwiches",
  "Burgers",
  "Pastas",
  "Sides",
  "Drinks",
  "Desserts",
];

const getInitialCustomer = (): CustomerState => ({
  firstName: "",
  lastName: "",
  email: "",
  phone: "",
  pickup: "",
  streetAddress: "",
  streetAddress2: "",
  city: "",
  state: "",
  postalCode: "",
  comments: "",
  paymentMethod: "",
});

const FoodOrderForm = ({ isOpen, onClose }: FoodOrderFormProps) => {
  const [search, setSearch] = useState("");
  const [categoryFilter, setCategoryFilter] = useState<string>("All");
  const [sortBy, setSortBy] = useState<"featured" | "name" | "priceAsc" | "priceDesc">(
    "featured",
  );
  const [selectedItems, setSelectedItems] = useState<Record<string, boolean>>({});
  const [quantities, setQuantities] = useState<Record<string, number>>({});
  const [expandedSections, setExpandedSections] = useState<Record<string, boolean>>(
    CATEGORIES.reduce<Record<string, boolean>>((acc, key) => {
      acc[key] = true;
      return acc;
    }, {}),
  );
  const [customer, setCustomer] = useState<CustomerState>(getInitialCustomer());
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitted, setSubmitted] = useState(false);

  const filteredItems = useMemo(() => {
    let items = MENU_ITEMS.filter((item) => {
      const inCategory =
        categoryFilter === "All" ? true : item.category === categoryFilter;
      const query = search.trim().toLowerCase();
      const inQuery =
        !query ||
        item.name.toLowerCase().includes(query) ||
        item.description.toLowerCase().includes(query) ||
        item.category.toLowerCase().includes(query);
      return inCategory && inQuery;
    });

    if (sortBy === "name") {
      items = [...items].sort((a, b) => a.name.localeCompare(b.name));
    } else if (sortBy === "priceAsc") {
      items = [...items].sort((a, b) => a.price - b.price);
    } else if (sortBy === "priceDesc") {
      items = [...items].sort((a, b) => b.price - a.price);
    }

    return items;
  }, [categoryFilter, search, sortBy]);

  const itemsByCategory = useMemo(() => {
    return CATEGORIES.reduce<Record<string, MenuItem[]>>((acc, category) => {
      acc[category] = filteredItems.filter((item) => item.category === category);
      return acc;
    }, {});
  }, [filteredItems]);

  const total = useMemo(() => {
    return MENU_ITEMS.reduce((sum, item) => {
      if (!selectedItems[item.id]) return sum;
      return sum + item.price * (quantities[item.id] || 1);
    }, 0);
  }, [quantities, selectedItems]);

  const handleClose = () => {
    onClose();
    setTimeout(() => {
      setSearch("");
      setCategoryFilter("All");
      setSortBy("featured");
      setSelectedItems({});
      setQuantities({});
      setExpandedSections(
        CATEGORIES.reduce<Record<string, boolean>>((acc, key) => {
          acc[key] = true;
          return acc;
        }, {}),
      );
      setCustomer(getInitialCustomer());
      setErrors({});
      setSubmitted(false);
    }, 120);
  };

  const handleCustomerChange = <K extends keyof CustomerState>(
    key: K,
    value: CustomerState[K],
  ) => {
    setCustomer((prev) => ({ ...prev, [key]: value }));
    setErrors((prev) => ({ ...prev, [key]: "" }));
  };

  const validate = () => {
    const next: Record<string, string> = {};
    const selectedCount = Object.values(selectedItems).filter(Boolean).length;
    if (selectedCount === 0) next.items = "Select at least one menu item.";
    if (!customer.firstName.trim()) next.firstName = "Required";
    if (!customer.lastName.trim()) next.lastName = "Required";
    if (!customer.email.trim()) {
      next.email = "Required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(customer.email.trim())) {
      next.email = "Invalid email";
    }
    if (!customer.phone.trim()) next.phone = "Required";
    if (!customer.pickup) next.pickup = "Please choose one option.";
    if (customer.pickup === "no") {
      if (!customer.streetAddress.trim()) next.streetAddress = "Required";
      if (!customer.city.trim()) next.city = "Required";
      if (!customer.state.trim()) next.state = "Required";
      if (!customer.postalCode.trim()) next.postalCode = "Required";
    }
    if (!customer.paymentMethod) next.paymentMethod = "Select payment method.";

    setErrors(next);
    return Object.keys(next).length === 0;
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
          className="fixed inset-0 z-[10020] bg-[#f47a1f] p-3 sm:p-6 overflow-y-auto"
        >
          <motion.div
            initial={{ scale: 0.98, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.98, opacity: 0 }}
            transition={{ duration: 0.18 }}
            onClick={(event) => event.stopPropagation()}
            className="relative w-full max-w-4xl mx-auto bg-white rounded shadow-2xl overflow-hidden"
          >
            <button
              type="button"
              onClick={handleClose}
              className="absolute top-4 right-4 z-20 p-2 rounded-full bg-white/85 hover:bg-white transition-colors"
              aria-label="Close food order form"
            >
              <X className="w-5 h-5 text-gray-700" />
            </button>

            {Object.keys(errors).length > 0 && !submitted && (
              <div className="bg-[#e11d2a] text-white px-4 py-2 text-xs sm:text-sm flex items-center justify-between">
                <span>There is {Object.keys(errors).length} error(s) on this page.</span>
                <button
                  type="button"
                  className="bg-white text-[#1f2937] px-3 py-1 rounded text-xs font-semibold"
                >
                  See Errors
                </button>
              </div>
            )}

            {submitted ? (
              <div className="p-12 text-center">
                <div className="inline-flex h-14 w-14 items-center justify-center rounded-full bg-green-100 text-green-700 text-2xl mb-4">
                  ✓
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-2">Order submitted</h3>
                <p className="text-gray-600">
                  Thank you {customer.firstName}. Your food order total is $
                  {total.toFixed(2)}.
                </p>
                <button
                  type="button"
                  onClick={handleClose}
                  className="mt-6 px-8 py-2.5 rounded bg-green-600 text-white hover:bg-green-700 transition-colors"
                >
                  Close
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit}>
                <div className="bg-[#f6802b] grid md:grid-cols-[1.2fr_0.8fr]">
                  <div className="p-6 text-white">
                    <h2 className="text-4xl font-black leading-tight">YOU CAN ORDER NOW</h2>
                    <p className="text-sm mt-2 text-orange-100">Delight & Joy</p>
                  </div>
                  <img
                    src={heroImage}
                    alt="Food order hero"
                    className="w-full h-full object-cover min-h-[170px]"
                  />
                </div>

                <div className="p-5 sm:p-6 space-y-6">
                  <section className="border border-gray-200 rounded p-3 sm:p-4 space-y-3">
                    <div className="text-sm font-bold text-gray-900">Menu</div>
                    <div className="grid sm:grid-cols-3 gap-2">
                      <label className="relative">
                        <Search className="w-4 h-4 text-gray-400 absolute left-2.5 top-2.5" />
                        <input
                          className="w-full border border-gray-300 rounded pl-8 pr-3 py-2 text-sm"
                          value={search}
                          onChange={(e) => setSearch(e.target.value)}
                          placeholder="Search"
                        />
                      </label>
                      <select
                        className="w-full border border-gray-300 rounded px-3 py-2 text-sm"
                        value={categoryFilter}
                        onChange={(e) => setCategoryFilter(e.target.value)}
                      >
                        <option value="All">Category: All</option>
                        {CATEGORIES.map((category) => (
                          <option key={category} value={category}>
                            {category}
                          </option>
                        ))}
                      </select>
                      <select
                        className="w-full border border-gray-300 rounded px-3 py-2 text-sm"
                        value={sortBy}
                        onChange={(e) =>
                          setSortBy(e.target.value as "featured" | "name" | "priceAsc" | "priceDesc")
                        }
                      >
                        <option value="featured">Sort: Featured</option>
                        <option value="name">Name A-Z</option>
                        <option value="priceAsc">Price Low-High</option>
                        <option value="priceDesc">Price High-Low</option>
                      </select>
                    </div>
                    {errors.items && <p className="text-xs text-red-600">{errors.items}</p>}
                  </section>

                  {CATEGORIES.map((category) => {
                    const items = itemsByCategory[category];
                    if (!items || items.length === 0) return null;
                    const isOpen = expandedSections[category];
                    return (
                      <section key={category} className="border border-gray-200 rounded">
                        <button
                          type="button"
                          onClick={() =>
                            setExpandedSections((prev) => ({
                              ...prev,
                              [category]: !prev[category],
                            }))
                          }
                          className="w-full px-3 sm:px-4 py-3 border-b border-gray-200 flex items-center justify-between"
                        >
                          <span className="font-semibold text-gray-900">{category}</span>
                          {isOpen ? (
                            <ChevronUp className="w-4 h-4 text-gray-600" />
                          ) : (
                            <ChevronDown className="w-4 h-4 text-gray-600" />
                          )}
                        </button>
                        {isOpen && (
                          <div className="p-3 sm:p-4 grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
                            {items.map((item) => (
                              <div key={item.id} className="border border-gray-200 rounded overflow-hidden">
                                <div className="relative">
                                  <img
                                    src={item.imageSrc}
                                    alt={item.name}
                                    className="w-full h-28 object-cover"
                                  />
                                  <label className="absolute top-2 right-2 bg-white/95 rounded px-2 py-1 text-xs flex items-center gap-1">
                                    <input
                                      type="checkbox"
                                      checked={Boolean(selectedItems[item.id])}
                                      onChange={(e) =>
                                        setSelectedItems((prev) => ({
                                          ...prev,
                                          [item.id]: e.target.checked,
                                        }))
                                      }
                                    />
                                  </label>
                                </div>
                                <div className="p-2.5">
                                  <p className="text-sm font-semibold text-gray-900">{item.name}</p>
                                  <p className="text-xs text-gray-600 mt-1">{item.description}</p>
                                  <p className="text-blue-700 font-bold text-sm mt-2">
                                    ${item.price.toFixed(2)}
                                  </p>
                                  <div className="mt-2">
                                    <label className="text-xs text-gray-600">Quantity</label>
                                    <select
                                      className="w-full mt-1 border border-gray-300 rounded px-2 py-1.5 text-xs"
                                      value={quantities[item.id] || 1}
                                      onChange={(e) =>
                                        setQuantities((prev) => ({
                                          ...prev,
                                          [item.id]: Number(e.target.value),
                                        }))
                                      }
                                    >
                                      {Array.from({ length: 10 }).map((_, i) => (
                                        <option key={i + 1} value={i + 1}>
                                          {i + 1}
                                        </option>
                                      ))}
                                    </select>
                                  </div>
                                </div>
                              </div>
                            ))}
                          </div>
                        )}
                      </section>
                    );
                  })}

                  <div className="border-t border-gray-300 pt-3 text-right">
                    <span className="text-sm font-semibold text-gray-900">
                      Total&nbsp;&nbsp;${total.toFixed(2)}
                    </span>
                  </div>

                  <section className="space-y-3">
                    <div className="grid sm:grid-cols-2 gap-3">
                      <div>
                        <label className="text-sm font-semibold text-gray-900">First Name</label>
                        <input
                          className="w-full mt-1 border border-gray-300 rounded px-3 py-2 text-sm"
                          value={customer.firstName}
                          onChange={(e) => handleCustomerChange("firstName", e.target.value)}
                        />
                        {errors.firstName && (
                          <p className="text-xs text-red-600 mt-1">{errors.firstName}</p>
                        )}
                      </div>
                      <div>
                        <label className="text-sm font-semibold text-gray-900">Last Name</label>
                        <input
                          className="w-full mt-1 border border-gray-300 rounded px-3 py-2 text-sm"
                          value={customer.lastName}
                          onChange={(e) => handleCustomerChange("lastName", e.target.value)}
                        />
                        {errors.lastName && (
                          <p className="text-xs text-red-600 mt-1">{errors.lastName}</p>
                        )}
                      </div>
                    </div>
                    <div>
                      <label className="text-sm font-semibold text-gray-900">Email</label>
                      <input
                        className="w-full mt-1 border border-gray-300 rounded px-3 py-2 text-sm"
                        value={customer.email}
                        onChange={(e) => handleCustomerChange("email", e.target.value)}
                        placeholder="name@example.com"
                      />
                      {errors.email && <p className="text-xs text-red-600 mt-1">{errors.email}</p>}
                    </div>
                    <div>
                      <label className="text-sm font-semibold text-gray-900">Phone Number</label>
                      <input
                        className="w-full mt-1 border border-gray-300 rounded px-3 py-2 text-sm"
                        value={customer.phone}
                        onChange={(e) => handleCustomerChange("phone", e.target.value)}
                        placeholder="(000) 000-0000"
                      />
                      {errors.phone && <p className="text-xs text-red-600 mt-1">{errors.phone}</p>}
                    </div>
                    <div>
                      <label className="text-sm font-semibold text-gray-900">
                        Do you want a pickup order?
                      </label>
                      <div className="mt-2 space-y-1">
                        <label className="flex items-center gap-2 text-sm text-gray-800">
                          <input
                            type="radio"
                            name="pickup"
                            checked={customer.pickup === "yes"}
                            onChange={() => handleCustomerChange("pickup", "yes")}
                          />
                          Yes
                        </label>
                        <label className="flex items-center gap-2 text-sm text-gray-800">
                          <input
                            type="radio"
                            name="pickup"
                            checked={customer.pickup === "no"}
                            onChange={() => handleCustomerChange("pickup", "no")}
                          />
                          No
                        </label>
                      </div>
                      {errors.pickup && <p className="text-xs text-red-600 mt-1">{errors.pickup}</p>}
                    </div>
                  </section>

                  {customer.pickup === "no" && (
                    <section className="space-y-3">
                      <h3 className="text-sm font-bold text-gray-900">Delivery Address</h3>
                      <div>
                        <input
                          className="w-full border border-gray-300 rounded px-3 py-2 text-sm"
                          value={customer.streetAddress}
                          onChange={(e) => handleCustomerChange("streetAddress", e.target.value)}
                          placeholder="Street Address"
                        />
                        {errors.streetAddress && (
                          <p className="text-xs text-red-600 mt-1">{errors.streetAddress}</p>
                        )}
                      </div>
                      <input
                        className="w-full border border-gray-300 rounded px-3 py-2 text-sm"
                        value={customer.streetAddress2}
                        onChange={(e) => handleCustomerChange("streetAddress2", e.target.value)}
                        placeholder="Street Address Line 2"
                      />
                      <div className="grid sm:grid-cols-3 gap-3">
                        <div>
                          <input
                            className="w-full border border-gray-300 rounded px-3 py-2 text-sm"
                            value={customer.city}
                            onChange={(e) => handleCustomerChange("city", e.target.value)}
                            placeholder="City"
                          />
                          {errors.city && (
                            <p className="text-xs text-red-600 mt-1">{errors.city}</p>
                          )}
                        </div>
                        <div>
                          <input
                            className="w-full border border-gray-300 rounded px-3 py-2 text-sm"
                            value={customer.state}
                            onChange={(e) => handleCustomerChange("state", e.target.value)}
                            placeholder="State / Province"
                          />
                          {errors.state && (
                            <p className="text-xs text-red-600 mt-1">{errors.state}</p>
                          )}
                        </div>
                        <div>
                          <input
                            className="w-full border border-gray-300 rounded px-3 py-2 text-sm"
                            value={customer.postalCode}
                            onChange={(e) => handleCustomerChange("postalCode", e.target.value)}
                            placeholder="Postal / Zip Code"
                          />
                          {errors.postalCode && (
                            <p className="text-xs text-red-600 mt-1">{errors.postalCode}</p>
                          )}
                        </div>
                      </div>
                    </section>
                  )}

                  <section>
                    <label className="text-sm font-semibold text-gray-900">Comments</label>
                    <textarea
                      rows={4}
                      className="w-full mt-1 border border-gray-300 rounded px-3 py-2 text-sm"
                      value={customer.comments}
                      onChange={(e) => handleCustomerChange("comments", e.target.value)}
                    />
                  </section>

                  <section className="bg-[#f7d6d7] border border-[#efb5b8] rounded p-3">
                    <h3 className="text-sm font-bold text-gray-900 mb-2">Payment Methods</h3>
                    <label className="flex items-center gap-2 text-sm text-gray-800">
                      <input
                        type="radio"
                        name="paymentMethod"
                        checked={customer.paymentMethod === "card"}
                        onChange={() => handleCustomerChange("paymentMethod", "card")}
                      />
                      Debit or Credit Card
                    </label>
                    <label className="flex items-center gap-2 text-sm text-gray-800 mt-1">
                      <input
                        type="radio"
                        name="paymentMethod"
                        checked={customer.paymentMethod === "paypal"}
                        onChange={() => handleCustomerChange("paymentMethod", "paypal")}
                      />
                      PayPal
                    </label>
                    {customer.paymentMethod === "paypal" && (
                      <p className="mt-2 inline-block bg-[#dc2626] text-white text-xs px-2 py-1 rounded">
                        There is an error in PayPal connection. Please contact form owner.
                      </p>
                    )}
                    {errors.paymentMethod && (
                      <p className="text-xs text-red-600 mt-2">{errors.paymentMethod}</p>
                    )}
                  </section>

                  <div className="flex justify-center pt-2 pb-2">
                    <button
                      type="submit"
                      className="px-14 py-3 rounded bg-green-600 text-white font-semibold hover:bg-green-700 transition-colors"
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

export default FoodOrderForm;
