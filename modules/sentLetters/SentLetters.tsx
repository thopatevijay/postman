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
                renderItem={(item, index) => (
                    <Styled.ListItem>
                        <Styled.ListItemMeta
                            avatar={<Styled.Avatar src={`https://xsgames.co/randomusers/avatar.php?g=pixel&key=${index}`} />}
                            title={<a target='_blank' rel="noopener noreferrer" href={`https://pg-prod-bucket-1.s3.amazonaws.com/test/${item.url}`}>{item.time}</a>}
                        />
                    </Styled.ListItem>
                )}
            />
        </>
    )
}

export default SentLetters