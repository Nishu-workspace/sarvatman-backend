import Inquiry from "../models/inquirySchema.js";
import sendEmail from "../utils/sendEmail.js";

export const createInquiry = async (req, res) => {

    try {
        const inquiry = await Inquiry.create({

            customer: {
                name: req.body.name,
                email: req.body.email,
                phone: req.body.phone,
                company: req.body.company
            },
            message: req.body.message

        });

        // Send response immediately — don't wait for emails
        res.status(201).json({
            success: true,
            message: "Inquiry submitted successfully",
            data: inquiry
        });

        // Fire-and-forget: send emails in the background
        (async () => {
            try {
                await sendEmail({
                    email: process.env.EMAIL_USER || "admin@example.com",
                    subject: `New Inquiry from ${inquiry.customer.name}`,
                    message: `You have received a new inquiry.\n\nName: ${inquiry.customer.name}\nEmail: ${inquiry.customer.email}\nPhone: ${inquiry.customer.phone}\nCompany: ${inquiry.customer.company}\n\nMessage: ${inquiry.message}`,
                });

                if (inquiry.customer.email && inquiry.customer.email !== "no-email@provided.com") {
                    await sendEmail({
                        email: inquiry.customer.email,
                        subject: `Thank you for contacting Sarvatman`,
                        message: `Dear ${inquiry.customer.name},\n\nThank you for reaching out to us. We have received your inquiry and our team will get back to you shortly.\n\nBest regards,\nSarvatman Team`,
                    });
                }
            } catch (emailErr) {
                console.error("Email sending failed:", emailErr.message);
            }
        })();

    }
    catch (err) {
        res.status(400).json({
            success: false,
            message: err.message
        });
    }
};

/* Admin Get all Inquiry */
export const getInquiry = async (req, res) => {

    try {

        const allInquiry = await Inquiry.find().sort({ createdAt: -1 });

        res.json({
            success: true,
            data: allInquiry
        });

    }

    catch (err) {

        res.json(500).json({
            success: false,
            message: err.message
        });

    }

};

export const updateInquiryStatus = async (req, res) => {

    try {
        const updated = await Inquiry.findByIdAndUpdate(req.params.id, {
            status: req.body.status
        },
            {
                new: true
            }

        );
        res.json({
            success: true,
            message: "Status Updated",
            data: updated
        });
    }

    catch (err) {
        res.status(400).json({
            success: false,
            message: err.message
        });
    }

};

export const deleteInquiry = async (req, res) => {
    try {
        await Inquiry.findByIdAndDelete(req.params.id);
        res.json({ success: true, message: "Inquiry deleted" });
    } catch (err) {
        res.status(500).json({ success: false, message: err.message });
    }
};

export const replyToInquiry = async (req, res) => {
    try {
        const inquiry = await Inquiry.findById(req.params.id);
        if (!inquiry) return res.status(404).json({ success: false, message: "Inquiry not found" });

        const { replyMessage } = req.body;

        if (!inquiry.customer.email || inquiry.customer.email === "no-email@provided.com") {
            return res.status(400).json({ success: false, message: "Customer email not provided" });
        }

        try {
            await sendEmail({
                email: inquiry.customer.email,
                subject: `Re: Your Inquiry to Sarvatman`,
                message: replyMessage,
                html: `<p>Dear ${inquiry.customer.name},</p><p>${replyMessage.replace(/\n/g, '<br>')}</p><br><p>Best regards,<br>Sarvatman Team</p>`
            });
        } catch (emailErr) {
            console.error("Failed to send reply email (check .env config):", emailErr);
            // We still update the inquiry status to responded in the DB
        }

        inquiry.status = "responded";
        await inquiry.save();

        res.json({ success: true, message: "Reply processed successfully", data: inquiry });
    } catch (err) {
        res.status(500).json({ success: false, message: err.message });
    }
};
