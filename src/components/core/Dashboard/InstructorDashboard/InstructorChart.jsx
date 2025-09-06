import { useState } from "react"
import { Chart, registerables } from "chart.js"
import { Pie } from "react-chartjs-2"

Chart.register(...registerables)

export default function InstructorChart({ courses }) {
  // Ensure courses is always an array
  const safeCourses = Array.isArray(courses) ? courses : []

  const [currChart, setCurrChart] = useState("students")

  // Generates random colors for the chart
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

  // Chart config for students enrolled
  const chartDataStudents = {
    labels: safeCourses.map((course) => course.courseName ?? "Untitled"),
    datasets: [
      {
        data: safeCourses.map((course) => course.totalStudentsEnrolled ?? 0),
        backgroundColor: generateRandomColors(safeCourses.length),
      },
    ],
  }

  // Chart config for income generated
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
    maintainAspectRatio: false,
  }

  // Render a fallback message if no chart data
  const noData = safeCourses.length === 0 ||
    safeCourses.every((course) =>
      (currChart === "students"
        ? !course.totalStudentsEnrolled
        : !course.totalAmountGenerated)
    )

  return (
    <div className="flex flex-1 flex-col gap-y-4 rounded-md bg-richblack-800 p-6">
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
      <div className="relative mx-auto aspect-square h-full w-full">
        {noData ? (
          <div className="flex items-center justify-center h-full font-bold text-xl text-richblack-50">
            Not Enough Data To Visualize
          </div>
        ) : (
          <Pie
            data={currChart === "students" ? chartDataStudents : chartIncomeData}
            options={options}
          />
        )}
      </div>
    </div>
  )
}
