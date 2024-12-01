import { BaseValidation, IsEmail, IsRequired, UseValidation } from "vvalidation";

@UseValidation()
export default class SignUpValidation extends BaseValidation {
    @IsRequired({
        message: "The field is required",
    })
    @IsEmail()
    private readonly email!: string;

    @IsRequired({
        message: "The field is required",
    })
    private readonly first_name!: string;

    @IsRequired({
        message: "The field is required",
    })
    private readonly last_name!: string;

    @IsRequired({
        message: "The field is required",
    })
    private readonly password!: string;
}
