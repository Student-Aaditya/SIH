// // LocalStorage helper for students: seed initial data, get, add, update, delete
// // Passwords are stored as SHA-256 hash (uses fileToHash from utils/hash.js)
// import { fileToHash } from "./hash";

// const STORAGE_KEY = "unialum.students_v1";

// // simple unique id generator
// function uid() {
//   return Date.now().toString(36) + Math.random().toString(36).slice(2,8);
// }

// // top 6 real students (seeded first)
// const REAL_STUDENTS_RAW = [
//   ["Aaditya", "aaditya.student518@gmail.com", "+918130424124", "AIML", 2020, "aaditya001", "Aaditya@001", ["Python","ML"]],
//   ["Aditya Gupta", "aditya53623@student.com", "+916386330389", "AIML", 2019, "aditya011", "Aditya@011", ["Java","AI"]],
//   ["Harshita Singh", "hs8123956@student.com", "+917307607022", "CSE(AI)", 2020, "harshita022", "Harshita@022", ["Python","Data Science"]],
//   ["Namrata Agarwal", "namrataagarwal0109@student.com", "+919140496721", "AIML", 2019, "namrata0109", "Namrata@0109", ["AI","DL"]],
//   ["Prathmesh Chauhan", "prathmesh321@student.com", "+918081400291", "CSE", 2020, "prathmesh036", "Prathmesh@036", ["C++","Algorithms"]],
//   ["Vikas Sharma", "vikassharma53489@student.com", "+918423039341", "AIML", 2019, "vikas017", "Vikas@017", ["Python","ML"]]
// ];

// // dummy names for extra students
// const seedIndianNames = [
//   "Aarav Sharma","Vivaan Kumar","Arjun Patel","Ishaan Verma","Krishna Singh",
//   "Ananya Gupta","Sakshi Reddy","Priya Nair","Neha Joshi","Riya Mehta",
//   "Aditya Rao","Rohit Mishra","Karan Kapoor","Suman Ghosh","Pooja Desai"
// ];

// async function hashPasswordStr(pw) {
//   if (!pw) return "";
//   return await fileToHash(String(pw));
// }

// export async function seedInitialIfEmpty() {
//   const raw = localStorage.getItem(STORAGE_KEY);
//   if (raw) {
//     try {
//       const parsed = JSON.parse(raw);
//       if (Array.isArray(parsed) && parsed.length > 0) return parsed;
//     } catch (e) {}
//   }

//   // Build top 6 real students with hashed passwords
//   const realPromises = REAL_STUDENTS_RAW.map(async (row) => {
//     const [name, email, phone, branch, year, userId, password, interests] = row;
//     return {
//       id: uid(),
//       name,
//       email,
//       phone,
//       branch,
//       admissionYear: year,
//       userId,
//       passwordHash: await hashPasswordStr(password),
//       profileImage: "",
//       interests,
//       isOptedOut: false
//     };
//   });

//   const real = await Promise.all(realPromises);

//   // Generate 12 dummy students
//   const extras = seedIndianNames.slice(0,12).map((name,idx)=>{
//     const id = uid();
//     const parts = name.split(" ");
//     const first = parts[0].toLowerCase();
//     const last = (parts[1]||"user").toLowerCase();
//     const email = `${first}.${last}@xyz.co.in`;
//     const userId = `${first}.${last}${idx+1}`.replace(/\s+/g,"");
//     const branch = ["Computer Science","IT","ECE","Mechanical","Civil"][idx%5];
//     const admissionYear = 2016 + (idx % 7);
//     const interests = ["Python","JavaScript","C++","AI","ML"].slice(0,(idx%5)+1);
//     const phone = "9" + Math.floor(10000000 + Math.random()*89999999).toString();
//     const pwd = `dummy${idx+1}#`;
//     return {
//       id,
//       name,
//       email,
//       phone,
//       branch,
//       admissionYear,
//       userId,
//       passwordHash: "", // will fill after hash
//       profileImage: "",
//       interests,
//       isOptedOut: false,
//       __rawPwd: pwd
//     };
//   });

//   // Hash dummy passwords
//   const extrasHashed = await Promise.all(extras.map(async e => {
//     const hash = await hashPasswordStr(e.__rawPwd||"password");
//     delete e.__rawPwd;
//     e.passwordHash = hash;
//     return e;
//   }));

//   const combined = real.concat(extrasHashed);
//   localStorage.setItem(STORAGE_KEY, JSON.stringify(combined));
//   return combined;
// }

// export function getAllStudents() {
//   const raw = localStorage.getItem(STORAGE_KEY);
//   if (!raw) return [];
//   try { return JSON.parse(raw); } catch(e) { return []; }
// }

