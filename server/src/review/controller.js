// // // import pool from "../../db.js";
// // // // import * as queries from "./queries.js";

// // // // FETCH ALL PENDING HINTS (qid IS NULL)
// // // export const getPendingHints = async (req, res) => {
// // //   try {
// // //     const result = await pool.query(
// // //       `SELECT * FROM temphint ORDER BY thid DESC`
// // //     );
// // //     // const result = await pool.query(queries.showHints);

// // //     res.status(200).json(result.rows);
// // //   } catch (error) {
// // //     console.error("Error fetching pending hints:", error);
// // //     res.status(500).json({ message: "Error fetching pending hints" });
// // //   }
// // // };

// // // // APPROVE A HINT → CREATE QUESTION → MOVE TO hint TABLE
// // // export const approveHint = async (req, res) => {
// // //   const { thid } = req.params;

// // //   try {
// // //     // 1. Get temp hint
// // //     const temp = await pool.query(
// // //       `SELECT * FROM temphint WHERE thid = $1`,
// // //       [thid]
// // //     );

// // //     if (temp.rows.length === 0) {
// // //       return res.status(404).json({ message: "Hint not found" });
// // //     }

// // //     const hint = temp.rows[0];

// // //     // 2. Extract platform + qname from qlink
// // //     let platform = "unknown";
// // //     if (hint.qlink.includes("leetcode.com")) platform = "leetcode";
// // //     else if (hint.qlink.includes("codeforces.com")) platform = "codeforces";

// // //     const parts = hint.qlink.split("/");
// // //     const qname = parts[parts.length - 2] || "Unknown";

// // //     // 3. Insert question
// // //     const qResult = await pool.query(
// // //       `INSERT INTO question (qlink1, qlink2, platform, qname)
// // //        VALUES ($1, $2, $3, $4)
// // //        RETURNING qid`,
// // //       [hint.qlink, hint.qlink, platform, qname]
// // //     );

// // //     const qid = qResult.rows[0].qid;

// // //     // 4. Insert into hint table
// // //     await pool.query(
// // //       `INSERT INTO hint (hints, uid, qid, upvote, downvote)
// // //        VALUES ($1, $2, $3, 0, 0)`,
// // //       [hint.hints, hint.uid, qid]
// // //     );

// // //     // 5. Mark temphint as approved (store qid)
// // //     await pool.query(
// // //       `UPDATE temphint SET qid = $1 WHERE thid = $2`,
// // //       [qid, thid]
// // //     );

// // //     res.status(200).json({ message: "Hint approved successfully" });
// // //   } catch (error) {
// // //     console.error("Approve error:", error);
// // //     res.status(500).json({ message: "Error approving hint" });
// // //   }
// // // };

// // // // REJECT A HINT → DELETE FROM TEMPHINT
// // // export const rejectHint = async (req, res) => {
// // //   const { thid } = req.params;

// // //   try {
// // //     await pool.query(`DELETE FROM temphint WHERE thid = $1`, [thid]);

// // //     res.status(200).json({ message: "Hint rejected and removed" });
// // //   } catch (error) {
// // //     console.error("Reject error:", error);
// // //     res.status(500).json({ message: "Error rejecting hint" });
// // //   }
// // // };

// // import pool from "../../db.js";
// // import * as queries from "./queries.js";

// // export const getPendingHints = async (request, response) => {
// //   try {
// //     const data = await pool.query(queries.showHints);
// //     response.status(200).json(data.rows);
// //   } catch (error) {
// //     console.log(error.message);
// //     response.status(400).json({ error });
// //   }
// // };

// // const checkQuestionExists = async (qlink1, qlink2) => {
// //   try {
// //     const data = await pool.query(queries.checkQuestionExists, [
// //       qlink1,
// //       qlink2?.length > 0 ? qlink2 : null,
// //     ]);
// //     if (data.rows.length > 0) {
// //       return data.rows[0].qid;
// //     } else {
// //       return false;
// //     }
// //   } catch (error) {
// //     console.log(error);
// //     return false;
// //   }
// // };

// // export const approveHint = async (request, response) => {
// //   // approve the hint by moving it from temphint to hint db
// //   const { qlink1, qlink2, qname, platform, uid, hints, thid  } =
// //     request.body;

// //   try {
// //     const qid = await checkQuestionExists(qlink1, qlink2);
// //     if (qid && qid != null) {
// //       console.log("Found", qid);
// //       await pool.query(queries.rejectHint, [thid]);
// //       const data = await pool.query(queries.approveHint, [
// //         ...hints,
// //         qid,
// //         uid,
        
