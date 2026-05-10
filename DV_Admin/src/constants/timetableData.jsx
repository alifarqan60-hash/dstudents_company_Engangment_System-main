import TimetableCard from "../components/Admin/Users/TimetableCard";

export const timetableData = [
  {
    time: "9:00",
    class: (
      <TimetableCard
        bgColor={"bg-customCard1Color"}
        className={"UX ResearchClass"}
        classType={"(Virtual Class)"}
        days={"Mon - Thu"}
        status={"Completed"}
        statusColor={"text-customGray"}
        teacherName={"Ali Imran"}
      />
    ),
  },
  {
    time: "10:00",
    class: null,
  },
  {
    time: "11:00",
    class: null,
  },
  {
    time: "12:00",
    class: null,
  },
  {
    time: "13:00",
    class: (
      <TimetableCard
        bgColor={"bg-customCard2Color"}
        className={"UX ResearchClass"}
        classType={"(Virtual Class)"}
        days={"Mon - Thu"}
        status={"On Going"}
        statusColor={"text-customGreen"}
        teacherName={"Ali Imran"}
      />
    ),
  },
  {
    time: "14:00",
    class: null,
  },
  {
    time: "15:00",
    class: null,
  },
  {
    time: "16:00",
    class: null,
  },
  {
    time: "17:00",
    class: null,
  },
  {
    time: "18:00",
    class: null,
  },
  {
    time: "19:00",
    class: (
      <TimetableCard
        bgColor={"bg-customCard1Color"}
        className={"UX ResearchClass"}
        classType={"(Virtual Class)"}
        days={"Mon - Thu"}
        status={"10:00 am - 11:00 am"}
        statusColor={"text-customLightGray"}
        teacherName={"Ali Imran"}
      />
    ),
  },
  {
    time: "20:00",
    class: null,
  },
];
