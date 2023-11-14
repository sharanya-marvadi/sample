const express=require("express");
const router=express.Router();
const {getContacts,getContact,createContact,updateContact,deleteContact}=require("../controllers/contactcontrollers");
const validateToken = require("../middleware/valisatetokenhandler");
router.use(validateToken);
router.route("/").get(getContacts).post(createContact);
router.route("/:id").get(getContact).put(updateContact).delete(deleteContact)
//router.route("/").post(createContact)
// router.route("/:id").put(updateContact)
// router.route("/:id").delete(deleteContact)


module.exports=router;