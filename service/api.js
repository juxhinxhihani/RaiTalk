// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: MIT-0

import { post } from 'aws-amplify/api';

const fetchChatAPI = async message => {
    try {
        const restOperation = post({
            apiName: 'myRestApi',
            path: 'chat',
            options: {
                body: {
                    message: message
                }
            }
        });

        const { body } = await restOperation.response;
        console.log(body)
        const response = await body.json();
        console.log(response)
        const cleanedText = response.generation || 'Please try again later!';
        return cleanedText

    } catch (error) {
        console.log('POST call failed :', JSON.parse(error.response.body).error);
        return JSON.parse(error.response.body).error;
    }
}

export { fetchChatAPI };