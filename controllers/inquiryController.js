import Inquiry from "../models/inquirySchema.js";

export const createInquiry = async (req,res) =>{

    try{
    const inquiry = await Inquiry.create({

        customer:{
            name:req.body.name,
            email:req.body.email,
            phone:req.body.phone,
            company:req.body.company
        },
        message: req.body.message

    }); 

    res.status(201).json({
      success: true,
      message: "Inquiry submitted successfully",
      data: inquiry
    });
}
catch(err){
    res.status(400).json({
        success:false,
        message:err.message
        });
    } 
};

/* Admin Get all Inquiry */
export const getInquiry =  async (req,res)=>{

    try{

        const allInquiry = await Inquiry.find().sort({createdAt:-1});

        res.json({
            success:true,
            data:allInquiry
        });

    }

    catch(err){

        res.json(500).json({
            success:false,
            message:err.message
        });

    }

}; 

export const updateInquiryStatus = async (req,res)=>{

    try{
        const updated = await Inquiry.findByIdAndUpdate(req.params.id,{
            status:req.body.status
        },
        {
            new: true
        }

    ); 
    res.json({
        success:true,
        message:"Status Updated",
        data:updated
    });
    }

    catch(err){
        res.status(400).json({
            success:false,
            message:err.message
        });
    }

};
