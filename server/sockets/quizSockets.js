// /sockets/quizSockets.js

export const quizSocketHandler = (io) => {
  io.on("connection", (socket) => {
    console.log("🟢 New client connected:", socket.id);

    socket.on("join-quiz", ({ quizId, studentId }) => {
      socket.join(quizId);
      console.log(`Student ${studentId} joined quiz ${quizId}`);
    });

    socket.on("start-quiz", ({ quizId }) => {
      io.to(quizId).emit("quiz-started", {
        quizId,
        message: "Quiz has started!",
      });
    });

    socket.on("submit-answer", ({ quizId, studentId, answer }) => {
      console.log(`Answer from ${studentId} for ${quizId}: ${answer}`);
      // TODO: Update leaderboard, save to DB if needed
    });

    socket.on("disconnect", () => {
      console.log("🔴 Client disconnected:", socket.id);
    });
  });
};
