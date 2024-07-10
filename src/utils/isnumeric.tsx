function isNotNumeric(input: string): boolean {
    // Use a regular expression to match non-numeric characters
    return !/^\d+$/.test(input);
}

export default isNotNumeric;