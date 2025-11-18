export const addTemporaryHint =
  "INSERT INTO temphint (hints,qlink,uid) VALUES (ARRAY[$1,$2,$3,$4,$5],$6,$7) RETURNING *";
export const upvoteHint =
  "UPDATE temphint SET upvotes = upvotes + 1 WHERE thid = $1 RETURNING *";
export const downvoteHint =
  "UPDATE temphint SET downvotes = downvotes + 1 WHERE thid = $1 RETURNING *";
export const getHints = "SELECT * FROM hint WHERE qid = $1 ORDER BY qid DESC LIMIT $2 OFFSET $3";
export const getHintsByVotes = "SELECT * FROM hint WHERE qid = $1";
export const getUser = "SELECT * FROM users WHERE id = $1";
//export const getHints = "SELECT * FROM hint WHERE qid = $1 ORDER BY created_at ASC LIMIT $2 OFFSET $3";
