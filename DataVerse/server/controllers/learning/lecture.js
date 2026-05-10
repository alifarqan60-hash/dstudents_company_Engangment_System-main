import Course from "../../models/learning/Course.js";
import Lecture from "../../models/learning/Lecture.js";
import Quiz from "../../models/learning/Quiz.js";
import User from "../../models/User.js";


export const createLecture = async (req, res, next) => {
  const { courseId, title, videoUrl, index, quizId, transcript } = req.body;

  try {
    // Validate required fields
    if (!title || index === undefined) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    // Check if the course exists
    const course = await Course.findById(courseId).populate("lectures");
    if (!course) {
      return res.status(404).json({ message: "Course not found" });
    }

    // Check if a quiz exists for the provided quizId (if quizId is provided)
    let quiz;
    if (quizId) {
      quiz = await Quiz.findById(quizId);
      if (!quiz) {
        return res.status(404).json({ message: "Quiz not found" });
      }
    }

    // Check if a lecture with the same index already exists
    const existingLecture = course.lectures.find((lecture) => lecture.index === index);
    if (existingLecture) {
      return res.status(400).json({ message: "Lecture with this index already exists" });
    }

    // Create a new lecture
    const newLectureData = {
      title,
      index,
      ...(videoUrl && { videoUrl }), // Include videoUrl only if provided
      ...(transcript && { transcript }), // Include transcript only if provided
      ...(quiz && { quiz: quiz._id }), // Include quiz if provided
    };

    const newLecture = new Lecture(newLectureData);

    // Save the lecture
    const savedLecture = await newLecture.save();

    // Add the lecture to the course
    course.lectures.push(savedLecture._id);
    course.totalLectures += 1;
    await course.save();

    res.status(201).json({ message: "Lecture saved successfully!", savedLecture });
  } catch (err) {
    next(err);
  }
};


export const lectureCompleted = async (req, res, next) => {
  const userId = req.user.id;
  const { lectureId, courseId } = req.params;

  try {
    const lecture = await Lecture.findById(lectureId).populate("quiz");
    if (!lecture) {
      return res.status(404).json({ message: "Lecture not found!" });
    }

    const course = await Course.findById(courseId);
    const user = await User.findById(userId);
    if (!user || !course) {
      return res.status(404).json({ message: "User or course not found" });
    }

    const isLectureValid = course.lectures.some((lec) => lec.toString() === lectureId);
    if (!isLectureValid) {
      return res.status(404).json({ message: "Lecture not found in this course" });
    }

    let enrolledCourse = user.enrolledCourses.find(
      (courseDetails) => courseDetails.courseId.toString() === courseId
    );
    if (!enrolledCourse) {
      return res.status(404).json({ message: "User not enrolled in this course" });
    }

    if (enrolledCourse.lectureCompleted.includes(lecture.index)) {
      return res.status(400).json({ message: "Lecture already completed" });
    }

    enrolledCourse.lectureCompleted.push(lecture.index);
    enrolledCourse.progress =
      (enrolledCourse.lectureCompleted.length / course.totalLectures) * 100;

    if (user.totalPoints === 0) {
      user.totalPoints = 50;
    } else {
      user.totalPoints += 50;
    }

    if (enrolledCourse.progress === 100) {
      enrolledCourse.completed = true;
    }

    const currentDate = new Date().toISOString().split("T")[0]; // Get current date in YYYY-MM-DD format
    if (user.activityLog.has(currentDate)) {
      user.activityLog.set(currentDate, user.activityLog.get(currentDate) + 1);
    } else {
      user.activityLog.set(currentDate, 1);
    }

    await user.save();

    return res.status(200).json({ message: "Lecture completed successfully!", user });
  } catch (err) {
    next(err);
  }
};



export const getLecture = async (req, res, next) => {
  const lectureId = req.params.lectureId
  try{
    const lecture = await Lecture.findById(lectureId).populate("quiz");

    if(!lecture)
      return res.status(404).json({ message: "Lecture not found!"});

    res.status(200).json(lecture);
  }
  catch(err){
    next(err)
  }
}

export const deleteLecture = async (req, res, next) => {
  const { courseId, lectureId } = req.params;

  try {

    const course = await Course.findById(courseId);
    if (!course) {
      return res.status(404).json({ message: "Course not found" });
    }

    const lectureIndex = course.lectures.findIndex(
      (lecture) => lecture.toString() === lectureId
    );

    if (lectureIndex === -1) {
      return res.status(404).json({ message: "Lecture not found in the course" });
    }

    course.lectures.splice(lectureIndex, 1);
    course.totalLectures -= 1;
    await course.save();

    const deletedLecture = await Lecture.findByIdAndDelete(lectureId);
    if (!deletedLecture) {
      return res.status(404).json({ message: "Lecture not found" });
    }

    
     
    
    res.status(200).json({ message: "Lecture deleted successfully", deletedLecture });
  } catch (err) {
    next(err);
  }
};
