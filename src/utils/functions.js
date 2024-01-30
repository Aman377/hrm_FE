import { toast } from "react-toastify";

// remove all falsy property from  object
export function removeFalsyProperties(obj) {
  const newObj = {};
  for (const prop in obj) {
    if (obj.hasOwnProperty(prop) && obj[prop]) {
      newObj[prop] = obj[prop];
    }
  }
  return newObj;
}

export function stringShorter(str, length) {
  return str?.length > length ? str.slice(0, length) + "..." : str;
}

export function buildQuery(obj) {
  const queryParams = [];
  for (const key in obj) {
    if (obj[key]) {
      queryParams.push(`${key}=${obj[key]}`);
    }
  }

  return queryParams.length ? queryParams.join("&") : "";
}

export function toastHandler(message, status) {
  if (status === "warning") {
    toast.warning(message)
  } else if (status === "success") {
    toast.success(message);
  }
}