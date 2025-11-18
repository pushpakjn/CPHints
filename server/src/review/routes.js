// // import express from "express";
// // import { getPendingHints, approveHint, rejectHint } from "./controller.js";
// // import isAdmin from "../middleware/isAdmin.js";
// // import verifyToken from "../middleware/jwtAuth.js";

// // // const router = Router();
// // // router.get("/", jwtVerify, isAdmin, showHints);
// // // router.delete("/:id", jwtVerify, isAdmin, rejectHint);
// // // router.post("/", jwtVerify, isAdmin, approveHint);
// // // export default router;


// // const router = express.Router();

// // // Only ADMIN can access these routes
// // router.get("/", verifyToken, isAdmin, getPendingHints);
// // router.post("/approve/:thid", verifyToken, isAdmin, approveHint);
// // router.delete("/reject/:thid", verifyToken, isAdmin, rejectHint);

// // export default router;

// import express from "express";
// import { getPendingHints, approveHint, rejectHint } from "./controller.js";
// // Assuming these middlewares exist and work correctly
// import isAdmin from "../middleware/isAdmin.js";
// import verifyToken from "../middleware/jwtAuth.js";

// const router = express.Router();

// // GET all pending hints
// router.get("/", verifyToken, isAdmin, getPendingHints);

// // Approve a hint (Move to main DB)
// router.post("/approve/:thid", verifyToken, isAdmin, approveHint);

// // Reject a hint (Delete permanently)
// router.delete("/reject/:thid", verifyToken, isAdmin, rejectHint);

// export default router;



import express from "express";
import { getPendingHints, approveHint, rejectHint } from "./controller.js";
// Assuming these middlewares exist in your project structure
import isAdmin from "../middleware/isAdmin.js";
import verifyToken from "../middleware/jwtAuth.js";

const router = express.Router();

// GET all pending hints
// GET /api/review
router.get("/", verifyToken, isAdmin, getPendingHints);

// Approve a hint (Move to main DB)
// POST /api/review/approve/:thid
router.post("/approve/:thid", verifyToken, isAdmin, approveHint);

// Reject a hint (Delete permanently)
// DELETE /api/review/reject/:thid
router.delete("/reject/:thid", verifyToken, isAdmin, rejectHint);

export default router;