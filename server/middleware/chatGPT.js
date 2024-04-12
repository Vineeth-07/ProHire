const OpenAI = require("openai");
require("dotenv").config();

const openai = new OpenAI({
  apiKey: process.env["OPEN_API_KEY"],
});

const systemPrompt =
  "You are an assistant helping a user to create job posts. " +
  "Given a message , you should extract the total details of the job. " +
  "The user will provide the details like title, company, description, location, salary, deadline, experience. " +
  "Convert salary into numericals, for example convert 5 lakhs into 500000" +
  "To compute relatives dates, assume that the current timestamp is " +
  new Date().toISOString() +
  ". ";

async function askChatGPT(question) {
  try {
    const chatCompletion = await openai.chat.completions.create({
      messages: [
        { role: "system", content: systemPrompt },
        { role: "user", content: question },
      ],
      tools: [
        {
          type: "function",
          function: {
            name: "createJob",
            description: "Create a new job",
            parameters: {
              type: "object",
              properties: {
                title: {
                  type: "string",
                  description: "The title of the job",
                },
                company: {
                  type: "string",
                  description: "The name of company for job",
                },
                description: {
                  type: "string",
                  description: "The description of the job",
                },
                location: {
                  type: "string",
                  description: "The location of the job",
                },
                salary: {
                  type: "integer",
                  description: "The salary of the job",
                },
                deadline: {
                  type: "string",
                  description:
                    "The date the deadline of the job ends at ISO8601",
                },
                experience: {
                  type: "string",
                  description: "The experience of the job",
                },
              },
            },
          },
        },
      ],
      tool_choice: { type: "function", function: { name: "createJob" } },
      model: "gpt-3.5-turbo",
    });
    return chatCompletion.choices[0].message.tool_calls[0].function;
  } catch (error) {
    console.error("Error making a query: ", error);
    return null;
  }
}

// function
async function getResponse(question) {
  const suggestion = await askChatGPT(question);
  if (suggestion) {
    return suggestion;
  } else {
    console.log("No response received from ChatGPT.");
  }
}

module.exports = getResponse;
