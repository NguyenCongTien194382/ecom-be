const EMAIL_PATTERN = /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/

export const validateEmail = (email) => {
    return EMAIL_PATTERN.test(email);
}