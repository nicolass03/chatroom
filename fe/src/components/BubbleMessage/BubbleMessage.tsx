import { Flex } from 'antd';
import React from 'react';

const bubbleContainerOwnStyle: React.CSSProperties = {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
    width: '100%',
    height: 'auto',
    marginTop: 10,
    textAlign: 'right'
}

const bubbleContainerOtherStyle: React.CSSProperties = {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    alignContent: 'flex-start',
    width: '100%',
    height: 'auto',
    marginTop: 10,
    textAlign: 'left'

}

const senderTextStyle: React.CSSProperties = {
    color: '#245896',
    fontWeight: 'bold',
    lineHeight: '1px',
    fontSize: '0.6rem',
    height: '1px',
    // textAlign: 'left'
}

const bubbleStyle: React.CSSProperties = {
    display: 'flex',
    flexDirection: 'column',
    borderRadius: 10,
    backgroundColor: '#4096ff',
    padding: '3px 15px',
    lineHeight: '1px',
    color: '#ffffff'
}

function BubbleMessage(props: { message: string, sender?: string | null }) {
    let containerStyle, senderNameElement;
    if (!props.sender) {
        containerStyle = bubbleContainerOwnStyle;
        senderNameElement = null
    } else {
        containerStyle = bubbleContainerOtherStyle;
        senderNameElement = <p style={senderTextStyle}>{props.sender}</p>
    }
    return (
        <Flex style={containerStyle}>
            <Flex style={bubbleStyle}>
                {senderNameElement}
                <p>{props.message}</p>
            </Flex>
        </Flex>
    )
}

export default BubbleMessage
