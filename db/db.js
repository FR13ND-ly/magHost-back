import mongoose from "mongoose"

mongoose.connect(
    "mongodb+srv://motricala44:zdJZmaKMRLjTdJeP@cluster0.rfksgr8.mongodb.net/?retryWrites=true&w=majority",
    {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    }
)

mongoose.connection.on("connected", () => {
    console.log("Connected to MongoDB")
})

mongoose.connection.on("error", (err) => {
    console.error("MongoDB connection error:", err)
})
export default mongoose
