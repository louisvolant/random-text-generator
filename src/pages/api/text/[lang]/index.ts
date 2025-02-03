// src/pages/api/text/[lang]/index.ts

import { NextApiResponse, NextApiRequest } from 'next';
import { readdir, stat } from 'fs/promises';
import path from 'path';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const lang = req.query.lang as string;

    const directoryPath = path.join(process.cwd(), 'public', 'texts', lang);

    try {
      await stat(directoryPath);
    } catch (error: unknown) {
      if (error instanceof Error) {
        const err = error as Error;
        if ('code' in err && err.code === 'ENOENT') { // Check if 'code' exists
          return res.status(404).json({ error: "Excerpts not found for this language" });
        } else {
          console.error("Error checking directory:", err);
          return res.status(500).json({ error: "Internal Server Error" });
        }
      } else {
          console.error("An unknown error has occured : ", error);
          return res.status(500).json({ error: "Internal Server Error" });
      }
    }

    const files = await readdir(directoryPath);
    if (files.length === 0) {
      return res.status(404).json({ error: "Excerpts not found for this language" }); // Use res.status
    }

    return res.status(200).json(files.filter(file => file.endsWith('.json'))); // Use res.status
  } catch (error) {
    console.error("Error in API:", error);
    return res.status(500).json({ error: "Internal Server Error" }); // Use res.status
  }
}