
import { Request, Response } from "express";
import { T } from "../libs/types/common";
import { AdminRequest, LoginInput, Member, MemberInput } from "../libs/types/members";
import Errors, { Message } from "../libs/types/error";
import { MemberType } from "../libs/types/enum";
import MemberService from "../models/nusret.service";

const memberService = new MemberService()

const nusretController: T = {};
nusretController.goHome = (req: Request, res: Response) => {
    try {
        console.log("goHome");
        res.render("home", { username: "KYLER" });
        res.render('home')
    } catch (err) {
        console.log("Error, goHome", err);
        res.render("done")

    }
};


nusretController.getSignup = (req: Request, res: Response) => {
    try {
        console.log("getSingup");
        res.render("signup", { error: null });
    } catch (err) {
        console.log("Error, getSignup", err);
        res.render("/admin")

    }
};

nusretController.getLogin = (req: Request, res: Response) => {
    try {
        console.log("getLogin");
        res.render("login", { error: null });
    } catch (err) {
        console.log("Error, getLogin", err);
        res.render("/admin")

    }
};

nusretController.signup = async (req: AdminRequest, res: Response) => {
    try {
        console.log("kod", req.body)
        const newMember: MemberInput = req.body;
        const result = await memberService.signup(newMember)

        req.session.member = result;
        req.session.save(function () {
            res.send(result)
        })

        res.render("/login")
    } catch (err) {
        console.log("Error, processSignup", err);
        const message = err instanceof Errors ? err.message : Message.SOMETHING_WENT_WRONG


    }
};

nusretController.login = async (req: AdminRequest, res: Response) => {
    try {
        console.log("processLogin");
        console.log("body:", req.body);
        const input: LoginInput = req.body;

        const result = await memberService.login(input);

        req.session.member = result;
        req.session.save(function () {
            res.send(result)
        })

    } catch (err) {
        console.log("Error, processLogin", err);
        const message = err instanceof Errors ? err.message : Message.SOMETHING_WENT_WRONG
        return res.send(`<script> alert("${message}"); window.location.replace('admin/login')</script>`)

    }
};

nusretController.logout = async (req: AdminRequest, res: Response) => {
    try {
        console.log("logout");
        req.session.destroy(function () {
            res.redirect("/admin")
        })

    } catch (err) {
        console.log("Error, logout", err);
        res.redirect("/admin")

    }
};


export default nusretController;  