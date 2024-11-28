const express=require("express");
const router=express.Router();
//Insert Model
const nurse =require("../Model/NurseModel");
//Inser usr controller
const NurseControler = require("../Controlers/NurseControler");

router.get("/",NurseControler.getAllNurses);
router.post("/",NurseControler.addnurses);
router.get("/:id",NurseControler.getById);
router.put("/:id",NurseControler.UpdateNurse);
router.delete("/:id",NurseControler.deleteNurse);

//export
module.exports=router;

