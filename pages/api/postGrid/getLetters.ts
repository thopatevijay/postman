import { NextApiRequest, NextApiResponse } from "next";

export default async function sendLetter(
    request: NextApiRequest,
    response: NextApiResponse
): Promise<void> {
    try {
        const { searchQuery } = request.query;


        const options = {
            method: 'GET',
            headers: {
                'X-API-KEY': process.env.POSTGRID_API_KEY,
            }
        };

        const searchString = encodeURIComponent(
            JSON.stringify({
                metadata: {
                    walletAddress: searchQuery,
                },
            })
        );

        const lettersRes = await fetch(`https://api.postgrid.com/print-mail/v1/letters?search=${searchString}`, options);
        const getData = await lettersRes.json();
        if (!lettersRes.ok) {
            throw new Error('Error sending letter');
        }

        response.status(200).json(getData);

    } catch (error) {
        console.log(error);
        response.status(500).json({ error: 'Internal server error', message: error.message });
    }
}
