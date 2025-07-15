import mongoose, { Schema } from "mongoose";
import { MemberStatus, MemberType } from "../libs/types/enum";

const memberschema = new Schema({
    memberType: {
        type: String,
        default: MemberType.USER
    },
    memberStatus: {
        type: String,
        default: MemberStatus.ACTIVE
    },

    memberNick: {
        type: String,
        index: { unique: true, sparse: true },
        required: true,
    },

    // memberId: {
    //     type: String,
    //     required: true
    // },

    memberPhone: {
        type: String,
        index: { unique: true, sparse: true },
        required: true,
    },

    memberPassword: {
        type: String,
        select: false,
        required: true
    },
    memberAddress: {
        type: String,
    },
    memberDesc: {
        type: String,
    },
    memberImage: {
        type: String,
    },
    memberPoints: {
        type: Number,
        default: 0,
    }

}, { timestamps: true });  //updateAt, createAt


export default mongoose.model("Member", memberschema)