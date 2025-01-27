const usedPasswords = []; // This is where we store used passwords for demo purposes (replace with a real database)

// The handler for the POST request
exports.handler = async (event, context) => {
  if (event.httpMethod === "POST") {
    try {
      // Parse the incoming form data (password)
      const { password } = JSON.parse(event.body);

      // Check if the password has already been used
      if (usedPasswords.includes(password)) {
        return {
          statusCode: 400,
          body: JSON.stringify({ message: "This password has already been used." }),
        };
      }

      // If the password is new, add it to the used passwords list (in a real app, save this in a database)
      usedPasswords.push(password);

      return {
        statusCode: 200,
        body: JSON.stringify({ message: "Password accepted!" }),
      };
    } catch (error) {
      return {
        statusCode: 500,
        body: JSON.stringify({ message: "Server error", error }),
      };
    }
  }

  // Method not allowed if it's not a POST request
  return {
    statusCode: 405,
    body: JSON.stringify({ message: "Method Not Allowed" }),
  };
};
