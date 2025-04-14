import { Card, CardContent } from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Question } from "@shared/schema";

interface QuestionCardProps {
  question: Question;
  selectedAnswer: string;
  onAnswerSelect: (questionId: string, optionId: string) => void;
}

const QuestionCard = ({ question, selectedAnswer, onAnswerSelect }: QuestionCardProps) => {
  return (
    <Card className="mb-8">
      <CardContent className="p-8">
        <div className="mb-6">
          <h3 className="text-xl font-medium mb-4">{question.text}</h3>
          
          <RadioGroup 
            value={selectedAnswer} 
            onValueChange={(value) => onAnswerSelect(question.id, value)}
            className="space-y-3"
          >
            {question.options.map((option) => (
              <div key={option.id} className="flex items-center">
                <RadioGroupItem value={option.id} id={option.id} className="h-5 w-5" />
                <Label htmlFor={option.id} className="ml-3 text-gray-800">
                  {option.text}
                </Label>
              </div>
            ))}
          </RadioGroup>
        </div>
      </CardContent>
    </Card>
  );
};

export default QuestionCard;
