// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: MIT-0

import React from 'react';
import { Text, View, StyleSheet } from 'react-native';
import PropTypes from 'prop-types';

const AppHeader = ({ title = 'RaiTalk' }) => {
    return (
        <View style={styles.wrapper}>
            <Text style={styles.appTitle}>{title}</Text>
        </View>
    );
};

AppHeader.propTypes = {
    title: PropTypes.string.isRequired,
};

export default AppHeader;

const colors = {
    primary: 'rgb(229,198,30)',
    textWhite: '#FFFFFF',
};

const styles = StyleSheet.create({
    wrapper: {
        marginTop: 20,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: colors.primary,
        padding: 10,
    },
    appTitle: {
        fontSize: 14,
        fontWeight: 'bold',
        color: colors.textWhite,
    },
});