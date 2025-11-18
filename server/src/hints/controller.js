import pool from "../../db.js";
import * as queries from "./queries.js";
import * as dotenv from "dotenv"; // see https://github.com/motdotla/dotenv#how-do-i-use-dotenv-with-import
import Redis from "ioredis";
import { redisClient } from "../../server.js";
dotenv.config();

// export const addTemporaryHint = async (request, response) => {
//   const { qlink, hints } = request.body;

//   // Pad hints array with null if length is less than 5
//   while (hints.length < 5) {
//     hints.push(null);
//   }

//   try {
//     const results = await pool.query(queries.addTemporaryHint, [
//       ...hints,
//       qlink,
//       request.user.id,
//     ]);

//     response.status(201).json(results.rows[0]);
//   } catch (err) {
//     console.log("Error adding hint:", err);
//     response.status(400).json({ message: "Error adding hint." });
//   }
// };
export const addTemporaryHint = async (req, res) => {
  try {
    const { qlink, hints } = req.body;
    const uid = req.user.id;

    // Normalize hints (ensure 5 items)
    while (hints.length < 5) hints.push(null);

    // 1️⃣ Detect platform
    let platform = 'unknown';
    if (qlink.includes("leetcode.com")) platform = "leetcode";
    else if (qlink.includes("codeforces.com")) platform = "codeforces";
    else if (qlink.includes("geeksforgeeks.org")) platform = "gfg";

    // 2️⃣ Extract question name from URL
    const parts = qlink.split("/");
    const qname = parts[parts.length - 2] || "Unknown";

    // 3️⃣ Insert into QUESTION TABLE
    const questionResult = await pool.query(
      `INSERT INTO question (qlink1, qlink2, platform, qname)
       VALUES ($1, $2, $3, $4)
       RETURNING qid`,
      [qlink, qlink, platform, qname]
    );

    const qid = questionResult.rows[0].qid;

    // 4️⃣ Insert into TEMPHINT TABLE
    const hintResult = await pool.query(
      `INSERT INTO temphint (hints, uid, qlink, qid)
       VALUES ($1, $2, $3, $4)
       RETURNING *`,
      [hints, uid, qlink, qid]
    );

    res.status(201).json(hintResult.rows[0]);
  } catch (err) {
    console.error("Error adding hint:", err);
    res.status(400).json({ message: "Error adding hint." });
  }
};


export const upDownvoteHint = async (request, response) => {
  const { upvote, downvote, hintId } = request.body;
  try {
    if (upvote == 1 || upvote == -1 || downvote == 1 || downvote == -1) {
      if (upvote == 1) {
        // add user id to set of upvotes in redis
        const query = await redisClient.sadd(
          `upvote:${hintId}`,
          request.user.id
        );
      } else if (upvote == -1) {
        // remove user id from set of upvotes in redis
        const query = await redisClient.srem(
          `upvote:${hintId}`,
          request.user.id
        );
      }
      if (downvote == 1) {
        // add user id to set of downvotes in redis
        const query = await redisClient.sadd(
          `downvote:${hintId}`,
          request.user.id
        );
      } else if (downvote == -1) {
        // remove user id from set of downvotes in redis
        const query = await redisClient.srem(
          `downvote:${hintId}`,
          request.user.id
        );
      }
    } else {
      response.status(400).json({ message: "Invalid request." });
    }
  } catch (err) {
    console.log(err);
    response.status(400).json({ message: "Error updating vote." });
  } finally {
    response.status(200).json({ message: "Vote updated successfully." });
  }
};

export const getHints = async (request, response) => {
  try {
    const { qid, limit, offset } = request.body;

    const results = await new Promise((resolve, reject) => {
      pool.query(queries.getHints, [qid, limit, offset], (error, results) => {
        if (error) {
          reject(error);
        } else {
          resolve(results);
        }
      });
    });

    const allHints = results.rows;

    const updatedHints = await Promise.all(
      allHints.map(async (hint) => {
        try {
          hint.totalUpvotes = await redisClient.scard(`upvote:${hint.hid}`);
          hint.totalDownvotes = await redisClient.scard(`downvote:${hint.hid}`);
          hint.isUpvoted = await redisClient.sismember(
            `upvote:${hint.hid}`,
            request.user ? request.user.id : -1
          );
          hint.isDownvoted = await redisClient.sismember(
            `downvote:${hint.hid}`,
            request.user ? request.user.id : -1
          );

          return hint;
        } catch (err) {
          console.log(err);
          return hint;
        }
      })
    );

    const finalHints = await Promise.all(
      updatedHints.map(async (hint) => {
        try {
          const userResults = await new Promise((resolve, reject) => {
            pool.query(queries.getUser, [hint.uid], (error, results) => {
              if (error) {
                reject(error);
              } else {
                resolve(results);
              }
            });
          });

          hint.username = userResults.rows[0].username;
          return hint;
        } catch (err) {
          console.log(err);
          return hint;
        }
      })
    );

    response.status(200).json(finalHints);
  } catch (error) {
    console.log(error);
    response.status(500).json({ message: "Internal server error" });
  }
};

export const getHintsByVotes = async (request, response) => {
  try {
    const { qid, limit, offset } = request.body;

    const results = await new Promise((resolve, reject) => {
      pool.query(queries.getHintsByVotes, [qid], (error, results) => {
        if (error) {
          reject(error);
        } else {
          resolve(results);
        }
      });
    });

    const allHints = results.rows;

    const updatedHints = await Promise.all(
      allHints.map(async (hint) => {
        try {
          hint.totalUpvotes = await redisClient.scard(`upvote:${hint.hid}`);
          hint.totalDownvotes = await redisClient.scard(`downvote:${hint.hid}`);
          hint.isUpvoted = await redisClient.sismember(
            `upvote:${hint.hid}`,
            request.user ? request.user.id : -1
          );
          hint.isDownvoted = await redisClient.sismember(
            `downvote:${hint.hid}`,
            request.user ? request.user.id : -1
          );

          return hint;
        } catch (err) {
          console.log(err);
          return hint;
        }
      })
    );

    const finalHints = await Promise.all(
      updatedHints.map(async (hint) => {
        try {
          const userResults = await new Promise((resolve, reject) => {
            pool.query(queries.getUser, [hint.uid], (error, results) => {
              if (error) {
                reject(error);
              } else {
                resolve(results);
              }
            });
          });

          hint.username = userResults.rows[0].username;
          return hint;
        } catch (err) {
          console.log(err);
          return hint;
        }
      })
    );

    // Sort finalHints based on most number of totalUpvotes
    finalHints.sort((a, b) => b.totalUpvotes - a.totalUpvotes);
    // Return subarray of finalHints based on limit and offset
    const limitHints = finalHints.slice(offset, offset + limit);

    response.status(200).json(limitHints);
  } catch (error) {
    console.log(error);
    response.status(500).json({ message: "Internal server error" });
  }
};