// //       ]);
// //       response.status(200).json(data.rows);
// //     } else {
// //       // if question does not exist in question db, add it to question db
// //       const data = await pool.query(queries.addQuestion, [
// //         qlink1,
// //         qlink2,
// //         platform,
// //         qname,
// //       ]);
// //       const qid = data.rows[0].qid;
// //       await pool.query(queries.approveHint, [...hints, qid, uid]);
// //       await pool.query(queries.rejectHint, [thid]);
// //       response.status(200).json(data.rows);
// //     }
// //   } catch (error) {
// //     console.log(error);
// //     response.status(400).json({ error });
// //   }
// // };
// // export const rejectHint = async (request, response) => {
// //   // reject the hint by deleting it from temphint db
// //   // get id from url :id
// //   const id = request.params.id;

// //   try {
// //     const data = await pool.query(queries.rejectHint, [id]);
// //     response.status(200).send(`Hint deleted with ID: ${id}`);
// //   } catch (error) {
// //     console.log(error);
// //     response.status(400).json({ error });
// //   }
// // };


// import pool from "../../db.js";
// import * as queries from "./queries.js";

// // GET ALL PENDING HINTS
// export const getPendingHints = async (req, res) => {
//   try {
//     const result = await pool.query(queries.showHints);
//     res.status(200).json(result.rows);
//   } catch (error) {
//     console.error("Error fetching hints:", error);
//     res.status(500).json({ error: error.message });
//   }
// };

// // APPROVE HINT
// export const approveHint = async (req, res) => {
//   const { thid } = req.params; // Get ID from URL

//   try {
//     // 1. Fetch the specific temp hint from DB to get its data
//     const tempResult = await pool.query(queries.getTempHintById, [thid]);
    
//     if (tempResult.rows.length === 0) {
//       return res.status(404).json({ message: "Temporary hint not found" });
//     }

//     const tempData = tempResult.rows[0];
//     const { qlink1, qlink, uid, hints } = tempData; // qlink from temphint is treated as qlink1
    
//     // Logic to determine the second link (if your temphint only has qlink, qlink2 is null)
//     const linkToUse = qlink || qlink1; 
//     const link2ToUse = null; // Or extract if you have logic for it

//     // 2. Check if Question Exists
//     let qid;
//     const questionCheck = await pool.query(queries.checkQuestionExists, [
//       linkToUse,
//       link2ToUse
//     ]);

//     if (questionCheck.rows.length > 0) {
//       // Question exists, use existing QID
//       qid = questionCheck.rows[0].qid;
//     } else {
//       // Question does not exist, create it
//       // Extract simple platform/qname logic (you can expand this)
//       let platform = "Unknown";
//       if (linkToUse.includes("leetcode")) platform = "LeetCode";
//       if (linkToUse.includes("codeforces")) platform = "Codeforces";
      
//       // Simple logic to get name from URL
//       const parts = linkToUse.split("/");
//       const qname = parts[parts.length - 1] || parts[parts.length - 2] || "Question";

//       const newQuestion = await pool.query(queries.addQuestion, [
//         linkToUse,
//         link2ToUse || "", // Handle null
//         platform,
//         qname
//       ]);
//       qid = newQuestion.rows[0].qid;
//     }

//     // 3. Insert into permanent Hint table
//     // Note: We pass 'hints' directly. Postgres driver handles the Array conversion.
//     await pool.query(queries.approveHint, [
//       hints, // This is the array
//       uid, 
//       qid
//     ]);

//     // 4. Delete from Temp table (Reject/Clean up)
//     await pool.query(queries.rejectHint, [thid]);

//     res.status(200).json({ message: "Hint approved and moved to live database", qid });

//   } catch (error) {
//     console.error("Approve Error:", error);
//     res.status(500).json({ error: error.message });
//   }
// };

// // REJECT HINT
// export const rejectHint = async (req, res) => {
//   const { thid } = req.params;

//   try {
//     await pool.query(queries.rejectHint, [thid]);
//     res.status(200).json({ message: `Hint rejected (deleted) with ID: ${thid}` });
//   } catch (error) {
//     console.error("Reject Error:", error);
//     res.status(500).json({ error: error.message });
//   }
// };

import pool from "../../db.js";
import * as queries from "./queries.js";

// GET ALL PENDING HINTS
export const getPendingHints = async (req, res) => {
  try {
    const result = await pool.query(queries.showHints);
    res.status(200).json(result.rows);
  } catch (error) {
    console.error("Error fetching hints:", error);
    res.status(500).json({ error: error.message });
  }
};

