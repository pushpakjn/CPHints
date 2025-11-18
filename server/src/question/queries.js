export const hintsForEachQ =
  "SELECT q.qid, COUNT(h.hid),qname,platform,qlink1 FROM question q LEFT JOIN hint h ON q.qid = h.qid GROUP BY q.qid LIMIT $1 OFFSET $2;";

// export const questionsBySearch =
//   "SELECT q.qid, COUNT(h.hid),qname,platform,qlink1 FROM question q LEFT JOIN hint h ON q.qid = h.qid WHERE (q.qname ILIKE CONCAT('%', $1::text, '%') OR q.qlink1 ILIKE CONCAT('%', $1::text, '%') OR q.qlink2 ILIKE CONCAT('%', $1::text, '%'))  GROUP BY q.qid LIMIT $2 OFFSET $3;";

export const questionsBySearch = `
  SELECT 
    q.qid,
    COUNT(h.hid) AS total_hints,
    q.qname,
    q.platform,
    q.qlink1
  FROM question q
  LEFT JOIN hint h ON q.qid = h.qid
  WHERE 
    q.qname ILIKE CONCAT('%', $1::text, '%')
    OR q.qlink1 ILIKE CONCAT('%', $1::text, '%')
    OR q.qlink2 ILIKE CONCAT('%', $1::text, '%')
  GROUP BY q.qid, q.qname, q.platform, q.qlink1
  LIMIT $2 OFFSET $3;
`;

export const totalHintsAll =
  "SELECT COUNT(*) FROM (SELECT q.qid, COUNT(h.hid),qname,platform,qlink1 FROM question q LEFT JOIN hint h ON q.qid = h.qid GROUP BY q.qid) AS Count";

export const totalHintsSearch =
  "SELECT COUNT(*) FROM (SELECT q.qid, COUNT(h.hid),qname,platform,qlink1 FROM question q LEFT JOIN hint h ON q.qid = h.qid WHERE (q.qname ILIKE CONCAT('%', $1::text, '%') OR q.qlink1 ILIKE CONCAT('%', $1::text, '%') OR q.qlink2 ILIKE CONCAT('%', $1::text, '%'))  GROUP BY q.qid) AS Count";
