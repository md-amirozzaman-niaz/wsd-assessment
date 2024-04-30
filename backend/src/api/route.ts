import express, { Router, Request, Response } from "express";
import textAnalyzer from "../service/textAnalyzer";
import { isAuthenticated } from "../middleware";

// New Router instance
const router: Router = express.Router();
router.use(isAuthenticated);
// text analyzer routes
router.get("/count/word", (req: Request, res: Response) => {
  const count = textAnalyzer.wordCount(req.query.text);
  res.send({ count });
});

router.get("/count/char", (req: Request, res: Response) => {
  const output = textAnalyzer.charCount(req.query.text);
  res.send({ output });
});
router.post("/count/sentence", (req: Request, res: Response) => {
  const output = textAnalyzer.sentenceCount(req.body.text);
  res.send({ output });
});
router.post("/count/para", (req: Request, res: Response) => {
  const output = textAnalyzer.paraCount(req.body.text);
  res.send({ output });
});
router.post("/longest/word", (req: Request, res: Response) => {
  const output = textAnalyzer.longestWord(req.body.text);
  res.send({ output });
});

router.post("/text", (req: Request, res: Response) => {
  const output = textAnalyzer.index(req.body.text);
  res.send({ output });
});
router.get("/sso/layout", (req: Request, res: Response) => {
  // get the layout for continue with
  // single sign in
});
router.post("/sso/verify", (req: Request, res: Response) => {
  // verify
  // true return authorization scopes to use user data
});

router.get("/sso/app", (req: Request, res: Response) => {
  // get the layout for continue with
  // single sign in
});

router.post("/sso/app", (req: Request, res: Response) => {
  // return a app-id and secret-key
});
export default router;
