import StudentTimetableCard from "../components/Student/StudentTimetableCard";

export const studentTimetableData = [
  {
    time: "9:00",
    class: (onclick) => {
      return (
        <StudentTimetableCard
          id={1}
          bgColor={"bg-customCard1Color"}
          className={"UX ResearchClass"}
          classType={"(Virtual Class)"}
          days={"Mon - Thu"}
          status={"Completed"}
          statusColor={"text-customGray"}
          teacherName={"Ali Imran"}
          onclick={onclick}
        />
      );
    },
  },
  {
    time: "10:00",
    class: () => null,
  },
  {
    time: "11:00",
    class: () => null,
  },
  {
    time: "12:00",
    class: () => null,
  },
  {
    time: "13:00",
    class: (onclick) => {
      return (
        <StudentTimetableCard
          id={2}
          bgColor={"bg-customCard2Color"}
          className={"UX ResearchClass"}
          classType={"(Virtual Class)"}
          days={"Mon - Thu"}
          status={"Join Class"}
          statusColor={"text-customGray"}
          teacherName={"Ali Imran"}
          onclick={onclick}
        />
      );
    },
  },
  {
    time: "14:00",
    class: () => null,
  },
  {
    time: "15:00",
    class: () => null,
  },
  {
    time: "16:00",
    class: () => null,
  },
  {
    time: "17:00",
    class: () => null,
  },
  {
    time: "18:00",
    class: () => null,
  },
  {
    time: "19:00",
    class: (onclick) => {
      return (
        <StudentTimetableCard
          id={3}
          bgColor={"bg-customCard1Color"}
          className={"UX ResearchClass"}
          classType={"(Virtual Class)"}
          days={"Mon - Thu"}
          status={"10:00 am - 11:00 am"}
          statusColor={"text-customLightGray"}
          teacherName={"Ali Imran"}
          onclick={onclick}
        />
      );
    },
  },
  {
    time: "20:00",
    class: () => null,
  },
];