// APPROVE HINT
export const approveHint = async (req, res) => {
  const { thid } = req.params; 
  // Extract potential updates from the request body
  const { qlink1: newLink1, qlink2: newLink2, platform: newPlatform, qname: newName } = req.body;

  try {
    // 1. Fetch the specific temp hint
    const tempResult = await pool.query(queries.getTempHintById, [thid]);
    
    if (tempResult.rows.length === 0) {
      return res.status(404).json({ message: "Temporary hint not found" });
    }

    const tempData = tempResult.rows[0];
    const { qlink, uid, hints } = tempData; 
    
    // Use the provided link1 or fall back to the one in temp table
    const linkToUse = newLink1 || qlink; 
    const link2ToUse = newLink2 || null;

    // 2. Check if Question Exists
    let qid;
    const questionCheck = await pool.query(queries.checkQuestionExists, [
      linkToUse,
      link2ToUse
    ]);

    if (questionCheck.rows.length > 0) {
      // Question exists - reuse the ID
      qid = questionCheck.rows[0].qid;
      
      // UPDATE LOGIC: Update the existing question with all new info
      await pool.query(queries.updateQuestion, [
        qid, 
        linkToUse,   // $2: qlink1
        link2ToUse,  // $3: qlink2
        newPlatform, // $4: platform
        newName      // $5: qname
      ]);
      
    } else {
      // Question does not exist - create it
      let platform = newPlatform || "Unknown";
      // Auto-detect platform if not provided
      if (platform === "Unknown") {
        if (linkToUse && linkToUse.includes("leetcode")) platform = "LeetCode";
        if (linkToUse && linkToUse.includes("codeforces")) platform = "Codeforces";
      }
      
      let qname = newName;
      // Auto-detect name if not provided
      if (!qname) {
         const parts = linkToUse ? linkToUse.split("/") : [];
         qname = parts[parts.length - 1] || parts[parts.length - 2] || "Question";
      }

      const newQuestion = await pool.query(queries.addQuestion, [
        linkToUse,
        link2ToUse || "", 
        platform,
        qname
      ]);
      qid = newQuestion.rows[0].qid;
    }

    // 3. Insert into permanent Hint table with the correct QID
    await pool.query(queries.approveHint, [
      hints, 
      uid, 
      qid 
    ]);

    // 4. Delete from Temp table
    await pool.query(queries.rejectHint, [thid]);

    res.status(200).json({ message: "Hint approved", qid });

  } catch (error) {
    console.error("Approve Error:", error);
    res.status(500).json({ error: error.message });
  }
};

// export const approveHint = async (req, res) => {
//   const { thid } = req.params; // Get ID from URL

//   try {
//     // 1. Fetch the specific temp hint from DB to get its data
//     const tempResult = await pool.query(queries.getTempHintById, [thid]);
    
//     if (tempResult.rows.length === 0) {
//       return res.status(404).json({ message: "Temporary hint not found" });
//     }

//     const tempData = tempResult.rows[0];
//     // Destructure data from the found record
//     // Note: Adjust 'qlink' vs 'qlink1' based on your actual DB column name in 'temphint'
//     const { qlink, uid, hints } = tempData; 
    
//     // Use qlink from temphint as qlink1 for question check
//     const linkToUse = qlink; 
//     const link2ToUse = null; 

//     // 2. Check if Question Exists
//     let qid;
//     const questionCheck = await pool.query(queries.checkQuestionExists, [
//       linkToUse,
//       link2ToUse
//     ]);

//     if (questionCheck.rows.length > 0) {
//       // Question exists, use existing QID
//       qid = questionCheck.rows[0].qid;
//     } else {
//       // Question does not exist, create it
//       let platform = "Unknown";
//       if (linkToUse && linkToUse.includes("leetcode")) platform = "LeetCode";
//       if (linkToUse && linkToUse.includes("codeforces")) platform = "Codeforces";
      
//       // Simple logic to get name from URL
//       const parts = linkToUse ? linkToUse.split("/") : [];
//       const qname = parts[parts.length - 1] || parts[parts.length - 2] || "Question";

//       const newQuestion = await pool.query(queries.addQuestion, [
//         linkToUse,
//         link2ToUse || "", // Handle null
//         platform,
//         qname
//       ]);
//       qid = newQuestion.rows[0].qid;
//     }

//     // 3. Insert into permanent Hint table
//     await pool.query(queries.approveHint, [
//       hints, // The array of hints
//       uid, 
//       qid
//     ]);

//     // 4. Delete from Temp table (Cleanup)
//     await pool.query(queries.rejectHint, [thid]);

//     res.status(200).json({ message: "Hint approved and moved to live database", qid });

//   } catch (error) {
//     console.error("Approve Error:", error);
//     res.status(500).json({ error: error.message });
//   }
// };

// REJECT HINT
export const rejectHint = async (req, res) => {
  const { thid } = req.params;

  try {
    await pool.query(queries.rejectHint, [thid]);
    res.status(200).json({ message: `Hint rejected (deleted) with ID: ${thid}` });
  } catch (error) {
    console.error("Reject Error:", error);
    res.status(500).json({ error: error.message });
  }
};
