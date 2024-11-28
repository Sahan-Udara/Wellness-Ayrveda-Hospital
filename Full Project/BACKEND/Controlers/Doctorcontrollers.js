const doctor =require("../Model/DoctorModel");


//data display
const getAllDoctors = async(req,res,next)=>{
    let doctors;

    try{
      doctors= await doctor.find();

    }
    catch(err){
        console.log(err);

    }
    //not found
    if(!doctors){
        return res.status(404).json({message :"doctor not found"})
    }
    //disply all user
    return res.status(200).json({doctors});
};

//data insert
const adddoctors=async(req,res,next)=>{

  const {name,gmail,phone,Gender,age,Specialiation,Qualification,Experience,About}=req.body;

  let doctors;

  try{
      doctors= new doctor({name,gmail,phone,Gender,age,Specialiation,Qualification,Experience,About});
      await doctors.save();
  }catch(err){
      console.log(err);
  }
  //not insert users 
  if(!doctors){
      return res.status(404).json({message:"unable to add doctor"});
  }
  return res.status(200).json({doctors});
  

};

// Get User by ID
const getById = async (req, res, next) => {
  const id = req.params.id;

  let doctor1;

  try {
      doctor1 = await doctor.findById(id);
  } catch (err) {
      console.log(err);
  }

  // Not available users
  if (!doctor1) {
      return res.status(404).json({ message: "doctor not found" });
  }

  return res.status(200).json({ doctor1 });
};
//Update user details
const UpdateDoctor = async (req,res,next) =>{

  const id=req.params.id;
  const{name:name,gmail:gmail,phone:phone,Gender:Gender,age:age,Specialiation:Specialiation,Qualification:Qualification,Experience:Experience,About:About}=req.body;

  let doctors;

  try{
      doctors=await doctor.findByIdAndUpdate(id,
          {name,gmail,phone,Gender,age,Specialiation,Qualification,Experience,About});
          doctors = await doctors.save();
  }catch(err){
      console.log(err);
  }

  if (!doctors) {
      return res.status(404).json({ message: "Unable to update details" });
  }

  return res.status(200).json({ doctors });

};
//Delete User Details
const deleteDoctor = async (req,res,next) =>{
  const id=req.params.id;

  let doctor1;

  try{
    doctor1= await doctor.findByIdAndDelete(id)
  }catch(err){
      console.log(err);
  }

  if (!doctor1) {
      return res.status(404).json({ message: "Unable to Delete details" });
  }

  return res.status(200).json({ doctor1 });
};


//export
exports.getAllDoctors=getAllDoctors;
exports.adddoctors=adddoctors;
exports.getById=getById;
exports.UpdateDoctor=UpdateDoctor;
exports.deleteDoctor=deleteDoctor;