// export function saveAllStudents(list) {
//   localStorage.setItem(STORAGE_KEY, JSON.stringify(list));
// }

// export function addStudent(obj) {
//   const list = getAllStudents();
//   list.unshift(obj);
//   saveAllStudents(list);
// }

// export function updateStudent(updated) {
//   const list = getAllStudents();
//   const idx = list.findIndex(x => x.id === updated.id);
//   if (idx >= 0) list[idx] = updated;
//   saveAllStudents(list);
// }

// export function deleteStudent(id) {
//   const list = getAllStudents().filter(x => x.id !== id);
//   saveAllStudents(list);
// }

// Student storage helper
import { fileToHash } from "./hash";

const STORAGE_KEY = "unialum.students_v1";

function uid() {
  return Date.now().toString(36) + Math.random().toString(36).slice(2,8);
}

// Top 6 real students
const REAL_STUDENTS_RAW = [
  ["Aaditya","aadityakuamr518@gmail.com","+918130424124","AIML",2023,"aaditya001","Aaditya@001","Java, Python"],
  ["Aditya Gupta","aditya53623@gmail.com","+916386330389","AIML",2022,"aditya011","Aditya@011","ML, SQL"],
  ["Harshita Singh","hs8123956@gmail.com","+917307607022","CSE(AI)",2023,"harshita022","Harshita@022","Python, Data Science"],
  ["Namrata Agarwal","namrataagarwal0109@gmail.com","+919140496721","AIML",2022,"namrata0109","Namrata@0109","AI, NLP"],
  ["Prathmesh Chauhan","prathmesh321vns@gmail.com","+918081400291","CSE",2023,"prathmesh036","Prathmesh@036","Java, WebDev"],
  ["Vikas Sharma","vikassharma53489@gmail.com","+918423039341","AIML",2022,"vikas017","Vikas@017","ML, Python"]
];

// Dummy student names
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

// Seed initial data if localStorage empty
export async function seedInitialIfEmpty() {
  const raw = localStorage.getItem(STORAGE_KEY);
  if (raw) {
    try {
      const parsed = JSON.parse(raw);
      if (Array.isArray(parsed) && parsed.length>0) return parsed;
    } catch(e){}
  }

  // Real students
  const realPromises = REAL_STUDENTS_RAW.map(async r=>{
    const [name,email,phone,branch,admissionYear,userId,password,interestsStr] = r;
    return {
      id: uid(), name,email,phone,branch,admissionYear,userId,
      passwordHash: await hashPasswordStr(password),
      profileImage:"",
      interests: interestsStr.split(",").map(s=>s.trim()),
      certificates: [],
      isOptedOut:false
    };
  });
  const real = await Promise.all(realPromises);

  // Dummy students
  const extras = seedIndianNames.slice(0,12).map((name,idx)=>{
    const id = uid();
    const parts = name.split(" ");
    const first = parts[0].toLowerCase();
    const last = (parts[1]||"user").toLowerCase();
    const email = `${first}.${last}@xyz.co.in`;
    const userId = `${first}.${last}${idx+1}`.replace(/\s+/g,"");
    const branch = ["Computer Science","IT","ECE","Mechanical","Civil"][idx%5];
    const admissionYear = 2016 + (idx%7);
    const interests = ["Python","JavaScript","AI","ML","Web Dev"].slice(0,(idx%5)+1);
    const phone = "9"+Math.floor(10000000+Math.random()*89999999);
    const pwd = `dummy${idx+1}#`;
    return {id,name,email,phone,branch,admissionYear,userId,passwordHash:"",profileImage:"",interests,certificates:[],isOptedOut:false,__rawPwd:pwd};
  });

  // Hash dummy passwords
  const extrasHashed = await Promise.all(extras.map(async e=>{
    e.passwordHash = await hashPasswordStr(e.__rawPwd||"password");
    delete e.__rawPwd;
    return e;
  }));

  const combined = real.concat(extrasHashed);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(combined));
  return combined;
}

export function getAllStudents() {
  try { return JSON.parse(localStorage.getItem(STORAGE_KEY)||"[]"); }
  catch(e){ return []; }
}

export function saveAllStudents(list) { localStorage.setItem(STORAGE_KEY,JSON.stringify(list)); }
export function addStudent(obj){ const list = getAllStudents(); list.unshift(obj); saveAllStudents(list); }
export function updateStudent(updated){ const list = getAllStudents(); const idx = list.findIndex(x=>x.id===updated.id); if(idx>=0) list[idx]=updated; saveAllStudents(list);}
export function deleteStudent(id){ const list = getAllStudents().filter(x=>x.id!==id); saveAllStudents(list);}
