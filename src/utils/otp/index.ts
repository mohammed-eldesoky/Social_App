
export const generateOtp = ():string => {
  return Math.floor( Math.random() * 999999+ 100000).toString();
};

// create otp and expiry time


export const generateOtpExpiryTime = (minutes:number):Date => {

    return new Date(Date.now() + minutes * 60 * 1000 ) // current time + minutes in milliseconds
}