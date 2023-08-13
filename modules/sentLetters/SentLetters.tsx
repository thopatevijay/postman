import React from 'react'
import { useSentLetters } from './useSentLetters';
import * as Styled from "./SentLetters.styled";

const SentLetters = () => {
    const { letters } = useSentLetters();
    console.log(letters);

    return (
        <>
            <Styled.List
                itemLayout="horizontal"
                dataSource={letters}
                renderItem={(item: { url: string, description: string, to: { firstName: string } }, index) => (
                    <Styled.ListItem>
                        <Styled.ListItemMeta
                            avatar={<Styled.Avatar src={`https://xsgames.co/randomusers/avatar.php?g=pixel&key=${index}`} />}
                            title={<a target='_blank' rel="noopener noreferrer" href={item.url}>{item.description}</a>}
                            description={`Letter sent to ${item.to.firstName}`}
                        />
                    </Styled.ListItem>
                )}
            />
        </>
    )
}

export default SentLetters