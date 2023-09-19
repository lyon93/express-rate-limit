import { Request, Response, NextFunction } from "express";

interface UserBucket {
  tokens: number;
  lastFill: number;
}

// You should user a different store like Redis, Cloudflare KV  for this instead of a Map for large scale applications.
const userTokens = new Map<string, UserBucket>();

const rate = 60000; // 1 minute in milliseconds
const capacity = 5; // 5 requests per minute

export const rateLimiter = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const userId = req.ip;

  if (!userTokens.has(userId)) {
    userTokens.set(userId, {
      tokens: capacity,
      lastFill: Date.now(),
    });
  }

  
  res.setHeader("X-RateLimit-Limit", capacity.toString());

  const userBucket = userTokens.get(userId)!;
  const now = Date.now();
  const timeElapsed = now - userBucket.lastFill;
  const tokensToAdd = Math.floor(timeElapsed / rate);

  if (tokensToAdd > 0) {
    userBucket.tokens = Math.min(capacity, userBucket.tokens + tokensToAdd);
    userBucket.lastFill = now;
  }

  if (userBucket.tokens > 0) {
    userBucket.tokens -= 1;
    res.setHeader("X-RateLimit-Remaining", userBucket.tokens.toString());
    res.setHeader(
      "X-RateLimit-Reset",
      new Date(userBucket.lastFill + rate).toISOString()
    );
    next();
  } else {
    res.setHeader("X-RateLimit-Remaining", "0");
    res.setHeader(
      "X-RateLimit-Reset",
      new Date(userBucket.lastFill + rate).toISOString()
    );
    res.status(429).send({ message: "Rate limit exceeded" });
  }
};
