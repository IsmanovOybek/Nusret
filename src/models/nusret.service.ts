import MemberModel from "../schema/member.model";
import { LoginInput, Member, MemberInput } from "../libs/types/members";
import Errors, { HttpCode, Message } from "../libs/types/error";
import { MemberType } from "../libs/types/enum";
import * as bcrypt from "bcryptjs";

class MemberService {

    private readonly memberModel;

    constructor() {
        this.memberModel = MemberModel;
    }

    public async signup(input: MemberInput): Promise<Member> {
        const salt = await bcrypt.genSalt();
        input.memberPassword = await bcrypt.hash(input.memberPassword, salt);

        console.log("after:", input.memberPassword);

        try {
            const result = await this.memberModel.create(input);
            result.memberPassword = "";
            return result;

        } catch (err) {
            console.error("❌ Mongo create error:", err);
            throw new Errors(HttpCode.BAD_REQUEST, Message.CREATE_FAILED);
        }

    }

    public async login(input: LoginInput): Promise<Member> {
        const member = await this.memberModel
            .findOne({ memberNick: input.memberNick },
                { memberNick: 1, memberPassword: 1 }
            )
            .exec();
        if (!member) throw new Errors(HttpCode.NOT_FOUND, Message.NO_MEMBER_NICK);

        const isMatch = await bcrypt.compare(
            input.memberPassword,
            member.memberPassword
        );
        if (!isMatch) {
            throw new Errors(HttpCode.UNAUTHORIZED, Message.WRONG_PASSWORD);
        }

        return await this.memberModel.findById(member._id)
            .exec();

    }

}


export default MemberService