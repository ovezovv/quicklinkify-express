import { createHash } from "crypto";

const generateTinyURL = (username:string, url: string): string => {
  const hash = createHash('md5').update(`${username}${url}`).digest('hex');
  return `${process.env.HOST_DOMAIN}${hash.substring(0, 10)}`;
};

export {
  generateTinyURL
}