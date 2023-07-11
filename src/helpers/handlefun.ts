export const handlefun = (isSuccess: boolean, isLink: boolean): string => {
  let data;
  if (isSuccess === true) {
    setTimeout(() => {
      "<h1>Login successfully!</h1>";
    }, 5000);
    if (isLink === true) {
      data = "https://www.google.com/";
    } else {
      data = "https://www.facebook.com/";
    }
  } else {
    setTimeout(() => {
      "<h1>Login Failed!</h1>";
    }, 1000);
    if (isLink === true) {
      data = "/gbutton";
    } else {
      data = "/fbutton";
    }
  }
  return data;
};
