export enum ErrorMessageType {
    UserNameIsTooShort = 'User name must contain at least 1 symbol',
    LoginIsTooShort = 'Login must contain at least 2 symbols',
    PasswordIsTooShort = 'Password name must contain at least 6 symbols',
    TooLong = 'Maximum field length is 60 symbols',
    PasswordsDontMatch = 'Passwords dont match',
    EmailIsNotValid = 'Email is not valid',
    PhoneNumberIsNotValid = 'Phone number is not valid'
}

export enum AuthFieldsLength {
    UserNameMin = 1,
    LoginMin = 2,
    PasswordMin = 6,
    Max = 60
}
