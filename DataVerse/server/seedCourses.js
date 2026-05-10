import mongoose from "mongoose";
import dotenv from "dotenv";
import Course from "./models/learning/Course.js";
import Lecture from "./models/learning/Lecture.js";
import Quiz from "./models/learning/Quiz.js";

dotenv.config();

const connectdb = async () => {
    try {
        await mongoose.connect(process.env.MONGO);
        console.log("Connected to MongoDB for seeding");
    } catch (error) {
        console.error("MongoDB connection error:", error);
        process.exit(1);
    }
};

const seedData = async () => {
    await connectdb();

    await Course.deleteMany({});
    await Lecture.deleteMany({});
    await Quiz.deleteMany({});

    console.log("Cleared existing course data");

    // --- Programming / Python ---
    const pyQuiz1 = await Quiz.create({
        title: "Python Hello World",
        excercise: "Print 'Hello DataVerse'",
        type: "coding",
        instructions: ["Use the print function"],
        codeTemplate: "# Write here\n",
        correctCode: "print('Hello DataVerse')",
        points: 10
    });

    const pyLectures = await Promise.all([
        Lecture.create({
            title: "Python Basics",
            videoUrl: "https://www.youtube.com/embed/kqtD5dpn9C8",
            index: 1,
            quiz: [pyQuiz1._id],
            transcript: [{ type: "heading", content: "Intro" }, { type: "text", content: "Welcome" }]
        }),
        Lecture.create({
            title: "Python Variables",
            videoUrl: "https://www.youtube.com/embed/Z1Yd7upQsXY",
            index: 2,
            transcript: [{ type: "heading", content: "Variables" }, { type: "text", content: "Learning Variables" }]
        })
    ]);

    await Course.create({
        title: "Python for Data Analytics",
        description: "Master Python for data tasks.",
        instructor: "Zaki",
        totalLectures: pyLectures.length,
        lectures: pyLectures.map(l => l._id),
        type: "video",
        category: "Programming"
    });

    // --- Data Science ---
    const dsQuiz1 = await Quiz.create({
        title: "Pandas Series",
        excercise: "Create a series",
        type: "coding",
        instructions: ["Import pandas"],
        codeTemplate: "import pandas as pd\n",
        correctCode: "import pandas as pd\nprint(pd.Series([1,2,3]))",
        points: 20
    });

    const dsLectures = await Promise.all([
        Lecture.create({
            title: "Pandas Intro",
            videoUrl: "https://www.youtube.com/embed/vmEHCJofslg",
            index: 1,
            quiz: [dsQuiz1._id],
            transcript: [{ type: "heading", content: "Pandas" }, { type: "text", content: "DataFrames" }]
        })
    ]);

    await Course.create({
        title: "Data Science with Pandas",
        description: "Deep dive into data manipulation.",
        instructor: "Zaki",
        totalLectures: dsLectures.length,
        lectures: dsLectures.map(l => l._id),
        type: "video",
        category: "Data Science"
    });

    // --- Machine Learning ---
    const mlLectures = await Promise.all([
        Lecture.create({
            title: "Linear Regression",
            videoUrl: "https://www.youtube.com/embed/GwIo3gDZCVQ",
            index: 1,
            transcript: [{ type: "heading", content: "ML" }, { type: "text", content: "Regression" }]
        })
    ]);

    await Course.create({
        title: "Machine Learning with Python",
        description: "Build, train and deploy ML models.",
        instructor: "Zaki",
        totalLectures: mlLectures.length,
        lectures: mlLectures.map(l => l._id),
        type: "video",
        category: "Machine Learning"
    });

    // --- NEW: Deep Learning ---
    const dlQuiz1 = await Quiz.create({
        title: "Neural Networks Concept",
        excercise: "Basics of Neurons",
        type: "coding",
        instructions: ["Print 'Neuron activated'"],
        codeTemplate: "# Logic here\n",
        correctCode: "print('Neuron activated')",
        points: 30
    });

    const dlLectures = await Promise.all([
        Lecture.create({
            title: "Intro to Neural Networks",
            videoUrl: "https://www.youtube.com/embed/aircAruvnKk",
            index: 1,
            quiz: [dlQuiz1._id],
            transcript: [{ type: "heading", content: "Deep Learning" }, { type: "text", content: "Intro to NN" }]
        })
    ]);

    await Course.create({
        title: "Deep Learning Specialization",
        description: "Master Neural Networks and Deep Learning concepts with hands-on projects.",
        instructor: "Zaki",
        totalLectures: dlLectures.length,
        lectures: dlLectures.map(l => l._id),
        type: "video",
        category: "Deep Learning"
    });

    const allCourses = await Course.find();
    console.log("Seeded Courses:");
    allCourses.forEach(c => console.log(`${c.title}: ${c._id}`));
    console.log("Seeding complete!");
    process.exit(0);
};

seedData();
