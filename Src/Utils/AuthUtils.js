import CustomToast from '../Components/Molecules/CustomToast';

function isValidEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}
function isValidPhoneNumber(phoneNumber) {
  const phoneRegex = /^\d{10}$/;
  return phoneRegex.test(phoneNumber);
}
export const SignUpValidator = (
  email,
  password,
  confirmPassword,
  name,
  phoneNumber,
  toast,
) => {
  if (
    email === '' ||
    password === '' ||
    confirmPassword === '' ||
    name === '' ||
    phoneNumber === ''
  ) {
    toast.show({
      placement: 'bottom',
      render: ({id}) => {
        return <CustomToast text="Please fill all fields" id={id} />;
      },
    });
    return true;
  }
  if (password !== confirmPassword) {
    toast.show({
      placement: 'bottom',
      render: ({id}) => {
        return (
          <CustomToast
            text="Password and confirm password do not match"
            id={id}
          />
        );
      },
    });
    return true;
  }
  if (password.length < 8) {
    toast.show({
      placement: 'bottom',
      render: ({id}) => {
        return (
          <CustomToast text="Password must be at least 8 characters" id={id} />
        );
      },
    });
    return true;
  }
  if (!isValidEmail(email)) {
    toast.show({
      placement: 'bottom',
      render: ({id}) => {
        return <CustomToast text="Please enter a valid email" id={id} />;
      },
    });
    return true;
  }
  if (!isValidPhoneNumber(phoneNumber)) {
    toast.show({
      placement: 'bottom',
      render: ({id}) => {
        return <CustomToast text="Please enter a valid phone number" id={id} />;
      },
    });
    return true;
  }
  return false;
};

export const LoginValidator = (email, password, toast) => {
  if (email === '' || password === '') {
    toast.show({
      placement: 'bottom',
      render: ({id}) => {
        return <CustomToast text="Please fill all fields" id={id} />;
      },
    });
    return true;
  }
  if (!isValidEmail(email)) {
    toast.show({
      placement: 'bottom',
      render: ({id}) => {
        return <CustomToast text="Please enter a valid email" id={id} />;
      },
    });
    return true;
  }
  if (password.length < 8) {
    toast.show({
      placement: 'bottom',
      render: ({id}) => {
        return (
          <CustomToast text="Password must be at least 8 characters" id={id} />
        );
      },
    });
    return true;
  }
  return false;
};
