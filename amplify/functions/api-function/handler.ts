// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: MIT-0

import { BedrockRuntimeClient, InvokeModelCommand } from "@aws-sdk/client-bedrock-runtime";
import { APIGatewayProxyHandler } from "aws-lambda";

const bedrock = new BedrockRuntimeClient({ region: "eu-west-2" });
const modelId = "meta.llama3-70b-instruct-v1:0";
const accept = "application/json";
const contentType = "application/json";

interface RequestBody {
    message?: string;
}

interface ResponseBody {
    completion: string;
}

export const handler: APIGatewayProxyHandler = async (event) => {
    try {
        if (!event.body) {
            throw new Error("Request body is missing.");
        }
        console.log(event)

        const body: RequestBody = JSON.parse(event.body);
        const promptMessage = body.message || "hi";

        const newBody= {
            prompt: `
<|begin_of_text|><|start_header_id|>user<|end_header_id|> 
Please response in max 40 words to this question include emojis, but exclude unneeded special character:
${promptMessage}
<|eot_id|>
<|start_header_id|>assistant<|end_header_id|>
`,
            max_gen_len : 40,
            temperature: 0.9,
        };
        console.log(newBody)

        const command = new InvokeModelCommand({
            body: JSON.stringify(newBody),
            modelId: modelId,
            accept: accept,
            contentType: contentType,
        });

        const response = await bedrock.send(command);
        console.log(response);
        const responseBody: ResponseBody = JSON.parse(Buffer.from(response.body as Uint8Array).toString());
        console.log(responseBody);

        return {
            statusCode: 200,
            body: JSON.stringify(responseBody),
        };
    } catch (error) {
        const errorMessage = (error as Error).message;
        console.error("Error:", errorMessage);
        return {
            statusCode: 500,
            body: JSON.stringify({ error: errorMessage }),
        };
    }
};