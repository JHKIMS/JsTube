
export const getJoin = (req, res) => res.render("join", {pageTitle: "Join Account"});
export const postJoin = (req, res) => {
    res.end();
}
export const editUser = (req, res) => res.send("Edit User");
export const deleteUser = (req, res) => res.send("Delete User");

export const login = (req, res) => res.send("Login User");
export const logout = (req, res) => res.send("Logout");
export const see = (req, res) => res.send("See User");