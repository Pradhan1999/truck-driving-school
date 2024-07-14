import moment from "moment";

type Time = Date | string;

export function getInitials(name?: string): string {
  if (name) {
    const initials = name.match(/\b\w/g) || [];
    return ((initials.shift() || "") + (initials.pop() || "")).toUpperCase();
  }
  return "";
}

export function fullName(firstName: any, lastName?: any) {
  const capitalize = (name: string) =>
    name.charAt(0).toUpperCase() + name.slice(1).toLowerCase();

  const first = firstName ? capitalize(firstName) : "";
  // const middle = firstName ? capitalize(middleName) : "";
  const last = lastName ? capitalize(lastName) : "";

  return `${first} ${last}`.trim();
}

export function getFullAddress(
  streetNo?: any,
  streetName?: any,
  city?: any,
  postalCode?: any
) {
  const addressParts = [];

  if (streetNo) addressParts.push(streetNo);
  if (streetName) addressParts.push(streetName);
  if (city) addressParts.push(city);
  if (postalCode) addressParts.push(postalCode);

  return addressParts.join(", ");
}

export const formatCurrency = (amount: number) =>
  new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    currencyDisplay: "narrowSymbol",
  }).format(amount);

export const unFormatCurrency = (amount: string) => {
  return !amount ? 0 : Number(amount.replace(/[^0-9.-]+/g, ""));
};

export const getDays = (start: Time, end: Time) => {
  const startDate = new Date(start);
  const endDate = new Date(end);
  const diffTime = Math.abs(endDate.getTime() - startDate.getTime());
  return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
};

export const encodeURL = (path: string) => {
  return btoa(encodeURIComponent(path));
};

export const decodeURL = (path: string) => {
  return decodeURIComponent(atob(path));
};

// Moment format - moment().format("ddd, ll") - removeCurrentYear(date,'ddd, ll') - Fri, Dec 2
export const removeCurrentYear = (date: any, dateFormat: string) => {
  if (new Date().getFullYear() === new Date(date).getFullYear()) {
    return moment(date).format(dateFormat).split(",").slice(0, 2).join();
  }
  return moment(date).format(dateFormat);
};

// Moment format - moment().format("LLLL") - removeCurrentYearLong(date,'LLLL') - Friday, December 9 at 12:01 AM
export const removeCurrentYearLong = (date: any, dateFormat: string) => {
  if (new Date().getFullYear() === new Date(date).getFullYear()) {
    return moment(date)
      .format(dateFormat)
      .replace(`, ${new Date().getFullYear()}`, " at ");
  }
  return moment(date).format(dateFormat);
};

export const pluralize = (
  count: number,
  noun: string,
  suffix?: string | null | undefined
) => {
  if (count === 0) {
    return `0 ${noun}`;
  }

  let updatedSuffix = suffix;
  let modifiedNoun = noun;
  if (!updatedSuffix) {
    updatedSuffix = count !== 1 ? "s" : "";
  }

  // Add additional cases for custom suffixes
  if (count === 1 && modifiedNoun.endsWith("y")) {
    modifiedNoun = `${modifiedNoun.slice(0, -1)}y`; // Change 'y' to 'ies'
  } else if (count !== 1 && modifiedNoun.endsWith("s")) {
    modifiedNoun = modifiedNoun.slice(0, -1); // Remove 's'
  } else {
    modifiedNoun += updatedSuffix; // Use the provided suffix
  }

  return `${count} ${noun}`;
};

// Calculate today date
export const todayDate = () => {
  return new Date();
};

// Calculate yesterday date
export const yesterdayDate = () => {
  const today = new Date();
  return new Date(today.getFullYear(), today.getMonth(), today.getDate() - 1);
};

// Calculate this week date
export const thisWeekDate = () => {
  const today = new Date();
  return new Date(
    today.getFullYear(),
    today.getMonth(),
    today.getDate() - today.getDay() + 1
  );
};

// Calculate last week date
export const lastWeekDate = () => {
  const today = new Date();
  return new Date(
    today.getFullYear(),
    today.getMonth(),
    today.getDate() - today.getDay()
  );
};

// Calculate this month date
export const thisMonthDate = () => {
  const today = new Date();
  return new Date(today.getFullYear(), today.getMonth(), 1);
};

// Calculate last month date
export const lastMonthDate = () => {
  const today = new Date();
  return new Date(today.getFullYear(), today.getMonth() - 1, 1);
};

// Calculate this year date
export const thisYearDate = () => {
  const today = new Date();
  return new Date(today.getFullYear(), 0, 1);
};

// Calculate last year date
export const lastYearDate = () => {
  const today = new Date();
  return new Date(today.getFullYear() - 1, 0, 1);
};

// Calculate this quarter date
export const thisQuarterDate = () => {
  const today = new Date();
  return new Date(
    today.getFullYear(),
    today.getMonth() - (today.getMonth() % 3),
    1
  );
};

// Calculate last quarter date
export const lastQuarterDate = () => {
  const today = new Date();
  return new Date(
    today.getFullYear(),
    today.getMonth() - (today.getMonth() % 3) - 3,
    1
  );
};

// Calculate last 30 days date
export const last30DaysDate = () => {
  const today = new Date();
  return new Date(today.getFullYear(), today.getMonth(), today.getDate() - 30);
};

export const currentYear = () => {
  const today = new Date();
  return today.getFullYear();
};

export const currentMonth = () => {
  const today = new Date();
  return today.getMonth();
};

export const longText = (text: string, length: number) => {
  if (text?.split(" ").length > length) {
    return `${text.split(" ").splice(0, length).join(" ")}...`;
  }
  return text;
};

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const filterEmptyValuesInObject = (object: Record<any, any>) => {
  return Object.fromEntries(
    Object.entries(object).filter(
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      ([key, value]) => value !== null && value !== undefined && value !== ""
    )
  );
};

export const convertTimestamp = (timestamp: string): string => {
  const dt = new Date(timestamp);
  const options: Intl.DateTimeFormatOptions = {
    hour: "numeric",
    minute: "numeric",
    hour12: true,
  };
  const formattedTime = dt.toLocaleString("en-US", options);
  // const today = new Date().toLocaleDateString("en-US");

  const oneDay = 24 * 60 * 60 * 1000; // One day in milliseconds
  const diffDays = Math.floor((Date.now() - dt.getTime()) / oneDay); // Calculate the difference in days

  if (diffDays === 0) {
    return `Today at ${formattedTime}`;
  }
  if (diffDays === 1) {
    return `Yesterday at ${formattedTime}`;
  }
  const cYear = new Date().getFullYear();
  const formattedDate = dt.toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
  });
  const formattedDateTime = formattedTime
    .replace(/:00 /, " ")
    .replace(/:00$/, "");
  const formattedYear =
    dt.getFullYear() === cYear ? "" : ` ${dt.getFullYear()}`;
  return `${formattedDate}${formattedYear}, ${formattedDateTime}`;
};
