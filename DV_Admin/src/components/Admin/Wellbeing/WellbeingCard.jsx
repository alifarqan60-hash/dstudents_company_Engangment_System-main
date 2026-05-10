import React from "react";
import EditDeleteDropDown from "./EditDeleteDropDown";

export default function WellbeingCard() {
  return (
    <div className="bg-customYellow w-[300px] rounded-xl p-4 font-sans  text-white">
      <div className="flex justify-between items-center mb-2">
        <p className="text-xl font-medium">Bullying</p>
        <EditDeleteDropDown />
      </div>
      <div className="text-sm text-customWhite70 font-light">
        Bullying is behaviour by an individual or group, repeated over time,
        that intentionally hurts another individual or group either physically
        or emotionally. Bullying can take many forms (for instance, cyber-
        bullying via text messages or the internet), and is often motivated by
        prejudice against particular groups, for example on grounds of race,
        religion, gender, sexual orientation, or because a child is adopted or
        has caring responsibilities. It might be motivated by actual differences
        between children, or perceived differences.
        <br /> We believe it is the right of all members of our community to
        learn, work and play in a safe and secure environment. We promote an
        understanding of one another through the Curriculum and teach and model
        the attitudes, values and respect that we expect members of our
        community to show one another. <br />
        We make a clear anti-bullying statement that states:
      </div>
      <br />
      <div className="text-customMaroon text-sm font-medium cursor-pointer">
        See Our Anti bullying policy here
      </div>
    </div>
  );
}
