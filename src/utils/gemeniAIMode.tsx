const {
  GoogleGenerativeAI,
  HarmCategory,
  HarmBlockThreshold,
} = require("@google/generative-ai");

const apiKey = process.env.NEXT_PUBLIC_GEMINI_API_KEY;
const genAI = new GoogleGenerativeAI(apiKey);

const model = genAI.getGenerativeModel({
  model: "gemini-2.0-flash",
});

const generationConfig = {
  temperature: 1,
  topP: 0.95,
  topK: 40,
  maxOutputTokens: 8192,
  responseMimeType: "text/plain",
};

export const chatSession = model.startChat({
  generationConfig,
});




// import { OpenRouter } from '@openrouter/sdk';

// const openRouter = new OpenRouter({
//   apiKey: '<OPENROUTER_API_KEY>',
//   defaultHeaders: {
//     'HTTP-Referer': '<YOUR_SITE_URL>', // Optional. Site URL for rankings on openrouter.ai.
//     'X-Title': '<YOUR_SITE_NAME>', // Optional. Site title for rankings on openrouter.ai.
//   },
// });

// const completion = await openRouter.chat.send({
//   model: 'openai/gpt-4o',
//   messages: [
//     {
//       role: 'user',
//       content: 'What is the meaning of life?',
//     },
//   ],
//   stream: false,
// });

// console.log(completion.choices[0].message.content);
