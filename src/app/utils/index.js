
export const userRegistrationFormControls = [
  {
    name: "userName",
    label: "User Name",
    placeholder: "User Name",
    componentType: "input",
    type: "text",
  },
  {
    name: "email",
    label: "Email",
    placeholder: "email",
    componentType: "input",
    type: "email",
  },
  {
    name: "password",
    label: "Password",
    placeholder: "password",
    componentType: "input",
    type: "password",
  },
];

export const userLoginFormControls = [
  {
    name: "email",
    label: "Email",
    placeholder: "email",
    componentType: "input",
    type: "email",
  },
  {
    name: "password",
    label: "Password",
    placeholder: "password",
    componentType: "input",
    type: "password",
  },
];

export const initialSignUpFormData = {
    userName : '',
    email : '',
    password : '',
  }

  export const initialLoginFormData = {
    email: '',
    password: ''
  }