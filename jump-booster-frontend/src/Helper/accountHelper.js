// fetch user from userId. null if not found.
export function getAccountById(userId) {
    const data = {
        userId: userId
    };

    return fetch("/account/get-account-by-id", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(userId)
    })
        .then((response) => {
            if (response.status === 200) return response.json();
            else throw new Error("User not found");
        })
        .then((accountObj) => {
            return accountObj; // Step 2: Return the userObj
        })
        .catch((error) => {
            alert(error.message);
        });
}