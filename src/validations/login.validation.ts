import { BaseValidation, IsEmail, IsRequired, UseValidation } from "vvalidation";

@UseValidation()
export default class LoginValidation extends BaseValidation {
    @IsRequired({
        message: "The field is required",
    })
    @IsEmail()
    private readonly email!: string;

    @IsRequired({
        message: "The field is required",
    })
    private readonly password!: string;
}
