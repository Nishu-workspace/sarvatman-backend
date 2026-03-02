import jwt from "jsonwebtoken";

const authAdmin = (req, res, next) => {
    console.log("i am in authAdmin")

    try {

        const authHeader = req.headers.authorization;
        console.log("dd", authHeader)
        if (!authHeader) {
            return res.status(401).json({ message: "Token Missing" });
        }

        const token = authHeader.split(" ")[1];
        console.log("ddsfdf", token)
        if (!token) return res.status(401).json({ message: "Invalid Token Format" });

        const decode = jwt.verify(token, process.env.JWT_SECRET);

        if (decode.role !== "ADMIN") {
            return res.status(403).json("Forbidden, Access is only allowed to Admin");
        }

        req.admin = decode;
        console.log("end")
        next();

    }
    catch (err) {
        console.error(err)
        return res.status(401).json({ message: "Uauthorized" });
    }

};

export default authAdmin;