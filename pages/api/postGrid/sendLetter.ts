import { NextApiRequest, NextApiResponse } from "next";

interface IContact {
    firstName: string,
    lastName: string,
    addressLine1: string,
    addressLine2: string,
    city: string,
    provinceOrState: string,
    postalOrZip: string,
}

interface IRequestBody {
    to: IContact;
    from: IContact;
    description: string;
    content: string;
}

export default async function sendLetter(
    request: NextApiRequest,
    response: NextApiResponse
): Promise<void> {
    try {
        const { to, from, description, content } = request.body as IRequestBody;
        const rightNow = new Date().toDateString();

        const options = {
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
                }
            }),
        };

        const res = await fetch('https://api.postgrid.com/print-mail/v1/letters', options);
        const data = await res.json();
        if (!res.ok) {
            throw new Error('Error sending letter');
        }
        response.status(200).json(data);
    } catch (error) {
        console.log(error)
        response.status(500).json({ error: 'Internal server error', message: error.message });
    }
}