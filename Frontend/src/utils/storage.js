// src/utils/storage.js
// LocalStorage helper: seed initial data (top 6 real entries + dummy), get, add, update, delete.
// Passwords are stored as SHA-256 hash (we use fileToHash from utils/hash.js).
import { fileToHash } from "./hash";

const STORAGE_KEY = "unialum.alumni_v1";

function uid() {
  return Date.now().toString(36) + Math.random().toString(36).slice(2, 8);
}

// top 6 real alumni (tumhare diye hue data) - yeh hamesha seed me top pe rahenge
const REAL_ALUMNI_RAW = [
  ["Aaditya", "aadityakuamr518@gmail.com", "+918130424124", "AIML", 2023, "Microsoft", "aaditya001", "Aaditya@001"],
  ["Aditya Gupta", "aditya53623@gmail.com", "+916386330389", "AIML", 2022, "Amazon", "aditya011", "Aditya@011"],
  ["Harshita Singh", "hs8123956@gmail.com", "+917307607022", "CSE(AI)", 2023, "Meta", "harshita022", "Harshita@022"],
  ["Namrata Agarwal", "namrataagarwal0109@gmail.com", "+919140496721", "AIML", 2022, "Google", "namrata0109", "Namrata@0109"],
  ["Prathmesh Chauhan", "prathmesh321vns@gmail.com", "+918081400291", "CSE", 2023, "Microsoft", "prathmesh036", "Prathmesh@036"],
  ["Vikas Sharma", "vikassharma53489@gmail.com", "+918423039341", "AIML", 2022, "Amazon", "vikas017", "Vikas@017"]
];

// dummy name pool (same as pehle)
const seedIndianNames = [
  "Aarav Sharma","Vivaan Kumar","Arjun Patel","Ishaan Verma","Krishna Singh",
  "Ananya Gupta","Sakshi Reddy","Priya Nair","Neha Joshi","Riya Mehta",
  "Aditya Rao","Rohit Mishra","Karan Kapoor","Suman Ghosh","Pooja Desai",
  "Manish Choudhary","Deepak Yadav","Tanvi Jain","Siddharth Bhatt","Meera Sinha"
];

async function hashPasswordStr(pw) {
  if (!pw) return "";
  return await fileToHash(String(pw));
}

export async function seedInitialIfEmpty() {
  const raw = localStorage.getItem(STORAGE_KEY);
  if (raw) {
    try {
      const parsed = JSON.parse(raw);
      if (Array.isArray(parsed) && parsed.length > 0) return parsed;
    } catch (e) {
      // continue to seed
    }
  }

  // Build real top entries (hash password)
  const realPromises = REAL_ALUMNI_RAW.map(async (row) => {
    const [name, email, phone, branch, year, company, userId, password] = row;
    return {
      id: uid(),
      name,
      email,
      phone,
      branch,
      graduationYear: year,
      company,
      userId,
      passwordHash: await hashPasswordStr(password),
      profileImage: "", // no avatar now
      position: "",
      skills: [],
      certificates: [], // {id,title,issueDate,fileName,dataUrl,hash,type}
      isOptedOut: false
    };
  });

  const real = await Promise.all(realPromises);

  // Generate 12 dummy with @xyz.co.in extension
  const extras = seedIndianNames.slice(0, 12).map((name, idx) => {
    const id = uid();
    const parts = name.split(" ");
    const first = parts[0].toLowerCase();
    const last = (parts[1] || "user").toLowerCase();
    const email = `${first}.${last}@xyz.co.in`;
    const userId = `${first}.${last}${(idx+1)}`.replace(/\s+/g, "");
    const branch = ["Computer Science","IT","ECE","Mechanical","Civil"][idx % 5];
    const graduationYear = 2016 + (idx % 7);
    const company = ["TCS","Wipro","HCL","Accenture","Capgemini"][idx % 5];
    const position = ["Engineer","Analyst","Developer","Consultant"][idx % 4];
    const skills = ["JavaScript","HTML/CSS","SQL"].slice(0, (idx % 3) + 1);
    const phone = "9" + Math.floor(10000000 + Math.random()*89999999).toString();
    const pwd = `dummy${idx+1}#`;
    return {
      id,
      name,
      email,
      phone,
      branch,
      graduationYear,
      company,
      userId,
      passwordHash: "", // will fill later with hash
      profileImage: "",
      position,
      skills,
      certificates: [],
      isOptedOut: false,
      __rawPwd: pwd // temporary, we will hash below
    };
  });

  // Hash dummy passwords
  const extrasHashed = await Promise.all(extras.map(async (e) => {
    const hash = await hashPasswordStr(e.__rawPwd || "password");
    delete e.__rawPwd;
    e.passwordHash = hash;
    return e;
  }));

  const combined = real.concat(extrasHashed);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(combined));
  return combined;
}

export function getAllAlumni() {
  const raw = localStorage.getItem(STORAGE_KEY);
  if (!raw) return [];
  try {
    return JSON.parse(raw);
  } catch (e) {
    return [];
  }
}

export function saveAllAlumni(list) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(list));
}

export function addAlumnus(obj) {
  const list = getAllAlumni();
  list.unshift(obj);
  saveAllAlumni(list);
}

export function updateAlumnus(updated) {
  const list = getAllAlumni();
  const idx = list.findIndex(x => x.id === updated.id);
  if (idx >= 0) list[idx] = updated;
  saveAllAlumni(list);
}

export function deleteAlumnus(id) {
  const list = getAllAlumni().filter(x => x.id !== id);
  saveAllAlumni(list);
}

