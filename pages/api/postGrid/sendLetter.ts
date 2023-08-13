import { NextApiRequest, NextApiResponse } from "next";
interface IContact {
    firstName: string;
    lastName: string;
    addressLine1: string;
    addressLine2?: string;
    city: string;
    provinceOrState: string;
    postalOrZip: string;
}
interface IRequestBody {
    to: IContact;
    from: IContact;
    description: string;
    content: string;
    walletAddress: string;
}

export default async function sendLetter(
    request: NextApiRequest,
    response: NextApiResponse
): Promise<void> {
    try {
        const { to, from, description, content, walletAddress } = request.body as IRequestBody;
        const rightNow = new Date().toDateString();

        // Sending the letter
        const sendOptions = {
            method: 'POST',
            headers: {
                accept: 'application/json',
                'content-type': 'application/json',
                'X-API-KEY': process.env.POSTGRID_API_KEY,
            },
            body: JSON.stringify({
                to,
                from,
                template: 'template_rVawyH7r1BLqHwjUxrJKu6',
                description: description,
                addressPlacement: "top_first_page",
                mergeVariables: {
                    "content": content,
                    "date": rightNow
                },
                metadata: {
                    "walletAddress": walletAddress
                }
            }),
        };

        const sendRes = await fetch('https://api.postgrid.com/print-mail/v1/letters', sendOptions);
        const sendData = await sendRes.json();
        if (!sendRes.ok) {
            throw new Error('Error sending letter');
        }

        response.status(200).json(sendData);

    } catch (error) {
        console.log(error);
        response.status(500).json({ error: 'Internal server error', message: error.message });
    }
}
