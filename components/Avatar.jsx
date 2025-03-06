// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: MIT-0

import React from 'react';
import {View, Text, StyleSheet} from 'react-native';

const Avatar = ({isUser}) => {
    const avatarStyle = {
        borderRadius: 50,
        width: 40,
        height: 40,
        backgroundColor: isUser ? colors.userAvatar : colors.chatBotAvatar,
        marginLeft: isUser ? 8 : 0,
        marginRight: isUser ? 0 : 8,
        justifyContent: 'center',
        alignItems: 'center',
    };

    const iconStyle = {
        color: colors.textWhite,
        fontWeight: 'bold',
    };

    const icon = isUser ? (
        <Text style={iconStyle}>CL</Text>
    ) : (
        <Text style={iconStyle}>RF</Text>
    );

    return <View style={[styles.avatar, avatarStyle]}>{icon}</View>;
};

const colors = {
    userAvatar: 'rgba(188,73,129, 1)',
    chatBotAvatar: 'rgb(229,198,30)',
    textWhite: '#fff',
};

const styles = StyleSheet.create({
    avatar: {
        // Additional styles common to both avatars can be added here
    },
});

export const UserAvatar = () => {
    return <Avatar isUser={true} />;
};

export const ChatBotAvatar = () => {
    return <Avatar isUser={false} />;
};