import * as Yup from "yup";

const phoneRegExp = /^((\+92)?(0092)?(92)?(0)?)(3)([0-9]{9})$/;
const urlRegExp =
  /((https?):\/\/)?(www.)?[a-z0-9]+(\.[a-z]{2,}){1,3}(#?\/?[a-zA-Z0-9#]+)*\/?(\?[a-zA-Z0-9-_]+=[a-zA-Z0-9-%]+&?)?$/;

export const updateStudent = Yup.object({
  name: Yup.string()
    .trim()
    .max(30, "Must be 30 characters or less")
    .required("Required"),
  cgpa: Yup.number()
    .positive("CGPA must be a positive number")
    .max(4.0, "CGPA should not be exceed from 4. Invalid CGPA")
    .required("Required"),
  edjucation: Yup.string().required("Required"),
  phone: Yup.string()
    .matches(phoneRegExp, "Invalid Phone Number")
    .required("Required phone"),
  date: Yup.date()
    .max(new Date(Date.now() - 568111068000), "You must be at least 18 years")
    .required("Required"),
  skills: Yup.string().trim().required("Required"),
  Address: Yup.string()
    .trim()
    .min(30, "min 30 characters")
    .max(40, "max 30 characters")
    .required("Required"),
  bio: Yup.string()
    .trim()
    .max(30, "Max 30 characters or less")
    .required("Required"),
});

export const updateCompany = Yup.object({
  name: Yup.string()
    .trim()
    .max(30, "max 30 characters or less")
    .required("Required"),
  phone: Yup.string()
    .trim()
    .matches(phoneRegExp, "Invalid Phone Number")
    .required("Required"),
  website: Yup.string()
    .trim()
    .matches(urlRegExp, "Invalid Website")
    .required("Required"),
  Address: Yup.string().trim().max(40, "Invalid Address").required("Required"),
});

export const SignUp = Yup.object({
  name: Yup.string()
    .trim()
    .max(25, "Max 25 characters ")
    .min(5, "At least 5 characters or more")
    .required("Required"),
  Address: Yup.string()
    .max(40, "Max 40 characters ")
    .min(30, "Must be 15 characters or more")
    .required("Required"),
  email: Yup.string()
    .trim()
    .email("Invalid email address")
    .required("Required"),
  password: Yup.string()
    .trim()
    .min(6, "Password must be at least 6 charaters")
    .max(15, "Password must be 15 charaters or less")
    .required("Required"),
  rule: Yup.string().required("Required"),

  phone: Yup.string()
    .trim()
    .matches(phoneRegExp, "Phone number is not valid")
    .required("Required"),
});

export const LoginForm = Yup.object({
  email: Yup.string()
    .trim()
    .email("Invalid email address")
    .required("Required"),
  password: Yup.string().trim().required("Required"),
});

export const JobPost = Yup.object({
  jobtitle: Yup.string()
    .trim()
    .max(25, "Max 25 characters ")
    .required("Required"),
  jobdescription: Yup.string()
    .trim()
    .max(500, "max 500 characters ")
    .required("Required"),
  jobtype: Yup.mixed().required("Required"),
  lastdate: Yup.date()
    .min(new Date(Date.now()), "Last Date must  be in the future")
    .max(
      new Date(
        Date.now() + 1000 /*sec*/ * 60 /*min*/ * 60 /*hour*/ * 24 /*day*/ * 20
      ),
      "Last date should not be exceed from 30 days"
    )
    .required("Required"),
  salary: Yup.number()
    .positive("Salary must be a positive number")
    .required("Required"),
  edjucation: Yup.mixed().required("Required"),
  Experience: Yup.string().trim().required("Required"),
});
