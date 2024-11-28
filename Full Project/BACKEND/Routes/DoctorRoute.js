const express=require("express");
const router=express.Router();
//Insert Model
const doctor =require("../Model/DoctorModel");
//Inser usr controller
const Doctorcontroller = require("../Controlers/Doctorcontrollers");

router.get("/",Doctorcontroller.getAllDoctors);
router.post("/",Doctorcontroller.adddoctors);
router.get("/:id",Doctorcontroller.getById);
router.put("/:id",Doctorcontroller.UpdateDoctor);
router.delete("/:id",Doctorcontroller.deleteDoctor);


//export
module.exports=router;