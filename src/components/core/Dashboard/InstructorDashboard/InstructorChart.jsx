import { useState } from "react"
import { Chart, registerables } from "chart.js"
import { Pie } from "react-chartjs-2"

Chart.register(...registerables)

export default function InstructorChart({ courses }) {
  const safeCourses = Array.isArray(courses) ? courses : []
  const [currChart, setCurrChart] = useState("students")

  const generateRandomColors = (numColors) => {
    const colors = []
    for (let i = 0; i < numColors; i++) {
      const color = `rgb(${Math.floor(Math.random() * 256)}, ${Math.floor(
        Math.random() * 256
      )}, ${Math.floor(Math.random() * 256)})`
      colors.push(color)
    }
    return colors
  }

  const chartDataStudents = {
    labels: safeCourses.map((course) => course.courseName ?? "Untitled"),
    datasets: [
      {
        data: safeCourses.map((course) => course.totalStudentsEnrolled ?? 0),
        backgroundColor: generateRandomColors(safeCourses.length),
      },
    ],
  }

  const chartIncomeData = {
    labels: safeCourses.map((course) => course.courseName ?? "Untitled"),
    datasets: [
      {
        data: safeCourses.map((course) => course.totalAmountGenerated ?? 0),
        backgroundColor: generateRandomColors(safeCourses.length),
      },
    ],
  }

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "top",
        labels: {
          color: "#D1D5DB",
        }
      }
    }
  }

  const noData = safeCourses.length === 0 ||
    safeCourses.every((course) =>
      (currChart === "students"
        ? !course.totalStudentsEnrolled
        : !course.totalAmountGenerated)
    )

  return (
    <div className="w-full h-full flex flex-col gap-y-4 rounded-md bg-richblack-800 p-6">
      <p className="text-lg font-bold text-richblack-5">Visualize</p>
      <div className="space-x-4 font-semibold">
        <button
          onClick={() => setCurrChart("students")}
          className={`rounded-sm p-1 px-3 transition-all duration-200 ${
            currChart === "students"
              ? "bg-richblack-700 text-yellow-50"
              : "text-yellow-400"
          }`}
        >
          Students
        </button>
        <button
          onClick={() => setCurrChart("income")}
          className={`rounded-sm p-1 px-3 transition-all duration-200 ${
            currChart === "income"
              ? "bg-richblack-700 text-yellow-50"
              : "text-yellow-400"
          }`}
        >
          Income
        </button>
      </div>
      <div className="relative w-full h-[300px] md:h-[350px] lg:h-[400px] min-h-[250px] flex items-center justify-center">
        {noData ? (
          <div className="font-bold text-xl text-richblack-50 flex items-center justify-center h-full">
            Not Enough Data To Visualize
          </div>
        ) : (
          <Pie
            data={currChart === "students" ? chartDataStudents : chartIncomeData}
            options={options}
            width={300}
            height={300}
          />
        )}
      </div>
    </div>
  )
}
