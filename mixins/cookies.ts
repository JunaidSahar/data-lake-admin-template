// import { IdleTransaction } from "@sentry/tracing";

const setCookie = (cname: String, cvalue: String, exdays: any) => {
  if (process.client) {
      if (cname == "countryIsoCode") {
          if (!getCookie("countryFixed") && exdays == 0) {
              setCookie("countryFixed", "true", 0)
              document.cookie = "countryIsoCode= ; expires = Thu, 01 Jan 1970 00:00:00 GMT"
          }
      }
      const d = new Date();
      d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
      if (exdays > 0) {
          let expires = "expires=" + d.toUTCString();
          document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
      }
      else {
          document.cookie = cname + "=" + cvalue + ";path=/";
      }
  }
}

function getCookie(cname: String) {
  if (process.client) {
      let name = cname + "=";
      let decodedCookie = decodeURIComponent(document.cookie);
      let ca = decodedCookie.split(';');
      for (let i = 0; i < ca.length; i++) {
          let c = ca[i];
          while (c.charAt(0) == ' ') {
              c = c.substring(1);
          }
          if (c.indexOf(name) == 0) {
              return c.substring(name.length, c.length);
          }
      }
      return "";
  }
}


function getCookieExpiry(cname: String) {
  if (process.client) {
      let name = cname + "=";
      let decodedCookie = decodeURIComponent(document.cookie);
      let ca = decodedCookie.split(';');
      for (let i = 0; i < ca.length; i++) {
          let c = ca[i];
          while (c.charAt(0) == ' ') {
              c = c.substring(1);
          }
          if (c.indexOf(name) == 0) {
              return c.substring(name.length, c.length);
          }
      }
      return "";
  }
}
export { setCookie, getCookie };