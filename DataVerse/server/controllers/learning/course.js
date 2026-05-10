import Course from "../../models/learning/Course.js";
import User from "../../models/User.js";


export const addCourse = async (req, res, next) => {
  try {
    const newCourse = new Course({
      title: req.body.title,
      description: req.body.description,
      instructor: req.body.instructor,
      type: req.body.type || null,
      category: req.body.category || null,
      coverUrl: req.body.coverUrl || null
    });


    const savedCourse = await newCourse.save();
    res.status(200).json({ message: "Course has been successfully added", savedCourse });
  } catch (err) {
    next(err);
  }
};


export const deleteCourse = async (req, res, next) => {
  try {
    const deletedCourse = await Course.findByIdAndDelete(req.params.courseId);

    if (!deletedCourse) {
      return next(createError(404, "Course not found"));
    }

    res.status(200).json("Course has been successfully deleted");
  } catch (err) {
    next(err);
  }
};

export const getCourse = async (req, res, next) => {
  const courseId = req.params.courseId
  try {
    const course = await Course.findById(courseId).populate('lectures');

    if (!course)
      return res.status(404).json({ message: "Course not found!" })

    return res.status(200).json(course)
  }
  catch (err) {
    next(err)
  }
}

export const getAllCourses = async (req, res, next) => {

  try {
    const courses = await Course.find({}).populate('lectures').populate({
      "path": "lectures",
      "populate": {
        "path": "quiz",
        "model": "Quiz"
      }
    });

    if (!courses || courses.length === 0)
      return res.status(200).json([])

    return res.status(200).json(courses)
  }
  catch (err) {
    next(err)
  }

}

export const getEnrolledCourses = async (req, res, next) => {
  const userId = req.user.id;

  try {
    const user = await User.findById(userId).select("enrolledCourses");

    if (!user || user.enrolledCourses.length === 0) {
      return res.status(404).json({ message: "No enrolled courses found" });
    }

    const courseIds = user.enrolledCourses.map(course => course.courseId);


    const coursesDetails = await Course.find({ _id: { $in: courseIds } }).select("title totalLectures");

    res.status(200).json(coursesDetails);

  } catch (err) {
    next(err);
  }
};


export const enrollCourse = async (req, res, next) => {

  const courseId = req.params.courseId;
  const userId = req.user.id;

  try {

    const user = await User.findById(userId).select("enrolledCourses");


    const isAlreadyEnrolled = user.enrolledCourses.some((course) => course.courseId.toString() === courseId);

    if (isAlreadyEnrolled) {
      return res.status(400).json({ message: "Course is already enrolled" });
    }

    user.enrolledCourses.push({ courseId, completed: false });

    await user.save();

    res.status(200).json({ message: "Successfully enrolled in the course" });
  } catch (err) {
    next(err);
  }
};



