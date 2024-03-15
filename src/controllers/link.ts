import { Request, Response } from 'express';
import logger from '../utils/logger';
import { generateTinyURL } from '../utils/service';
import { Link } from '../models/Link';

export const register = async (req: Request, res: Response) => {
  try {
    const {username, url, reqLimit} = req.body;
    let insertableUrl: string;

    if (url.startsWith("http")) {
      insertableUrl = url
    } else {
      insertableUrl = `https://${url}`
    }

    const existingLink = await Link.findOne({
      username,
      url: insertableUrl
    });

    if (existingLink) {
      return res.status(400).send("You have already had this link in your account");
    }

    const shortUrl = generateTinyURL(username, insertableUrl);

    const link = await Link.create({
      username,
      url: insertableUrl,
      shortUrl,
      reqLimit
    });

    return res.status(200).json({link}).end();
  } catch (error) {
    logger.log('error', error);
    return res.status(400).send("Make sure you have filled in correctly!");
  }
}

export const parseAndRedirect = async (req: Request, res: Response) => {
  try {
    const { url } = req.params;
    const shortUrl = `${process.env.HOST_DOMAIN}${url}`

    const link = await Link.findOne({ shortUrl })

    if (link && !link.isExpired) {
      link.visitCount += 1;
      link.reqLimit -=1;

      if (link.reqLimit === 0) link.isExpired = true
      await link.save();

      return res.redirect(link.url);
    } else {
      return res.status(404).send("URL not found or expired");
    }
  } catch (error) {
    logger.log('error', error);
    return res.status(400).send("Make sure you have filled in correctly!");
  }
}

export const getUserLinks = async (req: Request, res: Response) => {
  try {
    const { username } = req.params;
  
    const links = await Link.find({ username })

    return res.status(200).json({
      links
    })
  } catch (error) {
    logger.log('error', error);
    return res.status(400).send("Make sure you have filled in correctly!");
  }
}