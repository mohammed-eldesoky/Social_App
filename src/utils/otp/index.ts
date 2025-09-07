
export const generateOtp = ():string => {
  return Math.floor( Math.random() * 999999+ 100000) as unknown as string;
};

// create otp and expiry time


export const generateOtpExpiryTime = (minutes:number) => {

    return Date.now() + minutes ;
}