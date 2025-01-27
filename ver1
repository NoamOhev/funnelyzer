import React, { useState } from 'react';
import { Download, GripVertical, X, AlertTriangle } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

const FunnelAnalyzer = () => {
  const [stages, setStages] = useState([
    { id: 1, name: 'מתעניינים (מודעה או פוסט)', count: '', marketingCost: '', isFirst: true },
    { id: 2, name: 'צפייה בתוכן ראשוני (סרטון/דף נחיתה)', count: '', isFirst: false },
    { id: 3, name: 'מילוי טופס או הרשמה', count: '', isFirst: false },
    { id: 4, name: 'רכישת קורס', count: '', dealValue: '', isFirst: false },
  ]);
  const [draggedIndex, setDraggedIndex] = useState(null);

  const calculateConversion = (currentCount, previousCount) => {
    if (!previousCount || !currentCount) return '-';
    const rate = (currentCount / previousCount) * 100;
    return rate.toFixed(1);
  };

  const calculateROI = () => {
    const firstStage = stages[0];
    const lastStage = stages[stages.length - 1];

    const totalCost = parseFloat(firstStage.marketingCost) || 0;
    const totalRevenue = (parseFloat(lastStage.count) || 0) * (parseFloat(lastStage.dealValue) || 0);

    const roi = totalCost ? ((totalRevenue - totalCost) / totalCost) * 100 : 0;

    return {
      cost: totalCost,
      revenue: totalRevenue,
      roi: roi,
    };
  };

  const findWeakestLink = () => {
    let worstDropoff = -1;
    let worstIndex = -1;

    for (let i = 1; i < stages.length; i++) {
      const prevCount = parseFloat(stages[i - 1].count) || 0;
      const currentCount = parseFloat(stages[i].count) || 0;

      if (prevCount > 0) {
        const dropoff = 1 - currentCount / prevCount;
        const weightedDropoff = dropoff * (stages.length - i);

        if (weightedDropoff > worstDropoff) {
          worstDropoff = weightedDropoff;
          worstIndex = i;
        }
      }
    }

    const revenue = calculateROI().revenue;
    if (revenue === 0) return stages.length - 1;

    return worstIndex;
  };

  const markAsWeakest = () => {
    const weakestIndex = findWeakestLink();
    setStages(
      stages.map((stage, index) => ({
        ...stage,
        isFirst: index === weakestIndex,
      }))
    );
  };

  const handleCountChange = (id, value) => {
    setStages(
      stages.map((stage) =>
        stage.id === id ? { ...stage, count: value } : stage
      )
    );
  };

  const addNewStage = () => {
    const newId = Math.max(...stages.map((s) => s.id), 0) + 1;
    setStages([...stages, { id: newId, name: `שלב ${newId}`, count: '', isFirst: false }]);
  };

  const deleteStage = (id) => {
    setStages(stages.filter((stage) => stage.id !== id));
  };

  const handleDragStart = (index) => {
    setDraggedIndex(index);
  };

  const handleDragOver = (e, index) => {
    e.preventDefault();
    if (draggedIndex === null || draggedIndex === index) return;

    const newStages = [...stages];
    const draggedStage = newStages[draggedIndex];
    newStages.splice(draggedIndex, 1);
    newStages.splice(index, 0, draggedStage);
    setStages(newStages);
    setDraggedIndex(index);
  };

  const handleDragEnd = () => {
    setDraggedIndex(null);
  };

  const downloadCSV = () => {
    const roi = calculateROI();
    let csv = 'שלב,מספר אנשים,אחוז המרה\n';
    stages.forEach((stage, index) => {
      const conversionRate =
        index === 0
          ? '100'
          : calculateConversion(stage.count, stages[index - 1].count);
      csv += `${stage.name},${stage.count},${conversionRate}%\n`;
    });
    csv += `\nסיכום כלכלי\nהשקעה,${roi.cost}\nהכנסות,${roi.revenue}\nהחזר השקעה,${roi.roi.toFixed(1)}%\n`;

    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = 'funnel-analysis.csv';
    link.click();
  };

  const roi = calculateROI();

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white" dir="rtl">
      <div className="max-w-6xl mx-auto p-4">
        <div className="flex items-center justify-between mb-8 pt-4">
          <div className="flex items-center">
            <div className="bg-blue-600 text-white p-3 rounded-lg ml-3">
              <svg
                className="w-8 h-8"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path d="M22 3H2l8 9.46V19l4 2v-8.54L22 3z" />
              </svg>
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-800">מנתח המשפך השיווקי שלך</h1>
              <p className="text-gray-600 text-sm">כלי מותאם לבעלי קורסים דיגיטליים</p>
            </div>
          </div>
        </div>

        <Card className="shadow-lg border-0">
          <CardHeader className="bg-gray-50 border-b">
            <CardTitle className="text-xl text-gray-700">שלבי המשפך שלך</CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            <div className="space-y-4">
              <table className="w-full">
                <thead>
                  <tr className="text-gray-600">
                    <th className="w-8"></th>
                    <th className="text-right py-3">שלב</th>
                    <th className="text-right py-3">מספר אנשים</th>
                    <th className="text-right py-3">נתונים כספיים</th>
                    <th className="text-right py-3">אחוז המרה</th>
                    <th className="w-8"></th>
                  </tr>
                </thead>
                <tbody>
                  {stages.map((stage, index) => (
                    <tr
                      key={stage.id}
                      className={`border-t transition-colors ${
                        stage.isFirst ? 'bg-yellow-50' : 'hover:bg-gray-50'
                      }`}
                      draggable="true"
                      onDragStart={() => handleDragStart(index)}
                      onDragOver={(e) => handleDragOver(e, index)}
                      onDragEnd={handleDragEnd}
                    >
                      <td className="py-2">
                        <GripVertical className="cursor-move w-4 h-4 text-gray-400" />
                      </td>
                      <td className="py-2">
                        <div className="flex items-center">
                          {stage.isFirst && (
                            <AlertTriangle className="w-4 h-4 text-yellow-500 ml-2" />
                          )}
                          <Input
                            type="text"
                            value={stage.name}
                            onChange={(e) => {
                              const newStages = [...stages];
                              newStages[index].name = e.target.value;
                              setStages(newStages);
                            }}
                            className="max-w-[200px] bg-white"
                          />
                        </div>
                      </td>
                      <td className="py-2">
                        <Input
                          type="number"
                          value={stage.count}
                          onChange={(e) => handleCountChange(stage.id, e.target.value)}
                          placeholder="הכנס מספר"
                          className="max-w-[150px] bg-white"
                        />
                      </td>
                      <td className="py-2">
                        {index === 0 && (
                          <Input
                            type="number"
                            value={stage.marketingCost}
                            onChange={(e) => {
                              const newStages = [...stages];
                              newStages[index].marketingCost = e.target.value;
                              setStages(newStages);
                            }}
                            placeholder="תקציב שיווק"
                            className="max-w-[150px] bg-white"
                          />
                        )}
                        {index === stages.length - 1 && (
                          <Input
                            type="number"
                            value={stage.dealValue}
                            onChange={(e) => {
                              const newStages = [...stages];
                              newStages[index].dealValue = e.target.value;
                              setStages(newStages);
                            }}
                            placeholder="ערך קורס ממוצע"
                            className="max-w-[150px] bg-white"
                          />
                        )}
                      </td>
                      <td className="py-2 font-medium">
                        {index === 0
                          ? '100%'
                          : `${calculateConversion(stage.count, stages[index - 1].count)}%`}
                      </td>
                      <td className="py-2">
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => deleteStage(stage.id)}
                          className="h-8 w-8 hover:bg-red-50 hover:text-red-600"
                        >
                          <X className="h-4 w-4 text-red-500" />
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>

              <div className="flex justify-between mt-6">
                <div className="space-x-2 space-x-reverse">
                  <Button
                    onClick={addNewStage}
                    variant="outline"
                    className="hover:bg-blue-50 hover:text-blue-600 transition-colors"
                  >
                    הוסף שלב חדש +
                  </Button>
                  <Button
                    onClick={markAsWeakest}
                    variant="outline"
                    className="hover:bg-yellow-50 hover:text-yellow-600 transition-colors"
                  >
                    שלב הדורש שיפור
                  </Button>
                </div>
                <Button
                  onClick={downloadCSV}
                  variant="outline"
                  className="hover:bg-green-50 hover:text-green-600 transition-colors"
                >
                  <Download className="ml-2" size={16} />
                  הורד ניתוח CSV
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="mt-6 shadow-lg border-0">
          <CardHeader className="bg-gray-50 border-b">
            <CardTitle className="text-xl text-gray-700">סיכום כלכלי</CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-blue-50 p-4 rounded-lg">
                <h3 className="text-lg font-medium text-blue-800">השקעה כוללת</h3>
                <p className="text-2xl font-bold text-blue-600">₪{roi.cost.toLocaleString()}</p>
              </div>
              <div className="bg-green-50 p-4 rounded-lg">
                <h3 className="text-lg font-medium text-green-800">הכנסות</h3>
                <p className="text-2xl font-bold text-green-600">₪{roi.revenue.toLocaleString()}</p>
              </div>
              <div className="bg-purple-50 p-4 rounded-lg">
                <h3 className="text-lg font-medium text-purple-800">החזר השקעה</h3>
                <p className="text-2xl font-bold text-purple-600">{roi.roi.toFixed(1)}%</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <footer className="mt-8 pb-6 text-center">
          <div className="text-sm text-gray-600">
            <p>
              © {new Date().getFullYear()} כל הזכויות שמורות לנועם אוהב ציון וצי פרסום
            </p>
            <a
              href="https://www.instagram.com/noam.ohevzion/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 hover:text-blue-800 transition-colors mt-1 inline-block"
            >
              לחשבון האינסטגרם של נועם
            </a>
          </div>
        </footer>
      </div>
    </div>
  );
};

export default FunnelAnalyzer;
