import mongoose from "mongoose";

const TestSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  questions: [
    {
      title: {
        type: String,
        required: true,
      },
      answers: [
        {
          text: {
            type: String,
            required: true,
          },
          isCorrect: {
            type: Boolean,
            required: true,
            default: false, // По умолчанию ответ неверный, если не указано иное
          },
        },
      ],
    },
  ],
});

export default mongoose.model("Test", TestSchema);
