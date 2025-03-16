/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable import/no-anonymous-default-export */
export default async (req: any, res: any) => {
  if (req.method === "POST") {
    const { username, email, password } = req.body;

    const response = await fetch(
      "http://localhost:1337/api/auth/local/register",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, email, password }),
      }
    );

    const data = await response.json();

    if (response.ok) {
      res.status(200).json({ message: "User registered successfully" });
    } else {
      res
        .status(data.statusCode)
        .json({ error: data.message[0].messages[0].message });
    }
  } else {
    res.status(405).json({ error: "Method not allowed" });
  }
};
