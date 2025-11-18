
// // export const showHints = "SELECT * FROM temphint ORDER BY thid ASC";
// // export const checkQuestionExists = "SELECT * FROM question WHERE (qlink1 IS NOT NULL AND qlink1 = $1) OR ((qlink2 IS NOT NULL) AND qlink2 = $2)";
// // // export const approveHint = "INSERT INTO hint (hints,qid,uid,created_at) VALUES (ARRAY[$1,$2,$3,$4,$5],$6,$7,$8) RETURNING *"
// // export const approveHint = "INSERT INTO hint (hints,qid,uid) VALUES (ARRAY[$1,$2,$3,$4,$5],$6,$7,$8) RETURNING *"
// // export const rejectHint = "DELETE FROM temphint WHERE thid = $1"
// // export const addQuestion = "INSERT INTO question (qlink1,qlink2,platform,qname) VALUES ($1,$2,$3,$4) RETURNING *"


// export const showHints = "SELECT * FROM temphint ORDER BY thid ASC";

// export const getTempHintById = "SELECT * FROM temphint WHERE thid = $1";

// // Checks if a question exists by either link. 
// // We use ($2::text IS NOT NULL) logic to handle cases where qlink2 might be null.
// export const checkQuestionExists = `
//   SELECT * FROM question 
//   WHERE (qlink1 = $1) 
//   OR ($2::text IS NOT NULL AND qlink2 = $2)
// `;

// export const addQuestion = `
//   INSERT INTO question (qlink1, qlink2, platform, qname) 
//   VALUES ($1, $2, $3, $4) 
//   RETURNING qid
// `;

// // Fix: pass the whole array as $1. 
// // Added upvote/downvote defaults as 0.
// export const approveHint = `
//   INSERT INTO hint (hints, uid, qid, upvote, downvote) 
//   VALUES ($1, $2, $3, 0, 0) 
//   RETURNING *
// `;

// export const rejectHint = "DELETE FROM temphint WHERE thid = $1";


export const showHints = "SELECT * FROM temphint ORDER BY thid ASC";

export const getTempHintById = "SELECT * FROM temphint WHERE thid = $1";

// Checks if a question exists by either link. 
// We use ($2::text IS NOT NULL) logic to handle cases where qlink2 might be null.
export const checkQuestionExists = `
  SELECT * FROM question 
  WHERE (qlink1 = $1) 
  OR ($2::text IS NOT NULL AND qlink2 = $2)
`;

export const addQuestion = `
  INSERT INTO question (qlink1, qlink2, platform, qname) 
  VALUES ($1, $2, $3, $4) 
  RETURNING qid
`;

// Inserts the approved hint into the main table.
// We initialize upvote/downvote to 0.
export const approveHint = `
  INSERT INTO hint (hints, uid, qid, upvote, downvote) 
  VALUES ($1, $2, $3, 0, 0) 
  RETURNING *
`;

export const updateQuestion = `
  UPDATE question 
  SET 
    qlink1 = COALESCE(NULLIF($2, ''), qlink1),
    qlink2 = COALESCE(NULLIF($3, ''), qlink2),
    platform = COALESCE(NULLIF($4, ''), platform),
    qname = COALESCE(NULLIF($5, ''), qname)
  WHERE qid = $1
`;

export const rejectHint = "DELETE FROM temphint WHERE thid = $1";