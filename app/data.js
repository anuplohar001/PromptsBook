const users = [
    {
        email: "anuplohar001@gmail.com",
        password: "anup2283"
    },
    {
        email: "alex@email.com",
        password: "password"
    },
    {
        email: "bob@email.com",
        password: "password"
    }
]

export const getUserByEmail = (email) => {
    const found = users.find(user => user.email === email);
    return found;
}