interface ActivityItem {
  examTitle: string;
  date: string;
  score: number;
  time: string;
}

interface RecentActivityTableProps {
  activities: ActivityItem[];
}

const RecentActivityTable = ({ activities }: RecentActivityTableProps) => {
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full">
        <thead>
          <tr className="border-b border-gray-200">
            <th className="text-left py-3 px-4 font-medium text-gray-600">Exam</th>
            <th className="text-left py-3 px-4 font-medium text-gray-600">Date</th>
            <th className="text-left py-3 px-4 font-medium text-gray-600">Score</th>
            <th className="text-left py-3 px-4 font-medium text-gray-600">Time</th>
          </tr>
        </thead>
        <tbody>
          {activities.length > 0 ? (
            activities.map((activity, index) => (
              <tr key={index} className="border-b border-gray-200 hover:bg-gray-50">
                <td className="py-3 px-4">{activity.examTitle}</td>
                <td className="py-3 px-4 text-gray-600">{activity.date}</td>
                <td className="py-3 px-4">
                  <span 
                    className={`inline-block px-2 py-1 
                      ${activity.score >= 80 ? 'bg-green-100 text-green-800' : 
                        activity.score >= 60 ? 'bg-yellow-100 text-yellow-800' : 
                        'bg-red-100 text-red-800'} 
                      rounded-full text-xs`}
                  >
                    {activity.score}%
                  </span>
                </td>
                <td className="py-3 px-4 text-gray-600">{activity.time}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={4} className="py-6 text-center text-gray-500">
                No recent activity found. Complete exams to see your progress here.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default RecentActivityTable;
