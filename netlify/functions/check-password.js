const usedPasswords = new Set(); // Store used passwords in memory

exports.handler = async (event) => {
    if (event.httpMethod === "POST") {
        const { password } = JSON.parse(event.body); // Get password from the form

        // Check if the password has been used before
        if (usedPasswords.has(password)) {
            return {
                statusCode: 400,
                body: JSON.stringify({ error: 'Ce mot de passe a déjà été utilisé.' }),
            };
        }

        // Save the new password
        usedPasswords.add(password);

        return {
            statusCode: 200,
            body: JSON.stringify({ message: 'Mot de passe accepté.' }),
        };
    }

    return {
        statusCode: 405,
        body: JSON.stringify({ error: 'Méthode non autorisée.' }),
    };
};
