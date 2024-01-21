import { Types } from "mongoose";

type MyJwtPayload = {
    _id: Types.ObjectId,
    email: string,
    isCompany: boolean
}

export default MyJwtPayload;